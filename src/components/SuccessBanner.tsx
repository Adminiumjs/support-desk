/*
 * The inline success banner (`succeed()`, delta spec C §2.4 / §7.2).
 *
 * Store-connected, no props. It sits between the breadcrumbs and the screen
 * body, auto-dismisses after 7 s, and always offers an explicit dismiss.
 */

import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { IconButton } from "./Primitives";
import { columnClass } from "./chrome";

export function SuccessBanner() {
  const view = useAppStore((s) => s.view);
  const succ = useAppStore((s) => s.succ);
  const dismissSuccess = useAppStore((s) => s.dismissSuccess);
  const runSuccessAction = useAppStore((s) => s.runSuccessAction);
  if (!succ) return null;

  return (
    <div className={`scs ${columnClass(view)}`} role="status">
      <div className="scs__card">
        <span className="scs__ico">
          <Icon name="check-circle-2" size={18} />
        </span>
        <div className="scs__body">
          <p className="scs__title">{succ.title}</p>
          <p className="scs__text">{succ.text}</p>
        </div>
        {succ.action ? (
          <button type="button" className="scs__action fx-btn" onClick={runSuccessAction}>
            <Icon name={succ.action.icon ?? "arrow-right"} size={14} />
            {succ.action.label}
          </button>
        ) : null}
        <IconButton icon="x" label="Dismiss" small onClick={dismissSuccess} />
      </div>
    </div>
  );
}

export default SuccessBanner;
