/*
 * Toggle — the switch on the devices, security and accessibility screens.
 *
 * Ruling R2: the comp moved the knob with `justify-content` and declared no
 * transition, so it snapped. Here the knob is translated with
 * `transform: translateX(19px)` and a real transition (see components.css);
 * `.fx-nomotion` still kills it for reduce-motion users.
 */

export interface ToggleProps {
  /** Current value. */
  on: boolean;
  onChange: (next: boolean) => void;
  /** Accessible name — required (ruling R6). */
  label: string;
  /** Hides the visual label; the switch keeps its accessible name. */
  hideLabel?: boolean;
  disabled?: boolean;
  className?: string;
}

/** `<Toggle label="Eco mode" on={devOn.dv2 ?? true} onChange={v => …} hideLabel />` */
export function Toggle({
  on,
  onChange,
  label,
  hideLabel = true,
  disabled = false,
  className,
}: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={hideLabel ? label : undefined}
      disabled={disabled}
      className={`sd-toggle${className ? ` ${className}` : ""}`}
      onClick={() => onChange(!on)}
    >
      <span className="sd-toggle__knob" />
      {hideLabel ? null : <span className="sr-only">{label}</span>}
    </button>
  );
}

export default Toggle;
