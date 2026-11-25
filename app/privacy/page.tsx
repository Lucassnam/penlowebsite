import Link from "next/link";
import { LegalPage, Section, List, Mail, LINK_STYLE } from "@/components/legal/LegalPage";

// Mirrors penlov2/docs/release/privacy-2026-11-24.md in the app repo. Edit both together.
export const metadata = {
  title: "Privacy Policy · Caret",
  description: "What leaves your iPad when you use Caret, who processes it, and how long it is kept.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" meta="Effective 24 November 2026">
      <p style={{ fontSize: "0.9rem", color: "#444", marginBottom: "2.5rem" }}>
        Caret (&ldquo;Caret&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) is an iPad app that turns handwritten Apple Pencil marks on your documents into suggested edits. This policy explains what information we collect, what leaves your iPad, who processes it, how we use and share it, how long it is kept, and the choices you have. It covers the Caret app and the website at usecaret.app. Caret is operated by Yeonjoo Yoo. Contact: <Mail />.
      </p>

      <Section title="The short version">
        <List
          items={[
            <>Your documents stay on your iPad. We do not upload your library.</>,
            <>When you tap Convert, the pages you marked and your document&apos;s text go through our server to Google&apos;s Gemini API to read your marks. Our server does not store them.</>,
            <>Some files go directly from your iPad to CloudConvert to be converted, and CloudConvert deletes them within 24 hours.</>,
            <>We do not use your documents to train AI models, we show no ads, we use no third-party tracking or analytics tools, and we do not sell your personal information.</>,
            <>You can delete your account in Settings at any time.</>,
          ]}
        />
      </Section>

      <Section title="Who can use Caret">
        <p>
          You must be 18 or older to use Caret. The app asks you to confirm this when you sign in, and we record that confirmation. Caret is not directed to children or to anyone under 18, and we do not knowingly collect information from anyone under 18. If we learn that we have collected information from someone under 18, we will delete it and close the account. If you believe someone under 18 is using Caret, please tell us at <Mail />.
        </p>
      </Section>

      <Section title="What stays on your iPad">
        <p>
          The documents you import, your pen marks, and the edited copies Caret makes are stored on your iPad, inside Caret. We do not upload your library. Deleting a document in Caret deletes it from your iPad. Because we do not have copies, we cannot recover a document you delete or lose.
        </p>
      </Section>

      <Section title="Information we collect">
        <p>
          <strong>Your account.</strong> You sign in with Apple. We receive a user ID and the email address Apple shares with us, which can be a private relay address if you choose Hide My Email. We store:
        </p>
        <div style={{ marginTop: "0.75rem" }}>
        <List
          items={[
            <>that user ID and email address;</>,
            <>your answers to the two optional onboarding questions;</>,
            <>when you agreed to AI processing and when you confirmed you are 18 or older;</>,
            <>counts of the documents and Converts you use each month, with each document&apos;s random ID and the time it was counted, and never its contents.</>,
          ]}
        />
        </div>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>In-app events.</strong> We record a small number of events linked to your account, such as that you signed in, finished or skipped the tutorial, agreed to AI processing, or confirmed you are 18 or older, with the time and small details such as which tutorial step you reached.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Content we process but do not keep.</strong> The pages and text you send when you tap Convert, and the files sent to CloudConvert, are processed as described below. Our server does not store them.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Messages you send us.</strong> If you email us, we receive your email address and whatever you include in your message.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Crash reports.</strong> If you have chosen in your iPad&apos;s settings to share analytics with app developers, Apple may share crash reports and similar diagnostics with us under Apple&apos;s own terms.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Our website.</strong> When you visit usecaret.app, we record page views and button clicks, the page that sent you to us, and any campaign tag in the link. We group visits using a code made by one-way scrambling your IP address and browser type together with the date, so the code changes every day; we do not store your raw IP address. We do not set cookies for visitors. If you join the waitlist or apply to try Caret, we store the email address and answers you give us. The company that hosts our website may keep standard server logs, such as IP addresses, under its own terms.
        </p>
      </Section>

      <Section title="When you import a Word file">
        <p>
          To show it on screen, your iPad sends the file directly, over an encrypted connection, to CloudConvert, a document-conversion service. CloudConvert converts it to PDF and sends it back to your iPad. The file does not pass through our server. CloudConvert states that it deletes uploaded files automatically after at most 24 hours and processes them only to convert them. The conversion job is labeled with your account&apos;s user ID so that only you can read its result.
        </p>
      </Section>

      <Section title="When you tap Convert">
        <p>
          Your iPad sends the pages you marked (as images, with your marks on them) and the text of your document, over an encrypted connection, to our server. Our server forwards them to Google&apos;s Gemini API so it can read your marks. Our server does not store the pages or the text. Under Google&apos;s terms for paid Gemini API use, Google does not use this content to improve its products; it logs requests for a limited period only to detect abuse.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          If you import a PDF, then on your first Convert of that document your iPad also sends the PDF directly to CloudConvert once, to create an editable Word copy. The same 24-hour limit applies.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          When you export an edited PDF, your iPad also sends the edited copy directly to CloudConvert to turn it back into a PDF. The same 24-hour limit applies.
        </p>
      </Section>

      <Section title="How we use information">
        <p>
          We use the information described above to:
        </p>
        <div style={{ marginTop: "0.75rem" }}>
        <List
          items={[
            <>provide, operate and maintain Caret, including your account, Convert and your free monthly allowance (10 documents and 20 Converts, which resets at 00:00 UTC on the 1st of each month);</>,
            <>keep Caret secure, and detect, prevent and investigate abuse, fraud and attempts to get around limits;</>,
            <>find and fix problems, and understand and improve how Caret works, using usage counts and in-app events;</>,
            <>respond to your messages and give support;</>,
            <>send you notices about Caret, such as changes to it or to our terms;</>,
            <>tell people who joined the waitlist about Caret;</>,
            <>comply with the law, respond to lawful requests, and enforce our <Link href="/terms" style={LINK_STYLE}>Terms of Use</Link>; and</>,
            <>protect the rights, safety and property of our users, us and others.</>,
          ]}
        />
        </div>
        <p style={{ marginTop: "0.75rem" }}>
          We do not use your documents, pages or text to train AI models, and we do not use them to improve Caret.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          We may create information that is aggregated or de-identified so that it no longer identifies you, such as the total number of Converts in a month, and we may use and share it for any lawful purpose.
        </p>
      </Section>

      <Section title="How we share information">
        <p>
          We share information only as follows:
        </p>
        <div style={{ marginTop: "0.75rem" }}>
        <List
          items={[
            <><strong>Service providers</strong> that process it for us to run Caret: Supabase (accounts and our server), Google (the Gemini API, to read your marks), CloudConvert (document conversion), Apple (Sign in with Apple and crash reports), and the company that hosts our website. Each processes information under its own terms.</>,
            <><strong>Legal reasons</strong>, when we believe in good faith that it is needed to comply with the law or a legal process, respond to lawful requests from authorities, enforce our terms, or protect the rights, safety or property of anyone, including us.</>,
            <><strong>Business transfers</strong>, if Caret is involved in a merger, acquisition, financing, reorganization, bankruptcy, or sale of all or part of its assets. Your information may be transferred as part of that transaction.</>,
            <><strong>With your permission</strong>, or when you direct us to share it.</>,
            <><strong>Aggregated or de-identified information</strong>, as described above.</>,
          ]}
        />
        </div>
      </Section>

      <Section title="No sale, no ads, no tracking">
        <p>
          We do not sell your personal information, and we do not share it for cross-context behavioral advertising, as those terms are defined under California law, and we have not done so in the past 12 months. We do not show ads. We do not use third-party analytics or advertising tools, and we do not track you across other companies&apos; apps or websites. Because we do not track you across sites, Caret does not change its behavior in response to &ldquo;Do Not Track&rdquo; or Global Privacy Control signals; there is no tracking for them to turn off.
        </p>
      </Section>

      <Section title="How long we keep information">
        <p>
          We keep information for as long as your account exists, or as long as needed for the purposes in this policy, including to comply with legal obligations, resolve disputes and enforce our agreements. In particular:
        </p>
        <div style={{ marginTop: "0.75rem" }}>
        <List
          items={[
            <>Account data, usage counts and in-app events are kept until you delete your account, and are then deleted from our server. We may keep information longer only where the law requires it, for example to respond to a legal request we received before you deleted your account. Deleted information may remain for a limited time in backups kept by our hosting provider before it is overwritten.</>,
            <>We may delete accounts that have not been used for a long time.</>,
            <>CloudConvert keeps your files for at most 24 hours.</>,
            <>Our server does not store your pages or document text.</>,
            <>Google logs Gemini requests for a limited period only to detect abuse.</>,
            <>Emails you send us are kept as long as needed to help you and to keep a record of our conversation.</>,
            <>Website visit records and waitlist entries are kept until we no longer need them, or until you ask us to remove your entry.</>,
          ]}
        />
        </div>
      </Section>

      <Section title="Deleting your account">
        <p>
          In Caret, open Settings and tap Delete account. This permanently deletes your account, your profile, your usage counts and your events from our server. Documents on your iPad stay until you delete them or delete the app.
        </p>
      </Section>

      <Section title="Security">
        <p>
          We use reasonable measures to protect information, including encrypted connections, database rules that let each account reach only its own records, and conversion jobs labeled so that only you can read their results. No method of sending or storing information is completely secure, so we cannot guarantee its security. You are responsible for keeping your iPad and your Apple Account secure; documents on your iPad are protected by your iPad&apos;s own security. If a security incident affects your information, we will notify you where the law requires.
        </p>
      </Section>

      <Section title="Where information is processed">
        <p>
          Our service providers may process and store information in the United States and in other countries where they or their own providers operate. The laws there may differ from the laws where you live. By using Caret, you understand that your information will be transferred to and processed in those places.
        </p>
      </Section>

      <Section title="Your rights and choices">
        <List
          items={[
            <><strong>Delete your account</strong> at any time in Settings.</>,
            <><strong>Ask us</strong> to give you access to, correct, or delete your information, or to give you a copy of it, by emailing <Mail />. We reply within 30 days. We may need to confirm that the request comes from you, for example by asking you to write from the email address linked to your account.</>,
            <><strong>Stop using Convert</strong> at any time. Nothing leaves your iPad for Convert unless you tap it.</>,
            <><strong>Leave the waitlist</strong> by emailing us.</>,
          ]}
        />
        <p style={{ marginTop: "0.75rem" }}>
          <strong>California residents.</strong> You have the right to know what personal information we collect, use and disclose; to ask us to delete or correct it; to opt out of its sale or sharing (we do not sell or share it); to limit the use of sensitive personal information (we do not use any to infer things about you); and not to be treated differently for using these rights. The categories we collect are identifiers (your user ID and email address), internet or other electronic activity (usage counts, in-app events, and website visits), and the content you send for processing, which our server does not keep. We collect it from you, your device and Apple, for the purposes and with the recipients described above. You can use your rights yourself by emailing us, or through an authorized agent, whom we may ask to show your signed permission. We do not share personal information with third parties for their own direct marketing.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>Other places.</strong> Depending on where you live, you may have similar rights. Email us, and we will respond as the law that applies to you requires.
        </p>
      </Section>

      <Section title="Changes to this policy">
        <p>
          We may update this policy from time to time. We will post the new version here with a new effective date, and if a change is significant we may also tell you in the app or by email. The updated policy applies from its effective date. If you keep using Caret after that, the updated policy applies to you; if you do not agree, stop using Caret and delete your account.
        </p>
      </Section>

      <Section title="Contact">
        <p>
          Yeonjoo Yoo, <Mail />.
        </p>
      </Section>
    </LegalPage>
  );
}
