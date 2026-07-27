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
import { giftCode, money, moneyLoose } from "../lib/format";
import { top, useAppStore } from "../state/store";
import "../styles/screen-gift.css";

/* The select renders labels; the store keeps the id (§6.22). */
const WHEN_LABEL: Record<GiftWhen, string> = {
  now: "Right away",
  tomorrow: "Tomorrow morning",
  date: "On a date I choose",
};
const WHEN_IDS = Object.keys(WHEN_LABEL) as GiftWhen[];
const WHEN_OPTIONS = WHEN_IDS.map((id) => WHEN_LABEL[id]);

export default function Gift() {
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
      ? `It's on its way to ${
          gcEmail || "their inbox"
        } right now, with your message attached.`
      : "We'll deliver it on the morning you picked, with your message attached.";

  const buy = () => {
    if (!amt || amt < 10) {
      showToast("Gift cards start at £10", "warn");
      return;
    }
    if (!gcTo.trim()) {
      showToast("Who is it for?", "warn");
      return;
    }
    if (gcEmail.indexOf("@") < 1) {
      showToast("Add their email address", "warn");
      return;
    }
    set({ gcBought: giftCode(amt, gcTo) });
    showToast("Gift card sent");
    top();
  };

  const redeem = () => {
    if (gcRedeem.trim().length < 8) {
      showToast("Enter the full code from the email", "warn");
      return;
    }
    set({ gcBal: gcBal + 25, gcRedeem: "" });
    showToast("£25.00 added to your balance");
  };

  /* ------------------------------------------------- A. confirmation */

  if (gcBought) {
    return (
      <main className="oh-screen oh-page w-900">
        <Card variant="form" className="gift-done">
          <span className="gift-done__tile">
            <Icon name="gift" size={24} />
          </span>
          <h1 className="gift-done__title">Gift card sent</h1>
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
              Buy another
            </ButtonSecondary>
          </div>
        </Card>
      </main>
    );
  }

  /* ------------------------------------------------- B. purchase form */

  return (
    <main className="oh-screen oh-page w-900">
      <h1 className="gift-title">Gift cards</h1>
      <p className="gift-lede">
        Spendable on any Hearth device, spare part or Hearth Care plan. No
        expiry, no fees, and refundable within 14 days if it's unused.
      </p>

      <div className="gift-split">
        <Card variant="form" className="gift-form">
          <Field label="Pick a design">
            <div className="gift-designs" role="group" aria-label="Pick a design">
              {designs.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  className={`sd-tilesel oh-chip${
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

          <Field label="Amount">
            <div role="group" aria-label="Amount">
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
                  Other
                </Chip>
              </ChipRow>
            </div>
            {gcAmount === "custom" ? (
              <TextInput
                className="sd-mono gift-custom"
                value={gcCustom}
                placeholder="Any amount from £10 to £500"
                ariaLabel="Custom gift card amount"
                onChange={(v) => set({ gcCustom: v })}
              />
            ) : null}
          </Field>

          <Field label="Recipient's name" htmlFor="gc-to">
            <TextInput
              id="gc-to"
              value={gcTo}
              placeholder="Ines"
              onChange={(v) => set({ gcTo: v })}
            />
          </Field>

          <Field label="Their email" htmlFor="gc-email">
            <TextInput
              id="gc-email"
              type="email"
              value={gcEmail}
              placeholder="ines@example.com"
              onChange={(v) => set({ gcEmail: v })}
            />
          </Field>

          <Field
            label="Message"
            htmlFor="gc-msg"
            aside={<span className="gift-optional">Optional</span>}
          >
            <TextArea
              id="gc-msg"
              value={gcMsg}
              maxLength={180}
              minHeight={88}
              placeholder="Happy birthday — go make the house clever."
              onChange={(v) => set({ gcMsg: v })}
            />
          </Field>

          <Field label="When should we send it?" htmlFor="gc-when">
            <SelectField
              id="gc-when"
              value={WHEN_LABEL[gcWhen]}
              options={WHEN_OPTIONS}
              onChange={(label) =>
                set({
                  gcWhen:
                    WHEN_IDS.find((id) => WHEN_LABEL[id] === label) ?? "now",
                })
              }
            />
          </Field>

          <div>
            <ButtonPrimary icon="gift" className="gift-submit" onClick={buy}>
              Buy {amountText} gift card
            </ButtonPrimary>
          </div>
        </Card>

        <aside className="gift-aside">
          <Eyebrow>Preview</Eyebrow>
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
              For {gcTo.trim() || "someone lucky"}
            </div>
            <div className="gift-preview__msg">
              {gcMsg.trim() || "Your message appears here."}
            </div>
            <div className="gift-preview__foot">
              no expiry · hearth.example/redeem
            </div>
          </div>

          <Card className="gift-redeem">
            <Eyebrow>Redeem a card</Eyebrow>
            <TextInput
              className="sd-mono gift-redeem__field"
              value={gcRedeem}
              upper
              placeholder="HEARTH-XXXX-XXXX"
              ariaLabel="Gift card code"
              onChange={(v) => set({ gcRedeem: v })}
            />
            <ButtonSecondary icon="ticket" onClick={redeem}>
              Add to balance
            </ButtonSecondary>
            <div className="gift-redeem__foot">
              <span>Your balance</span>
              <span className="gift-redeem__bal">{money(gcBal)}</span>
            </div>
          </Card>
        </aside>
      </div>
    </main>
  );
}
