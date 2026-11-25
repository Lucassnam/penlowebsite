import Link from "next/link";
import { LegalPage, Section, Mail, LINK_STYLE } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Terms of Use · Caret",
  description: "The terms that govern your use of the Caret iPad app.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" meta="Effective 24 November 2026">
      <p style={{ fontSize: "0.9rem", color: "#444", marginBottom: "2.5rem" }}>
        These terms are between you and Yeonjoo Yoo (&ldquo;we&rdquo;), who operates Caret, an iPad
        app that turns handwritten Apple Pencil marks on your documents into suggested edits. By
        signing in and continuing, you agree to them. Contact: <Mail />.
      </p>

      <Section title="Who can use Caret">
        <p>
          You must be 18 or older. You confirm this when you sign in. If you are under 18, do not
          use Caret.
        </p>
      </Section>

      <Section title="Your account">
        <p>
          You sign in with Apple. You are responsible for activity on your account. You can delete
          your account at any time in Settings, which permanently deletes it from our server. See
          the{" "}
          <Link href="/privacy" style={LINK_STYLE}>
            Privacy Policy
          </Link>{" "}
          for what that removes.
        </p>
      </Section>

      <Section title="Free use and the monthly allowance">
        <p>
          Caret is free. Each account includes 10 documents and 20 Converts per calendar month; the
          allowance resets at 00:00 UTC on the 1st. We may change the allowance. Changes apply from
          the next month. If a Convert fails because of a problem on our side, Caret usually gives it back automatically.
        </p>
      </Section>

      <Section title="Your documents">
        <p>
          You keep all rights to your documents. You give us permission only to process them as
          needed to run Caret, as described in the Privacy Policy: your iPad sends files to
          CloudConvert, and marked pages and document text go through our server to Google&apos;s
          Gemini API. You confirm you have the right to use any document you open in Caret.
        </p>
      </Section>

      <Section title="Suggested edits">
        <p>
          Caret suggests edits that you review. When it is not sure about a mark, it flags it for
          you to check. You are responsible for checking each change before you accept it and for
          the documents you create. Caret never changes your original file; accepted edits go into
          a new copy.
        </p>
      </Section>

      <Section title="Acceptable use">
        <p>
          Do not use Caret to break the law, to process content you have no right to use, or to
          interfere with or overload the service.
        </p>
      </Section>

      <Section title="Availability and changes">
        <p>
          Caret depends on third-party services and an internet connection for Convert. We do not
          promise it will always be available. We may change or end the service; if we do, your
          documents on your iPad stay on your iPad.
        </p>
      </Section>

      <Section title="No warranty and limit of liability">
        <p>
          Caret is provided &ldquo;as is&rdquo;. To the extent the law allows, we are not liable for
          indirect or consequential losses, or for losses from edits you accepted, and our total
          liability is limited to the amount you paid us, which for a free app is zero. Nothing here
          limits rights you have under law that cannot be limited.
        </p>
      </Section>

      <Section title="Apple">
        <p>
          Apple&apos;s standard Licensed Application End User License Agreement applies to your use
          of the app. Apple is not a party to these terms and has no obligation to provide support
          for Caret.
        </p>
      </Section>

      <Section title="Changes to these terms">
        <p>
          If we change these terms we will update this page and its date. Continued use after a
          change means you accept it.
        </p>
      </Section>
    </LegalPage>
  );
}
