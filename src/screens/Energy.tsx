/*
 * `energy` — Energy insights (port spec §6.26, logic §8.26). Max-width 900.
 *
 * Period pills drive the whole page from `ENERGY[period]`. Bar heights come
 * from `barHeight()` (max(6, round(v / max * 130)) px) inside <MiniChart>; the
 * room meters are `round(value / max(rooms) * 100)` %.
 */

import { useMemo } from "react";
import {
  Card,
  Eyebrow,
  Icon,
  MiniChart,
  ProgressBar,
  StatGrid,
  StatTile,
  Tabs,
} from "../components";
import { dataSource } from "../data/source";
import { percent } from "../lib/format";
import { useAppStore } from "../state/store";
import type { EnergyPeriod } from "../data/types";
import "../styles/screen-energy.css";

const PERIODS: { id: EnergyPeriod; label: string }[] = [
  { id: "week", label: "Week" },
  { id: "month", label: "Month" },
  { id: "year", label: "Year" },
];

export default function Energy() {
  const enPeriod = useAppStore((s) => s.enPeriod);
  const set = useAppStore((s) => s.set);

  const data = dataSource.energy()[enPeriod];
  const rooms = dataSource.energyRooms();
  const tips = dataSource.energyTips();

  const bars = useMemo(
    () => data.bars.map(([label, value]) => ({ label, value })),
    [data],
  );
  const roomMax = useMemo(
    () => rooms.reduce((m, [, v]) => Math.max(m, v), 0),
    [rooms],
  );

  return (
    <main className="oh-screen oh-page w-900 en">
      <h1 className="en__h1">Energy insights</h1>
      <p className="en__lede">
        {
          "Worked out from your thermostat and plugs. Estimates use your tariff — change it in the app if it's out of date."
        }
      </p>

      <div className="en__periods">
        <Tabs
          label="Period"
          options={PERIODS}
          value={enPeriod}
          onChange={(id) => set({ enPeriod: id })}
        />
      </div>

      <StatGrid className="en__kpis">
        {data.kpis.map(([value, label, icon, delta, deltaIcon]) => (
          <StatTile
            key={label}
            label={label}
            value={value}
            icon={icon}
            delta={delta}
            deltaIcon={deltaIcon}
          />
        ))}
      </StatGrid>

      <Card variant="lg" className="en__chart-card">
        <div className="en__chart-head">
          <h2 className="en__chart-title">{data.title}</h2>
          <span className="en__unit">kWh</span>
        </div>
        <MiniChart label={data.title} bars={bars} />
      </Card>

      <div className="en__split">
        <Card variant="lg" className="en__rooms">
          <Eyebrow>By room</Eyebrow>
          <div className="en__room-list">
            {rooms.map(([name, value]) => (
              <div className="en__room" key={name}>
                <div className="en__room-head">
                  <span className="en__room-name">{name}</span>
                  <span className="en__room-val">{value}</span>
                </div>
                <ProgressBar
                  label={name}
                  pct={percent(value, roomMax)}
                  height={7}
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="en__tips">
          {tips.map((t) => (
            <div className="en__tip" key={t.text}>
              <Icon name={t.icon} size={18} color="var(--pos)" />
              <div className="en__tip-body">
                <p className="en__tip-text">{t.text}</p>
                <span className="en__tip-saving">{t.saving}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
