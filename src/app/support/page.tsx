'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, MessageSquare, Send, ArrowLeft } from 'lucide-react';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">N</span>
            </div>
            <span className="text-lg font-bold text-slate-900">Numeris</span>
          </Link>
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">← Back to Home</Link>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 rounded-lg bg-indigo-100">
            <MessageSquare size={24} className="text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Contact Support</h1>
        </div>
        <p className="text-slate-600 mb-8">We typically respond within 2-4 hours during business hours.</p>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send size={28} className="text-emerald-600" />
            </div>
            <h2 className="text-xl font-semibold text-slate-900 mb-2">Message Sent!</h2>
            <p className="text-sm text-slate-600">We&apos;ll get back to you within 2-4 hours. In the meantime, check out our dashboard.</p>
            <a href="/dashboard" className="inline-block mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors">
              Go to Dashboard
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                <input type="text" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input type="email" required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
              <select className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none">
                <option>Billing Question</option>
                <option>Technical Issue</option>
                <option>Account Support</option>
                <option>Feature Request</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea rows={5} required className="w-full px-4 py-2.5 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none resize-none" />
            </div>
            <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm">
              <Send size={16} /> Send Message
            </button>
          </form>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-slate-500">
          <span>&copy; 2026 Numeris Financial OS. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-slate-700">Terms</Link>
            <Link href="/privacy" className="hover:text-slate-700">Privacy</Link>
            <Link href="/support" className="hover:text-slate-700">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}