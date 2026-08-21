/*
 * `gift` — Gift cards (port spec §6.22 / §8.33 / §9.2). Max-width 900.
 *
 * Two states: the purchase form, and the confirmation once `gcBought` holds a
 * code. The code is deterministic (`giftCode(amount, recipient)`), never
 * random. The live preview reuses the placeholder gradient helpers so the card
 * art follows the chosen design's tint.
 */

import {
  AccentIconTile,
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Chip,
  ChipRow,
  Eyebrow,
  Field,
  Icon,
  IconChip,
  SelectField,
  TextArea,
  TextInput,
  phBg,
  phIco,
  useIsDark,
} from "../components";
import { BRAND } from "../data/demo";
import type { GiftWhen } from "../data/types";
import { dataSource } from "../data/source";
import { useT, type MessageKey } from "../i18n";
import { giftCode, money, moneyLoose } from "../lib/format";
import { top, useAppStore } from "../state/store";
import "../styles/screen-gift.css";

/* The select renders labels; the store keeps the id (§6.22). The map holds
   message keys, so the labels follow the reader's locale. */
const WHEN_KEY: Record<GiftWhen, MessageKey> = {
  now: "screensA.gift.whenNow",
  tomorrow: "screensA.gift.whenTomorrow",
  date: "screensA.gift.whenDate",
};
const WHEN_IDS = Object.keys(WHEN_KEY) as GiftWhen[];

/** Gift-card bounds, in Hearth's own currency. */
const MIN_AMOUNT = 10;
const MAX_AMOUNT = 500;
const REDEEM_TOP_UP = 25;
const REDEEM_URL = "hearth.example/redeem";
const REDEEM_MASK = "HEARTH-XXXX-XXXX";

export default function Gift() {
  const t = useT();
  const whenLabel = (id: GiftWhen) => t(WHEN_KEY[id]);
  const gcDesign = useAppStore((s) => s.gcDesign);
  const gcAmount = useAppStore((s) => s.gcAmount);
  const gcCustom = useAppStore((s) => s.gcCustom);
  const gcTo = useAppStore((s) => s.gcTo);
  const gcEmail = useAppStore((s) => s.gcEmail);
  const gcMsg = useAppStore((s) => s.gcMsg);
  const gcWhen = useAppStore((s) => s.gcWhen);
  const gcBought = useAppStore((s) => s.gcBought);
  const gcRedeem = useAppStore((s) => s.gcRedeem);
  const gcBal = useAppStore((s) => s.gcBal);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const dark = useIsDark();

  const designs = dataSource.giftDesigns();
  const amounts = dataSource.giftAmounts();
  const design = designs.find((d) => d.id === gcDesign) ?? designs[0];

  const amt =
    gcAmount === "custom"
      ? parseFloat(gcCustom.replace(/[^0-9.]/g, "")) || 0
      : gcAmount;
  const amountText = moneyLoose(amt);

  const sentLine =
    gcWhen === "now"
      ? t("screensA.gift.sentNow", {
          where: gcEmail || t("screensA.gift.theirInbox"),
        })
      : t("screensA.gift.sentLater");

  const buy = () => {
    if (!amt || amt < MIN_AMOUNT) {
      showToast(
        t("screensA.gift.toastMin", { min: moneyLoose(MIN_AMOUNT) }),
        "warn",
      );
      return;
    }
    if (!gcTo.trim()) {
      showToast(t("screensA.gift.toastWho"), "warn");
      return;
    }
    if (gcEmail.indexOf("@") < 1) {
      showToast(t("screensA.gift.toastEmail"), "warn");
      return;
    }
    set({ gcBought: giftCode(amt, gcTo) });
    showToast(t("screensA.gift.toastSent"));
    top();
  };

  const redeem = () => {
    if (gcRedeem.trim().length < 8) {
      showToast(t("screensA.gift.toastCode"), "warn");
      return;
    }
    set({ gcBal: gcBal + REDEEM_TOP_UP, gcRedeem: "" });
    showToast(
      t("screensA.gift.toastBalance", { amount: money(REDEEM_TOP_UP) }),
    );
  };

  /* ------------------------------------------------- A. confirmation */

  if (gcBought) {
    return (
      <main className="fx-screen fx-page w-900">
        <Card variant="form" className="gift-done">
          <span className="gift-done__tile">
            <Icon name="gift" size={24} />
          </span>
          <h1 className="gift-done__title">{t("screensA.gift.toastSent")}</h1>
          <p className="gift-done__body">{sentLine}</p>
          <div className="gift-done__codes">
            <span className="gift-done__code">{gcBought}</span>
            <span className="gift-done__code">{amountText}</span>
          </div>
          <div>
            <ButtonSecondary
              icon="plus"
              onClick={() => set({ gcBought: null })}
            >
              {t("screensA.gift.buyAnother")}
            </ButtonSecondary>
          </div>
        </Card>
      </main>
    );
  }

  /* ------------------------------------------------- B. purchase form */

  return (
    <main className="fx-screen fx-page w-900">
      <h1 className="gift-title">{t("screensA.gift.h1")}</h1>
      <p className="gift-lede">{t("screensA.gift.lede")}</p>

      <div className="gift-split">
        <Card variant="form" className="gift-form">
          <Field label={t("screensA.gift.design")}>
            <div
              className="gift-designs"
              role="group"
              aria-label={t("screensA.gift.design")}
            >
              {designs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`sd-tilesel fx-chip${
                    gcDesign === d.id ? " sd-tilesel--on" : ""
                  }`}
                  aria-pressed={gcDesign === d.id}
                  onClick={() => set({ gcDesign: d.id })}
                >
                  <IconChip
                    tint={d.tint}
                    icon={d.icon}
                    size={34}
                    radius={10}
                    iconSize={17}
                  />
                  <span className="gift-design__name">{d.name}</span>
                </button>
              ))}
            </div>
          </Field>

          <Field label={t("screensA.gift.amount")}>
            <div role="group" aria-label={t("screensA.gift.amount")}>
              <ChipRow>
                {amounts.map((a) => (
                  <Chip
                    key={a}
                    active={gcAmount === a}
                    onClick={() => set({ gcAmount: a })}
                  >
                    {moneyLoose(a)}
                  </Chip>
                ))}
                <Chip
                  active={gcAmount === "custom"}
                  onClick={() => set({ gcAmount: "custom" })}
                >
                  {t("screensA.gift.other")}
                </Chip>
              </ChipRow>
            </div>
            {gcAmount === "custom" ? (
              <TextInput
                className="sd-mono gift-custom"
                value={gcCustom}
                placeholder={t("screensA.gift.customPlaceholder", {
                  min: moneyLoose(MIN_AMOUNT),
                  max: moneyLoose(MAX_AMOUNT),
                })}
                ariaLabel={t("screensA.gift.customAria")}
                onChange={(v) => set({ gcCustom: v })}
              />
            ) : null}
          </Field>

          <Field label={t("screensA.gift.recipient")} htmlFor="gc-to">
            <TextInput
              id="gc-to"
              value={gcTo}
              placeholder="Ines"
              onChange={(v) => set({ gcTo: v })}
            />
          </Field>

          <Field label={t("screensA.gift.theirEmail")} htmlFor="gc-email">
            <TextInput
              id="gc-email"
              type="email"
              value={gcEmail}
              placeholder="ines@example.com"
              onChange={(v) => set({ gcEmail: v })}
            />
          </Field>

          <Field
            label={t("screensA.gift.message")}
            htmlFor="gc-msg"
            aside={
              <span className="gift-optional">{t("screensA.gift.optional")}</span>
            }
          >
            <TextArea
              id="gc-msg"
              value={gcMsg}
              maxLength={180}
              minHeight={88}
              placeholder={t("screensA.gift.messagePlaceholder")}
              onChange={(v) => set({ gcMsg: v })}
            />
          </Field>

          <Field label={t("screensA.gift.whenLabel")} htmlFor="gc-when">
            <SelectField
              id="gc-when"
              value={whenLabel(gcWhen)}
              options={WHEN_IDS.map(whenLabel)}
              onChange={(label) =>
                set({
                  gcWhen: WHEN_IDS.find((id) => whenLabel(id) === label) ?? "now",
                })
              }
            />
          </Field>

          <div>
            <ButtonPrimary icon="gift" className="gift-submit" onClick={buy}>
              {t("screensA.gift.buy", { amount: amountText })}
            </ButtonPrimary>
          </div>
        </Card>

        <aside className="gift-aside">
          <Eyebrow>{t("screensA.gift.preview")}</Eyebrow>
          <div
            className="gift-preview"
            style={{ background: phBg(design.tint, dark, "150deg") }}
          >
            <div className="gift-preview__brand">
              <AccentIconTile
                icon="life-buoy"
                size={26}
                radius={8}
                iconSize={14}
              />
              <span className="gift-preview__word">{BRAND}</span>
              <Icon
                name={design.icon}
                size={20}
                color={phIco(design.tint, dark)}
                className="gift-preview__ico"
              />
            </div>
            <div className="gift-preview__amount">{amountText}</div>
            <div className="gift-preview__to">
              {t("screensA.gift.for", {
                name: gcTo.trim() || t("screensA.gift.someoneLucky"),
              })}
            </div>
            <div className="gift-preview__msg">
              {gcMsg.trim() || t("screensA.gift.messageHere")}
            </div>
            <div className="gift-preview__foot">
              {t("screensA.gift.foot", { url: REDEEM_URL })}
            </div>
          </div>

          <Card className="gift-redeem">
            <Eyebrow>{t("screensA.gift.redeem")}</Eyebrow>
            <TextInput
              className="sd-mono gift-redeem__field"
              value={gcRedeem}
              upper
              placeholder={REDEEM_MASK}
              ariaLabel={t("screensA.gift.codeAria")}
              onChange={(v) => set({ gcRedeem: v })}
            />
            <ButtonSecondary icon="ticket" onClick={redeem}>
              {t("screensA.gift.addBalance")}
            </ButtonSecondary>
            <div className="gift-redeem__foot">
              <span>{t("screensA.gift.yourBalance")}</span>
              <span className="gift-redeem__bal">{money(gcBal)}</span>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
