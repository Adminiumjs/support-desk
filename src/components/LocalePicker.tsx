/*
 * LocalePicker — the one control that changes the app's language.
 *
 * This app has no demo dock, so the picker lives in the header. Below 560px
 * the header cannot fit another control (see the responsive block at the end
 * of components.css), so the MobileSheet renders a second instance; both are
 * this component, and both drive the same `setLocale`.
 *
 * Languages are listed by endonym — a reader looking for their own language
 * cannot be expected to recognise its English name, and "Arabic" is no help to
 * someone who reads العربية.
 */

import { LOCALES, LOCALE_TAGS, useI18n, type LocaleTag } from "../i18n";
import { Icon } from "./Icon";

/**
 * `icon` is the header form: a globe the width of the other header buttons,
 * with the <select> laid transparently over it. The header bar is already at
 * capacity at 1120px, and a control wide enough to spell out "العربية (مصر)"
 * pushed the whole thing into a horizontal scroll. Overlaying keeps the native
 * control — its dropdown, its keyboard handling, its accessible name — and
 * spends 40px instead of 140.
 *
 * `block` is the MobileSheet form: full width, endonym visible.
 */
export function LocalePicker({
  variant = "icon",
  className = "",
}: {
  variant?: "icon" | "block";
  className?: string;
}) {
  const { locale, setLocale, t } = useI18n();
  const label = t("chrome.language");

  return (
    <span className={`hdr__lang hdr__lang--${variant} ${className}`.trim()}>
      <Icon name="globe" size={variant === "icon" ? 17 : 15} />
      <select
        className="hdr__lang-select"
        value={locale}
        aria-label={label}
        title={label}
        onChange={(e) => setLocale(e.target.value as LocaleTag)}
      >
        {LOCALE_TAGS.map((tag) => (
          <option key={tag} value={tag}>
            {LOCALES[tag].native}
          </option>
        ))}
      </select>
    </span>
  );
}

export default LocalePicker;
