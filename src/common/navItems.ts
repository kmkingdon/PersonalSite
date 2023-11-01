export type Item = {
    name: string;
    slug: string;
    description?: string;
  };
  
  export const navItems: Item[] = [
      {
        name: 'About',
        slug: 'about',
        description: 'About Kevin Kingdon',
      },
      {
        name: 'Experience',
        slug: 'experience',
        description: 'Various work experience, education, and skills.',
      },
      {
        name: 'Contact',
        slug: 'contact',
        description: 'Contact Kevin Kingdon',
      }
  ];