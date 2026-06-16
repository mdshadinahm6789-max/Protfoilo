export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  details: string;
}

export type SkillCategory = 'technical' | 'professional';

export interface Skill {
  id: string;
  name: string;
  value: number; // Percentage
  category: SkillCategory;
}

export interface Book {
  id: string;
  title: string;
  titleBengali?: string;
  genre: string;
  description: string;
  coverGradient: string;
  coverInitials: string;
  highlights: string[];
}

export type ProjectCategory = 'all' | 'web' | 'design' | 'writing';

export interface Project {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  techTags: string[];
  description: string;
  liveUrl: string;
  githubUrl: string;
  coverGradient: string;
  imageUrl?: string;
}

export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  iconName: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  stars: number;
  avatarGradient: string;
}
