/*
 * `installers` — Installer finder (port spec §6.19, logic §8.40).
 * The radius select filters the seeded installers by miles; searching only
 * validates the postcode and toasts.
 */

import { useMemo } from "react";
import {
  Avatar,
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Field,
  Icon,
  TextInput,
} from "../components";
import { dataSource } from "../data/source";
import { useI18n } from "../i18n";
import { counted, distanceMiles } from "../lib/format";
import { useAppStore } from "../state/store";
import type { Installer } from "../data/types";
import "../styles/screen-installers.css";

/** The three radii the comp offers, in miles. */
const RADII = [5, 10, 25];

export default function Installers() {
  const { t, number } = useI18n();
  const inPostcode = useAppStore((s) => s.inPostcode);
  const inRadius = useAppStore((s) => s.inRadius);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const showToast = useAppStore((s) => s.showToast);

  const all = useMemo(() => dataSource.installers(), []);
  const radius = parseInt(inRadius, 10);
  const list = useMemo(
    () => all.filter((i) => distanceMiles(i.distance) <= radius),
    [all, radius],
  );

  const inCount = t(
    "screensA.installers.count",
    { installers: counted("count.installer", list.length) },
    radius,
  );

  function findInstallers() {
    if (inPostcode.trim().length < 3) {
      showToast(t("screensA.installers.toastPostcode"), "warn");
      return;
    }
    showToast(
      t(
        "screensA.installers.toastFound",
        { postcode: inPostcode },
        list.length,
      ),
    );
  }

  function onCall() {
    showToast(t("screensA.installers.toastCall"), "info");
  }

  function onBook(i: Installer) {
    showToast(t("screensA.installers.toastRequest", { name: i.name }));
    go("repair");
  }

  return (
    <main className="fx-screen fx-page w-900 in">
      <h1 className="in__h1">{t("screensA.installers.h1")}</h1>
      <p className="in__lede">{t("screensA.installers.lede")}</p>

      <Card className="in__search">
        <Field
          className="in__field"
          label={t("screensA.installers.postcode")}
          htmlFor="in-postcode"
        >
          <TextInput
            id="in-postcode"
            className="in__postcode sd-mono"
            value={inPostcode}
            upper
            placeholder="BS1 4TR"
            onChange={(v) => set({ inPostcode: v })}
          />
        </Field>
        <Field
          className="in__field in__field--sm"
          label={t("screensA.installers.within")}
          htmlFor="in-radius"
        >
          <select
            id="in-radius"
            className="sd-select fx-fld"
            value={inRadius}
            onChange={(e) => set({ inRadius: e.target.value })}
          >
            {RADII.map((miles) => (
              <option key={miles} value={String(miles)}>
                {t("screensA.installers.radius", undefined, miles)}
              </option>
            ))}
          </select>
        </Field>
        <ButtonPrimary
          className="in__go"
          icon="search"
          onClick={findInstallers}
        >
          {t("screensA.installers.find")}
        </ButtonPrimary>
      </Card>

      <div className="in__map" aria-hidden="true">
        <Icon name="map" size={58} className="in__map-ico" />
        <span className="in__map-name sd-mono">map-installers-bs1.png</span>
      </div>

      <div className="in__meta">
        <span className="in__count">{inCount}</span>
        <span className="in__sorted sd-mono">
          {t("screensA.installers.sorted")}
        </span>
      </div>

      <div className="in__list">
        {list.map((i) => (
          <Card key={i.name} className="in__card fx-card">
            <Avatar initials={i.initials} tint={i.tint} size={50} fontSize={16} />
            <div className="in__body">
              <div className="in__namerow">
                <span className="in__name">{i.name}</span>
                {i.verified ? (
                  <span className="in__approved">
                    <Icon name="badge-check" size={13} />
                    {t("screensA.installers.approved")}
                  </span>
                ) : null}
              </div>
              <div className="in__metarow">
                <span className="in__stat">
                  <Icon name="star" size={14} color="var(--warn)" />
                  <span className="sd-mono">
                    {number(i.rating, {
                      minimumFractionDigits: 1,
                      maximumFractionDigits: 1,
                    })}
                  </span>
                  <span>({number(i.reviews)})</span>
                </span>
                <span className="in__stat">
                  <Icon name="map-pin" size={14} />
                  {i.area} · {i.distance}
                </span>
              </div>
              <div className="in__skills">
                {i.skills.map((s) => (
                  <span key={s.label} className="in__skill">
                    <Icon name={s.icon} size={13} />
                    {s.label}
                  </span>
                ))}
              </div>
              <p className="in__next">
                <Icon name="calendar-check" size={14} />
                {i.next}
              </p>
            </div>
            <div className="in__actions">
              <ButtonSecondary className="in__call" icon="phone" onClick={onCall}>
                {t("screensA.installers.call")}
              </ButtonSecondary>
              <ButtonPrimary
                className="in__request"
                icon="calendar-plus"
                size="md"
                onClick={() => onBook(i)}
              >
                {t("screensA.installers.request")}
              </ButtonPrimary>
            </div>
          </Card>
        ))}
      </div>

      <Callout tone="info" icon="shield-check" className="in__note">
        {t("screensA.installers.note")}
      </Callout>
    </main>
  );
}
