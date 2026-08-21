/*
 * ShortcutsOverlay — the keyboard reference (port spec §5.5).
 * Store-connected: takes no props.
 *
 * The two prose lines carry `{slot}` markers rather than being spliced from
 * fragments: the translator decides where "?", "g" and "t" sit in the sentence,
 * and `slots()` turns each marker into its `<span class="sd-mono">`.
 */

import { useT } from "../i18n";
import { useAppStore } from "../state/store";
import { Modal } from "./Modal";
import { Eyebrow } from "./Primitives";
import { SHORTCUT_GROUPS, slots } from "./chrome";

/** The key caps the two prose lines can slot in. Machine tokens, never translated. */
const CAPS: Record<string, string> = {
  "{key}": "?",
  "{first}": "g",
  "{second}": "t",
};

/** A slot becomes a mono key cap; everything else stays text. */
function mono(part: string, i: number) {
  const cap = CAPS[part];
  return cap === undefined ? (
    part
  ) : (
    <span className="sd-mono" key={i}>
      {cap}
    </span>
  );
}

export function ShortcutsOverlay() {
  const t = useT();
  const open = useAppStore((s) => s.shortcuts);
  const close = useAppStore((s) => s.scClose);

  return (
    <Modal
      open={open}
      onClose={close}
      title={t("chrome.sc.title")}
      icon="keyboard"
      subtitle={<>{slots(t("chrome.sc.subtitle")).map(mono)}</>}
    >
      <div className="modal__body">
        {SHORTCUT_GROUPS.map((g) => (
          <div className="sc__group" key={g.name}>
            <Eyebrow>{t(g.name)}</Eyebrow>
            {g.rows.map((r) => (
              <div className="sc__row" key={r.label}>
                <span>{t(r.label)}</span>
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
          {slots(t("chrome.sc.note")).map(mono)}
        </p>
      </div>
    </Modal>
  );
}

export default ShortcutsOverlay;
