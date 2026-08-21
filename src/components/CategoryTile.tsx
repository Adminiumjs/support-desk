/*
 * CategoryTile — the liftable card in the home "Browse by topic" grid
 * (port spec §6.1 B).
 */

import { counted } from "../lib/format";
import { Icon } from "./Icon";
import { IconChip } from "./PlaceholderTile";
import type { Category } from "../data/types";

export interface CategoryTileProps {
  category: Category;
  /** Number of articles in this category. */
  count: number;
  onClick: () => void;
  className?: string;
}

/** `<CategoryTile category={cat} count={4} onClick={() => openCategory(cat.slug)} />` */
export function CategoryTile({
  category,
  count,
  onClick,
  className,
}: CategoryTileProps) {
  return (
    <button
      type="button"
      className={`cat-tile fx-card${className ? ` ${className}` : ""}`}
      onClick={onClick}
    >
      <IconChip
        tint={category.tint}
        icon={category.icon}
        size={50}
        radius={14}
        iconSize={24}
      />
      <span className="cat-tile__name">{category.name}</span>
      <p className="cat-tile__blurb">{category.blurb}</p>
      <span className="cat-tile__foot">
        <Icon name="file-text" size={13} />
        {counted("count.article", count)}
      </span>
    </button>
  );
}

export default CategoryTile;
