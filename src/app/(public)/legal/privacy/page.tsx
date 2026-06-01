import { LegalPage } from "@/app/(public)/legal/_components/LegalPage";

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This is a starter privacy policy placeholder. Replace it with counsel-reviewed
        language for your product before launch.
      </p>
      <h2>Data we collect</h2>
      <ul>
        <li>Account data (email, authentication metadata)</li>
        <li>Usage data (events needed to operate and improve the product)</li>
        <li>Support messages you send us</li>
      </ul>
      <h2>How we use data</h2>
      <ul>
        <li>Provide and secure the service</li>
        <li>Prevent abuse and fraud</li>
        <li>Support and troubleshooting</li>
      </ul>
      <h2>Your choices</h2>
      <ul>
        <li>Request a copy of your data (export)</li>
        <li>Request deletion of your data</li>
      </ul>
      <p>
        Contact: <a href="mailto:support@example.com">support@example.com</a>
      </p>
    </LegalPage>
  );
}

