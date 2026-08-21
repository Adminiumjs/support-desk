/*
 * `warranty` — Warranty registration (port spec §6.15, logic §8.13, data §7.9).
 *
 * Success panel (when `wDone`) OR the registration form, then the registered
 * device list, which renders either way. Validation is toast-only (§9.2) —
 * there are no field-level errors on this screen.
 *
 * Delta §6.2: every registered device gained a "Transfer this warranty" button,
 * and the list has an empty state — `transferSubmit()` removes the handed-over
 * device from `state.registered`, so this list really can end up empty.
 *
 * Max-width 820.
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  EmptyState,
  Icon,
  IconButton,
  IconChip,
  ProductPicker,
  ProgressBar,
  SelectField,
  TextInput,
} from "../components";
import { dataSource } from "../data/source";
import { useT } from "../i18n";
import { nextRegisteredId, warrantyExpiry } from "../lib/format";
import { useAppStore } from "../state/store";
import type { RegisteredDevice } from "../data/types";
import "../styles/screen-warranty.css";

export default function Warranty() {
  const t = useT();
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
  const gotoTransfer = useAppStore((s) => s.gotoTransfer);

  /* `gotoClaim(dev)` also resets `clRef` (port spec §8.1). */
  function gotoClaim(deviceId?: string) {
    go("claim", { clRef: null, clDev: deviceId ?? clDev });
  }

  function submitWarranty() {
    if (!wProd) {
      showToast(t("screensB.warranty.needDevice"), "warn");
      return;
    }
    if (wSerial.trim().length < 8) {
      showToast(t("screensB.warranty.needSerial"), "warn");
      return;
    }
    if (!wRetailer) {
      showToast(t("screensB.warranty.needRetailer"), "warn");
      return;
    }
    const expires = warrantyExpiry();
    const device: RegisteredDevice = {
      id: nextRegisteredId(registered.length),
      prod: wProd,
      serial: wSerial.trim(),
      purchased: t("screensB.warranty.purchasedToday"),
      expires,
      left: t("screensB.warranty.coverLeft"),
      pct: 100,
    };
    set({
      registered: [device, ...registered],
      wDone: { name: dataSource.product(wProd).model, expires },
    });
    showToast(t("screensB.warranty.registered"));
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
    <main className="fx-screen fx-page w-820 scr-warranty">
      <h1 className="scr-warranty__h1">{t("screensB.warranty.h1")}</h1>
      <p className="scr-warranty__lede">{t("screensB.warranty.lede")}</p>

      {wDone ? (
        <Card variant="form" className="wr-done">
          <span className="wr-done__tile">
            <Icon name="shield-check" size={26} color="var(--pos)" />
          </span>
          <h2 className="wr-done__title">
            {t("screensB.warranty.doneTitle", { name: wDone.name })}
          </h2>
          <p className="wr-done__body">
            {t("screensB.warranty.doneBody", { date: wDone.expires })}
          </p>
          <div className="wr-done__actions">
            <ButtonSecondary icon="plus" iconSize={15} onClick={wReset}>
              {t("screensB.warranty.registerAnother")}
            </ButtonSecondary>
            <ButtonSecondary
              icon="file-check"
              iconSize={15}
              onClick={() => gotoClaim()}
            >
              {t("screensB.warranty.makeClaim")}
            </ButtonSecondary>
          </div>
        </Card>
      ) : (
        <Card variant="form" className="wr-form">
          <div className="wr-group">
            <h2 className="wr-group__label">
              {t("screensB.warranty.whichDevice")}
            </h2>
            <ProductPicker
              label={t("screensB.warranty.whichDevice")}
              products={dataSource.products()}
              value={wProd}
              onChange={(id) => set({ wProd: id })}
            />
          </div>

          <div className="wr-grid">
            <div>
              <label className="wr-group__label" htmlFor="w-serial">
                {t("screensB.warranty.serialNumber")}
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
                {t("screensB.warranty.serialHelp")}
              </p>
            </div>
            <div>
              <label className="wr-group__label" htmlFor="w-date">
                {t("screensB.warranty.purchaseDate")}
              </label>
              <input
                id="w-date"
                type="date"
                className="sd-input fx-fld"
                value={wDate}
                onChange={(e) => set({ wDate: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="wr-group__label" htmlFor="w-retailer">
              {t("screensB.warranty.whereBought")}
            </label>
            <SelectField
              id="w-retailer"
              value={wRetailer}
              onChange={(v) => set({ wRetailer: v })}
              placeholder={t("screensB.warranty.selectRetailer")}
              options={dataSource.retailers()}
            />
          </div>

          <Callout tone="info" icon="lightbulb">
            {t("screensB.warranty.callout")}
          </Callout>

          <ButtonPrimary
            icon="shield-check"
            iconSize={17}
            className="wr-submit"
            onClick={submitWarranty}
          >
            {t("screensB.warranty.submit")}
          </ButtonPrimary>
        </Card>
      )}

      <h2 className="wr-list__title">{t("screensB.warranty.listTitle")}</h2>
      <div className="wr-list">
        {registered.map((device) => {
          const product = dataSource.product(device.prod);
          return (
            <div className="wr-dev fx-card" key={device.id}>
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
                  <span>
                    {t("screensB.warranty.coverTo", { date: device.expires })}
                  </span>
                  <span className="wr-dev__left">{device.left}</span>
                </div>
                <ProgressBar
                  label={t("screensB.warranty.remainingAria", {
                    model: product.model,
                  })}
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
                {t("screensB.warranty.claim")}
              </ButtonSecondary>
              <IconButton
                icon="repeat"
                label={t("screensB.warranty.transferLabel")}
                iconSize={16}
                className="wr-dev__transfer"
                onClick={gotoTransfer}
              />
            </div>
          );
        })}

        {registered.length === 0 ? (
          <EmptyState
            icon="shield-off"
            title={t("screensB.warranty.emptyTitle")}
            body={t("screensB.warranty.emptyBody")}
            action={{
              label: t("screensB.warranty.registerDevice"),
              icon: "shield-check",
              onClick: wReset,
            }}
          />
        ) : null}
      </div>
    </main>
  );
}
