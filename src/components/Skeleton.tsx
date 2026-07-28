/*
 * The loading skeleton (delta spec C §3.2).
 *
 * `<SkeletonScreen />` is store-connected and renders the whole `<main>`, so
 * App can hand off to it wholesale while `busy` is true. `<Skel>` is the bare
 * shimmering block, for screens that want a local placeholder.
 */

import {
  skeletonBlocks,
  skeletonIsGrid,
  skeletonNote,
  skeletonShape,
} from "../lib/skeletons";
import { useAppStore } from "../state/store";
import { columnClass } from "./chrome";
import type { CSSProperties } from "react";

export interface SkelProps {
  /** Block height in px. */
  height: number;
  /** CSS width — `100%` by default. */
  width?: string;
  radius?: number;
  className?: string;
  style?: CSSProperties;
}

/** `<Skel height={82} />` */
export function Skel({ height, width = "100%", radius, className, style }: SkelProps) {
  return (
    <span
      className={`fx-skel${className ? ` ${className}` : ""}`}
      style={{
        display: "block",
        blockSize: height,
        inlineSize: width,
        ...(radius === undefined ? {} : { borderRadius: radius }),
        ...style,
      }}
    />
  );
}

/**
 * The full-page skeleton. Three fixed bars, then the shape's blocks, then the
 * mono caption. Width comes from the same `.w-*` classes the screens use.
 */
export function SkeletonScreen() {
  const view = useAppStore((s) => s.view);
  const shape = skeletonShape(view);
  const blocks = skeletonBlocks(shape);
  const grid = skeletonIsGrid(shape);

  return (
    <main className={`fx-page ${columnClass(view)}`} aria-busy="true">
      <Skel height={32} width="min(320px, 58%)" radius={12} />
      <Skel
        height={14}
        width="min(520px, 88%)"
        style={{ marginBlockStart: 16 }}
      />
      <Skel
        height={14}
        width="min(400px, 66%)"
        style={{ marginBlockStart: 9 }}
      />
      <div className={grid ? "skel__grid" : `skel__col${shape === "doc" ? " skel__col--doc" : ""}`}>
        {blocks.map((b) => (
          <Skel key={b.i} height={b.height} width={b.width} radius={b.radius} />
        ))}
      </div>
      <span className="skel__note">{skeletonNote(view)}</span>
    </main>
  );
}

export default SkeletonScreen;
