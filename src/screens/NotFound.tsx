/*
 * `404` — the wrong-turn page (port spec §6.7). max-width 620, fully static.
 *
 * Named `NotFound` because `404` is not a legal component identifier; the
 * view key it renders is still `"404"`.
 */

import { ButtonPrimary, ButtonSecondary, Icon } from "../components";
import { useAppStore } from "../state/store";
import "../styles/screen-404.css";

export default function NotFound() {
  const goHome = useAppStore((s) => s.goHome);
  const openTicket = useAppStore((s) => s.openTicket);

  return (
    <main className="fx-screen fx-page w-620 nf">
      <span className="nf__ico" aria-hidden="true">
        <Icon name="compass" size={38} />
      </span>
      <p className="nf__code">ERROR 404</p>
      <h1 className="nf__title">This page took a wrong turn.</h1>
      <p className="nf__body">
        The page you're looking for isn't here — it may have moved, or it
        hasn't been built for this demo yet.
      </p>
      <div className="nf__actions">
        <ButtonPrimary
          icon="life-buoy"
          iconSize={17}
          className="nf__btn"
          onClick={goHome}
        >
          Back to help center
        </ButtonPrimary>
        <ButtonSecondary
          icon="pen-line"
          iconSize={16}
          className="nf__btn nf__btn--ghost"
          onClick={openTicket}
        >
          Open a ticket
        </ButtonSecondary>
      </div>
    </main>
  );
}
