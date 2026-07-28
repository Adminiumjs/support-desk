/*
 * `share` — Shared clips (delta spec B §9, logic C §3.3 `shareVals`).
 * Max-width 900.
 *
 * The live list is `state.shareLinks` (created links are unshifted onto it);
 * `shOut` is the separate revoke blacklist, so Undo on a revoke puts the link
 * straight back. The composer only ever offers the first three clips.
 *
 * The two selects bind to the option `value`, not its label — the store looks
 * the audience and expiry up by value when it mints the link.
 */

import { useMemo } from "react";
import {
  Avatar,
  ButtonPrimary,
  ButtonSecondary,
  Callout,
  Card,
  Checkbox,
  EmptyState,
  Icon,
  Radio,
  SoftPill,
  columnClass,
  phBg,
  phIco,
  useIsDark,
} from "../components";
import { dataSource } from "../data/source";
import {
  SHARE_STATE_META,
  shareClipMeta,
  shareExtendLabel,
  visibleShareLinks,
} from "../lib/clips";
import { useAppStore } from "../state/store";
import "../styles/screen-share.css";

/** The composer offers the first three clips only, as the comp does. */
const COMPOSER_CLIPS = 3;

export default function Share() {
  const shareLinks = useAppStore((s) => s.shareLinks);
  const shOut = useAppStore((s) => s.shOut);
  const shNewOpen = useAppStore((s) => s.shNewOpen);
  const shClip = useAppStore((s) => s.shClip);
  const shAudience = useAppStore((s) => s.shAudience);
  const shExpiry = useAppStore((s) => s.shExpiry);
  const shOn = useAppStore((s) => s.shOn);
  const set = useAppStore((s) => s.set);
  const toggleShareNew = useAppStore((s) => s.toggleShareNew);
  const toggleShareOption = useAppStore((s) => s.toggleShareOption);
  const shareCreate = useAppStore((s) => s.shareCreate);
  const shareCopy = useAppStore((s) => s.shareCopy);
  const shareExtend = useAppStore((s) => s.shareExtend);
  const shareRevoke = useAppStore((s) => s.shareRevoke);

  const dark = useIsDark();
  const clips = dataSource.clips().slice(0, COMPOSER_CLIPS);
  const audiences = dataSource.shareAudiences();
  const expiries = dataSource.shareExpiries();
  const options = dataSource.shareOptions();

  const links = useMemo(
    () => visibleShareLinks(shareLinks, shOut),
    [shareLinks, shOut],
  );

  return (
    <main className={`fx-screen fx-page ${columnClass("share")} sh`}>
      <div className="sh__head">
        <div className="sh__head-text">
          <h1 className="sh__h1">Shared clips</h1>
          <p className="sh__lede">
            Share a clip with neighbours, a group chat, or the police without
            handing over your account. Every link expires, and you can pull one
            back at any moment.
          </p>
        </div>
        <ButtonPrimary icon="share-2" onClick={toggleShareNew}>
          Share a clip
        </ButtonPrimary>
      </div>

      {shNewOpen ? (
        <Card variant="lg" accent className="sh__panel">
          <h2 className="sh__panel-h">New shared link</h2>

          <div className="sh__field">
            <span className="sh__label">Which clip?</span>
            <div className="sh__clips">
              {clips.map((clip) => {
                const cam = dataSource.camera(clip.cam);
                return (
                  <Radio
                    key={clip.id}
                    name="sh-clip"
                    selected={shClip === clip.id}
                    onSelect={() => set({ shClip: clip.id })}
                    note={shareClipMeta(clip, cam)}
                    leading={
                      <span
                        className="sh__thumb sh__thumb--pick"
                        style={{ background: phBg(cam.tint, dark, "150deg") }}
                        aria-hidden="true"
                      >
                        <Icon
                          name="play"
                          size={16}
                          color={phIco(cam.tint, dark)}
                        />
                      </span>
                    }
                  >
                    {clip.title}
                  </Radio>
                );
              })}
            </div>
          </div>

          <div className="sh__selects">
            <div>
              <label className="sh__label" htmlFor="sh-audience">
                Who can watch
              </label>
              <select
                id="sh-audience"
                className="sd-select fx-fld"
                value={shAudience}
                onChange={(e) => set({ shAudience: e.target.value })}
              >
                {audiences.map((a) => (
                  <option key={a.value} value={a.value}>
                    {a.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="sh__label" htmlFor="sh-expiry">
                Link expires
              </label>
              <select
                id="sh-expiry"
                className="sd-select fx-fld"
                value={shExpiry}
                onChange={(e) => set({ shExpiry: e.target.value })}
              >
                {expiries.map((e) => (
                  <option key={e.value} value={e.value}>
                    {e.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="sh__opts">
            {options.map((o) => (
              <Checkbox
                key={o.id}
                checked={shOn.includes(o.id)}
                onChange={() => toggleShareOption(o.id)}
                note={o.note}
              >
                {o.label}
              </Checkbox>
            ))}
          </div>

          <div className="sh__panel-acts">
            <ButtonPrimary icon="link" onClick={shareCreate}>
              Create link
            </ButtonPrimary>
            <ButtonSecondary onClick={toggleShareNew}>Cancel</ButtonSecondary>
          </div>
        </Card>
      ) : null}

      {links.length ? (
        <div className="sh__links">
          {links.map((link) => {
            const cam = dataSource.camera(link.cam);
            const meta = SHARE_STATE_META[link.state];
            return (
              <div className="sd-card fx-card sh-link" key={link.id}>
                <div className="sh-link__top">
                  <span
                    className="sh__thumb sh__thumb--link"
                    style={{ background: phBg(cam.tint, dark, "150deg") }}
                    aria-hidden="true"
                  >
                    <Icon name="play" size={22} color={phIco(cam.tint, dark)} />
                  </span>
                  <div className="sh-link__body">
                    <div className="sh-link__title-row">
                      <span className="sh-link__title">{link.title}</span>
                      <SoftPill
                        fg={meta.fg}
                        soft={meta.soft}
                        icon={meta.icon}
                        iconSize={12}
                      >
                        {meta.label}
                      </SoftPill>
                    </div>
                    <p className="sh-link__aud">
                      {link.audience} · {link.expires}
                    </p>
                    <p className="sh-link__url">{link.url}</p>
                  </div>
                  <div className="sh-link__views">
                    <span className="sh-link__views-n">{link.views}</span>
                    <span className="sh-link__views-l">views</span>
                  </div>
                </div>

                {link.watchers.length ? (
                  <div className="sh-link__watchers">
                    {link.watchers.map(([name, initials, tint]) => (
                      <span className="sh-watcher" key={name}>
                        <Avatar
                          initials={initials}
                          tint={tint}
                          size={24}
                          fontSize={10}
                        />
                        {name}
                      </span>
                    ))}
                  </div>
                ) : null}

                <div className="sh-link__acts">
                  <ButtonSecondary
                    icon="copy"
                    iconSize={14}
                    className="sh-link__act"
                    onClick={shareCopy}
                  >
                    Copy link
                  </ButtonSecondary>
                  <ButtonSecondary
                    icon="clock"
                    iconSize={14}
                    className="sh-link__act"
                    tone="var(--fg-muted)"
                    onClick={() => shareExtend(link)}
                  >
                    {shareExtendLabel(link.state)}
                  </ButtonSecondary>
                  <ButtonSecondary
                    icon="link-2-off"
                    iconSize={14}
                    className="sh-link__act sh-link__act--revoke"
                    tone="var(--danger)"
                    onClick={() => shareRevoke(link)}
                  >
                    Revoke
                  </ButtonSecondary>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon="link-2-off"
          title="Nothing shared right now"
          body="When you share a clip it appears here with its view count, so you always know what's out there — and can pull it back."
          action={{
            label: "Share a clip",
            icon: "share-2",
            onClick: toggleShareNew,
          }}
        />
      )}

      <Callout tone="info" icon="lock" className="sh__note">
        Shared clips are decrypted in the viewer's browser, never on our
        servers. Revoking kills the link immediately, though anyone who already
        downloaded a copy keeps it — the same as any video you send.
      </Callout>
    </main>
  );
}
