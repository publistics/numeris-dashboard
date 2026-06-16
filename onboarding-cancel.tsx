'use client';

import Link from 'next/link';
import { XCircle, ArrowRight } from 'lucide-react';

export default function OnboardingCancel() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 md:p-12 max-w-md w-full text-center">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle size={40} className="text-amber-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Checkout Cancelled</h1>
        <p className="text-slate-600 mb-4">Your checkout was cancelled. No charges were made.</p>
        <p className="text-sm text-slate-500 mb-8">You can try again anytime, or explore the demo dashboard first.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            View Plans <ArrowRight size={18} />
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 hover:border-slate-300 text-slate-700 font-medium rounded-xl transition-colors"
          >
            Demo Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}