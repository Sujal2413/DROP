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
      'radial-gradient(circle at 72% 44%, rgba(213, 222, 236, 0.4), transparent 30%), linear-gradient(135deg, #fdfbf7 0%, #f4eee1 48%, #e8e0d5 100%)',
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
      'radial-gradient(circle at 74% 44%, rgba(139, 92, 246, 0.2), transparent 31%), linear-gradient(135deg, #fdfbf7 0%, #f0ebf5 48%, #e4dce8 100%)',
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
      'radial-gradient(circle at 76% 44%, rgba(191, 230, 255, 0.3), transparent 32%), linear-gradient(135deg, #fdfbf7 0%, #ebf2f5 50%, #dfe8eb 100%)',
  },
];
