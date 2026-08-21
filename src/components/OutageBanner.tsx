/*
 * OutageBanner — the live degradation strip above the sticky header
 * (port spec §5.9). Store-connected: takes no props.
 *
 * Visible unless dismissed, everything is healthy, or the user is already on
 * the `status` screen. With the seeded data exactly one component is degraded.
 */

import { OUTAGE_TIME, ST_DEGRADED_SUB } from "../data/demo";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import { selectOutageVisible, useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { IconButton } from "./Primitives";

export function OutageBanner() {
  const { t, number } = useI18n();
  const visible = useAppStore(selectOutageVisible);
  const go = useAppStore((s) => s.go);
  const dismiss = useAppStore((s) => s.dismissOutage);

  if (!visible) return null;

  const bad = dataSource.statusComponents().filter((c) => c.st !== "ok");
  const title =
    bad.length === 1
      ? t("chrome.outage.one", { name: bad[0].name })
      : /* An explicit `count` param beats the raw one, so the numeral is
         * Intl-formatted while the plural category still comes from the
         * number itself — `٣ خدمات`, not `3 خدمات`. */
        t("chrome.outage.many", { count: number(bad.length) }, bad.length);

  return (
    <div className="outage" role="status">
      <span className="outage__ico">
        <Icon name="alert-triangle" size={16} />
      </span>
      <div className="outage__text">
        <span className="outage__title">{title}</span>
        <p className="outage__body">{ST_DEGRADED_SUB}</p>
      </div>
      <span className="outage__time">{OUTAGE_TIME}</span>
      <button
        type="button"
        className="outage__cta fx-btn"
        onClick={() => go("status")}
      >
        {t("chrome.outage.cta")}
        <Icon name="arrow-right" size={13} />
      </button>
      <IconButton
        icon="x"
        label={t("chrome.action.dismiss")}
        iconSize={15}
        small
        onClick={dismiss}
        style={{ background: "transparent" }}
      />
    </div>
  );
}

export default OutageBanner;
