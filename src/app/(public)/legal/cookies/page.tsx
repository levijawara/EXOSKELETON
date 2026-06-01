import { LegalPage } from "@/app/(public)/legal/_components/LegalPage";

export default function CookiesPage() {
  return (
    <LegalPage title="Cookie Policy">
      <p>
        This is a placeholder cookie policy. If you use analytics/ads/tracking,
        configure a consent banner and document categories here.
      </p>
      <h2>Categories</h2>
      <ul>
        <li>
          <strong>Strictly necessary</strong>: session/auth cookies required for
          the app to function
        </li>
        <li>
          <strong>Analytics</strong>: helps us understand how the product is used
        </li>
        <li>
          <strong>Marketing</strong>: ads and retargeting (optional)
        </li>
      </ul>
      <h2>Managing preferences</h2>
      <p>
        You can change your cookie preferences any time via the footer link once
        consent UI is enabled.
      </p>
    </LegalPage>
  );
}

