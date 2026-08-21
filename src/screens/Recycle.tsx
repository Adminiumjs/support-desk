/*
 * `recycle` — Recycling drop-off (delta B §6). Max-width 900.
 *
 * Two mutually exclusive branches: the confirmation card once `rcBooked` is
 * set, otherwise the form. Validation and the reference live in the store
 * (`recycleSubmit`), so the reference is deterministic — `recycleRef()`.
 *
 * The postcode field is unconditional. The comp gated it on a ternary that
 * could only ever be `true`; the behaviour is identical, so it is simply not
 * ported as a gate (delta B §6.3c).
 */

import {
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Icon,
  IconChip,
  Radio,
  StatGrid,
  StatTile,
} from "../components";
import { dataSource } from "../data/source";
import type { RecycleMethodId } from "../data/types";
import { useT, type MessageKey } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-recycle.css";

/* Message keys — module scope has no hook, so they resolve at the render site. */
const POSTCODE_LABEL: Record<RecycleMethodId, MessageKey> = {
  post: "screensB.recycle.postcodePost",
  drop: "screensB.recycle.postcodeDrop",
  collect: "screensB.recycle.postcodeCollect",
};

const SUBMIT: Record<RecycleMethodId, { label: MessageKey; icon: string }> = {
  post: { label: "screensB.recycle.submitPost", icon: "mail" },
  drop: { label: "screensB.recycle.submitDrop", icon: "map-pin" },
  collect: { label: "screensB.recycle.submitCollect", icon: "truck" },
};

export default function Recycle() {
  const t = useT();
  const rcMethod = useAppStore((s) => s.rcMethod);
  const rcOn = useAppStore((s) => s.rcOn);
  const rcPostcode = useAppStore((s) => s.rcPostcode);
  const rcBooked = useAppStore((s) => s.rcBooked);
  const set = useAppStore((s) => s.set);
  const go = useAppStore((s) => s.go);
  const gotoStores = useAppStore((s) => s.gotoStores);
  const toggleRecycleItem = useAppStore((s) => s.toggleRecycleItem);
  const setRecyclePostcode = useAppStore((s) => s.setRecyclePostcode);
  const recycleSubmit = useAppStore((s) => s.recycleSubmit);
  const recycleReset = useAppStore((s) => s.recycleReset);
  const storeDirections = useAppStore((s) => s.storeDirections);

  const methods = dataSource.recycleMethods();
  const stats = dataSource.recycleStats();
  const points = dataSource.recyclePoints();
  const accepted = dataSource.recycleAccepted();
  const rejected = dataSource.recycleRejected();
  const items = dataSource.recycleItems();

  if (rcBooked) {
    return (
      <main className="fx-screen fx-page w-900 scr-recycle">
        <div className="rc-done">
          <span className="rc-done__ico">
            <Icon name="recycle" size={26} color="var(--pos)" />
          </span>
          <h1 className="rc-done__title">{rcBooked.title}</h1>
          <p className="rc-done__text">{rcBooked.text}</p>
          <div className="rc-done__chips">
            <span className="rc-chip">{rcBooked.ref}</span>
            <span className="rc-chip">{rcBooked.method}</span>
          </div>
          <div className="rc-done__actions">
            <ButtonPrimary
              icon="banknote"
              iconSize={16}
              className="rc-done__cta"
              onClick={() => go("tradein")}
            >
              {t("screensB.recycle.checkTradeIn")}
            </ButtonPrimary>
            <ButtonSecondary
              icon="rotate-ccw"
              iconSize={15}
              onClick={recycleReset}
            >
              {t("screensB.recycle.somethingElse")}
            </ButtonSecondary>
          </div>
        </div>
      </main>
    );
  }

  const submit = SUBMIT[rcMethod];

  return (
    <main className="fx-screen fx-page w-900 scr-recycle">
      <h1 className="rc-h1">{t("screensB.recycle.h1")}</h1>
      <p className="rc-lede">{t("screensB.recycle.lede")}</p>

      <StatGrid min={220} className="rc-stats">
        {stats.map((s) => (
          <StatTile
            key={s.label}
            label={s.label}
            value={s.value}
            icon={s.icon}
            note={s.note}
          />
        ))}
      </StatGrid>

      <Card variant="form" className="rc-form">
        <div>
          <p className="rc-label">{t("screensB.recycle.methodLabel")}</p>
          <div className="rc-methods">
            {methods.map((m) => (
              <Radio
                key={m.id}
                name="recycle-method"
                selected={rcMethod === m.id}
                onSelect={() => set({ rcMethod: m.id })}
                note={m.note}
                leading={
                  <span className="rc-method__ico">
                    <Icon name={m.icon} size={18} />
                  </span>
                }
              >
                {m.label}
              </Radio>
            ))}
          </div>
        </div>

        <div>
          <p className="rc-label">{t("screensB.recycle.itemsLabel")}</p>
          <div className="rc-items">
            {items.map((it) => {
              const on = rcOn.includes(it.id);
              return (
                <button
                  key={it.id}
                  type="button"
                  aria-pressed={on}
                  className={`sd-tilesel fx-chip${on ? " sd-tilesel--on" : ""}`}
                  onClick={() => toggleRecycleItem(it.id)}
                >
                  {on ? (
                    <span className="sd-tilesel__check">
                      <Icon name="check" size={13} />
                    </span>
                  ) : null}
                  <IconChip
                    tint={it.tint}
                    icon={it.icon}
                    size={44}
                    radius={13}
                    iconSize={22}
                  />
                  <span className="rc-item__name">{it.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="rc-label" htmlFor="rc-postcode">
            {t(POSTCODE_LABEL[rcMethod])}
          </label>
          <input
            id="rc-postcode"
            className="fx-fld rc-postcode"
            value={rcPostcode}
            placeholder="BS1 4TR"
            onChange={(e) => setRecyclePostcode(e.target.value)}
          />
        </div>

        <ButtonPrimary
          icon={submit.icon}
          iconSize={16}
          className="rc-submit"
          onClick={recycleSubmit}
        >
          {t(submit.label)}
        </ButtonPrimary>
      </Card>

      <h2 className="rc-h2">{t("screensB.recycle.nearest")}</h2>
      <div className="rc-points">
        {points.map((p) => (
          <div className="fx-card rc-point" key={p.name}>
            <span className="rc-point__ico">
              <Icon name="recycle" size={20} />
            </span>
            <div className="rc-point__body">
              <p className="rc-point__name">{p.name}</p>
              <p className="rc-point__address">{p.address}</p>
              <p className="rc-point__hours">{p.hours}</p>
            </div>
            <span className="rc-point__distance">{p.distance}</span>
            <ButtonSecondary
              icon="navigation"
              iconSize={14}
              onClick={() => storeDirections(p.name)}
            >
              {t("screensB.recycle.directions")}
            </ButtonSecondary>
          </div>
        ))}
      </div>
      <ButtonSecondary
        icon="map"
        iconSize={15}
        className="rc-alllocations"
        onClick={gotoStores}
      >
        {t("screensB.recycle.allLocations")}
      </ButtonSecondary>

      <div className="rc-pair">
        <Card className="rc-rules">
          <span className="rc-rules__head">
            <Icon name="check-circle-2" size={17} color="var(--pos)" />
            <span className="rc-rules__title">
              {t("screensB.recycle.weTake")}
            </span>
          </span>
          <ul className="rc-rules__list">
            {accepted.map((r) => (
              <li className="rc-rule" key={r.text}>
                <span className="rc-rule__dot rc-rule__dot--pos" />
                {r.text}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="rc-rules">
          <span className="rc-rules__head">
            <Icon name="x-circle" size={17} color="var(--danger)" />
            <span className="rc-rules__title">
              {t("screensB.recycle.weCantTake")}
            </span>
          </span>
          <ul className="rc-rules__list">
            {rejected.map((r) => (
              <li className="rc-rule" key={r.text}>
                <span className="rc-rule__dot rc-rule__dot--danger" />
                {r.text}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <Callout tone="warn" className="rc-warning">
        {t("screensB.recycle.warning")}
      </Callout>
    </main>
  );
}
