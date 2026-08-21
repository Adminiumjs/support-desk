/*
 * `orders` — Order status (port spec §6.12, logic §8.8, data §7.7).
 *
 * Lookup card → validation ladder (§9.2, inline `ordErr`, never a toast) →
 * result card with the four stacked blocks (summary / timeline / carrier +
 * address / line items) → two follow-up buttons.
 *
 * Max-width 820. No pagination (ruling R3): the demo chips are the whole
 * order book.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Eyebrow,
  Icon,
  IconChip,
  SoftPill,
  TextInput,
  VerticalTimeline,
} from "../components";
import { CODE_PREFIX } from "../data/demo";
import { dataSource } from "../data/source";
import { useI18n, type MessageKey, type TFunction } from "../i18n";
import { counted, dayPart, normaliseOrderCode } from "../lib/format";
import { useAppStore } from "../state/store";
import type { Order, OrderStatus } from "../data/types";
import "../styles/screen-orders.css";

/* ------------------------------------------------------- status vocabulary */

interface OrderStatusMeta {
  /** A message key — this table is module scope, so it is resolved on render. */
  label: MessageKey;
  fg: string;
  soft: string;
  icon: string;
}

/** `ORDER_STATUS` (port spec §4.2). */
const ORDER_STATUS: Record<OrderStatus, OrderStatusMeta> = {
  transit: {
    label: "screensB.orders.statusTransit",
    fg: "--info",
    soft: "--info-soft",
    icon: "truck",
  },
  delivered: {
    label: "screensB.orders.statusDelivered",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "package-check",
  },
  packing: {
    label: "screensB.orders.statusPacking",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "package",
  },
};

/** `ordHeadline` (§8.8). */
function headline(order: Order, t: TFunction): string {
  if (order.status === "delivered") {
    const last = order.steps[order.steps.length - 1];
    return t("screensB.orders.headlineDelivered", { day: dayPart(last.when) });
  }
  if (order.status === "packing") return t("screensB.orders.headlinePacking");
  return t("screensB.orders.headlineTransit");
}

/* -------------------------------------------------------------- the screen */

export default function Orders() {
  const { t, number } = useI18n();
  const ordNum = useAppStore((s) => s.ordNum);
  const ordEmail = useAppStore((s) => s.ordEmail);
  const ordFound = useAppStore((s) => s.ordFound);
  const ordErr = useAppStore((s) => s.ordErr);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const openTicket = useAppStore((s) => s.openTicket);
  const openChat = useAppStore((s) => s.openChat);

  const orders = dataSource.orders();
  const order = ordFound ? dataSource.order(ordFound) : undefined;

  /* The validation ladder — first failure wins, each clears `ordFound`. */
  function findOrder() {
    const id = normaliseOrderCode(ordNum);
    if (!id) {
      set({
        ordErr: t("screensB.orders.errNoNumber"),
        ordFound: null,
      });
      return;
    }
    const match = dataSource.order(id);
    if (!match) {
      set({
        ordErr: t("screensB.orders.errNotFound", { id, prefix: CODE_PREFIX }),
        ordFound: null,
      });
      return;
    }
    if (!ordEmail.trim()) {
      set({
        ordErr: t("screensB.orders.errNoEmail"),
        ordFound: null,
      });
      return;
    }
    if (ordEmail.trim().toLowerCase() !== match.email.trim().toLowerCase()) {
      set({
        ordErr: t("screensB.orders.errEmailMismatch"),
        ordFound: null,
      });
      return;
    }
    set({ ordErr: "", ordFound: id });
    showToast(t("screensB.orders.found", { id }));
  }

  /* Demo chips fill both fields and clear the result — they do not search. */
  function fillDemo(demo: Order) {
    set({
      ordNum: demo.id,
      ordEmail: demo.email,
      ordErr: "",
      ordFound: null,
    });
  }

  /* No clipboard API call in the comp — the toast is the whole behaviour. */
  function copyTracking() {
    showToast(t("screensB.orders.trackingCopied"));
  }

  const meta = order ? ORDER_STATUS[order.status] : null;

  return (
    <main className="fx-screen fx-page w-820 scr-orders">
      <h1 className="scr-orders__h1">{t("screensB.orders.h1")}</h1>
      <p className="scr-orders__lede">{t("screensB.orders.lede")}</p>

      <Card variant="lg" className="ord-lookup">
        <div className="ord-lookup__grid">
          <div>
            <label className="ord-lookup__label" htmlFor="ord-num">
              {t("screensB.orders.numberLabel")}
            </label>
            <TextInput
              id="ord-num"
              className="ord-lookup__code"
              value={ordNum}
              onChange={(v) => set({ ordNum: v })}
              placeholder={`${CODE_PREFIX}00000`}
            />
          </div>
          <div>
            <label className="ord-lookup__label" htmlFor="ord-email">
              {t("screensB.orders.emailLabel")}
            </label>
            <TextInput
              id="ord-email"
              type="email"
              value={ordEmail}
              onChange={(v) => set({ ordEmail: v })}
              placeholder="you@example.com"
            />
          </div>
        </div>

        <div className="ord-lookup__actions">
          <ButtonPrimary icon="package-search" iconSize={17} onClick={findOrder}>
            {t("screensB.orders.find")}
          </ButtonPrimary>
          <span className="ord-lookup__caption">
            {t("screensB.orders.demoOrders")}
          </span>
          {orders.map((demo) => (
            <button
              key={demo.id}
              type="button"
              className="ord-lookup__demo fx-gi"
              onClick={() => fillDemo(demo)}
            >
              {demo.id}
            </button>
          ))}
        </div>

        {ordErr ? (
          <div className="ord-err" role="alert">
            <Icon name="alert-circle" size={18} color="var(--danger)" />
            <span>{ordErr}</span>
          </div>
        ) : null}
      </Card>

      {order && meta ? (
        <>
          <div className="ord-result">
            <div className="ord-block ord-summary">
              <div className="ord-summary__col">
                <span className="ord-summary__id">{order.id}</span>
                <span className="ord-summary__headline">
                  {headline(order, t)}
                </span>
                <span className="ord-summary__meta">
                  {t("screensB.orders.placedLine", {
                    placed: order.placed,
                    items: counted("count.item", order.items.length),
                  })}
                </span>
              </div>
              <SoftPill
                fg={meta.fg}
                soft={meta.soft}
                icon={meta.icon}
                iconSize={14}
                soften={false}
              >
                {t(meta.label)}
              </SoftPill>
            </div>

            <div className="ord-block">
              <VerticalTimeline
                entries={order.steps.map((s) => ({
                  label: s.label,
                  st: s.st,
                  when: s.when,
                }))}
              />
            </div>

            <div className="ord-block ord-carrier">
              <div>
                <Eyebrow>{t("screensB.orders.carrier")}</Eyebrow>
                <p className="ord-carrier__name">{order.carrier}</p>
                <button
                  type="button"
                  className="ord-carrier__copy fx-gi"
                  onClick={copyTracking}
                  title={t("screensB.orders.copyTracking")}
                >
                  {order.tracking}
                  <Icon name="copy" size={13} />
                </button>
              </div>
              <div>
                <Eyebrow>{t("screensB.orders.deliveringTo")}</Eyebrow>
                {order.addr.map((line) => (
                  <p className="ord-carrier__addr" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="ord-block ord-items">
              <Eyebrow>{t("screensB.orders.inThisOrder")}</Eyebrow>
              {order.items.map((item) => {
                const product = dataSource.product(item.prod);
                /* `qty` is authored as a string in the dataset; format it as a
                 * number when it is one, so Arabic gets its own digits. */
                const parsed = Number(item.qty);
                const qty = Number.isFinite(parsed) ? number(parsed) : item.qty;
                return (
                  <div className="ord-item" key={`${item.prod}-${item.name}`}>
                    <IconChip
                      tint={product.tint}
                      icon={product.icon}
                      size={42}
                      radius={12}
                      iconSize={21}
                    />
                    <span className="ord-item__name">{item.name}</span>
                    <span className="ord-item__qty">
                      {t("screensB.orders.qty", { n: qty })}
                    </span>
                    <span className="ord-item__price">{item.price}</span>
                  </div>
                );
              })}
              <div className="ord-total">
                <span className="ord-total__label">
                  {t("screensB.orders.total")}
                </span>
                <span className="ord-total__value">{order.total}</span>
              </div>
            </div>
          </div>

          <div className="ord-followup">
            <ButtonSecondary icon="pen-line" iconSize={16} onClick={openTicket}>
              {t("screensB.orders.somethingWrong")}
            </ButtonSecondary>
            <ButtonSecondary
              icon="message-circle"
              iconSize={16}
              onClick={openChat}
            >
              {t("screensB.orders.askDelivery")}
            </ButtonSecondary>
          </div>
        </>
      ) : null}
    </main>
  );
}
