'use client';
import { useState } from 'react';
import Link from 'next/link';
import { MessageSquare, Send, ArrowLeft, Clock, HelpCircle } from 'lucide-react';

export default function SupportPage() {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <nav className="border-b border-slate-100 bg-white/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/brand/numeris-logo.png" alt="Numeris" className="w-7 h-7 rounded-md object-cover" />
            <span className="text-lg font-bold text-slate-900">Numeris</span>
          </Link>
          <Link href="/" className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700 transition-colors"><ArrowLeft size={14} /> Back to Home</Link>
        </div>
      </nav>
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex items-center gap-4 mb-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-200"><MessageSquare size={24} className="text-white" /></div>
          <div><h1 className="text-3xl font-bold text-slate-900">Contact Support</h1><p className="text-sm text-slate-500 mt-1">We&apos;re here to help you succeed</p></div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="p-2 rounded-lg bg-indigo-50"><Clock size={18} className="text-indigo-600" /></div>
            <div><p className="text-xs text-slate-500 font-medium">Response Time</p><p className="text-sm font-semibold text-slate-900">2-4 hours</p></div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
            <div className="p-2 rounded-lg bg-emerald-50"><HelpCircle size={18} className="text-emerald-600" /></div>
            <div><p className="text-xs text-slate-500 font-medium">Hours</p><p className="text-sm font-semibold text-slate-900">Mon-Fri, 9am-6pm ET</p></div>
          </div>
        </div>
        {submitted ? (
          <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 border border-emerald-200 rounded-2xl p-10 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-200"><Send size={32} className="text-white" /></div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h2>
            <p className="text-sm text-slate-600 max-w-sm mx-auto mb-6">Thanks for reaching out! Our team will get back to you within 2-4 hours during business hours.</p>
            <a href="/dashboard" className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors shadow-sm">Go to Dashboard</a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-6">
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label><input type="text" required placeholder="John Smith" className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all" /></div>
              <div><label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label><input type="email" required placeholder="john@mystore.com" className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all" /></div>
            </div>
            <div><label className="block text-sm font-medium text-slate-700 mb-2">Subject</label><select className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all"><option value="">Select a topic...</option><option>Billing Question</option><option>Technical Issue</option><option>Account Support</option><option>Feature Request</option><option>Partnership Inquiry</option><option>Other</option></select></div>
            <div><label className="block text-sm font-medium text-slate-700 mb-2">Message</label><textarea rows={6} required placeholder="Describe your question or issue in detail..." className="w-full px-4 py-3 border border-slate-200 rounded-xl bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 focus:bg-white transition-all resize-none" /></div>
            <button type="submit" className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium rounded-xl transition-all shadow-lg shadow-indigo-200"><Send size={16} /> Send Message</button>
          </form>
        )}
      </div>
      <footer className="border-t border-slate-100 bg-slate-50">
        <div className="max-w-4xl mx-auto px-6 py-6 flex items-center justify-between text-sm text-slate-500">
          <div className="flex items-center gap-2"><img src="/brand/numeris-logo.png" alt="Numeris" className="w-5 h-5 rounded object-cover" /><span>&copy; 2026 Numeris Financial OS. All rights reserved.</span></div>
          <div className="flex items-center gap-4"><Link href="/terms" className="hover:text-slate-700 transition-colors">Terms</Link><Link href="/privacy" className="hover:text-slate-700 transition-colors">Privacy</Link><Link href="/support" className="hover:text-slate-700 transition-colors">Contact</Link></div>
        </div>
      </footer>
    </div>
  );
}
