import { Service, Skill, Book, Project, Stat, Testimonial } from './types';

export const servicesData: Service[] = [
  {
    id: 's1',
    title: 'Web Development',
    description: 'Custom modern websites with HTML, CSS, JavaScript, React, Tailwind, and Node.js.',
    iconName: 'Code',
    details: 'Building high-performance, accessible, and clean-coded websites customized strictly to technical standards. Specializing in single-page React applications with polished layout logic, custom states, and robust responsive structures.'
  },
  {
    id: 's2',
    title: 'UI/UX Design',
    description: 'Beautiful, visual, user-centered interface designs with deep creative focus.',
    iconName: 'Paintbrush',
    details: 'Crafting unique user experiences with premium contrast matching, optimized negative space, and custom keyframe animations. Design focused on conversion, elegance, and intuitive interactions.'
  },
  {
    id: 's3',
    title: 'Responsive Design',
    description: 'Pixel-perfect across all mobile devices, tablets, and full resolution displays.',
    iconName: 'Smartphone',
    details: 'Ensuring your code scales comfortably from 320px foldables up to ultra-wide desktop monitors. Implementing advanced fluid typography, component container queries, and clean touch-interactive targets.'
  },
  {
    id: 's4',
    title: 'Novel Writing',
    description: 'Fiction and immersive literary works authored in Bengali and English.',
    iconName: 'BookOpen',
    details: 'Delivering detailed, emotional, and social-commentary fiction that captures the human spirit. Connecting characters with profound backstories that invite deep reflection.'
  },
  {
    id: 's5',
    title: 'Poetry & Short Stories',
    description: 'Thought-provoking poems and rich slice-of-life short narratives.',
    iconName: 'Feather',
    details: 'Weaving words of love, loss, longing, and technology into beautiful rhythmic prose. Creating quick-form short stories with impactful twist resolutions.'
  },
  {
    id: 's6',
    title: 'Freelance Consulting',
    description: 'Expert technical advice, architecture blueprinting, and literary collaboration.',
    iconName: 'Users',
    details: 'Helping agencies, brands, and creators map out web workflows, technical stack choices, and publishing campaigns. Offering consulting on digital storytelling and system integrations.'
  }
];

export const skillsData: Skill[] = [
  // Technical Skills
  { id: 'sk1', name: 'HTML & Semantic Web', value: 90, category: 'technical' },
  { id: 'sk2', name: 'CSS & Tailwind Flow', value: 80, category: 'technical' },
  { id: 'sk3', name: 'JavaScript (ES6+)', value: 75, category: 'technical' },
  { id: 'sk4', name: 'React Development', value: 65, category: 'technical' },
  { id: 'sk5', name: 'Python Systems', value: 50, category: 'technical' },
  { id: 'sk6', name: 'Git & Github Control', value: 70, category: 'technical' },
  
  // Professional Skills (Circular Charts)
  { id: 'sk7', name: 'Creativity', value: 95, category: 'professional' },
  { id: 'sk8', name: 'Communication', value: 80, category: 'professional' },
  { id: 'sk9', name: 'Problem Solving', value: 85, category: 'professional' },
  { id: 'sk10', name: 'Team Player', value: 75, category: 'professional' },
  { id: 'sk11', name: 'Creative Writing', value: 90, category: 'professional' },
  { id: 'sk12', name: 'Deep Research', value: 70, category: 'professional' }
];

export const booksData: Book[] = [
  {
    id: 'b1',
    title: 'Light of Darkness',
    titleBengali: 'অন্ধকারের আলো',
    genre: 'Bengali Literary Fiction',
    description: 'A deeply moving Bengali literary fiction exploring hope, human values, and redemption in times of profound emotional struggle.',
    coverGradient: 'from-[#00d4ff] to-[#112240]',
    coverInitials: 'অআ',
    highlights: ['Explores hope in darkness', 'Authored completely in rich prose', 'Rethinks complex social realities']
  },
  {
    id: 'b2',
    title: 'Silent Words',
    titleBengali: 'নীরব কথামালা',
    genre: 'Poetry Collection',
    description: 'A serene compilation of rhythmic poetry focusing on love, modern loss, and spiritual longing, written to stimulate the soul.',
    coverGradient: 'from-[#7c3aed] to-[#0d1b2a]',
    coverInitials: 'নীক',
    highlights: ['50+ curated modern poems', 'Reflective rhythmic structures', 'Dual theme: technology & silence']
  },
  {
    id: 'b3',
    title: 'Fragments of Life',
    titleBengali: 'জীবনের টুকরো',
    genre: 'Slice-of-Life Short Stories',
    description: 'A striking anthology of slice-of-life short stories detailing the hidden battles and extraordinary moments of everyday people.',
    coverGradient: 'from-[#00d4ff] to-[#7c3aed]',
    coverInitials: 'জীটু',
    highlights: ['Dynamic quick narratives', 'Impactful emotional resolutions', 'Bangladesh-centric background canvas']
  }
];

export const projectsData: Project[] = [
  {
    id: 'p1',
    title: 'TemplateGenius',
    category: 'web',
    techTags: ['HTML5', 'TailwindCSS', 'ES6 JS', 'E-Commerce'],
    description: 'A subscription-based hub for ready-to-use email, presentation, and document templates with interactive checkout.',
    liveUrl: '#',
    githubUrl: '#',
    coverGradient: 'from-[#00d4ff] via-[#112240] to-[#7c3aed]',
    imageUrl: 'https://www.image2url.com/r2/default/images/1781534346759-c21593e5-af41-4437-8860-b39f2d7b2d67.webp'
  },
  {
    id: 'p2',
    title: 'Personal Portfolio Website',
    category: 'web',
    techTags: ['React 19', 'Tailwind v4', 'TypeScript', 'Motion'],
    description: 'Shadin\'s personal showcase utilizing custom cursor glows, conic gradients, and dynamic category filtering.',
    liveUrl: '#',
    githubUrl: '#',
    coverGradient: 'from-[#0d1b2a] via-[#112240] to-[#00d4ff]',
    imageUrl: 'https://www.image2url.com/r2/default/images/1781534387013-fc7d3fd0-4634-43b3-89fb-f496a7ccd7f0.png'
  },
  {
    id: 'p3',
    title: 'Bengali Health Tips Hub',
    category: 'design',
    techTags: ['Adobe XD', 'Social Strategy', 'Figma Wireframes'],
    description: 'UI branding and active digital design for an interactive Facebook group and content site centering family health tipcards.',
    liveUrl: '#',
    githubUrl: '#',
    coverGradient: 'from-[#7c3aed] via-[#112240] to-[#00d4ff]',
    imageUrl: 'https://www.image2url.com/r2/default/images/1781534446782-18618850-a65d-47db-9cd4-2201782712b3.png'
  },
  {
    id: 'p4',
    title: 'Wild & Forgotten America',
    category: 'writing',
    techTags: ['Copywriting', 'Historical Analysis', 'MDX Docs'],
    description: 'A highly descriptive content-heavy publication project studying wild frontiers and historical narratives of early America.',
    liveUrl: '#',
    githubUrl: '#',
    coverGradient: 'from-[#112240] via-[#0d1b2a] to-[#7c3aed]',
    imageUrl: 'https://www.image2url.com/r2/default/images/1781534493411-143d455b-c7f5-4a98-ac71-cf5566774915.png'
  },
  {
    id: 'p5',
    title: 'AI Ad Banner Generator',
    category: 'web',
    techTags: ['React', 'CSS Grid', 'Mock AI API', 'FileSaver'],
    description: 'An advertising automation layout tool allowing users to build and style custom programmatic ads with high efficiency.',
    liveUrl: '#',
    githubUrl: '#',
    coverGradient: 'from-[#00d4ff] via-[#7c3aed] to-[#112240]',
    imageUrl: 'https://www.image2url.com/r2/default/images/1781534346759-c21593e5-af41-4437-8860-b39f2d7b2d67.webp'
  },
  {
    id: 'p6',
    title: 'Literary Draft Blog Hub',
    category: 'writing',
    techTags: ['React Blog', 'Tailwind CSS', 'Marked', 'LocaleStorage'],
    description: 'A secure blog space for literary artists to share and outline poems, read-draft logs, and upcoming book teaser extracts.',
    liveUrl: '#',
    githubUrl: '#',
    coverGradient: 'from-[#7c3aed] via-[#0d1b2a] to-[#00d4ff]',
    imageUrl: 'https://www.image2url.com/r2/default/images/1781534387013-fc7d3fd0-4634-43b3-89fb-f496a7ccd7f0.png'
  }
];

export const statsData: Stat[] = [
  { id: 'st1', value: 15, suffix: '+', label: 'Projects Completed', iconName: 'Workflow' },
  { id: 'st2', value: 10, suffix: '+', label: 'Happy Clients', iconName: 'Smile' },
  { id: 'st3', value: 50, suffix: '+', label: 'Pieces Written', iconName: 'Edit2' },
  { id: 'st4', value: 1000, suffix: '+', label: 'Cups of Tea', iconName: 'Coffee' }
];

export const testimonialsData: Testimonial[] = [
  {
    id: 't1',
    quote: 'Working with Shadin was an absolute pleasure. He understood my client specifications perfectly and delivered a blazing-fast responsive frontend well ahead of the deadline.',
    author: 'Robert Harrison',
    role: 'Creative Director at WebSphere USA',
    stars: 5,
    avatarGradient: 'from-[#00d4ff] to-[#7c3aed]'
  },
  {
    id: 't2',
    quote: 'Shadin is that rare breed of technologist who possesses deep poetic soul. His web writing and content consulting added immense narrative depth to our brand campaign in Europe.',
    author: 'Eleanor Vance',
    role: 'Managing Partner at Saga Literary Agency',
    stars: 5,
    avatarGradient: 'from-[#7c3aed] to-[#0d1b2a]'
  },
  {
    id: 't3',
    quote: 'He crafted our commercial e-commerce landing page with stunning attention to spacing, contrast, and layout. Plus, his clean Git architecture made our merge extremely smooth!',
    author: 'Anisur Rahman',
    role: 'Product Lead at TechChittagong',
    stars: 5,
    avatarGradient: 'from-[#00d4ff] to-[#112240]'
  }
];
