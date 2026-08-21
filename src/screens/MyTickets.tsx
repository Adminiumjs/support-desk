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
import { useT } from "../i18n";
import { counted } from "../lib/format";
import { useAppStore, useTickets } from "../state/store";
import "../styles/screen-mytickets.css";

export default function MyTickets() {
  const t = useT();
  const tickets = useTickets();
  const mtEmail = useAppStore((s) => s.mtEmail);
  const mtSubmitted = useAppStore((s) => s.mtSubmitted);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const openThread = useAppStore((s) => s.openThread);

  const showMyTickets = () => {
    set({ mtSubmitted: true });
    showToast(t("screensB.myTickets.showingFor", { email: mtEmail }));
  };

  return (
    <main className="fx-screen fx-page w-820 mt">
      <h1 className="mt__title">{t("screensB.myTickets.title")}</h1>
      <p className="mt__lede">{t("screensB.myTickets.lede")}</p>

      <Card className="mt__lookup">
        <div className="mt__field">
          <label className="mt__label" htmlFor="mt-email">
            {t("screensB.myTickets.emailLabel")}
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
          {t("screensB.myTickets.show")}
        </ButtonPrimary>
      </Card>

      <p className="mt__help">
        <Icon name="info" size={14} />
        {t("screensB.myTickets.help")}
      </p>

      {mtSubmitted ? (
        <>
          <p className="mt__count">{counted("count.ticket", tickets.length)}</p>
          <div className="mt__list">
            {tickets.map((ticket) => (
              <TicketRow
                key={ticket.id}
                ticket={ticket}
                onClick={() => openThread(ticket.id)}
              />
            ))}
          </div>
        </>
      ) : null}
    </main>
  );
}
