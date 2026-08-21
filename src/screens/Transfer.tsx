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
import { useI18n, type MessageKey } from "../i18n";
import { transferDoneLine } from "../lib/derive";
import { useAppStore } from "../state/store";
import "../styles/screen-transfer.css";

/** The numbered "How it works" list (spec A §4.2g) — message keys. */
const HOW_IT_WORKS: MessageKey[] = [
  "screensB.transfer.how1",
  "screensB.transfer.how2",
  "screensB.transfer.how3",
];

export default function Transfer() {
  const { t, number } = useI18n();
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
          <h1 className="tr-done__title">
            {t("screensB.transfer.doneTitle")}
          </h1>
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
              {t("screensB.transfer.registeredDevices")}
            </ButtonPrimary>
            <ButtonSecondary
              icon="rotate-ccw"
              iconSize={15}
              onClick={transferReset}
            >
              {t("screensB.transfer.transferAnother")}
            </ButtonSecondary>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className={`fx-screen fx-page ${columnClass("transfer")} tr`}>
      <h1 className="tr__h1">{t("screensB.transfer.h1")}</h1>
      <p className="tr__lede">{t("screensB.transfer.lede")}</p>

      <Card variant="form" className="tr-form">
        <div className="tr-group">
          <h2 className="tr-group__label">
            {t("screensB.transfer.whichDevice")}
          </h2>

          {registered.length ? (
            <div
              className="tr-devs"
              role="radiogroup"
              aria-label={t("screensB.transfer.whichDevice")}
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
                    note={t("screensB.transfer.deviceNote", {
                      serial: device.serial,
                      left: device.left,
                    })}
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
              title={t("screensB.transfer.emptyTitle")}
              body={t("screensB.transfer.emptyBody")}
              action={{
                label: t("screensB.transfer.registerDevice"),
                icon: "shield-check",
                onClick: () => go("warranty"),
              }}
            />
          )}
        </div>

        <div className="tr-grid">
          <Field label={t("screensB.transfer.newOwnerName")} htmlFor="tr-name">
            <TextInput
              id="tr-name"
              value={trName}
              onChange={(v) => set({ trName: v })}
              placeholder="Ines Bauer"
            />
          </Field>
          <Field label={t("screensB.transfer.theirEmail")} htmlFor="tr-email">
            <TextInput
              id="tr-email"
              type="email"
              value={trEmail}
              onChange={(v) => set({ trEmail: v })}
              placeholder="ines@example.com"
            />
          </Field>
        </div>

        <Field label={t("screensB.transfer.whyTransfer")} htmlFor="tr-reason">
          <SelectField
            id="tr-reason"
            value={trReason}
            onChange={(v) => set({ trReason: v })}
            placeholder={t("screensB.transfer.chooseReason")}
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

        <Callout tone="warn">{t("screensB.transfer.warning")}</Callout>

        <ButtonPrimary
          icon="repeat"
          iconSize={17}
          className="tr-submit"
          onClick={transferSubmit}
        >
          {t("screensB.transfer.start")}
        </ButtonPrimary>
      </Card>

      <h2 className="tr__h2">{t("screensB.transfer.howItWorks")}</h2>
      <ol className="tr-steps">
        {HOW_IT_WORKS.map((key, i) => (
          <li className="tr-steps__row" key={key}>
            <span className="tr-steps__num">{number(i + 1)}</span>
            <span className="tr-steps__text">{t(key)}</span>
          </li>
        ))}
      </ol>
    </main>
  );
}
