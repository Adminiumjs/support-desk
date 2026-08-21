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
import { useI18n } from "../i18n";
import { useAppStore } from "../state/store";
import "../styles/screen-newticket.css";

/** Hard cap on the description, mirrored by the counter (spec §9.3). */
const DESC_MAX = 1000;

export default function NewTicket() {
  const { t, number } = useI18n();
  const form = useAppStore((s) => s.form);
  const errs = useAppStore((s) => s.errs);
  const setForm = useAppStore((s) => s.setForm);
  const addAttachment = useAppStore((s) => s.addAttachment);
  const removeAttachment = useAppStore((s) => s.removeAttachment);
  const submitTicket = useAppStore((s) => s.submitTicket);

  return (
    <main className="fx-screen fx-page w-720 ntk">
      <h1 className="ntk__title">{t("screensB.newTicket.title")}</h1>
      <p className="ntk__lede">{t("screensB.newTicket.lede")}</p>

      <Card variant="form" className="ntk__form">
        {/* 1 — product */}
        <Field
          label={t("screensB.newTicket.product")}
          error={errs.product}
          className="ntk__group"
        >
          <ProductPicker
            label={t("screensB.newTicket.product")}
            products={dataSource.products()}
            value={form.product}
            onChange={(id) => setForm("product", id)}
          />
        </Field>

        {/* 2 — topic */}
        <Field
          label={t("screensB.newTicket.topic")}
          error={errs.topic}
          htmlFor="nt-topic"
        >
          <SelectField
            id="nt-topic"
            value={form.topic}
            placeholder={t("screensB.newTicket.topicPlaceholder")}
            options={dataSource.topics()}
            invalid={!!errs.topic}
            onChange={(v) => setForm("topic", v)}
          />
        </Field>

        {/* 3 — subject */}
        <Field
          label={t("screensB.newTicket.subject")}
          error={errs.subject}
          htmlFor="nt-subject"
        >
          <TextInput
            id="nt-subject"
            value={form.subject}
            invalid={!!errs.subject}
            placeholder={t("screensB.newTicket.subjectPlaceholder")}
            onChange={(v) => setForm("subject", v)}
          />
        </Field>

        {/* 4 — description */}
        <Field
          label={t("screensB.newTicket.description")}
          error={errs.desc}
          htmlFor="nt-desc"
          aside={
            <span className="sd-counter">
              {t("screensB.newTicket.counter", {
                used: number(form.desc.length),
                max: number(DESC_MAX),
              })}
            </span>
          }
        >
          <TextArea
            id="nt-desc"
            value={form.desc}
            invalid={!!errs.desc}
            maxLength={DESC_MAX}
            minHeight={130}
            placeholder={t("screensB.newTicket.descPlaceholder")}
            onChange={(v) => setForm("desc", v)}
          />
        </Field>

        {/* 5 — attachments */}
        <div className="ntk__group">
          <p className="sd-label" id="nt-attach-label">
            {t("screensB.newTicket.attachments")}
          </p>
          <div
            className="ntk__attach"
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
              className="ntk__addfile"
              onClick={addAttachment}
            >
              {t("screensB.newTicket.addFile")}
            </ButtonSecondary>
          </div>
        </div>

        <div className="ntk__foot">
          <p className="ntk__note">
            <Icon name="info" size={14} />
            {t("screensB.newTicket.simulated")}
          </p>
          <ButtonPrimary
            icon="send"
            iconSize={17}
            className="ntk__submit"
            onClick={submitTicket}
          >
            {t("screensB.newTicket.submit")}
          </ButtonPrimary>
        </div>
      </Card>
    </main>
  );
}
