/*
 * `auto` — Automations builder (delta spec A §2, logic C §3.4 `autoVals`).
 * Max-width 900.
 *
 * The live list is `state.automations`; `auGone` hides deleted rules so Undo
 * can put them back, and `auOff` pauses them. A rule seeded paused (`r4`) can
 * be started again here — the store keeps the pause list and the rule's own
 * `on` flag in step.
 *
 * The two selects bind to the option `value`, not its label: the store looks
 * up `AU_TRIGGERS` / `AU_ACTIONS` by value when it builds the rule.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  EmptyState,
  Icon,
  IconButton,
  TextInput,
  Toggle,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import {
  automationIntro,
  automationLast,
  isAutomationOn,
  runningCount,
  visibleAutomations,
} from "../lib/automations";
import { useAppStore } from "../state/store";
import "../styles/screen-auto.css";

export default function Auto() {
  const t = useT();
  const automations = useAppStore((s) => s.automations);
  const auOff = useAppStore((s) => s.auOff);
  const auGone = useAppStore((s) => s.auGone);
  const auNewOpen = useAppStore((s) => s.auNewOpen);
  const auName = useAppStore((s) => s.auName);
  const auTrigger = useAppStore((s) => s.auTrigger);
  const auAction = useAppStore((s) => s.auAction);
  const set = useAppStore((s) => s.set);
  const toggleAutomation = useAppStore((s) => s.toggleAutomation);
  const deleteAutomation = useAppStore((s) => s.deleteAutomation);
  const toggleNewAutomation = useAppStore((s) => s.toggleNewAutomation);
  const saveAutomation = useAppStore((s) => s.saveAutomation);

  const rules = visibleAutomations(automations, auGone);
  const running = runningCount(rules, auOff);
  const triggers = dataSource.automationTriggers();
  const actions = dataSource.automationActions();

  return (
    <main className={`fx-screen fx-page ${columnClass("auto")} au`}>
      <div className="au__head">
        <div className="au__head-text">
          <h1 className="au__h1">{t("screensA.auto.title")}</h1>
          <p className="au__lede">{automationIntro(running, rules.length)}</p>
        </div>
        <ButtonPrimary
          icon={auNewOpen ? "x" : "plus"}
          className="au__new-btn"
          onClick={toggleNewAutomation}
        >
          {auNewOpen ? t("screensA.auto.close") : t("screensA.auto.new")}
        </ButtonPrimary>
      </div>

      {auNewOpen ? (
        <Card variant="lg" accent className="au__panel">
          <h2 className="au__panel-h">{t("screensA.auto.new")}</h2>
          <div className="au__panel-body">
            <div>
              <label className="au__label" htmlFor="au-name">
                {t("screensA.auto.nameLabel")}
              </label>
              <TextInput
                id="au-name"
                value={auName}
                onChange={(v) => set({ auName: v })}
                placeholder={t("screensA.auto.namePlaceholder")}
              />
            </div>

            <div className="au__selects">
              <div>
                <label className="au__label" htmlFor="au-trigger">
                  <span className="au__badge au__badge--when">
                    {t("screensA.auto.when")}
                  </span>
                  {t("screensA.auto.whenLabel")}
                </label>
                <select
                  id="au-trigger"
                  className="sd-select fx-fld"
                  value={auTrigger}
                  onChange={(e) => set({ auTrigger: e.target.value })}
                >
                  <option value="">{t("screensA.auto.chooseTrigger")}</option>
                  {triggers.map((trigger) => (
                    <option key={trigger.value} value={trigger.value}>
                      {trigger.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="au__label" htmlFor="au-action">
                  <span className="au__badge au__badge--then">
                    {t("screensA.auto.then")}
                  </span>
                  {t("screensA.auto.thenLabel")}
                </label>
                <select
                  id="au-action"
                  className="sd-select fx-fld"
                  value={auAction}
                  onChange={(e) => set({ auAction: e.target.value })}
                >
                  <option value="">{t("screensA.auto.chooseAction")}</option>
                  {actions.map((a) => (
                    <option key={a.value} value={a.value}>
                      {a.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="au__panel-acts">
              <ButtonPrimary icon="check" onClick={saveAutomation}>
                {t("screensA.auto.create")}
              </ButtonPrimary>
              <ButtonSecondary onClick={toggleNewAutomation}>
                {t("screensA.auto.cancel")}
              </ButtonSecondary>
            </div>
          </div>
        </Card>
      ) : null}

      {rules.length ? (
        <div className="au__rules">
          {rules.map((r) => {
            const on = isAutomationOn(r, auOff);
            return (
              <div
                className={`sd-card fx-card au-rule${on ? "" : " au-rule--off"}`}
                key={r.id}
              >
                <div className="au-rule__head">
                  <div className="au-rule__title-col">
                    <div className="au-rule__title-row">
                      <span className="au-rule__name">{r.name}</span>
                      {r.fresh ? (
                        <span className="au-rule__badge">
                          {t("screensA.auto.badgeNew")}
                        </span>
                      ) : null}
                    </div>
                    <span className="au-rule__last">
                      {automationLast(r, on)}
                    </span>
                  </div>
                  <Toggle
                    on={on}
                    label={t("screensA.auto.toggleLabel")}
                    onChange={() => toggleAutomation(r.id)}
                  />
                  <IconButton
                    icon="trash-2"
                    label={t("screensA.auto.deleteLabel")}
                    small
                    onClick={() => deleteAutomation(r.id)}
                    style={{ color: "var(--danger)" }}
                  />
                </div>

                <div className="au-rule__body">
                  <div className="au-rule__step">
                    <span className="au-rule__tag au-rule__tag--when">
                      {t("screensA.auto.when")}
                    </span>
                    <Icon name={r.whenIcon} size={16} />
                    <span className="au-rule__text">{r.when}</span>
                  </div>
                  {r.then.map((step) => (
                    <div className="au-rule__step" key={step.text}>
                      <span className="au-rule__tag au-rule__tag--then">
                        {t("screensA.auto.then")}
                      </span>
                      <Icon name={step.icon} size={16} />
                      <span className="au-rule__text">{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="workflow"
          title={t("screensA.auto.emptyTitle")}
          body={t("screensA.auto.emptyBody")}
          action={{
            label: t("screensA.auto.emptyAction"),
            icon: "plus",
            onClick: toggleNewAutomation,
          }}
        />
      )}

      <Callout tone="pos" icon="cpu" className="au__note">
        {t("screensA.auto.note")}
      </Callout>
    </main>
  );
}
