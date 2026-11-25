import Link from "next/link";
import { LegalPage, Section, List, Mail, LINK_STYLE } from "@/components/legal/LegalPage";

// Mirrors penlov2/docs/release/terms-2026-11-24.md in the app repo. Edit both together.
export const metadata = {
  title: "Terms of Use · Caret",
  description: "The terms that govern your use of the Caret iPad app.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" meta="Effective 24 November 2026">
      <p style={{ fontSize: "0.9rem", color: "#444", marginBottom: "1rem" }}>
        These Terms of Use (&ldquo;terms&rdquo;) are an agreement between you and Yeonjoo Yoo (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;), who operates Caret. Caret is an iPad app that turns handwritten Apple Pencil marks on your documents into suggested edits. In these terms, &ldquo;Caret&rdquo; means the app, the website at usecaret.app, and the online services the app uses. By signing in, continuing, or otherwise using Caret, you agree to these terms and to our <Link href="/privacy" style={LINK_STYLE}>Privacy Policy</Link>. If you do not agree, do not use Caret. Contact: <Mail />.
      </p>
      <p style={{ fontSize: "0.9rem", color: "#444", marginBottom: "2.5rem" }}>
        <strong>Please read Section 17 carefully. It requires you and us to resolve most disputes through binding individual arbitration instead of in court, and it waives class actions. You can opt out of arbitration within 30 days. Sections 13 and 14 limit our responsibility to you.</strong>
      </p>

      <Section title="1. Who can use Caret">
        <p>
          You must be 18 or older and able to enter into a binding contract. By using Caret, you confirm that you are 18 or older. The app also asks you to confirm this when you sign in. If you are under 18, do not use Caret. If we learn that an account belongs to someone under 18, we will close it and delete its data. You may not use Caret if the laws that apply to you forbid it, or if we have previously suspended or closed your account.
        </p>
      </Section>

      <Section title="2. Your license to use Caret">
        <p>
          As long as you follow these terms, we give you a limited, personal, non-exclusive, non-transferable, non-sublicensable and revocable license to download and use the Caret app on Apple-branded products that you own or control, as allowed by the Usage Rules in Apple&apos;s Media Services Terms and Conditions. Other accounts linked to you through Family Sharing or volume purchasing may also use it as those rules allow. We and our licensors own Caret, including its software, design and branding. We keep every right that these terms do not expressly give you.
        </p>
      </Section>

      <Section title="3. Your account">
        <p>
          You sign in with Apple. You are responsible for keeping your Apple Account secure and for all activity on your Caret account. Tell us right away at <Mail /> if you think someone used your account without permission. You may not share, sell or transfer your account. You can delete your account at any time in Settings, which permanently deletes your account data from our server. The <Link href="/privacy" style={LINK_STYLE}>Privacy Policy</Link> explains what that removes.
        </p>
      </Section>

      <Section title="4. Free use and the monthly allowance">
        <p>
          Caret is free. Each account currently includes 10 documents and 20 Converts per calendar month, and the allowance resets at 00:00 UTC on the 1st. Unused allowance does not carry over and has no cash value. If a Convert fails because of a problem on our side, Caret usually gives it back automatically, but we do not promise that it will. We may change, reduce or remove the allowance, limit how often Caret can be used, or set other limits, at any time, with or without notice. If we ever offer paid features, we will show you the price and terms before you pay, and we will not charge you without your agreement.
        </p>
      </Section>

      <Section title="5. Your content">
        <p>
          &ldquo;Your content&rdquo; means the documents, pen marks, pages, text and anything else you open, create or send through Caret.
        </p>
        <div style={{ marginTop: "0.75rem" }}>
        <List
          items={[
            <><strong>You keep ownership.</strong> You keep all rights you have in your content.</>,
            <><strong>The permission you give us.</strong> You give us and our service providers a limited, worldwide, non-exclusive, royalty-free license to host, store, copy, transmit, process, convert and display your content, only as needed to operate, secure and support Caret for you and to comply with the law, as described in the <Link href="/privacy" style={LINK_STYLE}>Privacy Policy</Link>. This license ends when you stop using Caret, except as needed to finish processing you already started or to comply with the law.</>,
            <><strong>What we do not do.</strong> We do not use your content to train AI models, and we do not sell it.</>,
            <><strong>Your promises.</strong> You confirm that you own your content or have every right needed to use it in Caret and to send it to our service providers, and that your content and your use of Caret do not break any law or anyone&apos;s rights, including copyright, privacy and confidentiality.</>,
            <><strong>Sensitive information.</strong> Caret is not designed for health records, payment card data, government ID numbers, or other information that special laws regulate. Do not use Caret for that kind of information, or for content you are not allowed to share with service providers.</>,
            <><strong>Your copies.</strong> Your documents are stored on your iPad. You are responsible for keeping your own backups. If you delete the app, lose your iPad or it stops working, your documents may be lost, and we cannot recover them because we do not have copies.</>,
          ]}
        />
        </div>
      </Section>

      <Section title="6. Suggested edits and AI output">
        <p>
          Caret uses an AI service to read your marks and suggest edits. Suggestions can be wrong or incomplete, and Caret can misread handwriting. Caret flags marks it is unsure about, but it can also make mistakes without flagging them. Converting a file between Word and PDF can change its layout, fonts or formatting.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          You must review every change before you accept it. You are solely responsible for the documents you create, share, submit or rely on. Suggestions are not professional advice of any kind, including legal, academic, medical or financial advice. You are responsible for following any rules your school, employer or publisher has about using AI tools. Caret never changes your original file; accepted edits go into a new copy.
        </p>
      </Section>

      <Section title="7. Acceptable use">
        <p>
          You agree not to do, or help anyone else do, any of the following:
        </p>
        <div style={{ marginTop: "0.75rem" }}>
        <List
          items={[
            <>use Caret for anything unlawful, or to create, process or share content that is unlawful, infringing, defamatory, harassing or otherwise harmful;</>,
            <>use content you do not have the right to use;</>,
            <>copy, modify or create derivative works of Caret, or decompile, disassemble, reverse engineer or try to extract its source code or the way it works, except where the law allows this despite this limit;</>,
            <>use Caret&apos;s AI or conversion features for anything other than editing your own documents in the app, including calling our server from outside the app, scraping Caret, or using what Caret produces to build a competing product or train an AI model;</>,
            <>access Caret with bots, scripts or other automated means, or send more requests than a person using the app normally would;</>,
            <>get around, or try to get around, the allowance, usage limits, account checks, the age confirmation or any security feature, including by creating extra accounts to get more allowance;</>,
            <>probe or test Caret for weaknesses, or interfere with, disrupt, damage or overload Caret, our servers or our service providers;</>,
            <>upload malware or harmful code;</>,
            <>pretend to be someone else, or misrepresent your connection with anyone;</>,
            <>sell, rent, lend, sublicense or resell Caret or access to it; or</>,
            <>use Caret in a way that breaks the terms of any service it relies on.</>,
          ]}
        />
        </div>
        <p style={{ marginTop: "0.75rem" }}>
          If you find a security problem, please tell us at <Mail />.
        </p>
      </Section>

      <Section title="8. Third-party services">
        <p>
          Caret relies on services run by other companies, including Apple (Sign in with Apple and the App Store), Google (the Gemini API, which reads your marks), CloudConvert (document conversion) and Supabase (accounts and our server). Their services are governed by their own terms and privacy policies. To the extent the law allows, we are not responsible for what they do, for their availability, or for how they handle information under their own terms. When you use Caret, you must also follow any third-party terms that apply to you, such as your internet or wireless data agreement and Apple&apos;s terms.
        </p>
      </Section>

      <Section title="9. Changes, suspension and ending">
        <List
          items={[
            <><strong>Changes to Caret.</strong> We may change, add or remove features, and we may suspend, limit or stop any part of Caret or all of it, or change the allowance, at any time, for any reason, with or without notice, and to the extent the law allows, without liability to you. You may need to install an update to keep using Caret.</>,
            <><strong>Suspension or closing by us.</strong> We may suspend, limit or close your account or access, with or without notice, if we reasonably believe you broke these terms, misused Caret, or created risk or legal exposure for us or others, or if the law requires it.</>,
            <><strong>Ending by you.</strong> You may stop using Caret at any time and delete your account in Settings.</>,
            <><strong>What happens after.</strong> If Caret stops or your account is closed, the documents on your iPad stay on your iPad, but features that need our server or our service providers, such as Convert, Word import and exporting an edited PDF, will stop working.</>,
            <><strong>What continues.</strong> Sections 2 (ownership), 5, 6, and 10 through 18 continue to apply after these terms end.</>,
          ]}
        />
      </Section>

      <Section title="10. Feedback">
        <p>
          If you send us ideas, suggestions or other feedback, we may use them for any purpose without paying you or owing you anything.
        </p>
      </Section>

      <Section title="11. Privacy">
        <p>
          Our <Link href="/privacy" style={LINK_STYLE}>Privacy Policy</Link> explains what information leaves your iPad, who processes it, and how long it is kept. By using Caret, you agree that we may handle your information as it describes.
        </p>
      </Section>

      <Section title="12. Notices">
        <p>
          We may send you notices about Caret in the app or by email to the address Apple shares with us. You agree that electronic notices meet any legal requirement for written notice. You can send notices to us at <Mail />.
        </p>
      </Section>

      <Section title="13. No warranty">
        <p>
          <strong>To the maximum extent the law allows, Caret is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;, with all faults and without warranty of any kind. We and our service providers disclaim all warranties, whether express, implied or statutory, including warranties of merchantability, fitness for a particular purpose, title, non-infringement, quiet enjoyment and accuracy, and any warranties arising from a course of dealing or usage of trade. We do not promise that Caret will be available, uninterrupted, timely, secure or error-free; that its suggestions, conversions or other output will be accurate or complete or will keep your formatting; that defects will be fixed; or that your content will not be lost.</strong>
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          If Caret fails to meet a warranty that cannot be disclaimed under applicable law, you may notify Apple, and Apple will refund the purchase price of the app, if any. Caret is free, so that amount is zero. To the maximum extent the law allows, Apple has no other warranty obligation for Caret. Any other claims, losses, liabilities, damages, costs or expenses caused by a failure to meet a warranty are our responsibility only to the extent they cannot be disclaimed under these terms and the law.
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          Some places do not allow certain warranties to be excluded, so some of these exclusions may not apply to you.
        </p>
      </Section>

      <Section title="14. Limit of liability">
        <p>
          <strong>To the maximum extent the law allows, neither we nor our service providers or licensors will be liable for any indirect, incidental, special, consequential, exemplary or punitive damages, or for any loss of profits, revenue, data, documents or goodwill, or the cost of substitute services, arising from or relating to Caret or these terms. This includes damages caused by suggestions or edits you accepted, by conversions, or by Caret being unavailable. It applies however the damage is caused and under any legal theory, even if we were told it was possible.</strong>
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          <strong>To the maximum extent the law allows, our total liability for all claims arising from or relating to Caret or these terms is limited to the amount you paid us for Caret in the 12 months before the claim arose. Caret is free, so that amount is USD $0. If the law that applies to you does not allow a limit of USD $0, our total liability is limited to USD $50.</strong>
        </p>
        <p style={{ marginTop: "0.75rem" }}>
          These limits apply even if a limited remedy fails of its essential purpose. Nothing in these terms excludes or limits any liability that cannot be excluded or limited under the law that applies to you.
        </p>
      </Section>

      <Section title="15. Indemnity">
        <p>
          To the extent the law allows, you will defend, indemnify and hold harmless us and our service providers from any claims, liabilities, damages, losses, costs and expenses, including reasonable lawyers&apos; fees, that arise from: your content; your use or misuse of Caret; your breach of these terms; or your violation of any law or anyone else&apos;s rights. We may take over the defense of any such claim at your expense, and you will cooperate with us.
        </p>
      </Section>

      <Section title="16. Apple">
        <p>
          These terms apply to the Caret app you got from Apple&apos;s App Store, and you and we agree to the following:
        </p>
        <div style={{ marginTop: "0.75rem" }}>
        <List
          items={[
            <><strong>Agreement with us, not Apple.</strong> These terms are between you and us only, not Apple. We, not Apple, are solely responsible for the Caret app and its content.</>,
            <><strong>License.</strong> Your license to use the app is the one described in Section 2.</>,
            <><strong>Maintenance and support.</strong> We are solely responsible for any maintenance and support of the app, as these terms describe or as the law requires. Apple has no obligation to provide any maintenance or support for the app. We offer support by email at <Mail />, but we do not promise any particular response time or fix.</>,
            <><strong>Warranty.</strong> Warranties are covered in Section 13, including your right to notify Apple.</>,
            <><strong>Product claims.</strong> We, not Apple, are responsible for addressing any claims by you or anyone else relating to the app or your possession and use of it, including: (a) product liability claims; (b) any claim that the app fails to meet a legal or regulatory requirement; and (c) claims under consumer protection, privacy or similar laws. These terms do not limit our liability to you beyond what the law allows.</>,
            <><strong>Intellectual property claims.</strong> If anyone claims that the app, or your possession and use of it, infringes their intellectual property rights, we, not Apple, are solely responsible for investigating, defending, settling and discharging that claim.</>,
            <><strong>Legal compliance.</strong> You promise that you are not located in a country that is subject to a U.S. Government embargo or that the U.S. Government has designated as a &ldquo;terrorist supporting&rdquo; country, and that you are not on any U.S. Government list of prohibited or restricted parties. You will follow all U.S. and other export control and sanctions laws that apply to your use of Caret.</>,
            <><strong>Our name and contact details.</strong> Caret is operated by Yeonjoo Yoo. Send questions, complaints or claims about the app to <Mail />.</>,
            <><strong>Third-party terms.</strong> You must follow any third-party terms that apply when you use the app, as Section 8 explains.</>,
            <><strong>Apple as third-party beneficiary.</strong> You and we agree that Apple and its subsidiaries are third-party beneficiaries of these terms, and that once you accept these terms, Apple will have the right (and will be deemed to have accepted the right) to enforce them against you as a third-party beneficiary.</>,
            <><strong>Apple&apos;s standard terms.</strong> These terms are the end user license agreement for the Caret app. If Apple&apos;s standard Licensed Application End User License Agreement also applies to you, both apply, and these terms control where they differ, to the extent allowed.</>,
          ]}
        />
        </div>
      </Section>

      <Section title="17. Disputes and arbitration">
        <List
          items={[
            <><strong>Governing law.</strong> These terms, and any dispute arising from or relating to Caret or these terms, are governed by the laws of the State of California, USA, without regard to its conflict of law rules. The Federal Arbitration Act governs this Section&apos;s arbitration agreement.</>,
            <><strong>Try to resolve it first.</strong> Before starting arbitration or a court case, you agree to email us at <Mail /> with your name, the email you use with Caret, and a description of the dispute and what you want. We will contact you at that email. You and we will try in good faith to resolve the dispute for 60 days before either of us starts a formal proceeding.</>,
            <><strong>Binding individual arbitration.</strong> Except as described below, you and we agree that any dispute, claim or controversy arising from or relating to Caret or these terms will be resolved by binding arbitration on an individual basis, not in court. The American Arbitration Association (AAA) will administer the arbitration under its Consumer Arbitration Rules in effect at the time. There will be one arbitrator. The arbitration may take place by video call or on written submissions. The AAA&apos;s rules decide how fees are paid. The arbitrator may award the same individual relief a court could, and the arbitrator decides questions about the scope and enforceability of this arbitration agreement, except as the class action waiver below says.</>,
            <><strong>Exceptions.</strong> Either of us may bring an individual claim in small claims court if it qualifies. Either of us may also ask a court to stop the infringement or misuse of intellectual property, including reverse engineering or abuse of Caret&apos;s services.</>,
            <><strong>Class action waiver.</strong> You and we may bring claims against each other only individually, and not as a plaintiff or class member in any class, collective, consolidated or representative proceeding. The arbitrator may not combine more than one person&apos;s claims and may award relief only to the individual party asking for it. If a court decides that this waiver cannot be enforced for a particular claim or type of relief (such as public injunctive relief), that claim or relief will be separated from the arbitration and decided in court after the individual arbitration ends. Everything else will still be arbitrated.</>,
            <><strong>No jury.</strong> By agreeing to arbitration, you and we each give up the right to have a dispute decided by a judge or jury in court, except as these terms allow.</>,
            <><strong>Opting out.</strong> You can opt out of this arbitration agreement by emailing <Mail /> within 30 days after you first accept these terms. Include your name, the email you use with Caret, and a clear statement that you opt out of arbitration. Opting out does not affect any other part of these terms.</>,
            <><strong>Courts.</strong> Any dispute that is not arbitrated, other than a small claims case, will be decided only in the state or federal courts located in Santa Clara County, California, and you and we agree to the personal jurisdiction of those courts.</>,
            <><strong>Time limit.</strong> To the extent the law allows, any claim arising from or relating to Caret or these terms must be filed within one year after it arises, or it is permanently barred.</>,
            <><strong>Changes to this Section.</strong> If we change this Section after you accept it, you may reject the change by emailing us within 30 days after it takes effect, and this Section as you last accepted it will continue to apply to you. Changes never apply to a dispute that either of us has already given notice of.</>,
          ]}
        />
      </Section>

      <Section title="18. General terms">
        <List
          items={[
            <><strong>Changes to these terms.</strong> We may change these terms at any time. We will post the new version with a new effective date, and if a change is significant we may also tell you in the app or by email. A change takes effect when it is posted, unless we say otherwise. If you keep using Caret after a change takes effect, you accept the new terms. If you do not agree, stop using Caret and delete your account.</>,
            <><strong>Entire agreement.</strong> These terms and the <Link href="/privacy" style={LINK_STYLE}>Privacy Policy</Link>, together with any extra terms we show you in the app for a particular feature, are the entire agreement between you and us about Caret, and replace any earlier agreements about it.</>,
            <><strong>Severability.</strong> If any part of these terms cannot be enforced, that part will be enforced as far as possible or removed, and the rest stays in effect.</>,
            <><strong>No waiver.</strong> If we do not enforce a part of these terms, we have not given up our right to enforce it later.</>,
            <><strong>Assignment.</strong> You may not transfer these terms or your rights under them. We may transfer these terms, including as part of a merger, acquisition, sale of assets or reorganization, or by operation of law.</>,
            <><strong>Events outside our control.</strong> We are not responsible for delays or failures caused by events outside our reasonable control, including outages of the internet or of our service providers, natural disasters, and government action.</>,
            <><strong>Relationship.</strong> These terms do not create any partnership, employment, agency or joint venture between you and us.</>,
            <><strong>Interpretation.</strong> Headings are for convenience only. &ldquo;Including&rdquo; means &ldquo;including without limitation&rdquo;.</>,
            <><strong>Contact.</strong> Yeonjoo Yoo, <Mail />.</>,
          ]}
        />
      </Section>
    </LegalPage>
  );
}
