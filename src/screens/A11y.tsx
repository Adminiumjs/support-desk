/*
 * `a11y` — Accessibility settings (port spec §6.34, logic §8.42). Max-width 900.
 *
 * Ruling R6: all three override layers ship (higher contrast, red-green
 * friendly, monochrome) plus reduce motion, and `lib/a11y.ts` stamps them onto
 * <html> — this screen never sets a data attribute by hand.
 *
 * Ruling R2: `resetA11y()` restores the DOCUMENTED initial values. The comp's
 * reset set `motion: true` while first paint had `motion: false`; that was a
 * real inconsistency, and the store now uses `a11yReset()` from lib/a11y.
 *
 * The toggle rows are a single `role="switch"` button each so the whole row is
 * one control (the comp nested a switch inside a clickable row). The switch
 * visual reuses the shared `.sd-toggle` classes; two local rules mirror the
 * checked state from the row, since `aria-checked` now lives on the row.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Chip,
  ChipRow,
  Eyebrow,
  Icon,
  SoftPill,
  useIsDark,
} from "../components";
import { dataSource } from "../data/source";
import { a11yActiveNote } from "../lib/a11y";
import { useAppStore } from "../state/store";
import "../styles/screen-a11y.css";

/** Chip type scales with the size it represents (§8.42). */
function chipFontSize(scale: number): number {
  return 11.5 + (scale - 1) * 12;
}

export default function A11y() {
  const SIZES = dataSource.accessibilitySizes();
  const PALETTES = dataSource.accessibilityPalettes();
  const TOGGLES = dataSource.accessibilityToggles();

  const a11y = useAppStore((s) => s.a11y);
  const setA11ySize = useAppStore((s) => s.setA11ySize);
  const setA11yPalette = useAppStore((s) => s.setA11yPalette);
  const toggleA11y = useAppStore((s) => s.toggleA11y);
  const saveA11y = useAppStore((s) => s.saveA11y);
  const resetA11y = useAppStore((s) => s.resetA11y);
  const scToggle = useAppStore((s) => s.scToggle);
  const dark = useIsDark();

  const hc = a11y.on.contrast;
  const previewFg = hc ? (dark ? "#ffffff" : "#000000") : "var(--fg)";
  const previewMuted = hc ? (dark ? "#e4e4ea" : "#26262e") : "var(--fg-muted)";
  const previewBorder = hc ? 2 : 1;

  return (
    <main className="fx-screen fx-page w-900 a11">
      <h1 className="a11__h1">Accessibility settings</h1>
      <p className="a11__lede">
        These apply across the help center and the Hearth app on this account.
        Changes take effect immediately — the preview shows exactly what you'll
        get.
      </p>

      <div className="a11__split">
        <Card className="a11__panel">
          <section className="a11__block a11__block--divided">
            <h2 className="a11__block-title">Display size</h2>
            <p className="a11__block-note">
              Scales every screen in the help center — text, buttons and spacing
              together. Applies as soon as you pick one.
            </p>
            <ChipRow>
              {SIZES.map((s) => (
                <Chip
                  key={s.label}
                  active={Math.abs(a11y.size - s.scale) < 0.001}
                  style={{ fontSize: chipFontSize(s.scale) }}
                  onClick={() => setA11ySize(s.scale)}
                >
                  {s.label}
                </Chip>
              ))}
            </ChipRow>
          </section>

          <div className="a11__toggles">
            {TOGGLES.map((t) => {
              const on = a11y.on[t.id];
              return (
                <button
                  type="button"
                  key={t.id}
                  role="switch"
                  aria-checked={on}
                  className="a11__row"
                  onClick={() => toggleA11y(t.id)}
                >
                  <span className="a11__row-text">
                    <span className="a11__row-label">{t.label}</span>
                    <span className="a11__row-note">{t.note}</span>
                  </span>
                  <span className="sd-toggle" aria-hidden="true">
                    <span className="sd-toggle__knob" />
                  </span>
                </button>
              );
            })}
          </div>

          <section className="a11__block a11__block--top">
            <h2 className="a11__block-title">Colour palette</h2>
            <p className="a11__block-note">
              Status colours are always paired with an icon and a label, never
              colour alone.
            </p>
            <ChipRow>
              {PALETTES.map((p) => (
                <Chip
                  key={p.id}
                  active={a11y.palette === p.id}
                  onClick={() => setA11yPalette(p.id)}
                >
                  {p.name}
                </Chip>
              ))}
            </ChipRow>
          </section>
        </Card>

        <aside className="a11__aside">
          <Card
            className="a11__preview"
            style={{ borderWidth: previewBorder }}
          >
            <Eyebrow>Live sample</Eyebrow>
            <h2 className="a11__preview-h" style={{ color: previewFg }}>
              Fix a device that shows offline
            </h2>
            <p className="a11__preview-p" style={{ color: previewMuted }}>
              An "offline" label usually clears itself within a few minutes. If
              it doesn't, restart the device and check your router hasn't
              changed channel.
            </p>
            <div className="a11__pills">
              <SoftPill fg="--pos" soft="--pos-soft" icon="check-circle-2">
                Solved
              </SoftPill>
              <SoftPill fg="--warn" soft="--warn-soft" icon="clock">
                Pending
              </SoftPill>
              <SoftPill fg="--danger" soft="--danger-soft" icon="alert-triangle">
                Action needed
              </SoftPill>
            </div>
            <span className="a11__faux-btn">Read the article</span>
            <p className="a11__note">{a11yActiveNote(a11y)}</p>
          </Card>

          <Card className="a11__shortcuts">
            <p className="a11__shortcuts-head">
              <Icon name="keyboard" size={18} />
              Keyboard shortcuts
            </p>
            <p className="a11__shortcuts-body">
              Press <span className="sd-kbd sd-kbd--sm">/</span> to search from
              anywhere, <span className="sd-kbd sd-kbd--sm">Esc</span> to close
              any panel.
            </p>
            <button type="button" className="fx-nav a11__see-all" onClick={scToggle}>
              See all shortcuts
              <Icon name="arrow-right" size={13} />
            </button>
          </Card>

          <div className="a11__actions">
            <ButtonPrimary icon="check" onClick={saveA11y}>
              Save settings
            </ButtonPrimary>
            <ButtonSecondary icon="rotate-ccw" onClick={resetA11y}>
              Reset
            </ButtonSecondary>
          </div>
        </aside>
      </div>
    </main>
  );
}
