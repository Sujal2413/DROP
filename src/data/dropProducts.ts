export type DropVariant = {
  id: 'pure-black' | 'midnight-purple' | 'icy-silver';
  name: string;
  shortName: string;
  verticalLabel: string;
  copy: string;
  detailCopy: string;
  image: string;
  accent: string;
  glow: string;
  gradient: string;
};

export const dropVariants: DropVariant[] = [
  {
    id: 'pure-black',
    name: 'Athlete Energy Booster',
    shortName: 'Energy',
    verticalLabel: 'ENERGY BOOSTER',
    copy: 'High-performance energy booster water.',
    detailCopy:
      'Engineered for athletes. Clean energy without the crash, sealed in matte black aluminium.',
    image: '/assets/new-can-variant-1.png',
    accent: '#d9e0ea',
    glow: 'rgba(218, 226, 238, 0.35)',
    gradient:
      'radial-gradient(circle at 72% 44%, rgba(213, 222, 236, 0.18), transparent 30%), linear-gradient(135deg, #030304 0%, #11131a 48%, #050506 100%)',
  },
  {
    id: 'midnight-purple',
    name: 'Clove Water',
    shortName: 'Clove',
    verticalLabel: 'CLOVE WATER',
    copy: 'Infused clove water for deep hydration.',
    detailCopy:
      'A low-lit violet finish containing pure clove-infused water. Designed to refresh and restore.',
    image: '/assets/new-can-variant-2.png',
    accent: '#a98cff',
    glow: 'rgba(149, 91, 255, 0.55)',
    gradient:
      'radial-gradient(circle at 74% 44%, rgba(139, 92, 246, 0.32), transparent 31%), linear-gradient(135deg, #030205 0%, #171026 48%, #05030a 100%)',
  },
  {
    id: 'icy-silver',
    name: 'Sparkling Water',
    shortName: 'Sparkling',
    verticalLabel: 'SPARKLING WATER',
    copy: 'Pure sparkling water, crystal cold.',
    detailCopy:
      'Bright chrome, frosted light, and crisp carbonation. The clearest expression of DROP.',
    image: '/assets/new-can-variant-3.png',
    accent: '#ccecff',
    glow: 'rgba(154, 217, 255, 0.55)',
    gradient:
      'radial-gradient(circle at 76% 44%, rgba(191, 230, 255, 0.38), transparent 32%), linear-gradient(135deg, #020509 0%, #101b27 50%, #030507 100%)',
  },
];
