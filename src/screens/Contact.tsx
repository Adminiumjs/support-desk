/*
 * `contact` — Contact us (port spec §6.11, logic §8.10). Max-width 900.
 *
 * Ruling R2 (preserved): the "How returns work" link on THIS screen opens the
 * `a_return` ARTICLE, not the returns wizard. The comp overrides `gotoReturns`
 * inside `contactVals()` and that is deliberate — do not "fix" it.
 *
 * The note form uses the single all-or-nothing check from §9.2: a failure is
 * one warn toast, never per-field errors.
 */

import { ButtonPrimary, Icon, TextArea, TextInput } from "../components";
import { useAppStore } from "../state/store";
import "../styles/screen-contact.css";

const MSG_CAP = 800;
const MSG_MIN = 10;

export default function Contact() {
  const cName = useAppStore((s) => s.cName);
  const cEmail = useAppStore((s) => s.cEmail);
  const cMsg = useAppStore((s) => s.cMsg);
  const set = useAppStore((s) => s.set);
  const showToast = useAppStore((s) => s.showToast);
  const openChat = useAppStore((s) => s.openChat);
  const openTicket = useAppStore((s) => s.openTicket);
  const openArticle = useAppStore((s) => s.openArticle);

  const sendContact = () => {
    if (!cName.trim() || !cEmail.trim() || cMsg.trim().length < MSG_MIN) {
      showToast("Add your name, email and a short message", "warn");
      return;
    }
    set({ cName: "", cEmail: "", cMsg: "" });
    showToast("Message sent — we'll reply within a day");
  };

  return (
    <main className="oh-screen oh-page w-900 con">
      <h1 className="con__h1">Contact us</h1>
      <p className="con__lede">
        Support is open Monday to Friday, 8am–7pm UK time, and Saturday 9am–2pm.
        Pick whichever channel suits you.
      </p>

      <div className="con__channels">
        <button type="button" className="sd-card oh-card con__ch" onClick={openChat}>
          <span className="sd-accent-tile con__ch-tile">
            <Icon name="message-circle" size={21} />
          </span>
          <span className="con__ch-title">Live chat</span>
          <span className="con__ch-body">
            Fastest option. Typical wait under two minutes.
          </span>
          <span className="con__ch-online">
            <span className="con__dot" aria-hidden="true" />
            Online now
          </span>
        </button>

        <div className="sd-card con__ch">
          <span className="sd-accent-tile con__ch-tile">
            <Icon name="mail" size={21} />
          </span>
          <span className="con__ch-title">Email</span>
          <span className="con__ch-body">We reply within one working day.</span>
          <span className="con__ch-chip">help@hearth.example</span>
        </div>

        <div className="sd-card con__ch">
          <span className="sd-accent-tile con__ch-tile">
            <Icon name="phone" size={21} />
          </span>
          <span className="con__ch-title">Phone</span>
          <span className="con__ch-body">
            Best for urgent install or safety questions.
          </span>
          <span className="con__ch-chip">+44 117 496 0110</span>
        </div>

        <button type="button" className="sd-card oh-card con__ch" onClick={openTicket}>
          <span className="sd-accent-tile con__ch-tile">
            <Icon name="pen-line" size={21} />
          </span>
          <span className="con__ch-title">Open a ticket</span>
          <span className="con__ch-body">
            Best when you can attach photos or logs.
          </span>
          <span className="con__ch-start">
            Start a ticket
            <Icon name="arrow-right" size={13} />
          </span>
        </button>
      </div>

      <div className="con__lower">
        <section className="sd-card con__form">
          <h2 className="con__form-title">Send us a note</h2>
          <p className="con__form-lede">
            For anything that isn't about a specific device.
          </p>

          <div className="con__fields">
            <div className="con__field">
              <label className="con__label" htmlFor="con-name">
                Your name
              </label>
              <TextInput
                id="con-name"
                value={cName}
                onChange={(v) => set({ cName: v })}
                placeholder="Sam Ashworth"
              />
            </div>

            <div className="con__field">
              <label className="con__label" htmlFor="con-email">
                Email
              </label>
              <TextInput
                id="con-email"
                type="email"
                value={cEmail}
                onChange={(v) => set({ cEmail: v })}
                placeholder="you@example.com"
              />
            </div>

            <div className="con__field">
              <label className="con__label" htmlFor="con-msg">
                Message
              </label>
              <TextArea
                id="con-msg"
                value={cMsg}
                onChange={(v) => set({ cMsg: v })}
                placeholder="How can we help?"
                maxLength={MSG_CAP}
                minHeight={120}
              />
            </div>

            <ButtonPrimary
              icon="send"
              className="con__send"
              onClick={sendContact}
            >
              Send message
            </ButtonPrimary>
          </div>
        </section>

        <aside className="con__aside">
          <div className="con__map">
            <Icon name="map-pin" size={58} className="con__map-icon" />
            <span className="con__fname">map-bristol.png</span>
          </div>

          <div className="sd-card con__info">
            <p className="sd-eyebrow">Head office</p>
            <p className="con__info-name">Hearth Home Ltd.</p>
            <p className="con__info-body">
              Unit 4, Ellery Works
              <br />
              24 Ellery Lane
              <br />
              Bristol BS1 4TR
              <br />
              United Kingdom
            </p>
          </div>

          <div className="sd-card con__info">
            <p className="sd-eyebrow">Returns depot</p>
            <p className="con__info-body">
              Don't post returns to the office — start a return first and use
              the prepaid label you get by email.
            </p>
            {/* Ruling R2 (preserved): the article, not the wizard. */}
            <button
              type="button"
              className="oh-nav con__returns"
              onClick={() => openArticle("a_return")}
            >
              How returns work
              <Icon name="arrow-right" size={13} />
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
