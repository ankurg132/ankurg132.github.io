import type { FC, SVGProps, ReactNode, HTMLAttributes } from 'react';

export interface SocialLink {
  name: string;
  url:string;
  icon: FC<SVGProps<SVGSVGElement>>;
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  location: string;
}

export interface Experience {
  company: string;
  role: string;
  duration: string;
  location: string;
  website?: string;
  description: string[];
}

export interface Project {
  title: string;
  tech: string;
  description: string[];
  url?: string;
}

export interface Skill {
  name: string;
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Achievement {
  description:string;
}

export interface Event {
  description: string;
}

export interface NavLink {
  name: string;
  href: string;
}

export interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  stagger?: boolean;
  direction?: 'up' | 'left' | 'right';
}