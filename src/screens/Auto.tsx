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
          <h1 className="au__h1">Automations</h1>
          <p className="au__lede">{automationIntro(running, rules.length)}</p>
        </div>
        <ButtonPrimary
          icon={auNewOpen ? "x" : "plus"}
          className="au__new-btn"
          onClick={toggleNewAutomation}
        >
          {auNewOpen ? "Close" : "New automation"}
        </ButtonPrimary>
      </div>

      {auNewOpen ? (
        <Card variant="lg" accent className="au__panel">
          <h2 className="au__panel-h">New automation</h2>
          <div className="au__panel-body">
            <div>
              <label className="au__label" htmlFor="au-name">
                Name it
              </label>
              <TextInput
                id="au-name"
                value={auName}
                onChange={(v) => set({ auName: v })}
                placeholder="e.g. Porch light when someone calls"
              />
            </div>

            <div className="au__selects">
              <div>
                <label className="au__label" htmlFor="au-trigger">
                  <span className="au__badge au__badge--when">WHEN</span>
                  this happens
                </label>
                <select
                  id="au-trigger"
                  className="sd-select fx-fld"
                  value={auTrigger}
                  onChange={(e) => set({ auTrigger: e.target.value })}
                >
                  <option value="">Choose a trigger…</option>
                  {triggers.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="au__label" htmlFor="au-action">
                  <span className="au__badge au__badge--then">THEN</span>
                  do this
                </label>
                <select
                  id="au-action"
                  className="sd-select fx-fld"
                  value={auAction}
                  onChange={(e) => set({ auAction: e.target.value })}
                >
                  <option value="">Choose an action…</option>
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
                Create automation
              </ButtonPrimary>
              <ButtonSecondary onClick={toggleNewAutomation}>
                Cancel
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
                        <span className="au-rule__badge">New</span>
                      ) : null}
                    </div>
                    <span className="au-rule__last">
                      {automationLast(r, on)}
                    </span>
                  </div>
                  <Toggle
                    on={on}
                    label="Enable or pause"
                    onChange={() => toggleAutomation(r.id)}
                  />
                  <IconButton
                    icon="trash-2"
                    label="Delete automation"
                    small
                    onClick={() => deleteAutomation(r.id)}
                    style={{ color: "var(--danger)" }}
                  />
                </div>

                <div className="au-rule__body">
                  <div className="au-rule__step">
                    <span className="au-rule__tag au-rule__tag--when">
                      WHEN
                    </span>
                    <Icon name={r.whenIcon} size={16} />
                    <span className="au-rule__text">{r.when}</span>
                  </div>
                  {r.then.map((step) => (
                    <div className="au-rule__step" key={step.text}>
                      <span className="au-rule__tag au-rule__tag--then">
                        THEN
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
          title="No automations yet"
          body="Automations are one trigger and one action — start with something small, like the porch light coming on when the doorbell sees someone after dark."
          action={{
            label: "Create your first one",
            icon: "plus",
            onClick: toggleNewAutomation,
          }}
        />
      )}

      <Callout tone="pos" icon="cpu" className="au__note">
        Automations run on your devices, not our cloud — they keep working
        during an outage and when your internet drops.
      </Callout>
    </main>
  );
}
