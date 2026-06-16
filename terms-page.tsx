'use client';

import LegalLayout from '@/components/LegalLayout';

export default function TermsPage() {
  return (
    <LegalLayout title="Terms of Service">
      <p className="text-sm text-slate-500 mb-6">Last updated: March 2026</p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">1. Acceptance of Terms</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        By accessing or using Numeris (&ldquo;the Platform&rdquo;), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">2. Description of Service</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Numeris provides a unified financial operating system for e-commerce entrepreneurs. The Platform connects to your sales channels, ad platforms, and bank accounts to provide real-time profit tracking, reconciliation, and financial analysis.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">3. User Responsibilities</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate information and keep it updated.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">4. Data Privacy</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        We take your data privacy seriously. Please refer to our Privacy Policy for detailed information on how we collect, use, and protect your data.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">5. Limitation of Liability</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        Numeris shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">6. Changes to Terms</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        We reserve the right to modify these terms at any time. We will notify users of material changes via email or through the Platform.
      </p>

      <h2 className="text-xl font-semibold text-slate-900 mt-8 mb-3">7. Contact</h2>
      <p className="text-slate-700 leading-relaxed mb-4">
        For questions about these terms, please contact us through our Support page.
      </p>
    </LegalLayout>
  );
}