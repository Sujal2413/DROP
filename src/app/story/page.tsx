import StoryClient from './StoryClient';

export const metadata = {
  title: 'Our Story | DROP.',
  description: 'From a simple habit to a bigger question. Discover the origin of DROP.',
  alternates: {
    canonical: '/story',
  },
  openGraph: {
    title: 'Our Story | DROP.',
    description: 'From a simple habit to a bigger question. Discover the origin of DROP.',
    url: 'https://www.dropwater.in/story',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Story | DROP.',
    description: 'From a simple habit to a bigger question. Discover the origin of DROP.',
  },
};

export default function StoryPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen text-[#1A1A1A] overflow-x-hidden antialiased font-sans">
      <StoryClient />
    </main>
  );
}
