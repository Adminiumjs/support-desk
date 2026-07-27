/*
 * `newticket` — Open a ticket (port spec §6.8, validation §9.1, logic §8.4).
 *
 * max-width 720. The five field groups are product / topic / subject /
 * description / attachments, then the simulated-replies note and the submit.
 * All behaviour lives on the store: `setForm` clears a field's error as it
 * changes, `submitTicket` validates, creates the ticket and navigates.
 */

import {
  AttachmentChip,
  ButtonPrimary,
  ButtonSecondary,
  Card,
  Field,
  Icon,
  ProductPicker,
  SelectField,
  TextArea,
  TextInput,
} from "../components";
import { dataSource } from "../data/source";
import { useAppStore } from "../state/store";
import "../styles/screen-newticket.css";

/** Hard cap on the description, mirrored by the counter (spec §9.3). */
const DESC_MAX = 1000;

export default function NewTicket() {
  const form = useAppStore((s) => s.form);
  const errs = useAppStore((s) => s.errs);
  const setForm = useAppStore((s) => s.setForm);
  const addAttachment = useAppStore((s) => s.addAttachment);
  const removeAttachment = useAppStore((s) => s.removeAttachment);
  const submitTicket = useAppStore((s) => s.submitTicket);

  return (
    <main className="fx-screen fx-page w-720 nt">
      <h1 className="nt__title">Open a ticket</h1>
      <p className="nt__lede">
        Tell us what's going on and we'll get back to you. The more detail, the
        faster we can help.
      </p>

      <Card variant="form" className="nt__form">
        {/* 1 — product */}
        <Field
          label="Which product?"
          error={errs.product}
          className="nt__group"
        >
          <ProductPicker
            label="Which product?"
            products={dataSource.products()}
            value={form.product}
            onChange={(id) => setForm("product", id)}
          />
        </Field>

        {/* 2 — topic */}
        <Field label="Topic" error={errs.topic} htmlFor="nt-topic">
          <SelectField
            id="nt-topic"
            value={form.topic}
            placeholder="Choose a topic…"
            options={dataSource.topics()}
            invalid={!!errs.topic}
            onChange={(v) => setForm("topic", v)}
          />
        </Field>

        {/* 3 — subject */}
        <Field label="Subject" error={errs.subject} htmlFor="nt-subject">
          <TextInput
            id="nt-subject"
            value={form.subject}
            invalid={!!errs.subject}
            placeholder={'A short summary, e.g. "Doorbell offline every night"'}
            onChange={(v) => setForm("subject", v)}
          />
        </Field>

        {/* 4 — description */}
        <Field
          label="Description"
          error={errs.desc}
          htmlFor="nt-desc"
          aside={
            <span className="sd-counter">
              {form.desc.length}/{DESC_MAX}
            </span>
          }
        >
          <TextArea
            id="nt-desc"
            value={form.desc}
            invalid={!!errs.desc}
            maxLength={DESC_MAX}
            minHeight={130}
            placeholder="What's happening? Include what you've already tried, any error messages, and when it started."
            onChange={(v) => setForm("desc", v)}
          />
        </Field>

        {/* 5 — attachments */}
        <div className="nt__group">
          <p className="sd-label" id="nt-attach-label">
            Attachments
          </p>
          <div
            className="nt__attach"
            role="group"
            aria-labelledby="nt-attach-label"
          >
            {form.attachments.map((f) => (
              <AttachmentChip key={f} name={f} onRemove={removeAttachment} />
            ))}
            <ButtonSecondary
              dashed
              icon="plus"
              iconSize={14}
              className="nt__addfile"
              onClick={addAttachment}
            >
              Add file
            </ButtonSecondary>
          </div>
        </div>

        <div className="nt__foot">
          <p className="nt__note">
            <Icon name="info" size={14} />
            Replies in this demo are simulated.
          </p>
          <ButtonPrimary
            icon="send"
            iconSize={17}
            className="nt__submit"
            onClick={submitTicket}
          >
            Submit ticket
          </ButtonPrimary>
        </div>
      </Card>
    </main>
  );
}
