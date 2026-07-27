/*
 * TicketForm fields — the labelled field wrappers and the product picker the
 * new-ticket screen composes (port spec §6.8, §9.1).
 *
 * These are field primitives, not the whole form: the `newticket` screen owns
 * the layout and calls `submitTicket()` on the store.
 */

import { Icon } from "./Icon";
import { IconChip } from "./PlaceholderTile";
import type { ChangeEvent, ReactNode } from "react";
import type { Product, ProductId } from "../data/types";

/* ----------------------------------------------------------------- Field */

export interface FieldProps {
  label: string;
  /** Rendered under the control in `--danger` when present. */
  error?: string;
  /** Optional right-aligned element on the label row, e.g. a char counter. */
  aside?: ReactNode;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
}

/** `<Field label="Subject" error={errs.subject}><TextInput … /></Field>` */
export function Field({
  label,
  error,
  aside,
  htmlFor,
  children,
  className,
}: FieldProps) {
  return (
    <div className={`sd-field${className ? ` ${className}` : ""}`}>
      <div className="sd-row sd-spread" style={{ alignItems: "baseline" }}>
        <label className="sd-label" htmlFor={htmlFor}>
          {label}
        </label>
        {aside}
      </div>
      {children}
      {error ? <FieldError>{error}</FieldError> : null}
    </div>
  );
}

export function FieldError({ children }: { children: ReactNode }) {
  return (
    <p className="sd-err" role="alert">
      <Icon name="alert-circle" size={14} />
      {children}
    </p>
  );
}

/* --------------------------------------------------------------- inputs */

export interface TextInputProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  /** Hard character cap, applied on change. */
  maxLength?: number;
  /** Force the value to upper case (serials, postcodes, gift codes). */
  upper?: boolean;
  type?: "text" | "email" | "search";
  ariaLabel?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

/** `<TextInput value={subject} onChange={v => setForm("subject", v)} invalid={!!errs.subject} />` */
export function TextInput({
  id,
  value,
  onChange,
  placeholder,
  invalid = false,
  maxLength,
  upper = false,
  type = "text",
  ariaLabel,
  onKeyDown,
  className,
}: TextInputProps) {
  const handle = (e: ChangeEvent<HTMLInputElement>) => {
    let v = e.target.value;
    if (upper) v = v.toUpperCase();
    if (maxLength !== undefined) v = v.slice(0, maxLength);
    onChange(v);
  };
  return (
    <input
      id={id}
      type={type}
      className={`sd-input oh-fld${invalid ? " sd-input--err" : ""}${
        className ? ` ${className}` : ""
      }`}
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-invalid={invalid || undefined}
      onChange={handle}
      onKeyDown={onKeyDown}
    />
  );
}

export interface TextAreaProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  maxLength?: number;
  rows?: number;
  minHeight?: number;
  ariaLabel?: string;
  className?: string;
}

/** `<TextArea value={desc} onChange={v => setForm("desc", v)} maxLength={1000} />` */
export function TextArea({
  id,
  value,
  onChange,
  placeholder,
  invalid = false,
  maxLength,
  minHeight,
  ariaLabel,
  className,
}: TextAreaProps) {
  return (
    <textarea
      id={id}
      className={`sd-textarea oh-fld${invalid ? " sd-textarea--err" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={minHeight ? { minBlockSize: minHeight } : undefined}
      value={value}
      placeholder={placeholder}
      aria-label={ariaLabel}
      aria-invalid={invalid || undefined}
      onChange={(e) =>
        onChange(
          maxLength === undefined
            ? e.target.value
            : e.target.value.slice(0, maxLength),
        )
      }
    />
  );
}

export interface SelectFieldProps {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  /** The first, empty-valued option, e.g. `Choose a topic…`. */
  placeholder?: string;
  options: string[];
  invalid?: boolean;
  ariaLabel?: string;
  className?: string;
}

/** `<SelectField value={topic} options={dataSource.topics()} onChange={v => setForm("topic", v)} />` */
export function SelectField({
  id,
  value,
  onChange,
  placeholder,
  options,
  invalid = false,
  ariaLabel,
  className,
}: SelectFieldProps) {
  return (
    <select
      id={id}
      className={`sd-select oh-fld${invalid ? " sd-select--err" : ""}${
        className ? ` ${className}` : ""
      }`}
      value={value}
      aria-label={ariaLabel}
      aria-invalid={invalid || undefined}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder !== undefined ? <option value="">{placeholder}</option> : null}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

/* -------------------------------------------------------- product picker */

export interface ProductPickerProps {
  products: Product[];
  value: ProductId | null;
  onChange: (id: ProductId) => void;
  /** Accessible name for the group — required (ruling R6). */
  label: string;
  className?: string;
}

/** `<ProductPicker label="Which product?" products={dataSource.products()} value={form.product} onChange={id => setForm("product", id)} />` */
export function ProductPicker({
  products,
  value,
  onChange,
  label,
  className,
}: ProductPickerProps) {
  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
        gap: 12,
      }}
    >
      {products.map((p) => {
        const on = value === p.id;
        return (
          <button
            key={p.id}
            type="button"
            role="radio"
            aria-checked={on}
            className={`sd-tilesel oh-chip${on ? " sd-tilesel--on" : ""}`}
            onClick={() => onChange(p.id)}
          >
            {on ? (
              <span className="sd-tilesel__check">
                <Icon name="check" size={13} />
              </span>
            ) : null}
            <IconChip
              tint={p.tint}
              icon={p.icon}
              size={46}
              radius={13}
              iconSize={23}
            />
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>{p.name}</span>
          </button>
        );
      })}
    </div>
  );
}
