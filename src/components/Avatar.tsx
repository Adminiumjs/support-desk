/*
 * Avatar — a rounded SQUARE (radius 12px), not a circle. The only avatar
 * primitive in the comp: initials at weight 800 over the tint's placeholder
 * gradient (port spec §4.6).
 */

import { phBg, phInitials, useIsDark } from "./PlaceholderTile";
import type { CSSProperties } from "react";

export interface AvatarProps {
  /** Two-letter initials, e.g. `MA`. */
  initials: string;
  /** Hex tint from the data record. */
  tint: string;
  /** Edge length in px. Comp sizes: 40 / 38 / 36. */
  size?: number;
  /** Initials font size in px. Comp sizes: 14 / 13. */
  fontSize?: number;
  className?: string;
  style?: CSSProperties;
}

/** `<Avatar initials="MA" tint="#4f8bd6" size={36} fontSize={13} />` */
export function Avatar({
  initials,
  tint,
  size = 36,
  fontSize = 13,
  className,
  style,
}: AvatarProps) {
  const dark = useIsDark();
  return (
    <span
      className={`sd-avatar${className ? ` ${className}` : ""}`}
      style={{
        inlineSize: size,
        blockSize: size,
        fontSize,
        background: phBg(tint, dark),
        color: phInitials(tint, dark),
        ...style,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

export default Avatar;
