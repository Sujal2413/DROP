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
    name: 'Pure Black',
    shortName: 'Black',
    verticalLabel: 'PURE BLACK',
    copy: 'Timeless premium still water in matte aluminium.',
    detailCopy:
      'Bold, minimal, and cold to the touch. Pure Black keeps DROP. severe, refined, and ready for the city.',
    image: '/assets/can-black-crisp.jpeg',
    accent: '#d9e0ea',
    glow: 'rgba(218, 226, 238, 0.35)',
    gradient:
      'radial-gradient(circle at 72% 44%, rgba(213, 222, 236, 0.18), transparent 30%), linear-gradient(135deg, #030304 0%, #11131a 48%, #050506 100%)',
  },
  {
    id: 'midnight-purple',
    name: 'Midnight Purple',
    shortName: 'Purple',
    verticalLabel: 'MIDNIGHT PURPLE',
    copy: 'Deep, modern confidence in every sip.',
    detailCopy:
      'A low-lit violet finish with chrome edges and quiet drama. Designed to feel rare before the first sip.',
    image: '/assets/can-purple-crisp.jpeg',
    accent: '#a98cff',
    glow: 'rgba(149, 91, 255, 0.55)',
    gradient:
      'radial-gradient(circle at 74% 44%, rgba(139, 92, 246, 0.32), transparent 31%), linear-gradient(135deg, #030205 0%, #171026 48%, #05030a 100%)',
  },
  {
    id: 'icy-silver',
    name: 'Icy Silver',
    shortName: 'Silver',
    verticalLabel: 'ICY SILVER',
    copy: 'Pure hydration, crystal cold.',
    detailCopy:
      'Bright chrome, frosted light, and a clean studio sheen. Icy Silver is the clearest expression of DROP.',
    image: '/assets/can-silver-crisp.jpeg',
    accent: '#ccecff',
    glow: 'rgba(154, 217, 255, 0.55)',
    gradient:
      'radial-gradient(circle at 76% 44%, rgba(191, 230, 255, 0.38), transparent 32%), linear-gradient(135deg, #020509 0%, #101b27 50%, #030507 100%)',
  },
];
