export type ProductStatus = 'available' | 'preorder' | 'coming-soon';

export type Product = {
  slug: string;
  displayName: string;
  variantName?: string;
  waterType: string;
  flavour?: string;
  sizes: string[];
  colourName: string;
  description: string;
  designedFor?: string;
  status: ProductStatus;
  price?: number;
  image: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: 'still-water',
    displayName: 'DROP Still Water',
    variantName: 'Pure Silver',
    waterType: 'Still Water',
    flavour: 'None',
    sizes: ['330ml'],
    colourName: 'Silver',
    description: 'Pure, crisp still water in a premium recyclable aluminium can. The standard for everyday hydration.',
    designedFor: 'Everyday Hydration',
    status: 'coming-soon', // Switching everything to waitlist model
    image: '/assets/new-can-2.png',
  },
  {
    slug: 'mint-water',
    displayName: 'DROP Mint Water',
    variantName: 'Deep Purple',
    waterType: 'Still Water',
    flavour: 'Mint',
    sizes: ['330ml'],
    colourName: 'Purple',
    description: 'Refreshing mint-infused still water designed to cool and soothe.',
    designedFor: 'Post-Workout / Cooling',
    status: 'coming-soon',
    image: '/assets/new-can-variant-1.png', // Needs to be swapped for real mint can asset if one exists, but user said not to fake it if it doesn't.
  },
  {
    slug: 'athlete-edition',
    displayName: 'DROP Athlete Edition',
    variantName: 'Full Black',
    waterType: 'Still Water',
    flavour: 'Trace Minerals',
    sizes: ['330ml'],
    colourName: 'Black',
    description: 'High-performance hydration rich in natural trace minerals.',
    designedFor: 'Intense Recovery',
    status: 'coming-soon',
    image: '/assets/new-can-variant-3.png',
  },
  {
    slug: 'clove-water',
    displayName: 'DROP Clove Water',
    variantName: 'Blood Red',
    waterType: 'Still Water',
    flavour: 'Clove',
    sizes: ['330ml'],
    colourName: 'Red',
    description: 'Infused with aromatic clove extracts to restore natural vitality.',
    designedFor: 'Vitality & Digestion',
    status: 'coming-soon',
    image: '/assets/clove_can.jpeg',
  }
];
