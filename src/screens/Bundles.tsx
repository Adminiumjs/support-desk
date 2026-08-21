/*
 * `bundles` — Bundle deals (port spec §6.21 / §8.29). Max-width 1000.
 *
 * Three fixed bundle cards plus the build-your-own picker. The BYO discount is
 * a flat 10% once three or more devices are selected; the seeded selection
 * (doorbell + plug) sums to £158.00 with the note "1 more for 10% off".
 */

import {
  ButtonPrimary,
  Card,
  Icon,
  IconChip,
  SoftPill,
} from "../components";
import { dataSource } from "../data/source";
import type { ProductId } from "../data/types";
import { useT } from "../i18n";
import { counted, money, poundsWhole } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-bundles.css";

export default function Bundles() {
  const t = useT();
  const byoOn = useAppStore((s) => s.byoOn);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const bundles = dataSource.bundles();
  const products = dataSource.products();
  const prices = dataSource.byoPrices();

  const sum = byoOn.reduce((acc, id) => acc + prices[id], 0);
  const discounted = byoOn.length >= 3;
  const total = discounted ? sum * 0.9 : sum;

  const note = discounted
    ? t("screensA.bundles.noteDiscount")
    : byoOn.length > 0
      ? t("screensA.bundles.noteMore", undefined, 3 - byoOn.length)
      : t("screensA.bundles.notePick");

  const toggle = (id: ProductId) =>
    set({
      byoOn: byoOn.includes(id)
        ? byoOn.filter((p) => p !== id)
        : [...byoOn, id],
    });

  const byoAdd = () => {
    if (byoOn.length < 2) {
      showToast(t("screensA.bundles.toastMin"), "warn");
      return;
    }
    showToast(
      discounted
        ? t("screensA.bundles.toastAddedDiscount")
        : t("screensA.bundles.toastAddedPlain"),
    );
  };

  return (
    <main className="fx-screen fx-page w-1000 fx-wide">
      <h1 className="bundles-title">{t("screensA.bundles.title")}</h1>
      <p className="bundles-lede">{t("screensA.bundles.lede")}</p>

      <div className="bundles-grid">
        {bundles.map((b) => (
          <Card
            key={b.id}
            accent={b.id === "security"}
            className="bundles-card"
          >
            <div className="bundles-card__head">
              <span className="bundles-card__name">{b.name}</span>
              <SoftPill fg="--pos" soft="--pos-soft" icon="tag">
                {t("screensA.bundles.save", { save: b.save })}
              </SoftPill>
            </div>
            <p className="bundles-card__blurb">{b.blurb}</p>

            <ul className="bundles-items">
              {b.items.map((it) => {
                const p = dataSource.product(it.prod);
                return (
                  <li key={`${b.id}-${it.prod}`} className="bundles-item">
                    <IconChip
                      tint={p.tint}
                      icon={p.icon}
                      size={32}
                      radius={10}
                      iconSize={16}
                    />
                    <span className="sd-grow">{it.name}</span>
                    <span className="bundles-item__qty">{it.qty}</span>
                  </li>
                );
              })}
            </ul>

            <div className="bundles-card__pricerow">
              <span className="bundles-card__now">{poundsWhole(b.now)}</span>
              <span className="bundles-card__was">{poundsWhole(b.was)}</span>
            </div>

            <button
              type="button"
              className="fx-chip bundles-card__btn"
              onClick={() =>
                showToast(
                  t("screensA.bundles.toastAddedNamed", {
                    name: b.name,
                    save: b.save,
                  }),
                )
              }
            >
              <Icon name="shopping-basket" size={16} />
              {t("screensA.bundles.add")}
            </button>
          </Card>
        ))}
      </div>

      <Card className="bundles-byo">
        <div className="bundles-byo__head">
          <div>
            <p className="bundles-byo__title">
              {t("screensA.bundles.byoTitle")}
            </p>
            <p className="bundles-byo__sub">{t("screensA.bundles.byoSub")}</p>
          </div>
          <span
            className="bundles-byo__note"
            style={{ color: discounted ? "var(--pos)" : "var(--fg-subtle)" }}
          >
            {note}
          </span>
        </div>

        <div
          className="bundles-byo__grid"
          role="group"
          aria-label={t("screensA.bundles.groupLabel")}
        >
          {products.map((p) => {
            const on = byoOn.includes(p.id);
            return (
              <button
                key={p.id}
                type="button"
                className={`sd-tilesel fx-chip${on ? " sd-tilesel--on" : ""}`}
                aria-pressed={on}
                onClick={() => toggle(p.id)}
              >
                {on ? (
                  <span className="sd-tilesel__check">
                    <Icon name="check" size={13} />
                  </span>
                ) : null}
                <IconChip
                  tint={p.tint}
                  icon={p.icon}
                  size={38}
                  radius={11}
                  iconSize={19}
                />
                <span className="bundles-byo__name">{p.name}</span>
                <span className="bundles-byo__price">
                  {poundsWhole(prices[p.id])}
                </span>
              </button>
            );
          })}
        </div>

        <div className="bundles-byo__total">
          <span className="bundles-byo__count">
            {t("screensA.bundles.selected", {
              devices: counted("count.device", byoOn.length),
            })}
          </span>
          <span className="bundles-byo__sum">{money(total)}</span>
          {discounted ? (
            <span className="bundles-byo__before">{money(sum)}</span>
          ) : null}
          <ButtonPrimary
            icon="shopping-basket"
            className="bundles-byo__add"
            onClick={byoAdd}
          >
            {t("screensA.bundles.addMine")}
          </ButtonPrimary>
        </div>
      </Card>
    </main>
  );
}
