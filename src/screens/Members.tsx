/*
 * `members` — Household members (port spec §6.27, logic §8.30). Max-width 820.
 *
 * The seeded list lives in the store (`members`); removals are tracked in
 * `mbOut` and role changes in `mbRoles`, so the effective role of a row is
 * `mbRoles[id] ?? member.role`.
 *
 * Delta §6.4: the invite toast is now the short "Invite sent" with the address
 * in a success banner, removing a member is undoable, and an empty state
 * appears once the owner is the only one left.
 */

import { useMemo } from "react";
import {
  Avatar,
  ButtonPrimary,
  Callout,
  Card,
  EmptyState,
  Field,
  Icon,
  IconButton,
  ListCard,
  SoftPill,
  TextInput,
} from "../components";
import { useT, type MessageKey } from "../i18n";
import {
  displayNameFromEmail,
  initialsFrom,
  nextMemberId,
} from "../lib/format";
import { looksLikeEmail, useAppStore } from "../state/store";
import type { Member, MemberRole } from "../data/types";
import "../styles/screen-members.css";

/**
 * The member-role pill family (port spec §4.2). `label` is a message key, not
 * prose — this table is module scope and has no hook, so it is resolved at the
 * render site below.
 */
const ROLE: Record<
  MemberRole,
  { label: MessageKey; fg: string; soft: string; icon: string }
> = {
  owner: {
    label: "screensB.members.roleOwner",
    fg: "--accent",
    soft: "--accent-soft",
    icon: "crown",
  },
  adult: {
    label: "screensB.members.roleAdult",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "user-round",
  },
  guest: {
    label: "screensB.members.roleGuest",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "user-round-cog",
  },
};

/** The tint every invited member gets (port spec §2.7). */
const NEW_MEMBER_TINT = "#b06f8f";

export default function Members() {
  const t = useT();
  const members = useAppStore((s) => s.members);
  const mbEmail = useAppStore((s) => s.mbEmail);
  const mbRole = useAppStore((s) => s.mbRole);
  const mbOut = useAppStore((s) => s.mbOut);
  const mbRoles = useAppStore((s) => s.mbRoles);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const undoToast = useAppStore((s) => s.undoToast);
  const succeed = useAppStore((s) => s.succeed);

  const list = useMemo(
    () => members.filter((m) => !mbOut.includes(m.id)),
    [members, mbOut],
  );

  /* Nobody but the owner is left (delta §6.4). */
  const alone = list.every((m) => (mbRoles[m.id] ?? m.role) === "owner");

  const invite = () => {
    const email = mbEmail.trim();
    if (!looksLikeEmail(email)) {
      showToast(t("screensB.members.needEmail"), "warn");
      return;
    }
    const name = displayNameFromEmail(email);
    const member: Member = {
      id: nextMemberId(members.length),
      name,
      initials: initialsFrom(name),
      tint: NEW_MEMBER_TINT,
      role: mbRole,
      meta: t("screensB.members.pendingMeta", { email }),
      perms:
        mbRole === "guest"
          ? [[t("screensB.members.permFrontDoor"), "door-open"]]
          : [[t("screensB.members.permAllDevices"), "cpu"]],
    };
    set({ members: [...members, member], mbEmail: "" });
    showToast(t("screensB.members.inviteSent"));
    succeed(
      t("screensB.members.inviteSentTo", { email }),
      t("screensB.members.inviteSentBody"),
    );
  };

  const changeRole = (m: Member, role: MemberRole) => {
    set({ mbRoles: { ...mbRoles, [m.id]: role } });
    showToast(
      role === "adult"
        ? t("screensB.members.nowAdult", { name: m.name })
        : t("screensB.members.nowGuest", { name: m.name }),
    );
  };

  const remove = (m: Member) => {
    set({ mbOut: [...mbOut, m.id] });
    undoToast(t("screensB.members.removed", { name: m.name }), () =>
      set({
        mbOut: useAppStore.getState().mbOut.filter((id) => id !== m.id),
      }),
    );
  };

  return (
    <main className="fx-screen fx-page w-820 mb">
      <h1 className="mb__h1">{t("screensB.members.h1")}</h1>
      <p className="mb__lede">{t("screensB.members.lede")}</p>

      <Card className="mb__invite">
        <Field
          label={t("screensB.members.inviteByEmail")}
          htmlFor="mb-email"
          className="mb__invite-email"
        >
          <TextInput
            id="mb-email"
            type="email"
            value={mbEmail}
            placeholder="name@example.com"
            onChange={(v) => set({ mbEmail: v })}
          />
        </Field>
        <Field
          label={t("screensB.members.roleLabel")}
          htmlFor="mb-role"
          className="mb__invite-role"
        >
          <select
            id="mb-role"
            className="sd-select fx-fld"
            value={mbRole}
            onChange={(e) =>
              set({ mbRole: e.target.value as "adult" | "guest" })
            }
          >
            <option value="adult">{t("screensB.members.roleAdult")}</option>
            <option value="guest">{t("screensB.members.roleGuest")}</option>
          </select>
        </Field>
        <ButtonPrimary icon="user-plus" size="md" onClick={invite}>
          {t("screensB.members.sendInvite")}
        </ButtonPrimary>
      </Card>

      <ListCard>
        {list.map((m) => {
          const role = mbRoles[m.id] ?? m.role;
          const meta = ROLE[role];
          const isOwner = role === "owner";
          return (
            <div className="sd-listrow mb__row" key={m.id}>
              <Avatar
                initials={m.initials}
                tint={m.tint}
                size={40}
                fontSize={14}
              />

              <div className="mb__main">
                <div className="mb__name-row">
                  <span className="mb__name">{m.name}</span>
                  <SoftPill fg={meta.fg} soft={meta.soft} icon={meta.icon}>
                    {t(meta.label)}
                  </SoftPill>
                </div>
                <span className="mb__meta">{m.meta}</span>
                <div className="mb__perms">
                  {m.perms.map(([label, icon]) => (
                    <span className="mb__perm" key={label}>
                      <Icon name={icon} size={12} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              {isOwner ? (
                <span className="mb__you">{t("screensB.members.thatsYou")}</span>
              ) : (
                <div className="mb__acts">
                  <select
                    className="sd-select fx-fld mb__role"
                    aria-label={t("screensB.members.roleFor", { name: m.name })}
                    value={role}
                    onChange={(e) =>
                      changeRole(m, e.target.value as MemberRole)
                    }
                  >
                    <option value="adult">
                      {t("screensB.members.roleAdult")}
                    </option>
                    <option value="guest">
                      {t("screensB.members.roleGuest")}
                    </option>
                  </select>
                  <IconButton
                    icon="user-minus"
                    label={t("screensB.members.remove")}
                    iconSize={17}
                    className="mb__remove"
                    onClick={() => remove(m)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </ListCard>

      {alone ? (
        <EmptyState
          compact
          className="mb__empty"
          icon="users"
          title={t("screensB.members.emptyTitle")}
          body={t("screensB.members.emptyBody")}
        />
      ) : null}

      <Callout tone="info" icon="info" className="mb__note">
        {t("screensB.members.note")}
      </Callout>
    </main>
  );
}
