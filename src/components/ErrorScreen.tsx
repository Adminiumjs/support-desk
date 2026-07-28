/*
 * The failed-load screen and the offline banner (delta spec C §3.1,
 * ruling R4).
 *
 * Both are store-connected. `<ErrorScreen />` replaces the whole `<main>`
 * when `viewGate()` says `error`; `<OfflineBanner />` sits between the
 * breadcrumbs and the screen body and is independent of the error state.
 *
 * Ruling R7: the second reassurance card's em dash is a real em dash here —
 * the comp left the escape sequence unrendered.
 */

import {
  ERR_CARDS,
  ERR_TEXT,
  ERR_TIME,
  OFFLINE_TEXT,
  OFFLINE_TITLE,
  errorCode,
  errorTitle,
} from "../lib/errors";
import { useAppStore } from "../state/store";
import { Icon } from "./Icon";
import { ButtonPrimary, ButtonSecondary } from "./Primitives";
import { columnClass } from "./chrome";

export function ErrorScreen() {
  const view = useAppStore((s) => s.view);
  const retryView = useAppStore((s) => s.retryView);
  const reportFailure = useAppStore((s) => s.reportFailure);
  const openChat = useAppStore((s) => s.openChat);
  const go = useAppStore((s) => s.go);

  return (
    <main className={`fx-page ${columnClass(view)}`} role="alert">
      <span className="err__ico">
        <Icon name="cloud-off" size={26} />
      </span>
      <h1 className="err__title">{errorTitle(view)}</h1>
      <p className="err__text">{ERR_TEXT}</p>
      <div className="err__codes">
        <span className="err__code">{errorCode(view)}</span>
        <span className="err__code">{ERR_TIME}</span>
      </div>
      <div className="err__actions">
        <ButtonPrimary icon="refresh-cw" onClick={retryView}>
          Try again
        </ButtonPrimary>
        <ButtonSecondary icon="activity" onClick={() => go("status")}>
          Check service status
        </ButtonSecondary>
        <ButtonSecondary icon="flag" onClick={reportFailure}>
          Report it
        </ButtonSecondary>
      </div>
      <div className="err__cards">
        {ERR_CARDS.map((card) => (
          <div className="err__card" key={card.title}>
            <span className="err__card-head">
              <Icon name={card.icon} size={16} />
              {card.title}
            </span>
            <p className="err__card-text">{card.text}</p>
            {card.action ? (
              <ButtonSecondary icon={card.action.icon} onClick={openChat}>
                {card.action.label}
              </ButtonSecondary>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}

/** The `--danger-soft` strip shown whenever the browser reports no network. */
export function OfflineBanner() {
  const offline = useAppStore((s) => s.offline);
  const retryConnection = useAppStore((s) => s.retryConnection);
  if (!offline) return null;

  return (
    <div className="offline" role="status">
      <span className="offline__ico">
        <Icon name="wifi-off" size={16} />
      </span>
      <span className="offline__title">{OFFLINE_TITLE}</span>
      <span className="offline__text">{OFFLINE_TEXT}</span>
      <button type="button" className="offline__btn fx-btn" onClick={retryConnection}>
        <Icon name="refresh-cw" size={14} />
        Retry now
      </button>
    </div>
  );
}

export default ErrorScreen;
