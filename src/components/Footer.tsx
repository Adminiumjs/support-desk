/*
 * Footer — on every view (port spec §5.11): a brand column plus 8 link
 * columns carrying 51 label → handler pairs.
 *
 * Store-connected: takes no props.
 */

import { FOOTER_COPYRIGHT, FOOTER_URL } from "../data/demo";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { Eyebrow } from "./Primitives";
import { FOOTER_COLUMNS } from "./chrome";
import type { FooterTarget } from "./chrome";

export function Footer() {
  const t = useT();
  const go = useAppStore((s) => s.go);
  const openTicket = useAppStore((s) => s.openTicket);
  const openChat = useAppStore((s) => s.openChat);
  const openArticle = useAppStore((s) => s.openArticle);
  const gotoOverview = useAppStore((s) => s.gotoOverview);
  const scToggle = useAppStore((s) => s.scToggle);
  const openAddOns = useAppStore((s) => s.openAddOns);

  const activate = (to: FooterTarget) => {
    if (to === "openTicket") return openTicket();
    if (to === "openChat") return openChat();
    if (to === "returnsArticle") return openArticle("a_return");
    return go(to);
  };

  return (
    <footer className="ftr">
      <div className="ftr__inner w-1120 fx-wide">
        <div className="ftr__brand">
          <div className="sd-row" style={{ gap: 11 }}>
            <span className="ftr__mark">
              <Icon name="life-buoy" size={17} />
            </span>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em" }}>
              {t("chrome.header.wordmark", { brand: dataSource.brand() })}
            </span>
          </div>
          <p className="ftr__copy">{FOOTER_COPYRIGHT}</p>
          <span className="ftr__url">{FOOTER_URL}</span>
          <div className="sd-row" style={{ gap: 16 }}>
            <button
              type="button"
              className="ftr__link fx-nav sd-row"
              style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700 }}
              onClick={gotoOverview}
            >
              <Icon name="layout-grid" size={14} />
              {t("chrome.link.overviewAll")}
            </button>
            <button
              type="button"
              className="ftr__link fx-nav sd-row"
              style={{ fontSize: 13, fontWeight: 700 }}
              onClick={scToggle}
            >
              <Icon name="keyboard" size={14} />
              {t("chrome.footer.shortcuts")}
            </button>
            {/* The owner's corner of their own help desk — the drawer that
                holds each add-on's switch and settings form. See
                components/AddOnsDrawer.tsx for why it lives in the customer
                bundle at all. */}
            <button
              type="button"
              className="ftr__link fx-nav sd-row"
              style={{ fontSize: 13, fontWeight: 700 }}
              onClick={openAddOns}
            >
              <Icon name="plug" size={14} />
              {t("addon.host.manage.open")}
            </button>
          </div>
        </div>

        <nav className="ftr__cols" aria-label={t("chrome.footer.aria")}>
          {FOOTER_COLUMNS.map((col) => (
            <div className="ftr__col" key={col.name}>
              <Eyebrow>{t(col.name, { brand: dataSource.brand() })}</Eyebrow>
              {col.links.map((l, i) => (
                <button
                  key={`${col.name}-${l.label}-${i}`}
                  type="button"
                  className="ftr__link fx-nav"
                  onClick={() => activate(l.to)}
                >
                  {t(l.label, { brand: dataSource.brand() })}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
