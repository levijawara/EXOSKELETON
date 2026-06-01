import { LegalPage } from "@/app/(public)/legal/_components/LegalPage";

export default function DisclaimerPage() {
  return (
    <LegalPage title="Disclaimer">
      <p>
        Placeholder disclaimer. Customize based on your product’s risk profile,
        including any AI usage disclosures if applicable.
      </p>
      <h2>No professional advice</h2>
      <p>
        Content provided by the service is for informational purposes only and
        does not constitute professional advice.
      </p>
      <h2>Availability</h2>
      <p>
        We may change, suspend, or discontinue features at any time. We’re not
        liable for downtime to the extent permitted by law.
      </p>
    </LegalPage>
  );
}

