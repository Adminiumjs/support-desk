/*
 * Checkbox — `boxStyle` + `rowSelStyle` (port spec §4.3). Used by the returns
 * wizard item picker and the survey contact opt-in.
 */

import { Icon } from "./Icon";
import type { ReactNode } from "react";

export interface CheckboxProps {
  checked: boolean;
  onChange: (next: boolean) => void;
  children: ReactNode;
  /** Optional secondary line under the label. */
  note?: string;
  /** Optional leading element, e.g. an `<IconChip>`. */
  leading?: ReactNode;
  /** Renders as a plain inline control rather than a bordered row. */
  bare?: boolean;
  className?: string;
}

/**
 * `<Checkbox checked={rPicked.includes(name)} onChange={v => …}>{name}</Checkbox>`
 */
export function Checkbox({
  checked,
  onChange,
  children,
  note,
  leading,
  bare = false,
  className,
}: CheckboxProps) {
  const cls = bare
    ? `sd-row${className ? ` ${className}` : ""}`
    : `sd-rowsel${checked ? " sd-rowsel--on" : ""}${
        className ? ` ${className}` : ""
      }`;
  return (
    <label className={cls}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        className={`sd-box${checked ? " sd-box--on" : ""}`}
        aria-hidden="true"
      >
        {checked ? <Icon name="check" size={13} /> : null}
      </span>
      {leading}
      <span className="sd-col sd-grow">
        <span style={{ fontSize: 14.5, fontWeight: 700 }}>{children}</span>
        {note ? (
          <span
            style={{ fontSize: 12.5, color: "var(--fg-subtle)", marginBlockStart: 3 }}
          >
            {note}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export default Checkbox;
