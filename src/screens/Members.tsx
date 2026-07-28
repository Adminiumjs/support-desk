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
import {
  displayNameFromEmail,
  initialsFrom,
  nextMemberId,
} from "../lib/format";
import { looksLikeEmail, useAppStore } from "../state/store";
import type { Member, MemberRole } from "../data/types";
import "../styles/screen-members.css";

/** The member-role pill family (port spec §4.2). */
const ROLE: Record<
  MemberRole,
  { label: string; fg: string; soft: string; icon: string }
> = {
  owner: {
    label: "Owner",
    fg: "--accent",
    soft: "--accent-soft",
    icon: "crown",
  },
  adult: {
    label: "Adult",
    fg: "--pos",
    soft: "--pos-soft",
    icon: "user-round",
  },
  guest: {
    label: "Guest",
    fg: "--warn",
    soft: "--warn-soft",
    icon: "user-round-cog",
  },
};

/** The tint every invited member gets (port spec §2.7). */
const NEW_MEMBER_TINT = "#b06f8f";

export default function Members() {
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
      showToast("Enter an email address", "warn");
      return;
    }
    const name = displayNameFromEmail(email);
    const member: Member = {
      id: nextMemberId(members.length),
      name,
      initials: initialsFrom(name),
      tint: NEW_MEMBER_TINT,
      role: mbRole,
      meta: `${email} · invite pending`,
      perms:
        mbRole === "guest"
          ? [["Front door only", "door-open"]]
          : [["All devices", "cpu"]],
    };
    set({ members: [...members, member], mbEmail: "" });
    showToast("Invite sent");
    succeed(
      `Invite sent to ${email}`,
      "It expires in 14 days. They'll appear below as pending until they accept.",
    );
  };

  const changeRole = (m: Member, role: MemberRole) => {
    set({ mbRoles: { ...mbRoles, [m.id]: role } });
    showToast(`${m.name} is now a${role === "adult" ? "n adult" : " guest"}`);
  };

  const remove = (m: Member) => {
    set({ mbOut: [...mbOut, m.id] });
    undoToast(`${m.name} removed`, () =>
      set({
        mbOut: useAppStore.getState().mbOut.filter((id) => id !== m.id),
      }),
    );
  };

  return (
    <main className="fx-screen fx-page w-820 mb">
      <h1 className="mb__h1">Household members</h1>
      <p className="mb__lede">
        Share the home without sharing your password. Guests never see clip
        history, and you can remove anyone instantly.
      </p>

      <Card className="mb__invite">
        <Field
          label="Invite by email"
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
        <Field label="Role" htmlFor="mb-role" className="mb__invite-role">
          <select
            id="mb-role"
            className="sd-select fx-fld"
            value={mbRole}
            onChange={(e) =>
              set({ mbRole: e.target.value as "adult" | "guest" })
            }
          >
            <option value="adult">Adult</option>
            <option value="guest">Guest</option>
          </select>
        </Field>
        <ButtonPrimary icon="user-plus" size="md" onClick={invite}>
          Send invite
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
                    {meta.label}
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
                <span className="mb__you">{"That's you"}</span>
              ) : (
                <div className="mb__acts">
                  <select
                    className="sd-select fx-fld mb__role"
                    aria-label={`Role for ${m.name}`}
                    value={role}
                    onChange={(e) =>
                      changeRole(m, e.target.value as MemberRole)
                    }
                  >
                    <option value="adult">Adult</option>
                    <option value="guest">Guest</option>
                  </select>
                  <IconButton
                    icon="user-minus"
                    label="Remove"
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
          title="Just you in this household"
          body="Nobody else has access. Invite someone above and they can use live view and unlocking without ever seeing your password."
        />
      ) : null}

      <Callout tone="info" icon="info" className="mb__note">
        Only the owner can add or remove devices, see billing, or close the
        account. Adults can do everything else; guests get live view and
        unlocking during the hours you set.
      </Callout>
    </main>
  );
}
