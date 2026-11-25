import { LegalPage, Section, List, Mail } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Privacy Policy · Caret",
  description: "What leaves your iPad when you use Caret, who processes it, and how long it is kept.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" meta="Effective 24 November 2026">
      <p style={{ fontSize: "0.9rem", color: "#444", marginBottom: "2.5rem" }}>
        Caret (&ldquo;Caret&rdquo;, &ldquo;we&rdquo;) is an iPad app that turns handwritten Apple
        Pencil marks on your documents into suggested edits. This policy explains what leaves your
        iPad, who processes it, and how long it is kept. Caret is operated by Yeonjoo Yoo. Contact:{" "}
        <Mail />.
      </p>

      <Section title="Who can use Caret">
        <p>
          You must be 18 or older to use Caret. The app asks you to confirm this when you sign in,
          and we record that confirmation. Caret is not directed to children, and we do not
          knowingly collect information from anyone under 18.
        </p>
      </Section>

      <Section title="What stays on your iPad">
        <p>
          The documents you import, your pen marks, and the edited copies Caret makes are stored on
          your iPad, inside Caret. We do not upload your library. Deleting a document in Caret
          deletes it from your iPad.
        </p>
      </Section>

      <Section title="Your account">
        <p>
          You sign in with Apple. We receive a user ID and the email address Apple shares with us,
          which can be a private relay address if you choose Hide My Email. We store:
        </p>
        <List
          items={[
            "that user ID and email address;",
            "your answers to the two optional onboarding questions;",
            "the time you agreed to AI processing and the time you confirmed you are 18 or older;",
            "counts of the documents and Converts you use each month, with each document’s random ID and never its contents.",
          ]}
        />
        <p style={{ marginTop: "0.75rem" }}>
          We use this to run your account and your free monthly allowance (10 documents and 20
          Converts, which resets at 00:00 UTC on the 1st of each month).
        </p>
      </Section>

      <Section title="When you import a Word file">
        <p>
          To show it on screen, your iPad sends the file directly, over an encrypted connection, to
          CloudConvert, a document-conversion service. CloudConvert converts it to PDF and sends it
          back to your iPad. The file does not pass through our server. CloudConvert states that it
          deletes uploaded files automatically after at most 24 hours and processes them only to
          convert them. The conversion job is labeled with your account&apos;s user ID so that only
          you can read its result.
        </p>
      </Section>

      <Section title="When you tap Convert">
        <p>
          Your iPad sends the pages you marked (as images, with your marks on them) and the text of
          your document, over an encrypted connection, to our server. Our server forwards them to
          Google&apos;s Gemini API so it can read your marks. Our server does not store the pages or
          the text. Under Google&apos;s terms for paid Gemini API use, Google does not use this
          content to improve its products; it logs requests for a limited period only to detect
          abuse.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          If you import a PDF, then on your first Convert of that document your iPad also sends the
          PDF directly to CloudConvert once, to create an editable Word copy. The same 24-hour limit
          applies.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          When you export an edited PDF, your iPad also sends the edited copy directly to
          CloudConvert to turn it back into a PDF. The same 24-hour limit applies.
        </p>
      </Section>

      <Section title="Analytics">
        <p>
          We record a small number of in-app events linked to your account (for example, that you
          finished the tutorial, or that you confirmed you are 18 or older), to understand whether
          Caret works. We do not use third-party analytics or advertising tools, and we do not track
          you across other companies&apos; apps or websites.
        </p>
      </Section>

      <Section title="How long we keep data">
        <List
          items={[
            "Account data (user ID, email, onboarding answers, consent times) is kept until you delete your account.",
            "Usage counts and analytics events are deleted when you delete your account.",
            "CloudConvert keeps your files for at most 24 hours.",
            "Our server does not store your pages or document text.",
            "Google logs Gemini requests for a limited period only to detect abuse.",
          ]}
        />
      </Section>

      <Section title="Deleting your account">
        <p>
          In Caret, open Settings and tap Delete account. This permanently deletes your account,
          your profile, your usage counts and your events from our server. Documents on your iPad
          stay until you delete them or delete the app.
        </p>
      </Section>

      <Section title="Services we use">
        <p>
          Supabase (accounts and our server), CloudConvert (document conversion), Google Gemini API
          (reading your marks), and Apple (Sign in with Apple). Each processes data under its own
          terms.
        </p>
      </Section>

      <Section title="Your rights and changes">
        <p>
          You can ask us to access, correct or delete your information by emailing <Mail />; we
          reply within 30 days. If we change this policy we will update this page and its date.
        </p>
      </Section>
    </LegalPage>
  );
}
