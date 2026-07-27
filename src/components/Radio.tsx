/*
 * Radio — `radioStyle` + `rowSelStyle` from the comp's selection primitives
 * (port spec §4.3). Used for claim devices, return methods, repair types.
 */

import type { ReactNode } from "react";

export interface RadioProps {
  selected: boolean;
  /** The row label. */
  children: ReactNode;
  onSelect: () => void;
  /** Radio-group name, so arrow keys behave. */
  name: string;
  /** Optional secondary line under the label. */
  note?: string;
  /** Optional leading element, e.g. an `<IconChip>`. */
  leading?: ReactNode;
  className?: string;
}

/**
 * `<Radio name="method" selected={rMethod === m.id} onSelect={() => set({ rMethod: m.id })} note={m.note}>{m.label}</Radio>`
 */
export function Radio({
  selected,
  children,
  onSelect,
  name,
  note,
  leading,
  className,
}: RadioProps) {
  return (
    <label
      className={`sd-rowsel${selected ? " sd-rowsel--on" : ""}${
        className ? ` ${className}` : ""
      }`}
    >
      <input
        type="radio"
        name={name}
        checked={selected}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        className={`sd-radio${selected ? " sd-radio--on" : ""}`}
        aria-hidden="true"
      />
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

export default Radio;
