/*
 * `warranty` — Warranty registration (port spec §6.15, logic §8.13, data §7.9).
 *
 * Success panel (when `wDone`) OR the registration form, then the registered
 * device list, which renders either way. Validation is toast-only (§9.2) —
 * there are no field-level errors on this screen.
 *
 * Max-width 820.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Icon,
  IconChip,
  ProductPicker,
  ProgressBar,
  SelectField,
  TextInput,
} from "../components";
import { dataSource } from "../data/source";
import { nextRegisteredId, warrantyExpiry } from "../lib/format";
import { useAppStore } from "../state/store";
import type { RegisteredDevice } from "../data/types";
import "../styles/screen-warranty.css";

export default function Warranty() {
  const registered = useAppStore((s) => s.registered);
  const wProd = useAppStore((s) => s.wProd);
  const wSerial = useAppStore((s) => s.wSerial);
  const wDate = useAppStore((s) => s.wDate);
  const wRetailer = useAppStore((s) => s.wRetailer);
  const wDone = useAppStore((s) => s.wDone);
  const clDev = useAppStore((s) => s.clDev);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const showToast = useAppStore((s) => s.showToast);

  /* `gotoClaim(dev)` also resets `clRef` (port spec §8.1). */
  function gotoClaim(deviceId?: string) {
    go("claim", { clRef: null, clDev: deviceId ?? clDev });
  }

  function submitWarranty() {
    if (!wProd) {
      showToast("Pick which device you're registering", "warn");
      return;
    }
    if (wSerial.trim().length < 8) {
      showToast("Enter the full serial number", "warn");
      return;
    }
    if (!wRetailer) {
      showToast("Tell us where you bought it", "warn");
      return;
    }
    const expires = warrantyExpiry();
    const device: RegisteredDevice = {
      id: nextRegisteredId(registered.length),
      prod: wProd,
      serial: wSerial.trim(),
      purchased: "Today",
      expires,
      left: "3y left",
      pct: 100,
    };
    set({
      registered: [device, ...registered],
      wDone: { name: dataSource.product(wProd).model, expires },
    });
    showToast("Warranty registered");
  }

  function wReset() {
    set({
      wDone: null,
      wProd: null,
      wSerial: "",
      wDate: "",
      wRetailer: "",
    });
  }

  return (
    <main className="oh-screen oh-page w-820 scr-warranty">
      <h1 className="scr-warranty__h1">Register your warranty</h1>
      <p className="scr-warranty__lede">
        Registering takes a minute and adds a third year of cover for free.
        You'll also get firmware notes for the devices you own, and nothing
        else.
      </p>

      {wDone ? (
        <Card variant="form" className="wr-done">
          <span className="wr-done__tile">
            <Icon name="shield-check" size={26} color="var(--pos)" />
          </span>
          <h2 className="wr-done__title">{wDone.name} registered</h2>
          <p className="wr-done__body">
            Cover runs to {wDone.expires}. We've emailed the certificate to
            sam@example.com — keep it with your receipt.
          </p>
          <div className="wr-done__actions">
            <ButtonSecondary icon="plus" iconSize={15} onClick={wReset}>
              Register another device
            </ButtonSecondary>
            <ButtonSecondary
              icon="file-check"
              iconSize={15}
              onClick={() => gotoClaim()}
            >
              Make a claim
            </ButtonSecondary>
          </div>
        </Card>
      ) : (
        <Card variant="form" className="wr-form">
          <div className="wr-group">
            <h2 className="wr-group__label">Which device?</h2>
            <ProductPicker
              label="Which device?"
              products={dataSource.products()}
              value={wProd}
              onChange={(id) => set({ wProd: id })}
            />
          </div>

          <div className="wr-grid">
            <div>
              <label className="wr-group__label" htmlFor="w-serial">
                Serial number
              </label>
              <TextInput
                id="w-serial"
                className="wr-serial"
                value={wSerial}
                onChange={(v) => set({ wSerial: v })}
                upper
                placeholder="HHD-0000-0000"
              />
              <p className="wr-help">
                <Icon name="info" size={13} />
                On the back plate, and in the app under About.
              </p>
            </div>
            <div>
              <label className="wr-group__label" htmlFor="w-date">
                Date of purchase
              </label>
              <input
                id="w-date"
                type="date"
                className="sd-input oh-fld"
                value={wDate}
                onChange={(e) => set({ wDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="wr-group__label" htmlFor="w-retailer">
              Where did you buy it?
            </label>
            <SelectField
              id="w-retailer"
              value={wRetailer}
              onChange={(v) => set({ wRetailer: v })}
              placeholder="Select a retailer…"
              options={dataSource.retailers()}
            />
          </div>

          <Callout tone="info" icon="lightbulb">
            Bought it from us? Your order is already covered — registering just
            adds the extra year and the receipt to your account.
          </Callout>

          <ButtonPrimary
            icon="shield-check"
            iconSize={17}
            className="wr-submit"
            onClick={submitWarranty}
          >
            Register warranty
          </ButtonPrimary>
        </Card>
      )}

      <h2 className="wr-list__title">Your registered devices</h2>
      <div className="wr-list">
        {registered.map((device) => {
          const product = dataSource.product(device.prod);
          return (
            <div className="wr-dev oh-card" key={device.id}>
              <IconChip
                tint={product.tint}
                icon={product.icon}
                size={42}
                radius={12}
                iconSize={21}
              />
              <div className="wr-dev__id">
                <p className="wr-dev__model">{product.model}</p>
                <p className="wr-dev__serial">{device.serial}</p>
              </div>
              <div className="wr-dev__cover">
                <div className="wr-dev__coverline">
                  <span>Cover to {device.expires}</span>
                  <span className="wr-dev__left">{device.left}</span>
                </div>
                <ProgressBar
                  label={`Warranty remaining for ${product.model}`}
                  pct={device.pct}
                  height={6}
                />
              </div>
              <ButtonSecondary
                icon="file-check"
                iconSize={14}
                className="wr-dev__claim"
                onClick={() => gotoClaim(device.id)}
              >
                Claim
              </ButtonSecondary>
            </div>
          );
        })}
      </div>
    </main>
  );
}
