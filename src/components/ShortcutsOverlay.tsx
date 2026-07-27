/*
 * ShortcutsOverlay — the keyboard reference (port spec §5.5).
 * Store-connected: takes no props.
 */

import { useAppStore } from "../state/store";
import { Modal } from "./Modal";
import { Eyebrow } from "./Primitives";
import { SHORTCUT_GROUPS } from "./chrome";

export function ShortcutsOverlay() {
  const open = useAppStore((s) => s.shortcuts);
  const close = useAppStore((s) => s.scClose);

  return (
    <Modal
      open={open}
      onClose={close}
      title="Keyboard shortcuts"
      icon="keyboard"
      subtitle={
        <>
          Press <span className="sd-mono">?</span> any time to bring this back.
        </>
      }
    >
      <div className="modal__body">
        {SHORTCUT_GROUPS.map((g) => (
          <div className="sc__group" key={g.name}>
            <Eyebrow>{g.name}</Eyebrow>
            {g.rows.map((r) => (
              <div className="sc__row" key={r.label}>
                <span>{r.label}</span>
                <span className="sc__keys">
                  {r.keys.map((k) => (
                    <kbd className="sd-kbd" key={k}>
                      {k}
                    </kbd>
                  ))}
                </span>
              </div>
            ))}
          </div>
        ))}
        <p style={{ fontSize: 12.5, color: "var(--fg-subtle)", lineHeight: 1.6, margin: 0 }}>
          Shortcuts are ignored while you're typing in a field. Sequences like{" "}
          <span className="sd-mono">g</span> then <span className="sd-mono">t</span>{" "}
          want a quick second press.
        </p>
      </div>
    </Modal>
  );
}

export default ShortcutsOverlay;
