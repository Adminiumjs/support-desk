/*
 * OutageBanner — the live degradation strip above the sticky header
 * (port spec §5.9). Store-connected: takes no props.
 *
 * Visible unless dismissed, everything is healthy, or the user is already on
 * the `status` screen. With the seeded data exactly one component is degraded.
 */

import { OUTAGE_TIME, ST_DEGRADED_SUB } from "../data/demo";
import { dataSource } from "../data/source";
import { selectOutageVisible, useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { IconButton } from "./Primitives";

export function OutageBanner() {
  const visible = useAppStore(selectOutageVisible);
  const go = useAppStore((s) => s.go);
  const dismiss = useAppStore((s) => s.dismissOutage);

  if (!visible) return null;

  const bad = dataSource.statusComponents().filter((c) => c.st !== "ok");
  const title =
    bad.length === 1
      ? `${bad[0].name} is degraded`
      : `${bad.length} services degraded`;

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
        className="outage__cta oh-btn"
        onClick={() => go("status")}
      >
        Live status
        <Icon name="arrow-right" size={13} />
      </button>
      <IconButton
        icon="x"
        label="Dismiss"
        iconSize={15}
        small
        onClick={dismiss}
        style={{ background: "transparent" }}
      />
    </div>
  );
}

export default OutageBanner;
