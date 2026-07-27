/*
 * Toast — the centred pill at the bottom of every screen (port spec §5.3).
 * Store-connected: takes no props. Auto-dismiss is owned by the store
 * (2600 ms); this component only renders.
 *
 * Ruling R6: the live region is always mounted so assistive tech announces
 * each new message rather than only the first.
 */

import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import type { ToastKind } from "../data/types";

const TOAST_ICON: Record<ToastKind, string> = {
  warn: "alert-triangle",
  info: "info",
  ok: "check-circle-2",
};

export function Toast() {
  const toast = useAppStore((s) => s.toast);
  return (
    <div className="toast-layer" role="status" aria-live="polite" aria-atomic="true">
      {toast ? (
        <div className="toast">
          <Icon name={TOAST_ICON[toast.kind]} size={16} />
          {toast.msg}
        </div>
      ) : null}
    </div>
  );
}

export default Toast;
