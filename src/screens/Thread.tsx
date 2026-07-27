/*
 * `thread` — Ticket thread (port spec §6.10, simulation §8.6).
 *
 * max-width 820. Header card + 3-node timeline, the simulated-replies note,
 * the message list (plus the typing bubble) and the reply composer.
 *
 * Ruling R4: the agent reply is deterministic and scheduled through the
 * injectable `delay` helper — both live inside `sendReply` on the store, so
 * this screen only renders `typing`.
 */

import {
  Avatar,
  ButtonPrimary,
  ButtonSecondary,
  EmptyState,
  HorizontalTimeline,
  Icon,
  IconChip,
  StatusPill,
  TextArea,
  ThreadBubble,
  TypingDots,
} from "../components";
import { AGENT } from "../data/demo";
import { dataSource } from "../data/source";
import { canSolve, threadTimeline } from "../lib/thread";
import { selectThreadTicket, useAppStore } from "../state/store";
import "../styles/screen-thread.css";

export default function Thread() {
  const ticket = useAppStore(selectThreadTicket);
  const reply = useAppStore((s) => s.reply);
  const typing = useAppStore((s) => s.typing);
  const go = useAppStore((s) => s.go);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const sendReply = useAppStore((s) => s.sendReply);
  const markSolved = useAppStore((s) => s.markSolved);

  const backTickets = () => go("mytickets");

  const back = (
    <button type="button" className="th__back fx-nav" onClick={backTickets}>
      <Icon name="arrow-left" size={15} />
      All tickets
    </button>
  );

  /*
   * Guard: `threadId` is null until a row is opened. The comp never renders
   * this view without a ticket, so there is no comp copy for the miss — this
   * empty state is a port addition rather than ported copy.
   */
  if (!ticket) {
    return (
      <main className="fx-screen fx-page w-820 th">
        {back}
        <EmptyState
          icon="inbox"
          title="No ticket open"
          body="Pick a conversation from your tickets to read it here."
          action={{
            label: "All tickets",
            icon: "arrow-left",
            onClick: backTickets,
          }}
        />
      </main>
    );
  }

  const product = dataSource.product(ticket.product);
  const canSend = reply.trim().length > 0;

  return (
    <main className="fx-screen fx-page w-820 th">
      {back}

      <div className="th__head">
        <div className="th__headbody">
          <div className="th__headrow">
            <IconChip
              tint={product.tint}
              icon={product.icon}
              size={38}
              radius={11}
              iconSize={19}
            />
            <div className="th__headcol">
              <div className="th__meta">
                <span className="th__id">{ticket.id}</span>
                <StatusPill status={ticket.status} />
              </div>
              <h1 className="th__title">{ticket.subject}</h1>
              <p className="th__product">{product.name}</p>
            </div>
          </div>
          <HorizontalTimeline nodes={threadTimeline(ticket)} />
        </div>
      </div>

      <p className="th__note">
        <Icon name="bot" size={14} />
        Replies in this demo are simulated.
      </p>

      <div className="th__msgs">
        {ticket.msgs.map((m, i) => (
          <ThreadBubble key={`${ticket.id}-${i}`} message={m} />
        ))}
        {typing ? (
          <div className="bubble-row">
            <Avatar
              initials={AGENT.initials}
              tint={AGENT.tint}
              size={36}
              fontSize={13}
            />
            <TypingDots bubble label={`${AGENT.full} is typing`} />
          </div>
        ) : null}
      </div>

      <div className="th__composer">
        <TextArea
          id="th-reply"
          value={reply}
          placeholder="Write a reply…"
          minHeight={84}
          ariaLabel="Write a reply"
          className="th__replybox"
          onChange={(v) => set({ reply: v })}
        />
        <div className="th__actions">
          <div className="th__actions-left">
            <ButtonSecondary
              icon="paperclip"
              iconSize={15}
              title="Attach a file"
              className="th__act"
              onClick={() =>
                showToast("Attachments aren't available in this demo", "info")
              }
            >
              Attach
            </ButtonSecondary>
            {canSolve(ticket) ? (
              <ButtonSecondary
                icon="check-circle-2"
                iconSize={15}
                tone="var(--pos)"
                className="th__act"
                onClick={markSolved}
              >
                Mark as solved
              </ButtonSecondary>
            ) : null}
          </div>
          <ButtonPrimary
            icon="send"
            iconSize={16}
            size="md"
            disabled={!canSend}
            onClick={sendReply}
          >
            Send reply
          </ButtonPrimary>
        </div>
      </div>
    </main>
  );
}
