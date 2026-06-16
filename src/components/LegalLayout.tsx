import Link from 'next/link';

// SEO titles for legal pages
const seoTitles: Record<string, { title: string; description: string }> = {
  'Terms of Service': {
    title: 'Terms of Service — Numeris',
    description: 'Numeris Terms of Service — the legal agreement governing your use of the unified financial operating system for e-commerce.',
  },
  'Privacy Policy': {
    title: 'Privacy Policy — Numeris',
    description: 'Numeris Privacy Policy — how we collect, use, and protect your e-commerce financial data.',
  },
};

export default function LegalLayout({ children, title }: { children: React.ReactNode; title: string }) {
  // Set document title for SEO
  if (typeof document !== 'undefined') {
    const seo = seoTitles[title];
    if (seo) document.title = seo.title;
  }
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

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">{title}</h1>
        <div className="prose prose-slate max-w-none">
          {children}
        </div>
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