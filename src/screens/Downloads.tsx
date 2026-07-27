/*
 * `downloads` — Downloads & manuals (port spec §6.29, logic §8.20).
 * Category chips filter by `kind`; firmware rows read "Get file", everything
 * else "Download". Both app-store cards share one handler.
 */

import { useMemo } from "react";
import {
  AccentIconTile,
  ButtonSecondary,
  Chip,
  ChipRow,
  Icon,
  ListCard,
} from "../components";
import { dataSource } from "../data/source";
import { useAppStore } from "../state/store";
import "../styles/screen-downloads.css";

const APPS: { icon: string; title: string; sub: string }[] = [
  { icon: "smartphone", title: "Hearth for iPhone", sub: "v6.4.1 · iOS 16+" },
  {
    icon: "tablet-smartphone",
    title: "Hearth for Android",
    sub: "v6.4.0 · Android 11+",
  },
];

export default function Downloads() {
  const dlCat = useAppStore((s) => s.dlCat);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);

  const cats = useMemo(() => dataSource.downloadCategories(), []);
  const files = useMemo(() => dataSource.downloads(), []);
  const shown = useMemo(
    () => (dlCat === "all" ? files : files.filter((f) => f.kind === dlCat)),
    [files, dlCat],
  );

  function appDownload() {
    showToast("App store links are disabled in this demo", "info");
  }

  return (
    <main className="oh-screen oh-page w-900 dl">
      <h1 className="dl__h1">Downloads &amp; manuals</h1>
      <p className="dl__lede">
        Manuals, quick-start cards, wiring diagrams and installer tools.
        Everything here is free and doesn&rsquo;t need an account.
      </p>

      <ChipRow className="dl__chips">
        {cats.map((c) => (
          <Chip
            key={c.id}
            icon={c.icon}
            active={dlCat === c.id}
            onClick={() => set({ dlCat: c.id })}
          >
            {c.name}
          </Chip>
        ))}
      </ChipRow>

      <ListCard>
        {shown.map((f) => (
          <div key={f.file} className="sd-listrow oh-res dl__row">
            <span className="dl__tile">
              <Icon name={f.icon} size={20} />
            </span>
            <div className="dl__body">
              <p className="dl__name">{f.name}</p>
              <p className="dl__meta sd-mono">
                {f.file} · {f.size} · {f.ver}
              </p>
            </div>
            <ButtonSecondary
              className="dl__get"
              icon="download"
              iconSize={14}
              onClick={() => showToast(`Downloading ${f.file}`)}
            >
              {f.kind === "firmware" ? "Get file" : "Download"}
            </ButtonSecondary>
          </div>
        ))}
      </ListCard>

      <h2 className="dl__h2">Get the app</h2>
      <div className="dl__apps">
        {APPS.map((a) => (
          <button
            key={a.title}
            type="button"
            className="dl__app oh-card"
            onClick={appDownload}
          >
            <AccentIconTile icon={a.icon} size={44} radius={13} iconSize={21} />
            <span className="sd-col">
              <span className="dl__app-title">{a.title}</span>
              <span className="dl__app-sub sd-mono">{a.sub}</span>
            </span>
          </button>
        ))}
      </div>
    </main>
  );
}
