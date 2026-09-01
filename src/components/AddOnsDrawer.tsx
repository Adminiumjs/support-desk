/*
 * The business's own add-on drawer: what is connected, what each one is
 * allowed to do, what disconnecting costs, and each one's own settings form.
 *
 * ── WHY THIS SURFACE HAD TO BE BUILT RATHER THAN FOUND ──────────────────────
 *
 * `settings.add-on.panel` is `surface: 'admin'`, `fill: 'per-add-on'` — one
 * add-on's own form, rendered where the business configures things — and this
 * app had nowhere to mount it: it contains no settings screen of any kind,
 * because the staff half of this product is Adminium's generated dashboard on
 * the other side of the API. An add-on that fills a customer surface still has
 * to be switchable ON somewhere the customer surface can see, and the only
 * thing that can hold that switch in a static single-page portal is the portal.
 * So this drawer is the owner's corner of their own help desk — the one place
 * in this bundle addressed to them rather than to a customer — and it captions
 * its own scope on screen (`addon.host.manage.scope`) so an owner who connects
 * a delivery company and goes hunting for a staff dispatch screen is told
 * where it lives before they connect anything.
 *
 * ── NOTHING IN HERE NAMES A COMPANY ─────────────────────────────────────────
 *
 * Every word specific to an add-on arrives inside the object `register()`
 * returned; this file renders them and does not know what any of them say.
 * That is acceptance criterion 5, and `add-ons/addOns.test.ts` greps for it.
 */

import { AddOnSlot } from "../add-ons/slot.tsx";
import { sampleCatalogue } from "../add-ons/records.ts";
import { isConnectable, type AddOn } from "../add-ons/vendor/host/index.ts";
import { dataSource } from "../data/source.ts";
import { useI18n } from "../i18n";
import type { MessageKey } from "../i18n/messages/index.ts";
import { useAppStore } from "../state/store.ts";
import { Icon } from "./Icon.tsx";

/**
 * THE NOT-AFFILIATED LINE, as its own component (24 AC6): any of this app's
 * own `.tsx` files that prints `addOn.name`, `addOn.shortName` or
 * `addOn.monogram` must also mount an `Affiliation`, and the source half of
 * the label-pairing gate greps for exactly this.
 */
function Affiliation() {
  const { t } = useI18n();
  return (
    <p style={{ margin: 0, fontSize: "11.5px", color: "var(--fg-subtle)", lineHeight: 1.5 }}>
      {t("addon.host.notAffiliated")}
    </p>
  );
}

function DrawerEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: ".05em",
        textTransform: "uppercase",
        color: "var(--fg-subtle)",
        marginBottom: "8px",
      }}
    >
      {children}
    </div>
  );
}

function AddOnCard({ addOn }: { addOn: AddOn }) {
  const { t } = useI18n();
  const enabled = useAppStore((s) => s.enabled);
  const toggleAddOn = useAppStore((s) => s.toggleAddOn);
  const patchAddOnSettings = useAppStore((s) => s.patchAddOnSettings);

  const on = enabled.has(addOn.key);
  /*
   * The key is a machine key that arrived on the add-on object, so the
   * compiler cannot check it against `MessageKey` — that is what registration
   * took over from the type system, and `registerAddOnMessages` throws at boot
   * on a bundle missing one. The cast says "this is a runtime key".
   */
  const line = t(addOn.lineKey as MessageKey);

  return (
    <section
      style={{
        border: "1px solid var(--border)",
        borderRadius: "16px",
        background: "var(--surface)",
        padding: "18px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "13px" }}>
        {/* Three letters on a neutral tile — never a mark, drawn or traced (24 D12). */}
        <span
          aria-hidden="true"
          style={{
            inlineSize: "38px",
            blockSize: "38px",
            borderRadius: "11px",
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--surface-2)",
            border: "1px solid var(--border)",
            fontFamily: "var(--font-mono, ui-monospace, monospace)",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: ".02em",
            color: "var(--fg-muted)",
          }}
        >
          {addOn.monogram}
        </span>
        <div style={{ flex: 1, minInlineSize: 0 }}>
          <div style={{ fontSize: "14.5px", fontWeight: 800, letterSpacing: "-.01em" }}>
            {addOn.name}
          </div>
          <div
            style={{ fontSize: "12.5px", color: "var(--fg-muted)", lineHeight: 1.5, marginTop: "3px" }}
          >
            {line}
          </div>
        </div>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            padding: "5px 10px",
            borderRadius: "20px",
            whiteSpace: "nowrap",
            color: on ? "var(--pos)" : "var(--fg-subtle)",
            background: on ? "var(--pos-soft)" : "var(--surface-2)",
          }}
        >
          {t(on ? "addon.host.manage.connected" : "addon.host.manage.notConnected")}
        </span>
      </div>

      <div>
        <DrawerEyebrow>{t("addon.host.manage.permissions")}</DrawerEyebrow>
        <ul
          style={{
            margin: 0,
            paddingInlineStart: "18px",
            fontSize: "12.5px",
            color: "var(--fg-muted)",
            lineHeight: 1.6,
          }}
        >
          {addOn.permissions.map((permission) => (
            <li key={permission.key}>{t(permission.key as MessageKey)}</li>
          ))}
        </ul>
      </div>

      {/* WHAT A DISCONNECT COSTS, IN WORDS, BEFORE IT HAPPENS (24 D16). Both
          sentences are the ADD-ON's — the only party that knows what it
          leaves behind — and they render whether or not it is connected,
          because the question is asked before pressing Connect. */}
      {addOn.disconnect !== undefined && (
        <div style={{ display: "grid", gap: "10px" }}>
          <div>
            <DrawerEyebrow>{t("addon.host.manage.goes")}</DrawerEyebrow>
            <div style={{ fontSize: "12.5px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
              {t(addOn.disconnect.goesKey as MessageKey)}
            </div>
          </div>
          <div>
            <DrawerEyebrow>{t("addon.host.manage.stays")}</DrawerEyebrow>
            <div style={{ fontSize: "12.5px", color: "var(--fg-muted)", lineHeight: 1.5 }}>
              {t(addOn.disconnect.staysKey as MessageKey)}
            </div>
          </div>
        </div>
      )}

      {/* SLOT — this add-on's own settings form, and only this one's.
          `forAddOn` is what `per-add-on` means. It SPEAKS when empty because
          the heading above it is this app's, and a heading with a gap under
          it is a hole. */}
      <div>
        <DrawerEyebrow>{t("addon.host.manage.settings")}</DrawerEyebrow>
        <AddOnSlot
          slot="settings.add-on.panel"
          forAddOn={addOn.key}
          payload={{
            patch: (values: Record<string, unknown>) => patchAddOnSettings(addOn.key, values),
            /*
             * WHAT THE BUSINESS KNOWS AND NO ADD-ON DOES: its own catalogue,
             * one row per family. REQUIRED — the second host to mount this
             * slot once passed `{ patch }` alone, `tsc` was happy, and a
             * settings form threw on `.map`.
             */
            samples: sampleCatalogue(dataSource.products()),
          }}
          fallback={
            <div style={{ fontSize: "12.5px", color: "var(--fg-muted)" }}>
              {t("addon.host.manage.noSettings")}
            </div>
          }
        />
      </div>

      <button
        onClick={() => toggleAddOn(addOn.key)}
        style={{
          alignSelf: "flex-start",
          padding: "10px 18px",
          borderRadius: "11px",
          border: on ? "1px solid var(--border-strong)" : "none",
          background: on ? "var(--surface-2)" : "var(--accent)",
          color: on ? "var(--fg)" : "var(--accent-fg)",
          fontWeight: 700,
          fontSize: "13.5px",
          cursor: "pointer",
        }}
      >
        {t(on ? "addon.host.manage.disconnect" : "addon.host.manage.connect")}
      </button>

      <Affiliation />
    </section>
  );
}

export function AddOnsDrawer() {
  const { t } = useI18n();
  const open = useAppStore((s) => s.addOnsOpen);
  const closeAddOns = useAppStore((s) => s.closeAddOns);
  const registry = useAppStore((s) => s.registry);

  if (!open) return null;

  /* `isConnectable` filters shelf entries out. This app registers none — a
     customer help portal's drawer is not a marketplace page — so today the
     filter removes nothing; both branches stay for the day that changes. */
  const rows = registry.all.filter(isConnectable);

  return (
    <div
      onClick={closeAddOns}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 210,
        background: "rgba(10,10,15,.5)",
        backdropFilter: "blur(3px)",
        display: "flex",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={t("addon.host.manage.title")}
        style={{
          inlineSize: "460px",
          maxInlineSize: "94vw",
          blockSize: "100%",
          overflowY: "auto",
          background: "var(--bg)",
          borderInlineStart: "1px solid var(--border)",
          padding: "22px",
          display: "flex",
          flexDirection: "column",
          gap: "18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
          <div style={{ flex: 1, minInlineSize: 0 }}>
            <h2 style={{ margin: 0, fontSize: "19px", fontWeight: 800, letterSpacing: "-.02em" }}>
              {t("addon.host.manage.title")}
            </h2>
            <p
              style={{ margin: "6px 0 0", fontSize: "12.5px", color: "var(--fg-muted)", lineHeight: 1.55 }}
            >
              {t("addon.host.manage.sub")}
            </p>
          </div>
          <button
            onClick={closeAddOns}
            aria-label={t("addon.host.manage.close")}
            style={{
              border: "1px solid var(--border)",
              background: "var(--surface)",
              borderRadius: "10px",
              padding: "7px",
              cursor: "pointer",
              color: "var(--fg-muted)",
              display: "flex",
            }}
          >
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* WHICH HALF OF THE PRODUCT THIS IS — on screen, before anything is
            connected. See this file's header. */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            padding: "14px 16px",
            borderRadius: "14px",
            background: "var(--accent-soft)",
            border: "1px solid color-mix(in srgb, var(--accent) 22%, transparent)",
          }}
        >
          <span style={{ flexShrink: 0, marginTop: "1px", display: "flex" }}>
            <Icon name="info" size={17} color="var(--accent)" />
          </span>
          <div>
            <div style={{ fontSize: "12.5px", fontWeight: 700 }}>
              {t("addon.host.manage.scopeTitle")}
            </div>
            <div
              style={{ fontSize: "12.5px", color: "var(--fg-muted)", lineHeight: 1.55, marginTop: "3px" }}
            >
              {t("addon.host.manage.scope")}
            </div>
          </div>
        </div>

        {rows.length === 0 ? (
          <p style={{ margin: 0, fontSize: "13px", color: "var(--fg-muted)" }}>
            {t("addon.host.manage.empty")}
          </p>
        ) : (
          rows.map((addOn) => <AddOnCard key={addOn.key} addOn={addOn} />)
        )}
      </div>
    </div>
  );
}
