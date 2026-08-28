/*
 * Breadcrumbs — the trail above every screen except `home` (port spec §5.8).
 * Store-connected: takes no props.
 *
 * The wrapper width comes from `columnClass()`, the same helper the screens
 * use, so the trail lines up with the page below it — including the 1800px
 * ultra-wide bump (ruling R5). An inline max-width would beat that media
 * query, so there isn't one.
 */


import { dataSource } from "../data/source";
import { useT, type MessageKey } from "../i18n";
import { truncateCrumb } from "../lib/format";
import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { CRUMB_LABELS, CRUMB_TRAILS, columnClass } from "./chrome";

interface Crumb {
  /** Already-translated display text. */
  label: string;
  onClick?: () => void;
}

export function Breadcrumbs() {
  const t = useT();
  const view = useAppStore((s) => s.view);
  const catSlug = useAppStore((s) => s.catSlug);
  const articleId = useAppStore((s) => s.articleId);
  const threadId = useAppStore((s) => s.threadId);
  const goHome = useAppStore((s) => s.goHome);
  const go = useAppStore((s) => s.go);
  const openCategory = useAppStore((s) => s.openCategory);

  if (view === "home") return null;

  /** Every crumb key may carry `{brand}`; passing it always is harmless. */
  const label = (key: MessageKey) => t(key, { brand: dataSource.brand() });

  const trail: Crumb[] = [
    { label: label("chrome.link.helpCenter"), onClick: goHome },
  ];
  const spec = CRUMB_TRAILS[view];

  if (view === "article") {
    const a = dataSource.article(articleId);
    const cat = dataSource.category(a?.cat ?? catSlug);
    if (cat)
      trail.push({ label: cat.name, onClick: () => openCategory(cat.slug) });
    trail.push({
      label: truncateCrumb(a?.title ?? label("chrome.crumb.article")),
    });
  } else if (view === "category") {
    trail.push({
      label: dataSource.category(catSlug)?.name ?? label("chrome.crumb.category"),
    });
  } else if (view === "thread") {
    trail.push({
      label: label("chrome.link.myTickets"),
      onClick: () => go("mytickets"),
    });
    trail.push({ label: threadId ?? label("chrome.crumb.ticket") });
  } else if (view === "claim") {
    trail.push({
      label: label("chrome.crumb.warranty"),
      onClick: () => go("warranty"),
    });
    trail.push({ label: label("chrome.crumb.claimLast") });
  } else if (view === "energy") {
    trail.push({
      label: label("chrome.crumb.devices"),
      onClick: () => go("devices"),
    });
    trail.push({ label: label("chrome.link.energy") });
  } else if (view === "members") {
    trail.push({
      label: label("chrome.crumb.devices"),
      onClick: () => go("devices"),
    });
    trail.push({ label: label("chrome.link.members") });
  } else if (spec) {
    const [parent, parentKey, lastKey] = spec;
    trail.push({ label: label(parentKey), onClick: () => go(parent) });
    trail.push({ label: label(lastKey) });
  } else {
    const key = CRUMB_LABELS[view];
    if (!key) return null;
    trail.push({ label: label(key) });
  }

  return (
    <nav
      className={`crumbs ${columnClass(view)}`}
      aria-label={t("chrome.crumb.aria")}
    >
      {trail.map((c, i) => (
        <span className="sd-row" style={{ gap: 8 }} key={`${c.label}-${i}`}>
          {i > 0 ? <Icon name="chevron-right" size={14} /> : null}
          {c.onClick ? (
            <button type="button" className="crumbs__link fx-nav" onClick={c.onClick}>
              {c.label}
            </button>
          ) : (
            <span className="crumbs__last" aria-current="page">
              {c.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

export default Breadcrumbs;
