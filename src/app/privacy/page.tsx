import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for DROP. — how we collect, use, and protect your personal data.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-white/40 text-sm font-medium mb-12">
          Last updated: {new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>

        <div className="prose prose-invert prose-sm max-w-none space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">1. Information We Collect</h2>
            <p>
              When you use our website or sign up for our waitlist, we may collect the following personal information:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Name and email address (provided during waitlist signup or account creation)</li>
              <li>City and preferences (optional, provided during waitlist signup)</li>
              <li>Business details (for B2B enquiries: business name, type, contact information)</li>
              <li>Usage data and cookies (pages visited, time spent, browser type)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Process and manage waitlist registrations</li>
              <li>Send product launch announcements and updates (you can unsubscribe at any time)</li>
              <li>Respond to B2B enquiries and partnership requests</li>
              <li>Improve and optimise our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">3. Data Storage and Security</h2>
            <p>
              Your data is stored securely using industry-standard encryption and access controls. We use MongoDB for data storage and Redis for session management. Passwords are hashed using bcrypt and are never stored in plaintext.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">4. Third-Party Services</h2>
            <p>We may use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Google OAuth and Apple Sign-In for authentication</li>
              <li>Vercel for website hosting and deployment</li>
              <li>MongoDB Atlas for database services</li>
            </ul>
            <p className="mt-2">
              These services have their own privacy policies. We do not sell or share your personal data with third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">5. Cookies</h2>
            <p>
              We use essential cookies for session management and authentication. These are strictly necessary for the website to function and cannot be disabled. We do not use third-party tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Request access to your personal data</li>
              <li>Request correction or deletion of your personal data</li>
              <li>Withdraw consent for communications at any time</li>
              <li>Request a copy of your data in a portable format</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, contact us at <a href="mailto:founder@dropwater.in" className="text-[#C9A84C] hover:underline">founder@dropwater.in</a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-lg font-black uppercase tracking-wider mb-3">7. Contact</h2>
            <p>
              For any questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:founder@dropwater.in" className="text-[#C9A84C] hover:underline">founder@dropwater.in</a>.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
