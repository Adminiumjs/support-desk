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
 * Ruling R3: the aside gained an "Appearance" card. `state.theme` stays binary,
 * and `themeManual` records whether the header toggle has been used; the card's
 * button clears it and re-adopts the OS preference.
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
import { useT } from "../i18n";
import { a11yActiveNote } from "../lib/a11y";
import { themeModeNote } from "../lib/theme";
import { useAppStore } from "../state/store";
import "../styles/screen-a11y.css";

/** Chip type scales with the size it represents (§8.42). */
function chipFontSize(scale: number): number {
  return 11.5 + (scale - 1) * 12;
}

export default function A11y() {
  const t = useT();
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
  const themeManual = useAppStore((s) => s.themeManual);
  const followSystemTheme = useAppStore((s) => s.followSystemTheme);
  const dark = useIsDark();

  const hc = a11y.on.contrast;
  const previewFg = hc ? (dark ? "#ffffff" : "#000000") : "var(--fg)";
  const previewMuted = hc ? (dark ? "#e4e4ea" : "#26262e") : "var(--fg-muted)";
  const previewBorder = hc ? 2 : 1;

  return (
    <main className="fx-screen fx-page w-900 a11">
      <h1 className="a11__h1">{t("screensA.a11y.title")}</h1>
      <p className="a11__lede">{t("screensA.a11y.lede")}</p>

      <div className="a11__split">
        <Card className="a11__panel">
          <section className="a11__block a11__block--divided">
            <h2 className="a11__block-title">{t("screensA.a11y.size")}</h2>
            <p className="a11__block-note">{t("screensA.a11y.sizeNote")}</p>
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
            {TOGGLES.map((tog) => {
              const on = a11y.on[tog.id];
              return (
                <button
                  type="button"
                  key={tog.id}
                  role="switch"
                  aria-checked={on}
                  className="a11__row"
                  onClick={() => toggleA11y(tog.id)}
                >
                  <span className="a11__row-text">
                    <span className="a11__row-label">{tog.label}</span>
                    <span className="a11__row-note">{tog.note}</span>
                  </span>
                  <span className="sd-toggle" aria-hidden="true">
                    <span className="sd-toggle__knob" />
                  </span>
                </button>
              );
            })}
          </div>

          <section className="a11__block a11__block--top">
            <h2 className="a11__block-title">{t("screensA.a11y.palette")}</h2>
            <p className="a11__block-note">{t("screensA.a11y.paletteNote")}</p>
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
            <Eyebrow>{t("screensA.a11y.sample")}</Eyebrow>
            <h2 className="a11__preview-h" style={{ color: previewFg }}>
              {t("screensA.a11y.sampleTitle")}
            </h2>
            <p className="a11__preview-p" style={{ color: previewMuted }}>
              {t("screensA.a11y.sampleBody")}
            </p>
            <div className="a11__pills">
              <SoftPill fg="--pos" soft="--pos-soft" icon="check-circle-2">
                {t("screensA.a11y.solved")}
              </SoftPill>
              <SoftPill fg="--warn" soft="--warn-soft" icon="clock">
                {t("screensA.a11y.pending")}
              </SoftPill>
              <SoftPill fg="--danger" soft="--danger-soft" icon="alert-triangle">
                {t("screensA.a11y.actionNeeded")}
              </SoftPill>
            </div>
            <span className="a11__faux-btn">{t("screensA.a11y.readArticle")}</span>
            <p className="a11__note">{a11yActiveNote(a11y)}</p>
          </Card>

          <Card className="a11__shortcuts">
            <p className="a11__shortcuts-head">
              <Icon name="keyboard" size={18} />
              {t("screensA.a11y.shortcuts")}
            </p>
            {/* Split on the placeholders so the translator owns the word order —
                the two keycaps are rendered wherever the sentence puts them. */}
            <p className="a11__shortcuts-body">
              {t("screensA.a11y.shortcutsBody")
                .split(/(\{slash\}|\{esc\})/)
                .map((part, i) =>
                  part === "{slash}" ? (
                    <span key={i} className="sd-kbd sd-kbd--sm">
                      /
                    </span>
                  ) : part === "{esc}" ? (
                    <span key={i} className="sd-kbd sd-kbd--sm">
                      Esc
                    </span>
                  ) : (
                    part
                  ),
                )}
            </p>
            <button type="button" className="fx-nav a11__see-all" onClick={scToggle}>
              {t("screensA.a11y.seeAll")}
              <Icon name="arrow-right" size={13} />
            </button>
          </Card>

          {/* Ruling R3 — the escape hatch back to the system theme. */}
          <Card className="a11__shortcuts">
            <p className="a11__shortcuts-head">
              <Icon name="sun-moon" size={18} />
              {t("screensA.a11y.appearance")}
            </p>
            <p className="a11__shortcuts-body">{themeModeNote(themeManual)}</p>
            <button
              type="button"
              className="fx-nav a11__see-all"
              onClick={followSystemTheme}
            >
              <Icon name="monitor-smartphone" size={13} />
              {t("screensA.a11y.followSystem")}
            </button>
          </Card>

          <div className="a11__actions">
            <ButtonPrimary icon="check" onClick={saveA11y}>
              {t("screensA.a11y.save")}
            </ButtonPrimary>
            <ButtonSecondary icon="rotate-ccw" onClick={resetA11y}>
              {t("screensA.a11y.reset")}
            </ButtonSecondary>
          </div>
        </aside>
      </div>
    </main>
  );
}
