/*
 * Theme resolution (ruling R3).
 *
 * The comp widened its `theme` authoring prop to `system | light | dark`, but
 * `state.theme` is still only ever `light` or `dark`. `system` is resolved
 * once on mount from `prefers-color-scheme` and then tracked live, until the
 * user toggles the theme by hand — after which the OS is ignored for the rest
 * of the session and the Accessibility screen's "Follow my system theme"
 * button is the only way back.
 *
 * Persisted state is therefore binary (`theme`) plus one flag
 * (`themeManual`); nothing here reads or writes the store.
 */

import type { ThemeName } from "../data/types";
import { t } from "../i18n/ambient";

const QUERY = "(prefers-color-scheme: dark)";

/** The OS preference right now. Falls back to light off-browser. */
export function systemPrefersDark(): boolean {
  try {
    return window.matchMedia(QUERY).matches;
  } catch {
    return false;
  }
}

/** `systemPrefersDark()` as a theme name. */
export function systemTheme(): ThemeName {
  return systemPrefersDark() ? "dark" : "light";
}

/**
 * Subscribe to OS theme changes. Returns the unsubscribe function, and is a
 * no-op (returning a no-op) where `matchMedia` is unavailable.
 *
 * `addEventListener` with the legacy `addListener` fallback, as the comp does.
 */
export function watchSystemTheme(
  onChange: (theme: ThemeName) => void,
): () => void {
  try {
    const mq = window.matchMedia(QUERY);
    const handler = (e: MediaQueryListEvent) =>
      onChange(e.matches ? "dark" : "light");
    if (mq.addEventListener) {
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }
    /* Safari < 14 */
    const legacy = mq as MediaQueryList & {
      addListener?: (cb: (e: MediaQueryListEvent) => void) => void;
      removeListener?: (cb: (e: MediaQueryListEvent) => void) => void;
    };
    legacy.addListener?.(handler);
    return () => legacy.removeListener?.(handler);
  } catch {
    return () => {};
  }
}

/** The note under the Accessibility screen's Appearance card. */
export function themeModeNote(manual: boolean): string {
  return manual ? t("lib.theme.noteManual") : t("lib.theme.noteSystem");
}

/** The toast `followSystemTheme()` fires. */
export function followSystemToast(): string {
  return t("lib.theme.followToast");
}
