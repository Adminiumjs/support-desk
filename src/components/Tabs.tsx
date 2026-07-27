/*
 * Tabs — the segmented control used by the energy period switch, the plan
 * billing cycle and the security retention picker (port spec §4.3).
 */

export interface TabOption<T extends string = string> {
  id: T;
  label: string;
}

export interface TabsProps<T extends string = string> {
  options: TabOption<T>[];
  value: T;
  onChange: (id: T) => void;
  /** Accessible name for the group — required (ruling R6). */
  label: string;
  /** Gap in px — 6 by default, 9 on the plans cycle switch. */
  gap?: number;
  className?: string;
}

/**
 * `<Tabs label="Period" options={[{id:'week',label:'Week'}]} value={enPeriod} onChange={p => set({ enPeriod: p })} />`
 */
export function Tabs<T extends string = string>({
  options,
  value,
  onChange,
  label,
  gap = 6,
  className,
}: TabsProps<T>) {
  return (
    <div
      className={`sd-seg${className ? ` ${className}` : ""}`}
      role="tablist"
      aria-label={label}
      style={{ gap }}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          role="tab"
          aria-selected={o.id === value}
          className="sd-seg__item fx-chip"
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
