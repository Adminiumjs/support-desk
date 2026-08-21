/*
 * `claim` — Warranty claim (port spec §6.16, logic §8.14, data §7.9).
 *
 * Two states: the confirmation card once `clRef` is set, otherwise the form.
 * Validation is toast-only (§9.2). The reference is deterministic —
 * `claimRef(registered.length)`, so the two seeded devices give WC-48224.
 *
 * Max-width 820.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Icon,
  IconChip,
  Radio,
  TextArea,
  VerticalTimeline,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { claimRef } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-claim.css";

export default function Claim() {
  const t = useT();
  const registered = useAppStore((s) => s.registered);
  const clDev = useAppStore((s) => s.clDev);
  const clFault = useAppStore((s) => s.clFault);
  const clOutcome = useAppStore((s) => s.clOutcome);
  const clPhotos = useAppStore((s) => s.clPhotos);
  const clRef = useAppStore((s) => s.clRef);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const showToast = useAppStore((s) => s.showToast);

  const outcomes = dataSource.claimOutcomes();
  const outcome = outcomes.find((o) => o.id === clOutcome) ?? outcomes[0];

  function addPhoto() {
    const next = dataSource.claimPhotoPool().find((f) => !clPhotos.includes(f));
    if (!next) {
      showToast(t("screensA.claim.toastFiles"), "warn");
      return;
    }
    set({ clPhotos: [...clPhotos, next] });
  }

  function submitClaim() {
    if (clFault.trim().length < 20) {
      showToast(t("screensA.claim.toastFault"), "warn");
      return;
    }
    set({ clRef: claimRef(registered.length) });
    showToast(t("screensA.claim.toastSubmitted"));
  }

  function clReset() {
    set({ clRef: null, clFault: "" });
  }

  /* `gotoRepair()` also resets `rpRef` (port spec §8.1). */
  function gotoRepair() {
    go("repair", { rpRef: null });
  }

  if (clRef) {
    return (
      <main className="fx-screen fx-page w-820 scr-claim">
        <div className="cl-done">
          <div className="cl-done__head">
            <span className="cl-done__tile">
              <Icon name="file-check" size={26} color="var(--pos)" />
            </span>
            <h1 className="cl-done__title">{t("screensA.claim.doneTitle")}</h1>
            <p className="cl-done__body">{t("screensA.claim.doneBody")}</p>
            <div className="cl-done__chips">
              <span className="cl-chip">{clRef}</span>
              <span className="cl-chip">
                {t("screensA.claim.outcomeChip", { outcome: outcome.label })}
              </span>
            </div>
          </div>

          <div className="cl-done__timeline">
            <VerticalTimeline
              entries={[
                {
                  label: t("screensA.claim.doneTitle"),
                  note: t("screensA.claim.tl1Note"),
                  st: "done",
                },
                {
                  label: t("screensA.claim.tl2Label"),
                  note: t("screensA.claim.tl2Note"),
                  st: "current",
                },
                {
                  label: t("screensA.claim.tl3Label", {
                    outcome: outcome.label,
                  }),
                  note: t("screensA.claim.tl3Note"),
                  st: "todo",
                },
              ]}
            />
          </div>

          <div className="cl-done__actions">
            <ButtonPrimary icon="wrench" iconSize={16} onClick={gotoRepair}>
              {t("screensA.claim.bookRepair")}
            </ButtonPrimary>
            <ButtonSecondary icon="rotate-ccw" iconSize={16} onClick={clReset}>
              {t("screensA.claim.another")}
            </ButtonSecondary>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fx-screen fx-page w-820 scr-claim">
      <h1 className="scr-claim__h1">{t("screensA.claim.h1")}</h1>
      <p className="scr-claim__lede">{t("screensA.claim.lede")}</p>

      <Card variant="form" className="cl-form">
        <div>
          <h2 className="cl-label">{t("screensA.claim.whichDevice")}</h2>
          <div className="cl-rows">
            {registered.map((device) => {
              const product = dataSource.product(device.prod);
              return (
                <Radio
                  key={device.id}
                  className="cl-dev"
                  name="claim-device"
                  selected={clDev === device.id}
                  onSelect={() => set({ clDev: device.id })}
                  note={t("screensA.claim.deviceNote", {
                    serial: device.serial,
                    expires: device.expires,
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
        </div>

        <div>
          <label className="cl-label" htmlFor="cl-fault">
            {t("screensA.claim.faultLabel")}
          </label>
          <TextArea
            id="cl-fault"
            value={clFault}
            onChange={(v) => set({ clFault: v })}
            maxLength={1000}
            minHeight={130}
            placeholder={t("screensA.claim.faultPlaceholder")}
          />
        </div>

        <div>
          <h2 className="cl-label">{t("screensA.claim.preferredOutcome")}</h2>
          <div
            className="cl-outcomes"
            role="radiogroup"
            aria-label={t("screensA.claim.preferredOutcome")}
          >
            {outcomes.map((o) => {
              const on = clOutcome === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  className={`cl-outcome fx-chip${on ? " cl-outcome--on" : ""}`}
                  onClick={() => set({ clOutcome: o.id })}
                >
                  <Icon name={o.icon} size={19} />
                  <span className="cl-outcome__label">{o.label}</span>
                  <span className="cl-outcome__note">{o.note}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="cl-label">{t("screensA.claim.photos")}</h2>
          <div className="cl-photos">
            {clPhotos.map((photo) => (
              <span className="cl-photo" key={photo}>
                <Icon name="image" size={13} />
                {photo}
              </span>
            ))}
            <button type="button" className="cl-addphoto fx-gi" onClick={addPhoto}>
              <Icon name="paperclip" size={14} />
              {t("screensA.claim.addPhoto")}
            </button>
          </div>
        </div>

        <ButtonPrimary
          icon="send"
          iconSize={17}
          className="cl-submit"
          onClick={submitClaim}
        >
          {t("screensA.claim.submit")}
        </ButtonPrimary>
      </Card>
    </main>
  );
}
