/*
 * The camera stage and one clip row (delta spec A §1).
 *
 * `<LiveStage>` renders the online feed with its four overlay chips, or the
 * dashed "no feed" panel when the camera is offline — the caller passes the
 * two handlers rather than the component reaching into the store, so the
 * offline stage can be shown in isolation.
 */

import {
  LIVE_CLOCK,
  clipMeta,
  liveFile,
  liveLastSeen,
  liveNoFeedTitle,
  LIVE_NO_FEED_TEXT,
  CLIP_TYPE_META,
} from "../lib/clips";
import { Icon } from "./Icon";
import { phBg, phIco, useIsDark } from "./PlaceholderTile";
import { ButtonPrimary, ButtonSecondary, IconButton } from "./Primitives";
import { SoftPill } from "./StatusPill";
import type { Camera, Clip } from "../data/types";

export interface LiveStageProps {
  camera: Camera;
  /** Offline stage: "Try again". */
  onRetry: () => void;
  /** Offline stage: "Fix an offline camera". */
  onTroubleshoot: () => void;
}

/** `<LiveStage camera={cam} onRetry={liveRetry} onTroubleshoot={…} />` */
export function LiveStage({ camera, onRetry, onTroubleshoot }: LiveStageProps) {
  const dark = useIsDark();

  if (camera.offline) {
    return (
      <div className="live-off">
        <span className="live-off__ico">
          <Icon name="video-off" size={28} />
        </span>
        <h2 className="live-off__title">{liveNoFeedTitle(camera)}</h2>
        <p className="live-off__text">{LIVE_NO_FEED_TEXT}</p>
        <div className="live-off__actions">
          <ButtonPrimary icon="refresh-cw" onClick={onRetry}>
            Try again
          </ButtonPrimary>
          <ButtonSecondary icon="wrench" onClick={onTroubleshoot}>
            Fix an offline camera
          </ButtonSecondary>
        </div>
        <span className="live-off__seen">{liveLastSeen(camera)}</span>
      </div>
    );
  }

  return (
    <div
      className="live-stage"
      style={{ background: phBg(camera.tint, dark, "165deg") }}
    >
      <Icon name="video" size={74} color={phIco(camera.tint, dark)} />
      <span className="live-stage__badge live-stage__badge--live">
        <span className="live-stage__dot" />
        LIVE
      </span>
      <span className="live-stage__badge live-stage__badge--name">
        {camera.name}
      </span>
      <span className="live-stage__badge live-stage__badge--clock">
        {LIVE_CLOCK}
      </span>
      <span className="live-stage__file">{liveFile(camera.id)}</span>
      <span className="live-stage__badge live-stage__badge--signal">
        <Icon name="wifi" size={12} />
        {camera.signal}
      </span>
    </div>
  );
}

export interface ClipCardProps {
  clip: Clip;
  /** The clip's own camera — supplies the thumbnail tint and the meta line. */
  camera: Camera;
  onPlay: () => void;
  onDownload: () => void;
  onShare: () => void;
  onDelete: () => void;
}

/** One row of the clip history. */
export function ClipCard({
  clip,
  camera,
  onPlay,
  onDownload,
  onShare,
  onDelete,
}: ClipCardProps) {
  const dark = useIsDark();
  const meta = CLIP_TYPE_META[clip.type];

  return (
    <div className="sd-card fx-card clip">
      <button
        type="button"
        className="clip__thumb"
        style={{ background: phBg(camera.tint, dark, "150deg") }}
        onClick={onPlay}
        title="Play clip"
        aria-label={`Play ${clip.title}`}
      >
        <Icon name="play" size={24} color={phIco(camera.tint, dark)} />
        <span className="clip__dur">{clip.dur}</span>
      </button>
      <div className="clip__body">
        <div className="clip__head">
          <span className="clip__title">{clip.title}</span>
          <SoftPill fg={meta.fg} soft={meta.soft} icon={meta.icon} iconSize={12}>
            {meta.label}
          </SoftPill>
        </div>
        <p className="clip__text">{clip.text}</p>
        <span className="clip__meta">{clipMeta(clip, camera)}</span>
      </div>
      <div className="clip__actions">
        <IconButton icon="download" label="Download clip" small onClick={onDownload} />
        <IconButton icon="share-2" label="Share clip" small onClick={onShare} />
        <IconButton
          icon="trash-2"
          label="Delete clip"
          small
          onClick={onDelete}
          style={{ color: "var(--danger)" }}
        />
      </div>
    </div>
  );
}

export default LiveStage;
