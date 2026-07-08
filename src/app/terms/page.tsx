import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for DROP. — the rules governing your use of our website and services.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <main className="bg-[#0F1112] min-h-screen text-white">
      <div className="max-w-3xl mx-auto px-8 py-24 md:py-32">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white text-xs font-bold tracking-[0.2em] uppercase mb-12 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to Home
        </Link>

        <h1
          className="text-white mb-4"
          style={{
            fontFamily: '"Anton", "Bebas Neue", "Druk Condensed", Impact, sans-serif',
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 900,
            lineHeight: 1,
          }}
        >
          Terms of Service
        </h1>
        <p className="text-white/40 text-sm font-medium mb-12">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the DROP. website (dropwater.in), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">2. Description of Service</h2>
            <p>
              DROP. is a premium canned water brand. Our website provides information about our products, allows users to join our waitlist, submit business enquiries, and create accounts. DROP. has not yet launched commercially; all product references are pre-launch.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">3. User Accounts</h2>
            <p>
              When creating an account, you agree to provide accurate and complete information. You are responsible for maintaining the confidentiality of your account credentials. You must notify us immediately of any unauthorised use of your account.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">4. Waitlist and Pre-Orders</h2>
            <p>
              Joining our waitlist does not constitute a purchase or binding agreement. We reserve the right to modify pricing, availability, and launch timelines. Waitlist position does not guarantee product availability.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">5. Intellectual Property</h2>
            <p>
              All content on this website — including text, graphics, logos, images, and software — is the property of DROP. and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">6. Limitation of Liability</h2>
            <p>
              DROP. provides this website on an &quot;as is&quot; basis. We make no warranties, expressed or implied, regarding the accuracy or completeness of the content. To the maximum extent permitted by law, DROP. shall not be liable for any indirect, incidental, or consequential damages arising from your use of this website.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">7. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">8. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Continued use of the website after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">9. Contact</h2>
            <p>
              For questions about these Terms, contact us at{' '}
              <a href="mailto:founder@dropwater.in" className="text-[#C9A84C] hover:underline">founder@dropwater.in</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
