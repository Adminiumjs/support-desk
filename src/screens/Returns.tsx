/*
 * `returns` — Returns wizard (port spec §6.13, logic §8.15, data §7.10).
 *
 * Three steps in one panel: Items → Reason → Label. The step gates are
 * toast-only (§9.2); the RMA is deterministic (`rmaRef(rPicked.length)`, so
 * the seeded single item gives RMA-4419137).
 *
 * Max-width 760. The step footer lives inside the panel on every step.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Checkbox,
  Eyebrow,
  Icon,
  IconChip,
  Radio,
  SelectField,
  StepIndicator,
  TextArea,
} from "../components";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import { counted, rmaRef } from "../lib/format";
import { top, useAppStore } from "../state/store";
import "../styles/screen-returns.css";

export default function Returns() {
  const { t, number } = useI18n();
  const rStep = useAppStore((s) => s.rStep);
  const rOrder = useAppStore((s) => s.rOrder);
  const rPicked = useAppStore((s) => s.rPicked);
  const rReason = useAppStore((s) => s.rReason);
  const rNote = useAppStore((s) => s.rNote);
  const rMethod = useAppStore((s) => s.rMethod);
  const rRma = useAppStore((s) => s.rRma);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const STEP_LABELS = [
    t("screensB.returns.stepItems"),
    t("screensB.returns.stepReason"),
    t("screensB.returns.stepLabel"),
  ];

  const methods = dataSource.returnMethods();
  const method = methods.find((m) => m.id === rMethod) ?? methods[0];
  const items = dataSource.order(rOrder)?.items ?? [];

  function togglePicked(name: string, next: boolean) {
    set({
      rPicked: next ? [...rPicked, name] : rPicked.filter((n) => n !== name),
    });
  }

  function rNext() {
    if (rStep === 1) {
      if (!rPicked.length) {
        showToast(t("screensB.returns.needItem"), "warn");
        return;
      }
      set({ rStep: 2 });
      top();
      return;
    }
    if (rStep === 2) {
      if (!rReason) {
        showToast(t("screensB.returns.needReason"), "warn");
        return;
      }
      set({ rStep: 3, rRma: rmaRef(rPicked.length) });
      showToast(t("screensB.returns.created"));
      top();
      return;
    }
    showToast(t("screensB.returns.labelEmailed"));
  }

  function rBack() {
    set({ rStep: (rStep === 3 ? 2 : 1) as 1 | 2 | 3 });
  }

  const nextIcon = rStep === 1 ? "arrow-right" : rStep === 2 ? "tag" : "mail";
  const nextLabel =
    rStep === 1
      ? t("screensB.returns.continue")
      : rStep === 2
        ? t("screensB.returns.getLabel")
        : t("screensB.returns.emailLabel");

  return (
    <main className="fx-screen fx-page w-760 scr-returns">
      <h1 className="scr-returns__h1">{t("screensB.returns.h1")}</h1>
      <p className="scr-returns__lede">{t("screensB.returns.lede")}</p>

      <StepIndicator
        labels={STEP_LABELS}
        current={rStep}
        className="scr-returns__steps"
      />

      <Card variant="form" className="rt-panel">
        {rStep === 1 ? (
          <div className="rt-step">
            <div>
              <h2 className="rt-label">{t("screensB.returns.whichOrder")}</h2>
              <div className="rt-rows">
                {dataSource.returnableOrders().map((id) => {
                  const order = dataSource.order(id);
                  if (!order) return null;
                  const line = t(
                    order.status === "delivered"
                      ? "screensB.returns.orderLineDelivered"
                      : "screensB.returns.orderLineArriving",
                    {
                      placed: order.placed,
                      items: counted("count.item", order.items.length),
                      total: order.total,
                    },
                  );
                  return (
                    <Radio
                      key={id}
                      className="rt-order"
                      name="return-order"
                      selected={rOrder === id}
                      /* Changing order clears the picked items (§8.15). */
                      onSelect={() => set({ rOrder: id, rPicked: [] })}
                      note={line}
                    >
                      {id}
                    </Radio>
                  );
                })}
              </div>
            </div>

            <div>
              <h2 className="rt-label">{t("screensB.returns.whatSending")}</h2>
              <div className="rt-rows">
                {items.map((item) => {
                  const product = dataSource.product(item.prod);
                  return (
                    <Checkbox
                      key={item.name}
                      className="rt-item"
                      checked={rPicked.includes(item.name)}
                      onChange={(next) => togglePicked(item.name, next)}
                      leading={
                        <IconChip
                          tint={product.tint}
                          icon={product.icon}
                          size={38}
                          radius={11}
                          iconSize={19}
                        />
                      }
                    >
                      <span className="rt-item__line">
                        <span className="rt-item__name">{item.name}</span>
                        <span className="rt-item__price">{item.price}</span>
                      </span>
                    </Checkbox>
                  );
                })}
              </div>
            </div>
          </div>
        ) : null}

        {rStep === 2 ? (
          <div className="rt-step">
            <div>
              <label className="rt-label" htmlFor="rt-reason">
                {t("screensB.returns.whyReturning")}
              </label>
              <SelectField
                id="rt-reason"
                value={rReason}
                onChange={(v) => set({ rReason: v })}
                placeholder={t("screensB.returns.chooseReason")}
                options={dataSource.returnReasons()}
              />
            </div>

            <div>
              <div className="rt-labelrow">
                <label className="rt-label rt-label--inline" htmlFor="rt-note">
                  {t("screensB.returns.anythingKnow")}
                </label>
                <span className="rt-optional">
                  {t("screensB.returns.optional")}
                </span>
              </div>
              <TextArea
                id="rt-note"
                value={rNote}
                onChange={(v) => set({ rNote: v })}
                maxLength={500}
                minHeight={100}
                placeholder={t("screensB.returns.notePlaceholder")}
              />
            </div>

            <div>
              <h2 className="rt-label">{t("screensB.returns.howSend")}</h2>
              <div className="rt-rows">
                {methods.map((m) => (
                  <Radio
                    key={m.id}
                    className="rt-method"
                    name="return-method"
                    selected={rMethod === m.id}
                    onSelect={() => set({ rMethod: m.id })}
                    note={m.note}
                    leading={
                      <span className="rt-method__ico">
                        <Icon name={m.icon} size={18} color="var(--fg-muted)" />
                      </span>
                    }
                  >
                    {m.label}
                  </Radio>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {rStep === 3 ? (
          <div className="rt-step rt-step--done">
            <div className="rt-done">
              <span className="rt-done__tile">
                <Icon name="check-circle-2" size={24} color="var(--pos)" />
              </span>
              <h2 className="rt-done__title">
                {t("screensB.returns.doneTitle")}
              </h2>
              <p className="rt-done__body">
                {t("screensB.returns.doneBody", { detail: method.done })}
              </p>
            </div>

            <div className="rt-qr">
              <span className="rt-qr__box">
                <Icon name="qr-code" size={52} color="var(--fg-subtle)" />
              </span>
              <div className="rt-qr__col">
                <Eyebrow>{t("screensB.returns.reference")}</Eyebrow>
                <p className="rt-qr__ref">{rRma}</p>
                <p className="rt-qr__hint">{t("screensB.returns.qrHint")}</p>
              </div>
            </div>

            <div>
              <Eyebrow>{t("screensB.returns.whatNext")}</Eyebrow>
              <ol className="rt-next">
                <li>
                  <span className="rt-next__num">{number(1)}</span>
                  <span>{t("screensB.returns.next1")}</span>
                </li>
                <li>
                  <span className="rt-next__num">{number(2)}</span>
                  <span>{t("screensB.returns.next2")}</span>
                </li>
                <li>
                  <span className="rt-next__num">{number(3)}</span>
                  <span>{t("screensB.returns.next3")}</span>
                </li>
              </ol>
            </div>
          </div>
        ) : null}

        <div className="rt-nav">
          {rStep > 1 ? (
            <ButtonSecondary icon="arrow-left" iconSize={16} onClick={rBack}>
              {t("screensB.returns.back")}
            </ButtonSecondary>
          ) : null}
          <ButtonPrimary icon={nextIcon} iconSize={16} onClick={rNext}>
            {nextLabel}
          </ButtonPrimary>
        </div>
      </Card>
    </main>
  );
}
