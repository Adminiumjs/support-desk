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
import { distanceMiles, pluralise } from "../lib/format";
import { useAppStore } from "../state/store";
import type { Installer } from "../data/types";
import "../styles/screen-installers.css";

const RADIUS_OPTIONS: { value: string; label: string }[] = [
  { value: "5", label: "5 miles" },
  { value: "10", label: "10 miles" },
  { value: "25", label: "25 miles" },
];

export default function Installers() {
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

  const inCount = `${pluralise(list.length, "installer")} within ${radius} miles`;

  function findInstallers() {
    if (inPostcode.trim().length < 3) {
      showToast("Enter a postcode to search", "warn");
      return;
    }
    showToast(`${list.length} installers near ${inPostcode}`);
  }

  function onCall() {
    showToast("Calling isn't available in this demo", "info");
  }

  function onBook(i: Installer) {
    showToast(`Request sent to ${i.name}`);
    go("repair");
  }

  return (
    <main className="oh-screen oh-page w-900 in">
      <h1 className="in__h1">Find an approved installer</h1>
      <p className="in__lede">
        Every installer here is trained on Hearth hardware, insured, and rated
        only by customers who actually booked. Wiring a doorbell or swapping a
        thermostat usually takes under two hours.
      </p>

      <Card className="in__search">
        <Field className="in__field" label="Postcode" htmlFor="in-postcode">
          <TextInput
            id="in-postcode"
            className="in__postcode sd-mono"
            value={inPostcode}
            upper
            placeholder="BS1 4TR"
            onChange={(v) => set({ inPostcode: v })}
          />
        </Field>
        <Field className="in__field in__field--sm" label="Within" htmlFor="in-radius">
          <select
            id="in-radius"
            className="sd-select oh-fld"
            value={inRadius}
            onChange={(e) => set({ inRadius: e.target.value })}
          >
            {RADIUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <ButtonPrimary
          className="in__go"
          icon="search"
          onClick={findInstallers}
        >
          Find installers
        </ButtonPrimary>
      </Card>

      <div className="in__map" aria-hidden="true">
        <Icon name="map" size={58} className="in__map-ico" />
        <span className="in__map-name sd-mono">map-installers-bs1.png</span>
      </div>

      <div className="in__meta">
        <span className="in__count">{inCount}</span>
        <span className="in__sorted sd-mono">sorted by distance</span>
      </div>

      <div className="in__list">
        {list.map((i) => (
          <Card key={i.name} className="in__card oh-card">
            <Avatar initials={i.initials} tint={i.tint} size={50} fontSize={16} />
            <div className="in__body">
              <div className="in__namerow">
                <span className="in__name">{i.name}</span>
                {i.verified ? (
                  <span className="in__approved">
                    <Icon name="badge-check" size={13} />
                    Approved
                  </span>
                ) : null}
              </div>
              <div className="in__metarow">
                <span className="in__stat">
                  <Icon name="star" size={14} color="var(--warn)" />
                  <span className="sd-mono">{i.rating.toFixed(1)}</span>
                  <span>({i.reviews})</span>
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
                Call
              </ButtonSecondary>
              <ButtonPrimary
                className="in__request"
                icon="calendar-plus"
                size="md"
                onClick={() => onBook(i)}
              >
                Request a visit
              </ButtonPrimary>
            </div>
          </Card>
        ))}
      </div>

      <Callout tone="info" icon="shield-check" className="in__note">
        Installers are independent businesses. Work booked through Hearth is
        covered by our two-year installation guarantee — keep the invoice and
        we&rsquo;ll handle any dispute.
      </Callout>
    </main>
  );
}
