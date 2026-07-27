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
import { claimRef } from "../lib/format";
import { useAppStore } from "../state/store";
import "../styles/screen-claim.css";

export default function Claim() {
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
      showToast("That's all the demo files", "warn");
      return;
    }
    set({ clPhotos: [...clPhotos, next] });
  }

  function submitClaim() {
    if (clFault.trim().length < 20) {
      showToast("Tell us a little more about the fault", "warn");
      return;
    }
    set({ clRef: claimRef(registered.length) });
    showToast("Claim submitted");
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
            <h1 className="cl-done__title">Claim received</h1>
            <p className="cl-done__body">
              We'll assess it within two working days. Keep the device to hand —
              we may ask for a photo of the serial plate.
            </p>
            <div className="cl-done__chips">
              <span className="cl-chip">{clRef}</span>
              <span className="cl-chip">{outcome.label} requested</span>
            </div>
          </div>

          <div className="cl-done__timeline">
            <VerticalTimeline
              entries={[
                {
                  label: "Claim received",
                  note: "We have your description and photos.",
                  st: "done",
                },
                {
                  label: "Assessment",
                  note: "An engineer reviews it within two working days.",
                  st: "current",
                },
                {
                  label: `${outcome.label} arranged`,
                  note: "We'll confirm by email and book anything needed.",
                  st: "todo",
                },
              ]}
            />
          </div>

          <div className="cl-done__actions">
            <ButtonPrimary icon="wrench" iconSize={16} onClick={gotoRepair}>
              Book a repair slot
            </ButtonPrimary>
            <ButtonSecondary icon="rotate-ccw" iconSize={16} onClick={clReset}>
              Start another claim
            </ButtonSecondary>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="fx-screen fx-page w-820 scr-claim">
      <h1 className="scr-claim__h1">Make a warranty claim</h1>
      <p className="scr-claim__lede">
        Two-year cover as standard, three if you registered. Faults from normal
        use are covered; accidental damage and water ingress aren't.
      </p>

      <Card variant="form" className="cl-form">
        <div>
          <h2 className="cl-label">Which device is faulty?</h2>
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
                  note={`${device.serial} · cover to ${device.expires}`}
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
            What's gone wrong?
          </label>
          <TextArea
            id="cl-fault"
            value={clFault}
            onChange={(v) => set({ clFault: v })}
            maxLength={1000}
            minHeight={130}
            placeholder="Describe the fault, when it started, and anything you've already tried."
          />
        </div>

        <div>
          <h2 className="cl-label">Preferred outcome</h2>
          <div className="cl-outcomes" role="radiogroup" aria-label="Preferred outcome">
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
          <h2 className="cl-label">Photos of the fault</h2>
          <div className="cl-photos">
            {clPhotos.map((photo) => (
              <span className="cl-photo" key={photo}>
                <Icon name="image" size={13} />
                {photo}
              </span>
            ))}
            <button type="button" className="cl-addphoto fx-gi" onClick={addPhoto}>
              <Icon name="paperclip" size={14} />
              Add photo
            </button>
          </div>
        </div>

        <ButtonPrimary
          icon="send"
          iconSize={17}
          className="cl-submit"
          onClick={submitClaim}
        >
          Submit claim
        </ButtonPrimary>
      </Card>
    </main>
  );
}
