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
import { truncateCrumb } from "../lib/format";
import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { CRUMB_LABELS, CRUMB_TRAILS, columnClass } from "./chrome";

interface Crumb {
  label: string;
  onClick?: () => void;
}

export function Breadcrumbs() {
  const view = useAppStore((s) => s.view);
  const catSlug = useAppStore((s) => s.catSlug);
  const articleId = useAppStore((s) => s.articleId);
  const threadId = useAppStore((s) => s.threadId);
  const goHome = useAppStore((s) => s.goHome);
  const go = useAppStore((s) => s.go);
  const openCategory = useAppStore((s) => s.openCategory);

  if (view === "home") return null;

  const trail: Crumb[] = [{ label: "Help center", onClick: goHome }];
  const spec = CRUMB_TRAILS[view];

  if (view === "article") {
    const a = dataSource.article(articleId);
    const cat = dataSource.category(a?.cat ?? catSlug);
    if (cat)
      trail.push({ label: cat.name, onClick: () => openCategory(cat.slug) });
    trail.push({ label: truncateCrumb(a?.title ?? "Article") });
  } else if (view === "category") {
    trail.push({ label: dataSource.category(catSlug)?.name ?? "Category" });
  } else if (view === "thread") {
    trail.push({ label: "My tickets", onClick: () => go("mytickets") });
    trail.push({ label: threadId ?? "Ticket" });
  } else if (view === "claim") {
    trail.push({ label: "Warranty", onClick: () => go("warranty") });
    trail.push({ label: "Make a claim" });
  } else if (view === "energy") {
    trail.push({ label: "Devices", onClick: () => go("devices") });
    trail.push({ label: "Energy insights" });
  } else if (view === "members") {
    trail.push({ label: "Devices", onClick: () => go("devices") });
    trail.push({ label: "Household members" });
  } else if (spec) {
    const [parent, parentLabel, last] = spec;
    trail.push({ label: parentLabel, onClick: () => go(parent) });
    trail.push({ label: last });
  } else {
    const label = CRUMB_LABELS[view];
    if (!label) return null;
    trail.push({ label });
  }

  return (
    <nav
      className={`crumbs ${columnClass(view)}`}
      aria-label="Breadcrumb"
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
