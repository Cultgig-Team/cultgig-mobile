export interface EventApplicant {
  id: number;
  name: string;
  bio: string;
  budget: number;
  avatarUrl: string;
}

export const eventApplicants: EventApplicant[] = [
  {
    id: 1,
    name: "Shantanu Majumdar",
    bio: "Lorem ipsum is standard for the placeholder text used in design and publishing.",
    budget: 5000,
    avatarUrl: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Priya Sharma",
    bio: "Experienced photographer specialising in corporate events and brand shoots.",
    budget: 7000,
    avatarUrl: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Arjun Mehta",
    bio: "Freelance videographer with 5+ years of event coverage and social media content.",
    budget: 6500,
    avatarUrl: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: 4,
    name: "Neha Kapoor",
    bio: "Content writer and social media strategist passionate about storytelling.",
    budget: 4500,
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
];
