import type { Metadata } from "next";
import { LegalPage, Clause } from "../LegalPage";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "When a refund is available for an Electronics 101 workshop or course, and how to request one.",
  alternates: { canonical: "/legal/refunds" },
};

export default function RefundsPage() {
  return (
    <LegalPage
      title="Refund Policy"
      updated="18 September 2026"
      intro="When a refund is available, and how to ask for one."
    >
      <Clause heading="If we cancel or reschedule">
        <p>
          If a session is cancelled, you get a full refund. If it is rescheduled and
          the new date does not suit you, you get a full refund. No conditions attached
          to either.
        </p>
      </Clause>

      <Clause heading="If you cancel">
        <p>
          Cancel more than 72 hours before the start time and you receive a full
          refund. Within 72 hours a place has usually been held that could have gone to
          someone else, so a refund may not be possible — but ask, because
          circumstances differ.
        </p>
      </Clause>

      <Clause heading="Once a programme has started">
        <p>
          Refunds are not normally given after material and model files have been
          shared, since those cannot be returned. If the programme was not what was
          described, say so and it will be looked at properly.
        </p>
      </Clause>

      <Clause heading="How to request one">
        <p>
          Use the contact form with the email address used to register and the
          programme name. Approved refunds are returned by the original payment method
          and typically take five to seven working days to appear.
        </p>
      </Clause>

      <Clause heading="Transfers">
        <p>
          If you cannot attend, you may transfer your seat to a colleague or to a
          future run of the same programme at no charge. Tell us before it starts.
        </p>
      </Clause>
    </LegalPage>
  );
}
