/*
 * `mytickets` — My tickets (port spec §6.9, logic §8.5).
 *
 * max-width 820. An email lookup card (no validation at all — spec §9.2) over
 * the ticket list, sorted newest-activity-first by `useTickets()`.
 */

import {
  ButtonPrimary,
  Card,
  Icon,
  TextInput,
  TicketRow,
} from "../components";
import { pluralise } from "../lib/format";
import { useAppStore, useTickets } from "../state/store";
import "../styles/screen-mytickets.css";

export default function MyTickets() {
  const tickets = useTickets();
  const mtEmail = useAppStore((s) => s.mtEmail);
  const mtSubmitted = useAppStore((s) => s.mtSubmitted);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const openThread = useAppStore((s) => s.openThread);

  const showMyTickets = () => {
    set({ mtSubmitted: true });
    showToast(`Showing tickets for ${mtEmail}`);
  };

  return (
    <main className="fx-screen fx-page w-820 mt">
      <h1 className="mt__title">My tickets</h1>
      <p className="mt__lede">
        Look up your open and past conversations with us.
      </p>

      <Card className="mt__lookup">
        <div className="mt__field">
          <label className="mt__label" htmlFor="mt-email">
            Email address
          </label>
          <TextInput
            id="mt-email"
            type="email"
            value={mtEmail}
            placeholder="you@example.com"
            className="mt__input"
            onChange={(v) => set({ mtEmail: v })}
          />
        </div>
        <ButtonPrimary
          icon="search"
          iconSize={16}
          className="mt__go"
          onClick={showMyTickets}
        >
          Show my tickets
        </ButtonPrimary>
      </Card>

      <p className="mt__help">
        <Icon name="info" size={14} />
        We'll show tickets for this address — demo data.
      </p>

      {mtSubmitted ? (
        <>
          <p className="mt__count">{pluralise(tickets.length, "ticket")}</p>
          <div className="mt__list">
            {tickets.map((t) => (
              <TicketRow
                key={t.id}
                ticket={t}
                onClick={() => openThread(t.id)}
              />
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
