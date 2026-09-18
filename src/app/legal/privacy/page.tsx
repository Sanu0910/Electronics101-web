import type { Metadata } from "next";
import { LegalPage, Clause } from "../LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What personal data Electronics 101 collects, why, and what happens to it.",
  alternates: { canonical: "/legal/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="18 September 2026"
      intro="What is collected, why, and what happens to it."
    >
      <Clause heading="What is collected">
        <p>
          When you submit an enquiry or feedback form: your name, email address,
          optionally a WhatsApp number, and whatever you write in the message.
        </p>
        <p>
          When you register for a paid programme, payment is handled entirely on the
          payment provider&rsquo;s own page. Card and banking details never reach this
          website and are never stored by {site.name}.
        </p>
      </Clause>

      <Clause heading="Why it is collected">
        <p>
          To reply to you, to deliver a programme you have registered for, and to send
          material relating to it. Not to build a marketing profile.
        </p>
      </Clause>

      <Clause heading="Feedback and publication">
        <p>
          Feedback is published only if you tick the permission box, and only after
          review. You can ask for it to be removed at any time.
        </p>
      </Clause>

      <Clause heading="Sharing">
        <p>
          Personal data is not sold. It is shared only with the service providers
          needed to run a programme — for example the payment provider and the
          platform a live session runs on.
        </p>
      </Clause>

      <Clause heading="Your choices">
        <p>
          You can ask what is held about you, ask for it to be corrected, or ask for it
          to be deleted. Use the contact form and the request will be actioned.
        </p>
      </Clause>

      <Clause heading="Analytics and cookies">
        <p>
          This site currently sets no advertising or tracking cookies. If analytics are
          added later, this policy will be updated before they go live rather than
          afterwards.
        </p>
      </Clause>
    </LegalPage>
  );
}
