/*
 * `parts` — Spare parts (port spec §6.20, logic §8.41, data §7.19).
 *
 * Category chips → a `ListCard` of parts → the basket bar → the repair-guide
 * callout. Out-of-stock parts swap "Add" for "Notify me" and never enter the
 * basket. Chip-filtered, never paginated (ruling R3).
 *
 * Max-width 900.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Chip,
  ChipRow,
  IconButton,
  IconChip,
  ListCard,
  SoftPill,
} from "../components";
import { dataSource } from "../data/source";
import { money, pluralise } from "../lib/format";
import { useAppStore } from "../state/store";
import type { PartStock } from "../data/types";
import "../styles/screen-parts.css";

/* ------------------------------------------------------- stock vocabulary */

interface StockMeta {
  label: string;
  fg: string;
  soft: string;
  icon: string;
}

/** Parts stock pills (port spec §4.2). */
const STOCK: Record<PartStock, StockMeta> = {
  in: { label: "In stock", fg: "--pos", soft: "--pos-soft", icon: "check" },
  low: {
    label: "Low stock",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "alert-triangle",
  },
  out: {
    label: "Back in 2 weeks",
    fg: "--fg-subtle",
    soft: "--surface-3",
    icon: "clock",
  },
};

const FREE_DELIVERY_FROM = 25;
const FALLBACK_TINT = "#4f8bd6";

export default function Parts() {
  const partCat = useAppStore((s) => s.partCat);
  const basket = useAppStore((s) => s.basket);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const parts = dataSource.parts();
  const cats = dataSource.partCategories();
  const rows = partCat === "all" ? parts : parts.filter((p) => p.cat === partCat);

  const count = Object.values(basket).reduce((n, q) => n + q, 0);
  const total = parts.reduce((sum, p) => sum + (basket[p.sku] ?? 0) * p.price, 0);

  /* `setBasket(sku, n)` drops the key entirely once the quantity hits zero. */
  function setQty(sku: string, next: number) {
    const copy = { ...basket };
    if (next <= 0) delete copy[sku];
    else copy[sku] = next;
    set({ basket: copy });
  }

  function clearBasket() {
    set({ basket: {} });
    showToast("Basket emptied");
  }

  function checkout() {
    showToast("Checkout isn't available in this demo", "info");
  }

  const shipping =
    total >= FREE_DELIVERY_FROM
      ? "Free delivery included"
      : `£${(FREE_DELIVERY_FROM - total).toFixed(2)} more for free delivery`;

  return (
    <main className="oh-screen oh-page w-900 scr-parts">
      <h1 className="scr-parts__h1">Spare parts</h1>
      <p className="scr-parts__lede">
        Every part we've ever shipped, available for at least seven years after
        a product launches. Under warranty? Don't buy anything — make a claim
        and we'll send it free.
      </p>

      <ChipRow className="scr-parts__cats" gap={10}>
        {cats.map((c) => (
          <Chip
            key={c.id}
            active={partCat === c.id}
            onClick={() => set({ partCat: c.id })}
          >
            {c.name}
          </Chip>
        ))}
      </ChipRow>

      <ListCard className="pt-list">
        {rows.map((part) => {
          const stock = STOCK[part.stock];
          const tint = part.fits[0]
            ? dataSource.product(part.fits[0]).tint
            : FALLBACK_TINT;
          const fits = part.fits
            .map((id) => dataSource.product(id).name)
            .join(", ");
          const qty = basket[part.sku] ?? 0;
          const out = part.stock === "out";

          return (
            <div className="sd-listrow pt-row" key={part.sku}>
              <IconChip
                tint={tint}
                icon={part.icon}
                size={42}
                radius={12}
                iconSize={21}
              />

              <div className="pt-row__col">
                <p className="pt-row__name">{part.name}</p>
                <p className="pt-row__sku">
                  {part.sku} · fits {fits}
                </p>
                <SoftPill fg={stock.fg} soft={stock.soft} icon={stock.icon}>
                  {stock.label}
                </SoftPill>
              </div>

              <span className="pt-row__price">{money(part.price)}</span>

              {qty > 0 ? (
                <div className="pt-step">
                  <IconButton
                    icon="minus"
                    label={`Remove one ${part.name}`}
                    small
                    iconSize={15}
                    onClick={() => setQty(part.sku, qty - 1)}
                  />
                  <span className="pt-step__qty">{qty}</span>
                  <IconButton
                    icon="plus"
                    label={`Add another ${part.name}`}
                    small
                    iconSize={15}
                    onClick={() => setQty(part.sku, qty + 1)}
                  />
                </div>
              ) : (
                <ButtonSecondary
                  className="pt-add"
                  icon={out ? "bell" : "plus"}
                  iconSize={15}
                  onClick={() =>
                    out
                      ? showToast("We'll email you when it's back")
                      : setQty(part.sku, 1)
                  }
                >
                  {out ? "Notify me" : "Add"}
                </ButtonSecondary>
              )}
            </div>
          );
        })}
      </ListCard>

      {count > 0 ? (
        <div className="pt-basket">
          <div className="pt-basket__col">
            <p className="pt-basket__count">
              {pluralise(count, "part")} in your basket
            </p>
            <p className="pt-basket__ship">{shipping}</p>
          </div>
          <span className="pt-basket__total">{money(total)}</span>
          <ButtonSecondary icon="trash-2" iconSize={15} onClick={clearBasket}>
            Empty
          </ButtonSecondary>
          <ButtonPrimary icon="credit-card" iconSize={16} onClick={checkout}>
            Checkout
          </ButtonPrimary>
        </div>
      ) : null}

      <Callout tone="pos" icon="wrench" className="pt-callout">
        Most parts fit with a screwdriver and ten minutes. Every part page in
        the app links to a step-by-step repair guide — no soldering, ever.
      </Callout>
    </main>
  );
}
