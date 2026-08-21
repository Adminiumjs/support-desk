/*
 * `parts` — Spare parts (port spec §6.20, logic §8.41, data §7.19).
 *
 * Category chips → a `ListCard` of parts → the basket bar → the repair-guide
 * callout. Out-of-stock parts swap "Add" for "Notify me" and never enter the
 * basket. Chip-filtered, never paginated (ruling R3).
 *
 * Delta §6.8: a category with no parts shows an empty state in place of the
 * list.
 *
 * Max-width 900.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Chip,
  ChipRow,
  EmptyState,
  IconButton,
  IconChip,
  ListCard,
  SoftPill,
} from "../components";
import { dataSource } from "../data/source";
import { useI18n, type MessageKey } from "../i18n";
import { counted, money } from "../lib/format";
import { useAppStore } from "../state/store";
import type { PartStock } from "../data/types";
import "../styles/screen-parts.css";

/* ------------------------------------------------------- stock vocabulary */

interface StockMeta {
  /** A message key — this table is module scope, so it is resolved on render. */
  label: MessageKey;
  fg: string;
  soft: string;
  icon: string;
}

/** Parts stock pills (port spec §4.2). */
const STOCK: Record<PartStock, StockMeta> = {
  in: {
    label: "screensB.parts.stockIn",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "check",
  },
  low: {
    label: "screensB.parts.stockLow",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "alert-triangle",
  },
  out: {
    label: "screensB.parts.stockOut",
    fg: "--fg-subtle",
    soft: "--surface-3",
    icon: "clock",
  },
};

const FREE_DELIVERY_FROM = 25;
const FALLBACK_TINT = "#4f8bd6";

export default function Parts() {
  const { t, number } = useI18n();
  const partCat = useAppStore((s) => s.partCat);
  const basket = useAppStore((s) => s.basket);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const openTicket = useAppStore((s) => s.openTicket);

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
    showToast(t("screensB.parts.basketEmptied"));
  }

  function checkout() {
    showToast(t("screensB.parts.checkoutToast"), "info");
  }

  const shipping =
    total >= FREE_DELIVERY_FROM
      ? t("screensB.parts.freeDelivery")
      : t("screensB.parts.moreForFree", {
          amount: money(FREE_DELIVERY_FROM - total),
        });

  return (
    <main className="fx-screen fx-page w-900 scr-parts">
      <h1 className="scr-parts__h1">{t("screensB.parts.h1")}</h1>
      <p className="scr-parts__lede">{t("screensB.parts.lede")}</p>

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

      {rows.length === 0 ? (
        <EmptyState
          icon="package-search"
          title={t("screensB.parts.emptyTitle")}
          body={t("screensB.parts.emptyBody")}
          action={{
            label: t("screensB.parts.openTicket"),
            icon: "pen-line",
            onClick: openTicket,
          }}
        />
      ) : (
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
                    {t("screensB.parts.fitsLine", { sku: part.sku, fits })}
                  </p>
                  <SoftPill fg={stock.fg} soft={stock.soft} icon={stock.icon}>
                    {t(stock.label)}
                  </SoftPill>
                </div>

                <span className="pt-row__price">{money(part.price)}</span>

                {qty > 0 ? (
                  <div className="pt-step">
                    <IconButton
                      icon="minus"
                      label={t("screensB.parts.removeOne", {
                        name: part.name,
                      })}
                      small
                      iconSize={15}
                      onClick={() => setQty(part.sku, qty - 1)}
                    />
                    <span className="pt-step__qty">{number(qty)}</span>
                    <IconButton
                      icon="plus"
                      label={t("screensB.parts.addAnother", {
                        name: part.name,
                      })}
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
                        ? showToast(t("screensB.parts.notifyToast"))
                        : setQty(part.sku, 1)
                    }
                  >
                    {out ? t("screensB.parts.notify") : t("screensB.parts.add")}
                  </ButtonSecondary>
                )}
              </div>
            );
          })}
        </ListCard>
      )}

      {count > 0 ? (
        <div className="pt-basket">
          <div className="pt-basket__col">
            <p className="pt-basket__count">
              {t("screensB.parts.inYourBasket", {
                parts: counted("count.part", count),
              })}
            </p>
            <p className="pt-basket__ship">{shipping}</p>
          </div>
          <span className="pt-basket__total">{money(total)}</span>
          <ButtonSecondary icon="trash-2" iconSize={15} onClick={clearBasket}>
            {t("screensB.parts.empty")}
          </ButtonSecondary>
          <ButtonPrimary icon="credit-card" iconSize={16} onClick={checkout}>
            {t("screensB.parts.checkout")}
          </ButtonPrimary>
        </div>
      ) : null}

      <Callout tone="pos" icon="wrench" className="pt-callout">
        {t("screensB.parts.callout")}
      </Callout>
    </main>
  );
}
