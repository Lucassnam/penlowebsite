import Link from "next/link";
import { LegalPage, Section, List, Mail, LINK_STYLE } from "@/components/legal/LegalPage";

export const metadata = {
  title: "Support · Caret",
  description: "Help with Caret: contact, account deletion, what Caret supports, and your monthly allowance.",
};

export default function SupportPage() {
  return (
    <LegalPage eyebrow="Help" title="Caret Support" meta="For the Caret iPad app">
      <Section title="Contact">
        <p>
          Email <Mail /> and we will get back to you. Please say which iPad and iPadOS version you
          are on and what you were doing when the problem happened.
        </p>
      </Section>

      <Section title="Delete your account">
        <p>
          In Caret, open Settings (the person icon on Home) and tap Delete account. This
          permanently deletes your account, your profile, your usage counts and your events from our
          server. Documents on your iPad stay until you delete them or delete the app.
        </p>
      </Section>

      <Section title="What Caret supports">
        <List
          items={[
            "Word .docx files, and PDFs that contain real text (not scanned images).",
            "Deletions, insertions with a caret, replacements, and punctuation written on the line.",
            "Text in the body of your document, including table cells.",
            "Not supported yet: headers, footers and footnotes; Word tracked changes; scanned pages; .doc and .pages files.",
          ]}
        />
      </Section>

      <Section title="What you need">
        <List
          items={[
            "An iPad that supports Apple Pencil, and an Apple Pencil. A finger scrolls the page; the Pencil draws.",
            "An internet connection to tap Convert. Drawing, reviewing and exporting your marked-up PDF work offline.",
            "You must be 18 or older.",
          ]}
        />
      </Section>

      <Section title="Your monthly allowance">
        <p>
          Caret is free. Each account includes 10 documents and 20 Converts per calendar month. The
          allowance resets at 00:00 UTC on the 1st. If a Convert fails because of a problem on our
          side, Caret usually gives it back automatically.
        </p>
      </Section>

      <Section title="Your privacy">
        <p>
          Read what leaves your iPad and who processes it in the{" "}
          <Link href="/privacy" style={LINK_STYLE}>
            Privacy Policy
          </Link>
          . The{" "}
          <Link href="/terms" style={LINK_STYLE}>
            Terms of Use
          </Link>{" "}
          cover the rest.
        </p>
      </Section>
    </LegalPage>
  );
}
