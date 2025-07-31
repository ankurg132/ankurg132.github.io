import type { Education, Experience, Project, SkillCategory, Achievement, Event, SocialLink, NavLink } from './types';
import { GithubIcon, LinkedInIcon, MailIcon, TwitterIcon, BlogIcon, ResumeIcon } from './components/Icons';

export const NAME = "Ankur Gupta";
export const TAGLINE = "Mobile Application Developer";
export const SUMMARY = "I create engaging and user-friendly applications for various domains. I have more than two years of experience in developing mobile applications using Flutter, Dart, and other technologies. I am passionate about learning new technologies, solving real-world problems, and contributing to open source communities. I am a team player, a quick learner, and a creative thinker.";
export const LAST_UPDATED = "27th April 2025";

export const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Email', url: 'mailto:ankurg052@gmail.com', icon: MailIcon },
  { name: 'GitHub', url: 'https://github.com/ankurg132', icon: GithubIcon },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/ankurg132', icon: LinkedInIcon },
  { name: 'Twitter', url: 'https://x.com/ankurg132', icon: TwitterIcon },
  { name: 'Blog', url: 'https://dev.to/ankurg132', icon: BlogIcon },
  { name: 'Resume', url: 'https://bit.ly/ankurg-resume', icon: ResumeIcon },
];

export const NAV_LINKS: NavLink[] = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
];

export const EDUCATION_DATA: Education = {
  institution: 'University Institute of Technology, RGPV Bhopal',
  degree: 'Bachelor of Technology, Information Technology',
  duration: 'November 2020 - May 2024',
  location: 'Bhopal, IND',
};

export const EXPERIENCE_DATA: Experience[] = [
  {
    company: 'Internshala',
    role: 'Associate Software Developer - Flutter',
    duration: 'February 2024 - Present',
    location: 'Gurugram, India',
    website: 'https://internshala.com',
    description: [
      'Responsible for re-developing and managing the Internshala Mobile Application for Android and iOS from scratch.'
    ]
  },
  {
    company: 'Kedanta Business Solutions',
    role: 'Freelancer',
    duration: 'July 2023 - January 2024',
    location: 'Remote',
    website: 'https://kedantabusiness.com/',
    description: [
      'Worked as a Freelance Flutter Developer for an application. Handled Frontend, connecting External APIs and other tools such as Firebase, Agora SDK, Pusher and more for Real-Time communication.',
      'Worked from scratch to publish the application for Android and iOS.'
    ]
  },
  {
    company: 'Scogo',
    role: 'Android Developer Intern',
    duration: 'December 2021 - March 2022',
    location: 'Remote',
    description: [
      'Worked as an Android Developer Intern on the new User Interface of the application in Kotlin.',
      'Created on the MVVM Architecture and integrated the latest Android Components.'
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    title: 'CheerUp',
    // icon: 'https://i.imgur.com/8Q5tG2m.png',
    tech: 'Flutter, Dart, Firebase',
    description: [
      'An online dating platform with a focus on mental health and wellbeing!',
      'Implemented from scratch with features like messaging, video calls, location filtering, and in-app payments.'
    ],
    url: 'https://github.com/ankurg132/cheerup-flutter'
  },
  {
    title: 'Keep Document',
    // icon: 'https://i.imgur.com/9lF1w11.png',
    tech: 'Flutter, Dart, Firebase',
    description: [
      'A secure digital vault to store personal data, identities, and other details for instant access on the go.'
    ],
    url: 'https://github.com/ankurg132/keep-document'
  },
  {
    title: 'Snapchat Filter Clone',
    tech: 'Flutter, Dart, MLKit',
    description: [
      'A real-time face filter application that detects facial landmarks to overlay digital masks and effects, built using Flutter and MLKit.'
    ],
    url: 'https://github.com/ankurg132/snapchat-filter-clone'
  },
  {
    title: 'Kotlin Music Player',
    tech: 'Kotlin, Android SDK',
    description: [
      'A simple music player application for Android built using Kotlin.',
      'Plays audio files stored locally on the device, with standard playback controls.'
    ],
    url: 'https://github.com/ankurg132/Kotlin_Music_Player'
  }
];

export const SKILLS_DATA: SkillCategory[] = [
    {
        title: "Languages & Frameworks",
        skills: [{name: 'Dart'}, {name: 'Flutter'}, {name: 'Python'}, {name: 'Kotlin'}, {name: 'TypeScript'}, {name: 'ReactJS'}, {name: 'Java'}, {name: 'Solidity'}, {name: 'Django'}, {name: 'Flask'}]
    },
    {
        title: "Tools & Platforms",
        skills: [{name: 'Firebase'}, {name: 'Git'}, {name: 'GitHub Actions'}, {name: 'MySQL'}, {name: 'AWS'}, {name: 'GCP'}, {name: 'Azure'}, {name: 'Shell'}, {name: 'Selenium'}]
    }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
    { description: "Won 5+ Hackathons including EthIndia '22, Hack This Fall 3.0 and University Hackathons." },
    { description: "Mentored at GirlScript Winter of Contributing, Social Summer of Code and more open source programs." },
    { description: "Hosted 10+ Live Projects on Google Play Store with 10k+ Downloads." },
    { description: "Microsoft Azure Fundamentals Certification (AZ-900)." },
    { description: "Wrote content on Dev.to and published Videos on YouTube." },
    { description: "50+ Questions solved on Leetcode, Problem Solver at Hacker Rank." },
    { description: "Led communities for GitHub Campus Expert, Microsoft Learn Student Ambassador and Google Developer Student Clubs." }
];

export const EVENTS_DATA: Event[] = [
    { description: "MLH Hackcon New Delhi '22 Sponser" },
    { description: "GitHub Field Day '22 New Delhi Attendee" },
    { description: "DurgFOSS '23 Speaker" },
    { description: "BhopalFOSS '23 Organizer" },
    { description: "Devfest Bhopal '22 Organizer" },
    { description: "Solana Developer Tour Bhopal Organizer" },
    { description: "WittyHacks 3.0 Organizer" },
    { description: "Events as Google DSC Lead '22-23" }
];