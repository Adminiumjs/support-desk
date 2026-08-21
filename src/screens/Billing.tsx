/*
 * `billing` — Billing & invoices (delta spec A §3, logic C §"billingVals").
 *
 * Two summary cards (plan + payment method), then the invoice history: a
 * period segmented control, kind-filter chips scoped to that period, and the
 * six-column `<InvoiceHead>` / `<InvoiceRow>` table.
 *
 * DOM note: the comp nests the filter-chip row *inside* the right-hand flex
 * cluster of the toolbar (comp 2564–2569), which makes the chips wrap under
 * the segmented control by accident rather than by design. The intended
 * layout is ported here — heading + period switch on the toolbar row, chips
 * as their own sibling row beneath it.
 *
 * Max-width 900.
 */

import {
  ButtonSecondary,
  Callout,
  Card,
  Chip,
  ChipRow,
  EmptyState,
  Eyebrow,
  Icon,
  InvoiceHead,
  InvoiceRow,
  Tabs,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import {
  blIntro,
  billingEmpty,
  filterInvoices,
  invoicesInPeriod,
  nextChargeLine,
  planPriceLine,
} from "../lib/derive";
import { money } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-billing.css";

/** The seeded card's expiry, as printed on the card — a machine token. */
const CARD_EXPIRY = "09/28";

export default function Billing() {
  const t = useT();
  const blFilter = useAppStore((s) => s.blFilter);
  const blPeriod = useAppStore((s) => s.blPeriod);
  const blCredit = useAppStore((s) => s.blCredit);
  const planCurrent = useAppStore((s) => s.planCurrent);
  const planCycle = useAppStore((s) => s.planCycle);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const applyCredit = useAppStore((s) => s.applyCredit);
  const updateCard = useAppStore((s) => s.updateCard);
  const exportInvoices = useAppStore((s) => s.exportInvoices);
  const downloadInvoice = useAppStore((s) => s.downloadInvoice);

  const plans = dataSource.plans();
  const plan = plans.find((p) => p.id === planCurrent) ?? plans[0];

  const inPeriod = invoicesInPeriod(dataSource.invoices(), blPeriod);
  const rows = filterInvoices(inPeriod, blFilter);
  const empty = billingEmpty(inPeriod.length, blFilter);

  const periods = dataSource
    .billingPeriods()
    .map(([id, label]) => ({ id, label }));

  return (
    <main className={`fx-screen fx-page ${columnClass("billing")} bl`}>
      <div className="bl__head">
        <div className="bl__head-text">
          <h1 className="bl__h1">{t("screensA.billing.title")}</h1>
          <p className="bl__lede">{blIntro()}</p>
        </div>
        <ButtonSecondary icon="download" onClick={exportInvoices}>
          {t("screensA.billing.export")}
        </ButtonSecondary>
      </div>

      <div className="bl__cards">
        <Card className="bl-sum bl-sum--plan">
          <Eyebrow>{t("screensA.billing.currentPlan")}</Eyebrow>
          <div className="bl-sum__row">
            <span className="bl-sum__plan">{plan.name}</span>
            <span className="bl-sum__price">
              {planPriceLine(plan.mo, planCycle)}
            </span>
          </div>
          <p className="bl-sum__next">{nextChargeLine(plan.mo, planCycle)}</p>
          <div className="bl-sum__acts">
            <ButtonSecondary
              icon="layers"
              iconSize={14}
              className="bl-sum__btn"
              onClick={() => go("plans")}
            >
              {t("screensA.billing.changePlan")}
            </ButtonSecondary>
            <ButtonSecondary
              icon="ticket"
              iconSize={14}
              tone="var(--fg-muted)"
              className="bl-sum__btn"
              onClick={applyCredit}
            >
              {t("screensA.billing.applyCredit")}
            </ButtonSecondary>
          </div>
        </Card>

        <Card className="bl-sum bl-sum--card">
          <Eyebrow>{t("screensA.billing.paymentMethod")}</Eyebrow>
          <div className="bl-card__row">
            <span className="bl-card__tile">
              <Icon name="credit-card" size={19} />
            </span>
            <span className="bl-card__id">
              <span className="bl-card__num">•••• 4417</span>
              <span className="bl-card__exp">
                {t("screensA.billing.cardMeta", { exp: CARD_EXPIRY })}
              </span>
            </span>
          </div>
          <div className="bl-card__credit">
            <span className="bl-card__credit-label">
              {t("screensA.billing.credit")}
            </span>
            <span
              className="bl-card__credit-value"
              style={blCredit > 0 ? { color: "var(--pos)" } : undefined}
            >
              {money(blCredit)}
            </span>
          </div>
          <ButtonSecondary
            icon="pencil"
            iconSize={14}
            className="bl-card__update"
            onClick={updateCard}
          >
            {t("screensA.billing.updateCard")}
          </ButtonSecondary>
        </Card>
      </div>

      <div className="bl__toolbar">
        <h2 className="bl__h2">{t("screensA.billing.history")}</h2>
        <Tabs
          label={t("screensA.billing.periodLabel")}
          className="bl__periods"
          options={periods}
          value={blPeriod}
          onChange={(id) => set({ blPeriod: id })}
        />
      </div>

      <ChipRow className="bl__filters">
        {dataSource.billingFilters().map(([id, label]) => (
          <Chip
            key={id}
            active={blFilter === id}
            count={filterInvoices(inPeriod, id).length}
            onClick={() => set({ blFilter: id })}
          >
            {label}
          </Chip>
        ))}
      </ChipRow>

      {rows.length ? (
        <div className="bl-table">
          <InvoiceHead />
          {rows.map((invoice, i) => (
            <InvoiceRow
              key={invoice.id}
              invoice={invoice}
              last={i === rows.length - 1}
              onDownload={() => downloadInvoice(invoice)}
            />
          ))}
        </div>
      ) : (
        <EmptyState icon="receipt" title={empty.title} body={empty.text} />
      )}

      <Callout tone="info" icon="info" className="bl__note">
        {t("screensA.billing.note")}
      </Callout>
    </main>
  );
}
