export type Lab = {
  id: string;
  number: string;
  title: string;
  description: string;
  category: 'Foundations' | 'Building';
  duration: string;
  icon: string;
  color: string;
};

export const labs: Lab[] = [
  {
    id: 'lab-01',
    number: '01',
    title: 'UI Foundations',
    description: 'Build your first screen with core React Native components.',
    category: 'Foundations',
    duration: '25 min',
    icon: 'layers-outline',
    color: '#699B7D',
  },
  {
    id: 'lab-02',
    number: '02',
    title: 'Reusable Components',
    description: 'Create a consistent interface with reusable building blocks.',
    category: 'Foundations',
    duration: '30 min',
    icon: 'grid-outline',
    color: '#7192BB',
  },
  {
    id: 'lab-03',
    number: '03',
    title: 'State & Interaction',
    description: 'Bring your app to life with hooks and interactive UI.',
    category: 'Building',
    duration: '35 min',
    icon: 'flash-outline',
    color: '#C28E5C',
  },
  {
    id: 'lab-04',
    number: '04',
    title: 'Navigation',
    description: 'Connect screens into a smooth multi-screen experience.',
    category: 'Building',
    duration: '40 min',
    icon: 'navigate-outline',
    color: '#9A82B7',
  },
];
