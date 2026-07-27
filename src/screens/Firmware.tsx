/*
 * `firmware` — Firmware release notes (port spec §6.30, logic §8.17).
 * Chip filter over `release.devices`; no other handlers on this screen.
 */

import { useMemo } from "react";
import { Card, Chip, ChipRow, Icon, SoftPill } from "../components";
import { dataSource } from "../data/source";
import { useAppStore } from "../state/store";
import type { FirmwareType } from "../data/types";
import "../styles/screen-firmware.css";

const TYPE_TONE: Record<FirmwareType, { fg: string; soft: string }> = {
  Stability: { fg: "--info", soft: "--info-soft" },
  Feature: { fg: "--accent", soft: "--accent-soft" },
  Security: { fg: "--warn", soft: "--warn-soft" },
};

export default function Firmware() {
  const fwCat = useAppStore((s) => s.fwCat);
  const set = useAppStore((s) => s.set);

  const products = useMemo(() => dataSource.products(), []);
  const releases = useMemo(() => dataSource.firmware(), []);

  const chips = useMemo(
    () => [
      { id: "all", label: "All devices" },
      ...products.map((p) => ({ id: p.id as string, label: p.name })),
    ],
    [products],
  );

  const shown = useMemo(
    () =>
      fwCat === "all"
        ? releases
        : releases.filter((r) => (r.devices as string[]).includes(fwCat)),
    [releases, fwCat],
  );

  return (
    <main className="oh-screen oh-page w-820 fw">
      <h1 className="fw__h1">Firmware release notes</h1>
      <p className="fw__lede">
        Updates install overnight on their own. You can always nudge one by hand
        in the app under Settings &rarr; About.
      </p>

      <ChipRow className="fw__chips">
        {chips.map((c) => (
          <Chip
            key={c.id}
            active={fwCat === c.id}
            onClick={() => set({ fwCat: c.id })}
          >
            {c.label}
          </Chip>
        ))}
      </ChipRow>

      <div className="fw__list">
        {shown.map((r) => {
          const tone = TYPE_TONE[r.type] ?? TYPE_TONE.Stability;
          return (
            <Card key={r.ver} className="fw__card oh-card">
              <div className="fw__head">
                <span className="fw__ver sd-mono">{r.ver}</span>
                <SoftPill fg={tone.fg} soft={tone.soft}>
                  {r.type}
                </SoftPill>
                {r.rolling ? (
                  <span className="fw__rolling">
                    <Icon name="radio" size={12} />
                    Rolling out
                  </span>
                ) : null}
                <span className="fw__date sd-mono">{r.date}</span>
              </div>

              <div className="fw__devices">
                {r.devices.map((id) => {
                  const p = dataSource.product(id);
                  return (
                    <span key={id} className="fw__device">
                      <Icon name={p.icon} size={12} />
                      {p.name}
                    </span>
                  );
                })}
              </div>

              <ul className="fw__notes">
                {r.notes.map((n) => (
                  <li key={n.text} className="fw__note">
                    <Icon name={n.icon} size={15} className="fw__note-ico" />
                    <span>{n.text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
