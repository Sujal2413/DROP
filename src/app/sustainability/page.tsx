import SustainabilityClient from './SustainabilityClient';

export const metadata = {
  title: 'Sustainability | DROP. No Plastic. No Bullsh*t.',
  description: 'Plastic degrades. Aluminum endures. 75% of all aluminum ever produced is still in active use today. Discover the sustainable mission of DROP.',
  alternates: {
    canonical: '/sustainability',
  },
  openGraph: {
    title: 'Sustainability | DROP. No Plastic. No Bullsh*t.',
    description: 'Plastic degrades. Aluminum endures. 75% of all aluminum ever produced is still in active use today. Discover the sustainable mission of DROP.',
    url: 'https://www.dropwater.in/sustainability',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sustainability | DROP. No Plastic. No Bullsh*t.',
    description: 'Plastic degrades. Aluminum endures. 75% of all aluminum ever produced is still in active use today.',
  },
};

export default function SustainabilityPage() {
  return <SustainabilityClient />;
}
