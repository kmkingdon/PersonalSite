export type Item = {
    name: string;
    slug: string;
    description?: string;
  };
  
  export const navItems: Item[] = [
      {
        name: 'About',
        slug: 'about',
        description: 'About Kevin Kingdon and skills',
      },
      {
        name: 'Experience',
        slug: 'experience',
        description: 'Various work experience.',
      },
      {
        name: 'Education',
        slug: 'education',
        description: 'Education degrees and programs',
      },
      {
        name: 'Contact',
        slug: 'contact',
        description: 'Contact Kevin Kingdon',
      }
  ];