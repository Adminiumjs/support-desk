/*
 * AttachmentChip — the mono file chip on the new-ticket form and the warranty
 * claim (port spec §6.8 step 5).
 */

import { Icon } from "./Icon";

export interface AttachmentChipProps {
  /** File name, e.g. `IMG_2214.jpg`. */
  name: string;
  /** Omit to render a read-only chip with no remove button. */
  onRemove?: (name: string) => void;
  className?: string;
}

/** `<AttachmentChip name={f} onRemove={removeAttachment} />` */
export function AttachmentChip({
  name,
  onRemove,
  className,
}: AttachmentChipProps) {
  return (
    <span className={`sd-attach${className ? ` ${className}` : ""}`}>
      <Icon name="paperclip" size={14} color="var(--fg-subtle)" />
      {name}
      {onRemove ? (
        <button
          type="button"
          className="sd-attach__x oh-gi"
          aria-label={`Remove ${name}`}
          onClick={() => onRemove(name)}
        >
          <Icon name="x" size={13} />
        </button>
      ) : null}
    </span>
  );
}

export default AttachmentChip;
