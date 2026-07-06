import StoryClient from './StoryClient';

export const metadata = {
  title: 'Our Story | DROP.',
  description: 'From a simple habit to a bigger question. Discover the origin of DROP.',
};

export default function StoryPage() {
  return (
    <main className="bg-[#F8F9FA] min-h-screen text-[#1A1A1A] overflow-x-hidden antialiased font-sans">
      <StoryClient />
    </main>
  );
}
