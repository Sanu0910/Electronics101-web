import type { Metadata } from "next";
import { LegalPage, Clause } from "../LegalPage";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms under which Electronics 101 programmes, services and this website are provided.",
  alternates: { canonical: "/legal/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      updated="18 September 2026"
      intro="The terms on which programmes, services and this website are provided."
    >
      <Clause heading="Who you are contracting with">
        <p>
          These terms apply to programmes, workshops, courses, services and content
          provided by {site.name} through this website.
        </p>
      </Clause>

      <Clause heading="Enrolment and registration">
        <p>
          A place is confirmed once payment has completed on the payment provider&rsquo;s
          page and you have received confirmation. Seats are limited and allocated in
          the order they are confirmed.
        </p>
        <p>
          Concessional student rates are offered in good faith. You may be asked to
          show a valid institutional identity card.
        </p>
      </Clause>

      <Clause heading="Delivery of programmes">
        <p>
          Dates, timings and the delivery platform are published in advance. If a
          session must be rescheduled you will be told as early as possible and
          offered either the new date or a refund under the refund policy.
        </p>
      </Clause>

      <Clause heading="Material and intellectual property">
        <p>
          Study material, model files and recordings are provided for your own
          learning. They are not to be redistributed, resold or used for commercial
          training without written permission.
        </p>
      </Clause>

      <Clause heading="Conduct">
        <p>
          Sessions are small and interactive. Behaviour that prevents others from
          learning may result in removal without refund.
        </p>
      </Clause>

      <Clause heading="Limits of what is promised">
        <p>
          Programmes are educational. They do not guarantee employment, exam results,
          certification by any external authority, or any particular engineering
          outcome in your own work.
        </p>
      </Clause>

      <Clause heading="Independence">
        <p>
          {site.name} is an independent platform. Programmes are not affiliated with
          any government organisation, university or statutory authority unless
          explicitly stated for a specific programme.
        </p>
      </Clause>
    </LegalPage>
  );
}
