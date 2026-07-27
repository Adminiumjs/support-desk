/*
 * Footer — on every view (port spec §5.11): a brand column plus 8 link
 * columns carrying 36 label → handler pairs.
 *
 * Store-connected: takes no props.
 */

import { BRAND, FOOTER_COPYRIGHT, FOOTER_URL } from "../data/demo";
import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { Eyebrow } from "./Primitives";
import { FOOTER_COLUMNS } from "./chrome";
import type { FooterTarget } from "./chrome";

export function Footer() {
  const go = useAppStore((s) => s.go);
  const openTicket = useAppStore((s) => s.openTicket);
  const openChat = useAppStore((s) => s.openChat);
  const openArticle = useAppStore((s) => s.openArticle);
  const gotoOverview = useAppStore((s) => s.gotoOverview);
  const scToggle = useAppStore((s) => s.scToggle);

  const activate = (to: FooterTarget) => {
    if (to === "openTicket") return openTicket();
    if (to === "openChat") return openChat();
    if (to === "returnsArticle") return openArticle("a_return");
    return go(to);
  };

  return (
    <footer className="ftr">
      <div className="ftr__inner">
        <div className="ftr__brand">
          <div className="sd-row" style={{ gap: 11 }}>
            <span className="ftr__mark">
              <Icon name="life-buoy" size={17} />
            </span>
            <span style={{ fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em" }}>
              {BRAND} Help
            </span>
          </div>
          <p className="ftr__copy">{FOOTER_COPYRIGHT}</p>
          <span className="ftr__url">{FOOTER_URL}</span>
          <div className="sd-row" style={{ gap: 16 }}>
            <button
              type="button"
              className="ftr__link oh-nav sd-row"
              style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700 }}
              onClick={gotoOverview}
            >
              <Icon name="layout-grid" size={14} />
              All screens overview
            </button>
            <button
              type="button"
              className="ftr__link oh-nav sd-row"
              style={{ fontSize: 13, fontWeight: 700 }}
              onClick={scToggle}
            >
              <Icon name="keyboard" size={14} />
              Shortcuts
            </button>
          </div>
        </div>

        <nav className="ftr__cols" aria-label="Footer">
          {FOOTER_COLUMNS.map((col) => (
            <div className="ftr__col" key={col.name}>
              <Eyebrow>{col.name}</Eyebrow>
              {col.links.map((l, i) => (
                <button
                  key={`${col.name}-${l.label}-${i}`}
                  type="button"
                  className="ftr__link oh-nav"
                  onClick={() => activate(l.to)}
                >
                  {l.label}
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
