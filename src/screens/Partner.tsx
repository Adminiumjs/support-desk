/*
 * `partner` — Partner portal (port spec §6.36 / §8.32). Max-width 1000.
 *
 * The job queue is `PT_JOBS` minus `ptOut`. Both Accept and Pass push the job
 * into `ptOut`, so the "Jobs this month" KPI (`18 + done`) increments either
 * way — that is the comp's behaviour and it is preserved.
 */

import {
  Avatar,
  ButtonPrimary,
  ButtonSecondary,
  Card,
  EmptyState,
  Eyebrow,
  Icon,
  IconChip,
  SoftPill,
  StatGrid,
  StatTile,
} from "../components";
import { PARTNER } from "../data/demo";
import { dataSource } from "../data/source";
import type { PartnerPay } from "../data/types";
import { useI18n, type MessageKey } from "../i18n";
import { percentText } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-partner.css";

/** `label` is a message key — module scope has no hook (resolved on render). */
const PAY: Record<
  PartnerPay,
  { label: MessageKey; fg: string; soft: string; icon: string }
> = {
  warranty: {
    label: "screensB.partner.payWarranty",
    fg: "--info",
    soft: "--info-soft",
    icon: "shield-check",
  },
  customer: {
    label: "screensB.partner.payCustomer",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "wallet",
  },
};

export default function Partner() {
  const { t, number } = useI18n();
  const ptOut = useAppStore((s) => s.ptOut);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const gotoTrade = useAppStore((s) => s.gotoTrade);

  const all = dataSource.partnerJobs();
  const links = dataSource.partnerLinks();
  const jobs = all.filter((j) => !ptOut.includes(j.id));
  const done = all.length - jobs.length;

  const remove = (id: string) => set({ ptOut: [...ptOut, id] });

  const accept = (id: string) => {
    remove(id);
    showToast(t("screensB.partner.accepted"));
  };

  const decline = (id: string) => {
    remove(id);
    showToast(t("screensB.partner.passed"), "info");
  };

  return (
    <main className="fx-screen fx-page w-1000 fx-wide">
      <div className="pt-head">
        <Avatar
          initials={PARTNER.initials}
          tint="#4f8bd6"
          size={50}
          fontSize={17}
        />
        <div className="sd-grow">
          <div className="pt-head__titlerow">
            <h1 className="pt-head__title">{PARTNER.name}</h1>
            <span className="pt-head__badge">
              <Icon name="badge-check" size={13} />
              {t("screensB.partner.approved")}
            </span>
          </div>
          <p className="pt-head__meta">{PARTNER.meta}</p>
        </div>
        {/* Delta §6.13 — cross-link to the new trade-account signup. */}
        <ButtonSecondary icon="percent" onClick={gotoTrade}>
          {t("screensB.partner.tradeAccount")}
        </ButtonSecondary>
        <ButtonSecondary
          icon="headset"
          onClick={() => showToast(PARTNER.supportLine, "info")}
        >
          {t("screensB.partner.supportLine")}
        </ButtonSecondary>
      </div>

      <StatGrid min={190} className="pt-kpis">
        <StatTile
          compact
          icon="clipboard-check"
          label={t("screensB.partner.kpiJobs")}
          value={number(PARTNER.jobsBase + done)}
        />
        <StatTile
          compact
          icon="star"
          label={t("screensB.partner.kpiRating")}
          value={PARTNER.rating}
          delta={PARTNER.reviewsNote}
        />
        <StatTile
          compact
          icon="banknote"
          label={t("screensB.partner.kpiPayout")}
          value={PARTNER.payout}
          delta={PARTNER.payoutDue}
        />
        <StatTile
          compact
          icon="clock"
          label={t("screensB.partner.kpiResponse")}
          value={PARTNER.response}
          delta={PARTNER.responseNote}
        />
      </StatGrid>

      <div className="pt-body">
        <section className="pt-left">
          <div className="pt-left__head">
            <Eyebrow>{t("screensB.partner.jobRequests")}</Eyebrow>
            <span className="pt-queue">
              {t("screensB.partner.queueLine", {
                waiting: number(jobs.length),
              })}
            </span>
          </div>

          {jobs.length === 0 ? (
            <EmptyState
              compact
              icon="inbox"
              title={t("screensB.partner.queueClear")}
              body={t("screensB.partner.queueClearBody")}
            />
          ) : (
            <div className="pt-jobs">
              {jobs.map((j) => {
                const prod = dataSource.product(j.prod);
                const pay = PAY[j.pay];
                return (
                  <Card key={j.id} className="fx-card pt-job">
                    <div className="pt-job__top">
                      <IconChip
                        tint={prod.tint}
                        icon={prod.icon}
                        size={42}
                        radius={12}
                        iconSize={21}
                      />
                      <div className="sd-grow">
                        <div className="pt-job__titlerow">
                          <span className="pt-job__title">{j.title}</span>
                          <SoftPill
                            fg={pay.fg}
                            soft={pay.soft}
                            icon={pay.icon}
                          >
                            {t(pay.label)}
                          </SoftPill>
                        </div>
                        <p className="pt-job__detail">{j.detail}</p>
                        <p className="pt-job__meta">{j.meta}</p>
                      </div>
                      <span className="pt-job__fee">{j.fee}</span>
                    </div>

                    <div className="pt-job__acts">
                      <ButtonPrimary
                        size="md"
                        icon="check"
                        onClick={() => accept(j.id)}
                      >
                        {t("screensB.partner.acceptJob")}
                      </ButtonPrimary>
                      <ButtonSecondary icon="x" onClick={() => decline(j.id)}>
                        {t("screensB.partner.pass")}
                      </ButtonSecondary>
                      <ButtonSecondary
                        icon="message-square"
                        className="pt-job__msg"
                        onClick={() =>
                          showToast(
                            t("screensB.partner.messagingToast"),
                            "info",
                          )
                        }
                      >
                        {t("screensB.partner.messageCustomer")}
                      </ButtonSecondary>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        <aside className="pt-aside">
          <Card className="pt-card">
            <Eyebrow>{t("screensB.partner.certification")}</Eyebrow>
            <div className="pt-cert__row">
              <span className="pt-cert__name">Hearth Pro 2026</span>
              <span className="pt-cert__pct">
                {percentText(PARTNER.training)}
              </span>
            </div>
            <div className="meter pt-cert__track">
              <span
                className="meter__fill"
                style={{ inlineSize: `${PARTNER.training}%` }}
              />
            </div>
            <p className="pt-card__body">{t("screensB.partner.certBody")}</p>
            <ButtonSecondary
              icon="graduation-cap"
              className="pt-cert__cta"
              onClick={() =>
                showToast(t("screensB.partner.trainingToast"), "info")
              }
            >
              {t("screensB.partner.continueTraining")}
            </ButtonSecondary>
          </Card>

          <Card className="pt-card">
            <Eyebrow>{t("screensB.partner.resources")}</Eyebrow>
            <div className="pt-links">
              {links.map(([label, icon]) => (
                <button
                  key={label}
                  type="button"
                  className="fx-nav pt-link"
                  onClick={() =>
                    showToast(t("screensB.partner.resourcesToast"), "info")
                  }
                >
                  <Icon name={icon} size={15} />
                  {label}
                </button>
              ))}
            </div>
          </Card>

          <div className="pt-payout">
            <p className="pt-payout__head">
              <Icon name="banknote" size={16} />
              {t("screensB.partner.nextPayout")}
            </p>
            <p className="pt-card__body">{PARTNER.payoutBlurb}</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
