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
import { dayPart, normaliseOrderCode } from "../lib/format";
import { useAppStore } from "../state/store";
import type { Order, OrderStatus } from "../data/types";
import "../styles/screen-orders.css";

/* ------------------------------------------------------- status vocabulary */

interface OrderStatusMeta {
  label: string;
  fg: string;
  soft: string;
  icon: string;
}

/** `ORDER_STATUS` (port spec §4.2). */
const ORDER_STATUS: Record<OrderStatus, OrderStatusMeta> = {
  transit: { label: "In transit", fg: "--info", soft: "--info-soft", icon: "truck" },
  delivered: {
    label: "Delivered",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "package-check",
  },
  packing: { label: "Preparing", fg: "--warn", soft: "--warn-soft", icon: "package" },
};

/** `ordHeadline` (§8.8). */
function headline(order: Order): string {
  if (order.status === "delivered") {
    const last = order.steps[order.steps.length - 1];
    return `Delivered ${dayPart(last.when)}`;
  }
  if (order.status === "packing") return "Packing now, ships tomorrow";
  return "Arriving Tue 28 Jul";
}

/* -------------------------------------------------------------- the screen */

export default function Orders() {
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
        ordErr: "Enter the order number from your confirmation email.",
        ordFound: null,
      });
      return;
    }
    const match = dataSource.order(id);
    if (!match) {
      set({
        ordErr: `We couldn't find an order matching ${id}. Check the number on your confirmation email — it starts with ${CODE_PREFIX}.`,
        ordFound: null,
      });
      return;
    }
    if (!ordEmail.trim()) {
      set({
        ordErr:
          "Enter the email address used on the order so we can confirm it's yours.",
        ordFound: null,
      });
      return;
    }
    if (ordEmail.trim().toLowerCase() !== match.email.trim().toLowerCase()) {
      set({
        ordErr:
          "That order exists, but the email doesn't match our records. Try the address on your confirmation email.",
        ordFound: null,
      });
      return;
    }
    set({ ordErr: "", ordFound: id });
    showToast(`Found order ${id}`);
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
    showToast("Tracking number copied");
  }

  const meta = order ? ORDER_STATUS[order.status] : null;

  return (
    <main className="oh-screen oh-page w-820 scr-orders">
      <h1 className="scr-orders__h1">Order status</h1>
      <p className="scr-orders__lede">
        Enter your order number and the email you ordered with. Tracking updates
        land here within an hour of a scan.
      </p>

      <Card variant="lg" className="ord-lookup">
        <div className="ord-lookup__grid">
          <div>
            <label className="ord-lookup__label" htmlFor="ord-num">
              Order number
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
              Email on the order
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
            Find my order
          </ButtonPrimary>
          <span className="ord-lookup__caption">Demo orders:</span>
          {orders.map((demo) => (
            <button
              key={demo.id}
              type="button"
              className="ord-lookup__demo oh-gi"
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
                <span className="ord-summary__headline">{headline(order)}</span>
                <span className="ord-summary__meta">
                  Placed {order.placed} · {order.items.length} items
                </span>
              </div>
              <SoftPill
                fg={meta.fg}
                soft={meta.soft}
                icon={meta.icon}
                iconSize={14}
                soften={false}
              >
                {meta.label}
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
                <Eyebrow>Carrier</Eyebrow>
                <p className="ord-carrier__name">{order.carrier}</p>
                <button
                  type="button"
                  className="ord-carrier__copy oh-gi"
                  onClick={copyTracking}
                  title="Copy tracking number"
                >
                  {order.tracking}
                  <Icon name="copy" size={13} />
                </button>
              </div>
              <div>
                <Eyebrow>Delivering to</Eyebrow>
                {order.addr.map((line) => (
                  <p className="ord-carrier__addr" key={line}>
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <div className="ord-block ord-items">
              <Eyebrow>In this order</Eyebrow>
              {order.items.map((item) => {
                const product = dataSource.product(item.prod);
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
                    <span className="ord-item__qty">Qty {item.qty}</span>
                    <span className="ord-item__price">{item.price}</span>
                  </div>
                );
              })}
              <div className="ord-total">
                <span className="ord-total__label">Total</span>
                <span className="ord-total__value">{order.total}</span>
              </div>
            </div>
          </div>

          <div className="ord-followup">
            <ButtonSecondary icon="pen-line" iconSize={16} onClick={openTicket}>
              Something's wrong with this order
            </ButtonSecondary>
            <ButtonSecondary
              icon="message-circle"
              iconSize={16}
              onClick={openChat}
            >
              Ask about delivery
            </ButtonSecondary>
          </div>
        </>
      ) : null}
    </main>
  );
}
