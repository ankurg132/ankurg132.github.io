import React, { useState, useEffect, useRef, FC, SVGProps, useCallback, useMemo } from 'react';
import { NAME, TAGLINE, SUMMARY, SOCIAL_LINKS, NAV_LINKS, EDUCATION_DATA, EXPERIENCE_DATA, PROJECTS_DATA, SKILLS_DATA, ACHIEVEMENTS_DATA, EVENTS_DATA, LAST_UPDATED } from './constants';
import type { SocialLink, Experience, Project, SkillCategory, Achievement, Event, NavLink, AnimatedSectionProps, Education } from './types';
import { ExternalLinkIcon, GithubIcon, AwardIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon } from './components/Icons';

// --- THEME HOOK & TOGGLE ---
const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
      }
    }
    return 'dark'; // Default to dark theme
  });

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
  };

  return { theme, toggleTheme };
};

const ThemeToggle: FC<{ theme: 'light' | 'dark'; toggleTheme: () => void }> = ({ theme, toggleTheme }) => (
  <button
    onClick={toggleTheme}
    className="p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--accent-color)] hover:bg-[var(--bg-tertiary)] transition-colors"
    aria-label="Toggle theme"
  >
    {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
  </button>
);


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
    const rect = divRef.current.getBoundingClientRect();
    const { width, height, left, top } = rect;

    // For Spotlight
    divRef.current.style.setProperty('--x', `${e.clientX - left}px`);
    divRef.current.style.setProperty('--y', `${e.clientY - top}px`);
    
    // For 3D Tilt
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;
    const rotateY = -1 * ((mouseX - width / 2) / (width / 2)) * 8; // Max 8 degrees
    const rotateX = ((mouseY - height / 2) / (height / 2)) * 8; // Max 8 degrees
    
    divRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  };

  const onMouseLeave = () => {
    if (divRef.current) {
      divRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`relative overflow-hidden group transition-transform duration-200 ease-out ${className || ''}`}
      style={{ willChange: 'transform' }}
    >
      {children}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(400px circle at var(--x) var(--y), var(--spotlight-color), transparent 80%)`
        }}
      />
    </div>
  );
};


// --- CLI GAME COMPONENT ---
const CliGame: FC = () => {
  const [history, setHistory] = useState<React.ReactNode[]>([]);
  const [input, setInput] = useState('');
  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processCommand = useCallback((cmd: string) => {
    const commands: { [key: string]: () => string } = {
      help: () => `<pre>Available commands:\n  <span class="text-[var(--accent-text-color)]">help</span>        Show this help message.\n  <span class="text-[var(--accent-text-color)]">whoami</span>      Display user information.\n  <span class="text-[var(--accent-text-color)]">summary</span>     Show professional summary.\n  <span class="text-[var(--accent-text-color)]">socials</span>     List social media links.\n  <span class="text-[var(--accent-text-color)]">skills</span>      List technical skills.\n  <span class="text-[var(--accent-text-color)]">projects</span>    List featured projects.\n  <span class="text-[var(--accent-text-color)]">neofetch</span>    Display portfolio info.\n  <span class="text-[var(--accent-text-color)]">date</span>        Display the current date.\n  <span class="text-[var(--accent-text-color)]">clear</span>       Clear the terminal.</pre>`,
      whoami: () => `${NAME} - ${TAGLINE}`,
      summary: () => SUMMARY,
      socials: () => SOCIAL_LINKS.map(l => `<a href="${l.url}" target="_blank" rel="noopener noreferrer" class="hover:underline">${l.name}: ${l.url}</a>`).join('<br />'),
      skills: () => SKILLS_DATA.map(cat => `<b>${cat.title}</b>:<br />${cat.skills.map(s => s.name).join(', ')}`).join('<br /><br />'),
      projects: () => PROJECTS_DATA.map(p => `- ${p.title}`).join('<br />'),
      neofetch: () => {
        const asciiArt = `
<span class="text-[var(--accent-text-color)]">    _    _   _  __  _  _  ____ </span>
<span class="text-[var(--accent-text-color)]">   / \\  | \\_/ |/  \\| |/ |/ () \\</span>
<span class="text-[var(--accent-text-color)]">  /_\\_\\ |_| | |__/| (  ( \\____/</span>
`;
        const info = `
<b>${NAME}</b>@portfolio.dev
--------------------------
<b>OS</b>:           Web Browser
<b>Role</b>:         ${TAGLINE}
<b>Shell</b>:        portfolio-cli
<b>Last Update</b>:  ${LAST_UPDATED}
`;
        return `<pre class="whitespace-pre-wrap">${asciiArt}<br/>${info}</pre>`;
      },
      sudo: () => `Permission denied.`,
      date: () => new Date().toString(),
    };

    if (cmd in commands) {
      return commands[cmd]();
    }
    return `Command not found: ${cmd}. Type 'help' for a list of commands.`;
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const command = input.trim();
      e.preventDefault();

      if (command.toLowerCase() === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      const newHistoryItem = <div key={history.length}><span className="text-green-500 dark:text-green-400">$</span><span className="ml-2">{command}</span></div>;
      let newHistory = [...history, newHistoryItem];
      
      if (command) {
        const output = processCommand(command);
        newHistory.push(<div key={history.length + 1} dangerouslySetInnerHTML={{ __html: output }} />);
      }
      
      setHistory(newHistory);
      setInput('');
    }
  }, [input, history, processCommand]);

  useEffect(() => {
    setHistory([<div key="init">Welcome to my interactive terminal. Type <span className="text-[var(--accent-text-color)]">'help'</span> to get started.</div>]);
  }, []);

  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  return (
    <div 
      className="font-mono h-96 max-h-[50vh] lg:max-h-full bg-[var(--bg-secondary)]/70 border border-[var(--border-color)] rounded-lg shadow-2xl flex flex-col overflow-hidden"
      onClick={focusInput}
    >
      <div className="bg-[var(--bg-tertiary)]/80 flex items-center p-2 flex-shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-auto text-xs text-[var(--text-secondary)]">zsh</span>
      </div>
      <div ref={terminalBodyRef} className="p-4 flex-grow overflow-y-auto text-sm leading-relaxed cursor-text text-[var(--text-primary)]">
        {history.map((line, index) => <div key={index} className="break-words">{line}</div>)}
        <div className="flex">
          <span className="text-green-500 dark:text-green-400 mr-2">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="bg-transparent border-none text-[var(--text-primary)] w-full focus:outline-none"
            spellCheck="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};


// --- UI SECTION COMPONENTS ---
const Header: FC<{ navLinks: NavLink[], theme: 'light' | 'dark', toggleTheme: () => void }> = ({ navLinks, theme, toggleTheme }) => {
  const [isTop, setIsTop] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => setIsTop(window.scrollY < 10), []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = 'auto';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isMenuOpen]);

  return (
    <header className={`sticky top-0 z-30 px-4 transition-all duration-300 ${isTop ? 'py-6' : 'py-3 bg-[var(--bg-primary)]/80 backdrop-blur-lg border-b border-[var(--border-color)]'}`}>
        <nav className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#" className="text-2xl font-bold text-[var(--text-primary)] tracking-tighter hover:text-[var(--accent-color)] transition-colors">{NAME}</a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
                {navLinks.map(link => (
                    <a key={link.name} href={link.href} className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors duration-300 font-medium">{link.name}</a>
                ))}
                <a href="#contact" className="bg-[var(--accent-color)] hover:bg-[var(--accent-color-hover)] text-white font-bold py-2 px-5 rounded-md transition-all duration-300 transform hover:scale-105">
                    Contact
                </a>
                <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>

            {/* Mobile Navigation Controls */}
            <div className="flex items-center space-x-2 md:hidden">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors relative z-50"
                aria-label="Toggle Menu"
              >
                {isMenuOpen ? <CloseIcon className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 top-0 bg-[var(--bg-primary)] z-40 flex flex-col items-center justify-center md:hidden">
              <nav className="flex flex-col items-center text-center space-y-8">
                  {navLinks.map(link => (
                      <a 
                        key={link.name} 
                        href={link.href} 
                        onClick={() => setIsMenuOpen(false)}
                        className="text-3xl font-semibold text-[var(--text-primary)] hover:text-[var(--accent-color)] transition-colors"
                      >
                        {link.name}
                      </a>
                  ))}
                  <a 
                    href="#contact" 
                    onClick={() => setIsMenuOpen(false)}
                    className="mt-4 inline-block bg-[var(--accent-color)] hover:bg-[var(--accent-color-hover)] text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105"
                  >
                      Contact
                  </a>
              </nav>
          </div>
        )}
    </header>
  );
};

const Hero: FC = () => (
    <section id="hero" className="relative min-h-screen flex items-center justify-center text-center px-4 overflow-hidden">
        <AnimatedSection className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-extrabold text-[var(--text-primary)] tracking-tighter mb-4 glitch" data-text={NAME}>{NAME}</h1>
            <TypingEffect text={TAGLINE} className="text-2xl md:text-3xl text-[var(--accent-text-color)] font-mono font-medium mb-8" />
            <div className="flex justify-center space-x-6">
                {SOCIAL_LINKS.map((link, i) => {
                    const Icon = link.icon;
                    return (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-all duration-300 hover:scale-110 hover:-translate-y-1" style={{ transitionDelay: `${i * 100 + 500}ms`}}>
                            <Icon className="w-8 h-8"/>
                        </a>
                    );
                })}
            </div>
        </AnimatedSection>
    </section>
);

const About: FC<{ summary: string, education: Education }> = ({ summary, education }) => (
    <AnimatedSection id="about" className="py-24">
        <h2 className="text-4xl font-bold text-[var(--text-primary)] text-center mb-16 tracking-tight section-title-underline">About Me</h2>
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start">
            <AnimatedSection direction="left" className="space-y-8">
                <div>
                    <p className="text-lg leading-relaxed text-[var(--text-secondary)]">{summary}</p>
                </div>
                <div className="bg-[var(--bg-secondary)] p-6 rounded-lg border border-[var(--border-color)] w-full">
                    <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">Education</h3>
                    <p className="font-semibold text-[var(--accent-text-color)]">{education.institution}</p>
                    <p className="text-[var(--text-primary)]">{education.degree}</p>
                    <p className="text-sm text-[var(--text-secondary)] mt-1">{education.duration}</p>
                    <p className="text-sm text-[var(--text-secondary)]">{education.location}</p>
                </div>
            </AnimatedSection>
            <AnimatedSection direction="right">
                <CliGame />
            </AnimatedSection>
        </div>
    </AnimatedSection>
);

const ExperienceTimeline: FC<{ experiences: Experience[] }> = ({ experiences }) => (
    <AnimatedSection id="experience" className="py-24">
        <h2 className="text-4xl font-bold text-[var(--text-primary)] text-center mb-16 tracking-tight section-title-underline">Work Experience</h2>
        <div className="max-w-3xl mx-auto relative pl-8 border-l-2 border-[var(--border-color)]">
            {experiences.map((exp, index) => (
                <div key={index} className="mb-12 timeline-marker">
                    <AnimatedSection stagger={true} className="transition-all duration-500">
                        <p className="text-sm text-[var(--text-secondary)] mb-1">{exp.duration}</p>
                        <h3 className="text-xl font-bold text-[var(--text-primary)]">{exp.role}</h3>
                        <div className="flex items-center space-x-2 text-[var(--accent-text-color)] mb-2 font-medium">
                            <span>{exp.company}</span>
                            {exp.website && (
                                <a href={exp.website} target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent-color-hover)]">
                                    <ExternalLinkIcon/>
                                </a>
                            )}
                        </div>
                        <ul className="list-disc list-inside text-[var(--text-secondary)] space-y-1">
                            {exp.description.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </AnimatedSection>
                </div>
            ))}
        </div>
    </AnimatedSection>
);

const ProjectsGrid: FC<{ projects: Project[] }> = ({ projects }) => (
    <AnimatedSection id="projects" className="py-24 bg-[var(--bg-tertiary)] px-4 md:px-8">
        <h2 className="text-4xl font-bold text-[var(--text-primary)] text-center mb-16 tracking-tight section-title-underline">Side Projects</h2>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
                <AnimatedSection key={index} style={{'transitionDelay': `${index * 100}ms`}}>
                    <CardSpotlight className="bg-[var(--bg-secondary)] h-full p-6 rounded-lg border border-[var(--border-color)] flex flex-col hover:border-[var(--accent-color)]/50 hover:bg-[var(--bg-secondary-hover)]">
                        <div className="flex items-start gap-4 mb-3">
                            {project.icon && (
                                <img src={project.icon} alt={`${project.title} logo`} className="w-12 h-12 rounded-xl object-cover shrink-0" />
                            )}
                            <div className="flex-grow">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-bold text-[var(--text-primary)] pr-2">{project.title}</h3>
                                    {project.url && (
                                        <a href={project.url} target="_blank" rel="noopener noreferrer" aria-label={`GitHub for ${project.title}`} className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-colors duration-300 shrink-0">
                                            <GithubIcon className="w-6 h-6"/>
                                        </a>
                                    )}
                                </div>
                                <p className="text-sm font-mono text-[var(--accent-text-color)]">{project.tech}</p>
                            </div>
                        </div>
                        <div className="text-[var(--text-secondary)] space-y-1 flex-grow">
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
        <h2 className="text-4xl font-bold text-[var(--text-primary)] text-center mb-16 tracking-tight section-title-underline">Skills</h2>
        <div className="max-w-4xl mx-auto space-y-10">
            {skillCategories.map(category => (
                <AnimatedSection key={category.title} stagger={true}>
                    <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-4">{category.title}</h3>
                    <div className="flex flex-wrap gap-3">
                        {category.skills.map((skill, index) => (
                            <div key={skill.name} className="bg-[var(--bg-tertiary)] text-[var(--text-primary)] py-2 px-5 rounded-full font-medium transition-all duration-200 ease-out transform hover:scale-110 hover:shadow-lg hover:bg-[var(--accent-color)] hover:text-white dark:hover:text-[var(--bg-primary)]" style={{transitionDelay: `${index * 50}ms`}}>
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
  <AnimatedSection id="achievements" className="py-24 bg-[var(--bg-tertiary)]">
    <div className="max-w-4xl mx-auto px-4">
      
      <AnimatedSection>
        <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-10 tracking-tight section-title-underline">Achievements</h2>
        <div className="space-y-6">
          {achievements.map((item, index) => (
            <CardSpotlight key={index} className="p-5 rounded-lg border border-[var(--border-color)] flex items-center gap-5 bg-[var(--bg-secondary)] hover:border-[var(--accent-color)]/50">
              <div className="shrink-0 bg-[var(--bg-tertiary)] p-3 rounded-full">
                <AwardIcon className="w-6 h-6 text-[var(--accent-color)]"/>
              </div>
              <p className="text-[var(--text-secondary)] flex-1">{item.description}</p>
            </CardSpotlight>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mt-20">
        <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-10 tracking-tight section-title-underline">Events & Conferences</h2>
        <div className="text-center text-[var(--text-secondary)] leading-relaxed">
          <p>
            {events.map(e => e.description).join(' • ')}
          </p>
        </div>
      </AnimatedSection>
    </div>
  </AnimatedSection>
);

const Contact: FC = () => (
    <footer id="contact" className="py-24 text-center relative overflow-hidden">
        <AnimatedSection>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-4 tracking-tight section-title-underline">Get In Touch</h2>
            <p className="max-w-md mx-auto mb-8 text-[var(--text-secondary)]">I'm currently open to new opportunities and collaborations. My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
            <a href={SOCIAL_LINKS.find(l => l.name === 'Email')?.url} className="inline-block bg-[var(--accent-color)] hover:bg-[var(--accent-color-hover)] text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 mb-12 shadow-lg">
                Say Hello
            </a>
            <div className="flex justify-center space-x-6 mb-8">
                {SOCIAL_LINKS.map(link => {
                    const Icon = link.icon;
                    return (
                        <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name} className="text-[var(--text-secondary)] hover:text-[var(--accent-color)] transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                           <Icon className="w-6 h-6"/>
                        </a>
                    );
                })}
            </div>
        </AnimatedSection>
    </footer>
);

const Footer: FC = () => (
  <footer className="text-center py-6 border-t border-[var(--border-color)]">
      <p className="text-sm text-[var(--text-secondary)]">Last Updated on {LAST_UPDATED}</p>
      <p className="text-sm text-[var(--text-tertiary)] mt-2">Designed & Built by Ankur Gupta</p>
  </footer>
);


// --- MAIN APP COMPONENT ---
export default function App() {
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
  
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (scrollableHeight > 0) {
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollableHeight) * 100;
        document.documentElement.style.setProperty('--scroll-progress', `${Math.min(progress, 100)}%`);
      }
    };
  
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
  
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Header navLinks={NAV_LINKS} theme={theme} toggleTheme={toggleTheme} />
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