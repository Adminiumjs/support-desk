/*
 * `live` — Live view & clips (delta spec A §1, logic C §3.3 `liveVals`).
 * Max-width 900, with a shallower top gutter than the other screens.
 *
 * The camera picker drives everything below it: the stage (which swaps itself
 * for the dashed "no feed" panel when the camera is offline), the type-chip
 * counts — computed BEFORE the type filter so they never collapse onto the
 * active chip — and the day-grouped clip history.
 *
 * The four control buttons render on both stage branches, by design.
 */

import { useMemo } from "react";
import {
  Callout,
  Chip,
  ChipRow,
  ClipCard,
  EmptyState,
  GroupHeader,
  LiveStage,
  ButtonSecondary,
  columnClass,
} from "../components";
import { dataSource } from "../data/source";
import {
  LIVE_CONTROLS,
  LIVE_RETENTION,
  clipsForCamera,
  clipTypeCounts,
  filterClipsByType,
  groupClipsByDay,
  liveEmpty,
  liveIntro,
} from "../lib/clips";
import { useAppStore } from "../state/store";
import "../styles/screen-live.css";

export default function Live() {
  const lvCam = useAppStore((s) => s.lvCam);
  const lvType = useAppStore((s) => s.lvType);
  const lvOut = useAppStore((s) => s.lvOut);
  const set = useAppStore((s) => s.set);
  const playClip = useAppStore((s) => s.playClip);
  const downloadClip = useAppStore((s) => s.downloadClip);
  const shareClipLink = useAppStore((s) => s.shareClipLink);
  const deleteClip = useAppStore((s) => s.deleteClip);
  const runLiveControl = useAppStore((s) => s.runLiveControl);
  const liveRetry = useAppStore((s) => s.liveRetry);
  const liveTroubleshoot = useAppStore((s) => s.liveTroubleshoot);

  const cams = dataSource.cameras();
  const cam = dataSource.camera(lvCam);
  const types = dataSource.clipTypes();

  /* Everything on this camera, minus the clips deleted this session. */
  const mine = useMemo(
    () => clipsForCamera(dataSource.clips(), cam.id, lvOut),
    [cam.id, lvOut],
  );
  const counts = useMemo(() => clipTypeCounts(mine), [mine]);
  const groups = useMemo(
    () => groupClipsByDay(filterClipsByType(mine, lvType)),
    [mine, lvType],
  );

  const empty = liveEmpty(cam, mine.length > 0);

  return (
    <main className={`fx-screen fx-page ${columnClass("live")} lv`}>
      <div className="lv__head">
        <div className="lv__head-text">
          <h1 className="lv__h1">Live view &amp; clips</h1>
          <p className="lv__lede">{liveIntro(cam)}</p>
        </div>
        <ChipRow className="lv__cams" gap={8}>
          {cams.map((c) => (
            <Chip
              key={c.id}
              icon={c.icon}
              iconSize={14}
              active={c.id === cam.id}
              onClick={() => set({ lvCam: c.id })}
            >
              {c.name}
            </Chip>
          ))}
        </ChipRow>
      </div>

      <LiveStage
        camera={cam}
        onRetry={liveRetry}
        onTroubleshoot={liveTroubleshoot}
      />

      <div className="lv__controls">
        {LIVE_CONTROLS.map((c) => (
          <ButtonSecondary
            key={c.label}
            icon={c.icon}
            iconSize={15}
            className="lv__ctrl"
            onClick={() => runLiveControl(c)}
          >
            {c.label}
          </ButtonSecondary>
        ))}
      </div>

      <div className="lv__clips-head">
        <span className="lv__clips-title">Clip history</span>
        <span className="lv__retention">{LIVE_RETENTION}</span>
      </div>

      <ChipRow className="lv__types" gap={9}>
        {types.map(([id, label, icon]) => (
          <Chip
            key={id}
            icon={icon}
            active={lvType === id}
            count={counts[id]}
            onClick={() => set({ lvType: id })}
          >
            {label}
          </Chip>
        ))}
      </ChipRow>

      {groups.length ? (
        <div className="lv__days">
          {groups.map((g) => (
            <section className="lv__day" key={g.day}>
              <GroupHeader label={g.day} count={g.count} />
              <div className="lv__day-clips">
                {g.clips.map((clip) => (
                  <ClipCard
                    key={clip.id}
                    clip={clip}
                    camera={cam}
                    onPlay={() => playClip(clip)}
                    onDownload={() => downloadClip(clip)}
                    onShare={() => shareClipLink(clip)}
                    onDelete={() => deleteClip(clip)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <EmptyState icon="video-off" title={empty.title} body={empty.text} />
      )}

      <Callout tone="info" icon="lock" className="lv__note">
        Clips are encrypted end to end. Sharing creates a link that expires
        after 7 days, and we can't watch what's behind it.
      </Callout>
    </main>
  );
}
