/*
 * `transfer` — Warranty transfer (delta spec A §4, logic C §"transferVals").
 *
 * Two mutually exclusive branches: the `trDone` receipt, or the form. The
 * device picker reads the same `registered` list the Warranty screen writes
 * to, and a successful transfer removes the device from it — so the picker's
 * own empty state lives *inside* the picker block, above the list, exactly as
 * the comp nests it (2639–2646).
 *
 * Validation is toast-only and lives in the store's `transferSubmit()`.
 *
 * Max-width 820.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Checkbox,
  EmptyState,
  Field,
  Icon,
  IconChip,
  Radio,
  SelectField,
  TextInput,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import { transferDoneLine } from "../lib/derive";
import { useAppStore } from "../state/store";
import "../styles/screen-transfer.css";

/** The numbered "How it works" list (spec A §4.2g). */
const HOW_IT_WORKS = [
  "We email the new owner a link — it's valid for 14 days.",
  "They accept and add the device to their own Hearth account.",
  "Remaining cover carries over with the original purchase date. Nothing to pay, and the extra registered year comes too.",
];

export default function Transfer() {
  const registered = useAppStore((s) => s.registered);
  const trDev = useAppStore((s) => s.trDev);
  const trName = useAppStore((s) => s.trName);
  const trEmail = useAppStore((s) => s.trEmail);
  const trReason = useAppStore((s) => s.trReason);
  const trOn = useAppStore((s) => s.trOn);
  const trDone = useAppStore((s) => s.trDone);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const toggleTransferCheck = useAppStore((s) => s.toggleTransferCheck);
  const transferSubmit = useAppStore((s) => s.transferSubmit);
  const transferReset = useAppStore((s) => s.transferReset);

  if (trDone) {
    return (
      <main className={`fx-screen fx-page ${columnClass("transfer")} tr`}>
        <Card variant="form" className="tr-done">
          <span className="tr-done__tile">
            <Icon name="repeat" size={26} color="var(--pos)" />
          </span>
          <h1 className="tr-done__title">Transfer started</h1>
          <p className="tr-done__body">{transferDoneLine(trDone)}</p>
          <div className="tr-done__chips">
            <span className="tr-done__chip">{trDone.ref}</span>
            <span className="tr-done__chip">{trDone.serial || "—"}</span>
          </div>
          <div className="tr-done__acts">
            <ButtonPrimary
              icon="shield-check"
              iconSize={16}
              onClick={() => go("warranty")}
            >
              Your registered devices
            </ButtonPrimary>
            <ButtonSecondary
              icon="rotate-ccw"
              iconSize={15}
              onClick={transferReset}
            >
              Transfer another
            </ButtonSecondary>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className={`fx-screen fx-page ${columnClass("transfer")} tr`}>
      <h1 className="tr__h1">Transfer a warranty</h1>
      <p className="tr__lede">
        Selling a device or leaving it behind when you move? The remaining cover
        goes with it, at no cost. The new owner just needs to accept by email.
      </p>

      <Card variant="form" className="tr-form">
        <div className="tr-group">
          <h2 className="tr-group__label">Which device are you handing over?</h2>

          {registered.length ? (
            <div
              className="tr-devs"
              role="radiogroup"
              aria-label="Which device are you handing over?"
            >
              {registered.map((device) => {
                const product = dataSource.product(device.prod);
                return (
                  <Radio
                    key={device.id}
                    name="tr-device"
                    className="tr-dev"
                    selected={trDev === device.id}
                    onSelect={() => set({ trDev: device.id })}
                    note={`${device.serial} · ${device.left}`}
                    leading={
                      <IconChip
                        tint={product.tint}
                        icon={product.icon}
                        size={42}
                        radius={12}
                        iconSize={21}
                      />
                    }
                  >
                    {product.model}
                  </Radio>
                );
              })}
            </div>
          ) : (
            <EmptyState
              icon="package-x"
              title="Nothing left to transfer"
              body="Every device on this account has already been transferred or removed. Register a device first and its cover becomes transferable straight away."
              action={{
                label: "Register a device",
                icon: "shield-check",
                onClick: () => go("warranty"),
              }}
            />
          )}
        </div>

        <div className="tr-grid">
          <Field label="New owner's name" htmlFor="tr-name">
            <TextInput
              id="tr-name"
              value={trName}
              onChange={(v) => set({ trName: v })}
              placeholder="Ines Bauer"
            />
          </Field>
          <Field label="Their email" htmlFor="tr-email">
            <TextInput
              id="tr-email"
              type="email"
              value={trEmail}
              onChange={(v) => set({ trEmail: v })}
              placeholder="ines@example.com"
            />
          </Field>
        </div>

        <Field label="Why are you transferring it?" htmlFor="tr-reason">
          <SelectField
            id="tr-reason"
            value={trReason}
            onChange={(v) => set({ trReason: v })}
            placeholder="Choose a reason…"
            options={dataSource.transferReasons()}
          />
        </Field>

        <div className="tr-checks">
          {dataSource.transferChecks().map((check) => (
            <Checkbox
              key={check.id}
              bare
              className="tr-check"
              checked={trOn.includes(check.id)}
              onChange={() => toggleTransferCheck(check.id)}
            >
              {check.label}
            </Checkbox>
          ))}
        </div>

        <Callout tone="warn">
          Transferring removes the device from your household and wipes its clip
          history for good. Factory reset it first if you haven't already — we
          can't recover anything afterwards.
        </Callout>

        <ButtonPrimary
          icon="repeat"
          iconSize={17}
          className="tr-submit"
          onClick={transferSubmit}
        >
          Start transfer
        </ButtonPrimary>
      </Card>

      <h2 className="tr__h2">How it works</h2>
      <ol className="tr-steps">
        {HOW_IT_WORKS.map((text, i) => (
          <li className="tr-steps__row" key={text}>
            <span className="tr-steps__num">{i + 1}</span>
            <span className="tr-steps__text">{text}</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
