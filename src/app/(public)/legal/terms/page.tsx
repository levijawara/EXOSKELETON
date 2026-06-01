import { LegalPage } from "@/app/(public)/legal/_components/LegalPage";

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service">
      <p>
        Placeholder Terms of Service. Replace with a real ToS before any public
        launch.
      </p>
      <h2>Acceptable use</h2>
      <p>
        Don’t break the law, don’t abuse the platform, and don’t attempt to
        access data you don’t own.
      </p>
      <h2>Accounts</h2>
      <p>
        You’re responsible for keeping your credentials secure. We may suspend
        accounts to protect the service, users, or our legal obligations.
      </p>
      <h2>Disclaimers</h2>
      <p>
        The service is provided “as-is” without warranties. Liability is limited
        to the maximum extent permitted by law.
      </p>
    </LegalPage>
  );
}

