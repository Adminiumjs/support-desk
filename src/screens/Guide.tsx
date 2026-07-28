/*
 * `guide` — Seasonal gift guide (delta spec B §11, logic C §3.3).
 *
 * A merchandising page: seasonal hero, tag filters, product picks with
 * strike-through pricing and badges, delivery cut-offs and a gift-wrapping
 * note. Every filter matches at least one pick, so there is no empty state.
 *
 * Max-width 1000 + `.fx-wide` — the only new view eligible for the 1800px →
 * 1440px ultra-wide bump (ruling R5). `columnClass("guide")` emits both, so no
 * inline `maxWidth` may be used here: an inline style would beat the media
 * query and freeze the column at 1000.
 *
 * The tile icon and tint come from `dataSource.product(pick.prod)`, not from
 * the pick itself.
 */

import {
  ButtonPrimary,
  Chip,
  Icon,
  IconButton,
  PlaceholderTile,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import {
  GG_BLURB,
  GG_CUTOFF,
  GG_SEASON,
  GG_TITLE,
  filterGiftPicks,
  giftHasWas,
} from "../lib/derive";
import { money } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-guide.css";

export default function Guide() {
  const ggFilter = useAppStore((s) => s.ggFilter);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const addToBasketByName = useAppStore((s) => s.addToBasketByName);
  const saveToWishlist = useAppStore((s) => s.saveToWishlist);

  const filters = dataSource.giftFilters();
  const picks = filterGiftPicks(dataSource.giftPicks(), ggFilter);
  const dates = dataSource.giftDates();

  return (
    <main className={`fx-screen fx-page ${columnClass("guide")} scr-guide`}>
      <div className="gg-hero">
        <p className="gg-hero__season">{GG_SEASON}</p>
        <h1 className="gg-hero__title">{GG_TITLE}</h1>
        <p className="gg-hero__blurb">{GG_BLURB}</p>
        <div className="gg-hero__actions">
          <ButtonPrimary icon="gift" iconSize={16} onClick={() => go("gift")}>
            Buy a gift card instead
          </ButtonPrimary>
          <span className="gg-cutoff">
            <Icon name="truck" size={15} />
            {GG_CUTOFF}
          </span>
        </div>
      </div>

      <div className="gg-filters" role="group" aria-label="Filter the gift guide">
        {filters.map(([id, label, icon]) => (
          <Chip
            key={id}
            icon={icon}
            active={ggFilter === id}
            onClick={() => set({ ggFilter: id })}
          >
            {label}
          </Chip>
        ))}
      </div>

      <div className="gg-picks">
        {picks.map((g) => {
          const product = dataSource.product(g.prod);
          return (
            <div className="gg-pick" key={g.id}>
              <PlaceholderTile
                tint={product.tint}
                icon={product.icon}
                minHeight={128}
                iconSize={40}
                angle="150deg"
                className="gg-pick__tile"
              >
                {g.badge ? <span className="gg-pick__badge">{g.badge}</span> : null}
              </PlaceholderTile>

              <div className="gg-pick__body">
                <span className="gg-pick__for">{g.forWho}</span>
                <span className="gg-pick__name">{g.name}</span>
                <span className="gg-pick__blurb">{g.blurb}</span>
                <span className="gg-pick__prices">
                  <span className="gg-pick__price">{money(g.price)}</span>
                  {giftHasWas(g) ? (
                    <span className="gg-pick__was">{money(g.was)}</span>
                  ) : null}
                </span>
              </div>

              <div className="gg-pick__actions">
                <ButtonPrimary
                  icon="shopping-basket"
                  iconSize={14}
                  className="gg-pick__add"
                  onClick={() => addToBasketByName(g.name)}
                >
                  Add to basket
                </ButtonPrimary>
                <IconButton
                  icon="heart"
                  iconSize={16}
                  label="Save for later"
                  className="gg-pick__save"
                  onClick={() => saveToWishlist(g.name)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="gg-foot">
        <div className="gg-delivery">
          <p className="sd-eyebrow">Delivery in time</p>
          <div className="gg-dates">
            {dates.map((d, i) => (
              <div
                className={`gg-date${i === dates.length - 1 ? " gg-date--last" : ""}`}
                key={d.label}
              >
                <span className="gg-date__label">{d.label}</span>
                <span
                  className="gg-date__date"
                  style={{ color: d.late ? "var(--pos)" : "var(--fg)" }}
                >
                  {d.date}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="gg-wrap">
          <p className="gg-wrap__head">
            <Icon name="package-open" size={16} color="var(--fg-muted)" />
            Gift-ready as standard
          </p>
          <p className="gg-wrap__text">
            Plastic-free boxes, no prices on the packing slip, and a handwritten
            card if you add a message at checkout. Returns run to 31 January on
            anything bought from November.
          </p>
          <button
            type="button"
            className="gg-wrap__link fx-nav"
            onClick={() => go("returns")}
          >
            How extended returns work
            <Icon name="arrow-right" size={13} />
          </button>
        </div>
      </div>
    </main>
  );
}
