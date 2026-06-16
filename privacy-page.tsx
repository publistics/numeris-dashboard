'use client';

import LegalLayout from '@/components/LegalLayout';

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <p className="text-sm text-slate-500 mb-6">Last updated: March 2026</p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Information We Collect</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        When you use Numeris, we collect information necessary to provide our financial operating system. This includes account information (name, email, store URLs), financial data from connected platforms (sales transactions, ad spend, bank transactions), and usage data to improve our service.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. How We Use Your Information</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        We use your information solely to provide, maintain, and improve the Numeris Platform. This includes calculating financial metrics, generating reports, reconciling transactions, and providing customer support.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. Data Security</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        We implement industry-standard security measures including encryption at rest and in transit, regular security audits, and strict access controls. Your financial data is stored securely and is never shared with third parties without your explicit consent.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Data Retention</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        We retain your data for as long as your account is active. Upon account cancellation, we will delete your data within 30 days unless required by law to retain it.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Third-Party Services</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Numeris integrates with third-party services (Shopify, Amazon, Meta, Google, Plaid) to provide its core functionality. Each service has its own privacy policy governing how they handle your data. We only request the minimum permissions necessary for the Platform to function.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">6. Your Rights</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        You have the right to access, correct, or delete your personal data at any time. You can manage your data through your account settings or by contacting our support team.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">7. Contact</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        For privacy-related inquiries, please contact us through our Support page.
      </p>
    </LegalLayout>
  );
}