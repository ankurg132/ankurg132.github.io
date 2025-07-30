import React, { useState, useEffect, useRef, FC, SVGProps, useCallback } from 'react';
import { NAME, TAGLINE, SUMMARY, SOCIAL_LINKS, NAV_LINKS, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA, ACHIEVEMENTS_DATA, EVENTS_DATA, LAST_UPDATED } from './constants';
import type { SocialLink, Experience, Project, SkillCategory, Achievement, Event, NavLink, AnimatedSectionProps, Education } from './types';
import { ExternalLinkIcon, GithubIcon, AwardIcon, CalendarIcon } from './components/Icons';


// --- ANIMATION & FX COMPONENTS ---
const AnimatedSection: FC<AnimatedSectionProps> = ({ children, className, stagger = false, direction = 'up', ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    const currentRef = ref.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const baseTransition = 'transition-all duration-700 ease-out';
  const directions = {
      up: 'opacity-0 translate-y-8',
      left: 'opacity-0 -translate-x-8',
      right: 'opacity-0 translate-x-8',
  };
  const visibleState = 'opacity-100 translate-y-0 translate-x-0';
  
  const childClasses = stagger ? '[&>*]:opacity-0 [&>*]:translate-y-4' : '';
  const visibleChildClasses = stagger ? `[&.is-visible>*]:opacity-100 [&.is-visible>*]:translate-y-0` : '';

  return (
    <div
      ref={ref}
      className={`${baseTransition} ${isVisible ? `${visibleState} is-visible` : directions[direction]} ${className || ''} ${childClasses} ${visibleChildClasses}`}
      {...rest}
    >
      {children}
    </div>
  );
};

const TypingEffect: FC<{ text: string, className?: string }> = ({ text, className }) => {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        let i = 0;
        const intervalId = setInterval(() => {
            setDisplayedText(text.slice(0, i + 1));
            i++;
            if (i > text.length) clearInterval(intervalId);
        }, 100);
        return () => clearInterval(intervalId);
    }, [text]);

    return <p className={className}>{displayedText}<span className="animate-pulse">|</span></p>;
};

const CardSpotlight: FC<{children: React.ReactNode, className?: string}> = ({ children, className }) => {
  const divRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const { left, top } = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty('--x', `${e.clientX - left}px`);
    divRef.current.style.setProperty('--y', `${e.clientY - top}px`);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={onMouseMove}
      className={`relative overflow-hidden group ${className || ''}`}
    >
      {children}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at var(--x) var(--y), rgba(34, 211, 238, 0.15), transparent 80%)`
        }}
      />
    </div>
  );
};


// --- UI SECTION COMPONENTS ---
const Header: FC<{ navLinks: NavLink[] }> = ({ navLinks }) => {
  const [isTop, setIsTop] = useState(true);
  const handleScroll = useCallback(() => setIsTop(window.scrollY < 10), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header className={`sticky top-0 z-50 px-4 transition-all duration-300 ${isTop ? 'py-6' : 'py-3 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800'}`}>
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-white tracking-tighter hover:text-cyan-400 transition-colors">{NAME}</a>
            <div className="hidden md:flex items-center space-x-8">
                {navLinks.map(link => (
                    <a key={link.name} href={link.href} className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium">{link.name}</a>
                ))}
            </div>
            <a href="#contact" className="hidden md:inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-5 rounded-md transition-all duration-300 transform hover:scale-105">
                Contact
            </a>
        </nav>
    </header>
  );
};

const Hero: FC = () => (
    <div className="min-h-screen flex flex-col justify-center text-center -mt-20">
        <AnimatedSection className="max-w-4xl mx-auto px-4" stagger={true}>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter mb-4 glitch" data-text={NAME}>{NAME}</h1>
            <TypingEffect text={TAGLINE} className="text-2xl md:text-3xl text-cyan-400 font-mono font-medium mb-8" />
            <div className="flex justify-center space-x-6">
                {SOCIAL_LINKS.map((link, i) => {
                    const Icon = link.icon;
                    return (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110" style={{ transitionDelay: `${i * 100 + 500}ms`}}>
                            <Icon className="w-8 h-8"/>
                        </a>
                    );
                })}
            </div>
        </AnimatedSection>
    </div>
);

const About: FC<{ summary: string, education: Education }> = ({ summary, education }) => (
    <AnimatedSection id="about" className="py-24">
        <h2 className="text-4xl font-bold text-white text-center mb-12 tracking-tight">About Me</h2>
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-12 items-center">
            <AnimatedSection direction="left" className="md:col-span-2">
                <p className="text-lg leading-relaxed text-slate-300">{summary}</p>
            </AnimatedSection>
            <AnimatedSection direction="right" className="bg-slate-900/70 p-6 rounded-lg border border-slate-800">
                <h3 className="text-xl font-bold text-white mb-3">Education</h3>
                <p className="font-semibold text-cyan-400">{education.institution}</p>
                <p>{education.degree}</p>
                <p className="text-sm text-slate-400 mt-1">{education.duration}</p>
                <p className="text-sm text-slate-400">{education.location}</p>
            </AnimatedSection>
        </div>
    </AnimatedSection>
);

const ExperienceTimeline: FC<{ experiences: Experience[] }> = ({ experiences }) => (
    <AnimatedSection id="experience" className="py-24">
        <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">Work Experience</h2>
        <div className="max-w-3xl mx-auto relative pl-8 border-l-2 border-slate-800">
            {experiences.map((exp, index) => (
                <div key={index} className="mb-12 timeline-marker">
                    <AnimatedSection stagger={true} className="transition-all duration-500">
                        <p className="text-sm text-slate-400 mb-1">{exp.duration}</p>
                        <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                        <div className="flex items-center space-x-2 text-cyan-400 mb-2 font-medium">
                            <span>{exp.company}</span>
                            {exp.website && (
                                <a href={exp.website} target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300">
                                    <ExternalLinkIcon/>
                                </a>
                            )}
                        </div>
                        <ul className="list-disc list-inside text-slate-400 space-y-1">
                            {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </AnimatedSection>
                </div>
            ))}
        </div>
    </AnimatedSection>
);

const ProjectsGrid: FC<{ projects: Project[] }> = ({ projects }) => (
    <AnimatedSection id="projects" className="py-24 bg-slate-900/50">
        <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">Side Projects</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <AnimatedSection key={index} style={{'transitionDelay': `${index * 100}ms`}}>
                    <CardSpotlight className="bg-slate-900 h-full p-6 rounded-lg border border-slate-800 flex flex-col transition-all duration-300 ease-out hover:border-cyan-400/50 hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-bold text-white">{project.title}</h3>
                            {project.url && (
                                <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`GitHub for ${project.title}`} className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 ml-2 shrink-0">
                                   <GithubIcon className="w-6 h-6"/>
                                </a>
                            )}
                        </div>
                        <p className="text-sm font-mono text-cyan-400 mb-4">{project.tech}</p>
                        <div className="text-slate-400 space-y-2 flex-grow">
                             {project.description.map((desc, i) => <p key={i}>{desc}</p>)}
                        </div>
                    </CardSpotlight>
                </AnimatedSection>
            ))}
        </div>
    </AnimatedSection>
);

const SkillsDisplay: FC<{ skillCategories: SkillCategory[] }> = ({ skillCategories }) => (
    <AnimatedSection id="skills" className="py-24">
        <h2 className="text-4xl font-bold text-white text-center mb-16 tracking-tight">Skills</h2>
        <div className="max-w-4xl mx-auto space-y-10">
            {skillCategories.map(category => (
                <AnimatedSection key={category.title} stagger={true}>
                    <h3 className="text-2xl font-bold text-white mb-4">{category.title}</h3>
                    <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, index) => (
                            <div key={skill.name} className="bg-slate-800 text-slate-200 py-2 px-5 rounded-full font-medium transition-all duration-300 ease-out" style={{transitionDelay: `${index * 50}ms`}}>
                              {skill.name}
                            </div>
                        ))}
                    </div>
                </AnimatedSection>
            ))}
        </div>
    </AnimatedSection>
);

const AchievementsAndEvents: FC<{ achievements: Achievement[], events: Event[] }> = ({ achievements, events }) => (
  <AnimatedSection id="achievements" className="py-24 bg-slate-900/50">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-x-16 gap-y-12">
      
      <AnimatedSection direction="left">
        <h2 className="text-3xl font-bold text-white text-center mb-10 tracking-tight">Achievements</h2>
        <div className="space-y-6">
          {achievements.map((item, index) => (
            <CardSpotlight key={index} className="p-5 rounded-lg border border-slate-800 flex items-center gap-5 transition-all duration-300 ease-in-out bg-slate-900 hover:border-cyan-400/50">
              <div className="shrink-0 bg-slate-800 p-3 rounded-full">
                <AwardIcon className="w-6 h-6 text-cyan-400"/>
              </div>
              <p className="text-slate-300 flex-1">{item.description}</p>
            </CardSpotlight>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection direction="right">
        <h2 className="text-3xl font-bold text-white text-center mb-10 tracking-tight">Events & Conferences</h2>
        <div className="space-y-6">
          {events.map((item, index) => (
            <CardSpotlight key={index} className="p-5 rounded-lg border border-slate-800 flex items-center gap-5 transition-all duration-300 ease-in-out bg-slate-900 hover:border-cyan-400/50">
              <div className="shrink-0 bg-slate-800 p-3 rounded-full">
                <CalendarIcon className="w-6 h-6 text-cyan-400"/>
              </div>
              <p className="text-slate-300 flex-1">{item.description}</p>
            </CardSpotlight>
          ))}
        </div>
      </AnimatedSection>
    </div>
  </AnimatedSection>
);

const Contact: FC = () => (
    <footer id="contact" className="py-24 text-center">
        <AnimatedSection>
            <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">Get In Touch</h2>
            <p className="max-w-md mx-auto mb-8 text-slate-400">I'm currently open to new opportunities and collaborations. My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            <a href={SOCIAL_LINKS.find(l => l.name === 'Email')?.url} className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 mb-12 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40">
                Say Hello
            </a>
            <div className="flex justify-center space-x-6 mb-8">
                {SOCIAL_LINKS.map(link => {
                    const Icon = link.icon;
                    return (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-slate-400 hover:text-cyan-400 transition-all duration-300 hover:scale-110">
                           <Icon className="w-6 h-6"/>
                        </a>
                    );
                })}
            </div>
        </AnimatedSection>
    </footer>
);

const Footer: FC = () => (
  <footer className="text-center py-6 border-t border-slate-800">
      <p className="text-sm text-slate-500">Last Updated on {LAST_UPDATED}</p>
      <p className="text-sm text-slate-600 mt-2">Designed & Built by Ankur Gupta</p>
  </footer>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  return (
    <>
      <Header navLinks={NAV_LINKS} />
      <main className="px-4">
        <Hero />
        <About summary={SUMMARY} education={EDUCATION_DATA} />
        <ExperienceTimeline experiences={EXPERIENCE_DATA} />
        <ProjectsGrid projects={PROJECTS_DATA} />
        <SkillsDisplay skillCategories={SKILLS_DATA} />
        <AchievementsAndEvents achievements={ACHIEVEMENTS_DATA} events={EVENTS_DATA} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}