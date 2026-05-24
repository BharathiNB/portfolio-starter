import { useEffect, useState, useRef } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView 
} from 'framer-motion';
import { 
  Award, 
  Mail, 
  Download, 
  Code2, 
  GitBranch, 
  ArrowRight,
  Cpu as AI,
  Sparkles,
  CheckCircle,
  FileCode,
  Shield
} from 'lucide-react';

// Custom inline SVG icons for brand items
const LinkedInIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// Loading Screen Component
const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1800; // Fast loading time
    const intervalTime = 20;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="fixed inset-0 bg-[#080B14] flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="text-center space-y-6 max-w-xs px-4">
        <motion.div 
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent"
        >
          BN
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.2 }}
          className="text-xs uppercase tracking-widest text-text-muted font-mono font-semibold"
        >
          Senior Software Engineer
        </motion.div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
          <motion.div 
            className="h-full bg-gradient-to-r from-primary via-secondary to-accent"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};

// CountUp Animations for Metrics
const CountUp = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : 0;
  const suffix = match ? match[2] : '';

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const end = target;
    if (start === end) return;
    
    let totalFrames = Math.round(duration * 60);
    let frame = 0;
    
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // easeOutExpo
      const current = end * (1 - Math.pow(2, -10 * progress));
      setCount(Math.min(current, end));
      
      if (frame >= totalFrames) {
        clearInterval(timer);
        setCount(end);
      }
    }, 1000 / 60);
    
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(target % 1 === 0 ? 0 : 1)}
      {suffix}
    </span>
  );
};

// Custom typing snippet widget for About section
const CodeSnippet = () => {
  const codeLines = [
    "// Foodhub automation tool config",
    "const releaseRunner = new ClientAppPipeline({",
    "  platform: 'React Native',",
    "  tools: ['Fastlane', 'Jenkins'],",
    "  scaling: '1M+ users'",
    "});",
    "",
    "releaseRunner.on('build', async (client) => {",
    "  log.info(`Packaging app for: ${client.name}`);",
    "  const bundle = await buildBundle(client.config);",
    "  await deployToStores(bundle); // Saves 20+ hours",
    "});"
  ];
  
  const [typedCode, setTypedCode] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);

  useEffect(() => {
    if (currentLine >= codeLines.length) {
      const timeout = setTimeout(() => {
        setTypedCode([]);
        setCurrentLine(0);
        setCurrentChar(0);
      }, 6000);
      return () => clearTimeout(timeout);
    }

    const interval = setInterval(() => {
      const lineText = codeLines[currentLine];
      if (currentChar < lineText.length) {
        setTypedCode(prev => {
          const next = [...prev];
          if (!next[currentLine]) next[currentLine] = '';
          next[currentLine] += lineText[currentChar];
          return next;
        });
        setCurrentChar(prev => prev + 1);
      } else {
        setCurrentLine(prev => prev + 1);
        setCurrentChar(0);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [currentLine, currentChar]);

  return (
    <div className="bg-[#03060c]/90 border border-white/5 rounded-xl p-5 font-mono text-[11px] leading-relaxed text-text-muted shadow-2xl relative overflow-hidden h-[240px] w-full">
      <div className="flex items-center gap-1.5 border-b border-white/5 pb-3 mb-3">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/70"></div>
        <span className="text-[10px] text-white/30 ml-2">automation_runner.ts</span>
      </div>
      <div className="space-y-1 overflow-y-auto h-[170px] pr-2">
        {typedCode.map((line, idx) => {
          const safeLine = line || '';
          return (
            <div key={idx} className="flex">
              <span className="text-white/20 select-none mr-4 w-4 text-right">{idx + 1}</span>
              <span className={
                safeLine.startsWith('//') ? 'text-green-400/80 italic' :
                safeLine.includes('const') || safeLine.includes('await') || safeLine.includes('new') ? 'text-purple-400 font-semibold' :
                safeLine.includes('log') || safeLine.includes('releaseRunner') ? 'text-blue-400' :
                'text-slate-300'
              }>
                {safeLine}
              </span>
            </div>
          );
        })}
        {currentLine < codeLines.length && (
          <span className="animate-pulse inline-block w-1.5 h-3.5 bg-primary ml-1"></span>
        )}
      </div>
    </div>
  );
};

// 3D Card Tilt Hook for Projects
const useTilt = () => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateXValue = ((y - centerY) / centerY) * 10; 
    const rotateYValue = ((centerX - x) / centerX) * 10;
    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return { cardRef, rotateX, rotateY, handleMouseMove, handleMouseLeave };
};

// Individual Project Card Component
const ProjectCard = ({ project }: { project: { title: string; desc: string; tech: string[]; detail: string } }) => {
  const { cardRef, rotateX, rotateY, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <motion.div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className="glass-panel rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col justify-between group transition-all duration-300 hover:border-primary/45 border-white/5 shadow-2xl relative"
    >
      {/* Background Radial Glow Spotlight */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,130,246,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="space-y-4" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <ArrowRight className="w-4 h-4 text-text-muted group-hover:text-primary group-hover:translate-x-1 transition-all" />
        </div>
        <p className="text-text-muted text-sm leading-relaxed">
          {project.desc}
        </p>
        <div className="text-xs text-primary font-semibold font-mono bg-primary/5 border border-primary/10 rounded-md px-3 py-1.5 inline-block">
          {project.detail}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-8" style={{ transform: 'translateZ(15px)' }}>
        {project.tech.map((t, idx) => (
          <span key={idx} className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-white/5 text-text-muted border border-white/5">
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

// Tech Card components for Hero Floating Deck
const FloatingCard = ({ text, x, y, delay }: { text: string; x: string; y: string; delay: number }) => {
  return (
    <motion.div 
      className="absolute glass-panel px-4 py-2.5 rounded-xl text-[11px] font-bold select-none flex items-center gap-2 shadow-2xl border border-white/10 hover:border-primary/40 cursor-default"
      style={{ top: y, left: x }}
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
      whileHover={{ scale: 1.08, zIndex: 10, borderColor: "rgba(59, 130, 246, 0.4)" }}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      {text}
    </motion.div>
  );
};

const Home = () => {
  const [loading, setLoading] = useState(true);

  // Skills Data
  const marqueeSkills = [
    'React.js', 'React Native', 'JavaScript', 'Redux', 'Redux Thunk', 'Redux Saga', 
    'HTML', 'CSS', 'Node.js', 'Express.js', 'Firebase', 'MongoDB', 'PostgreSQL', 
    'Jenkins', 'Fastlane', 'Git', 'GitHub', 'JIRA', 'Cursor', 'Claude', 'ChatGPT', 
    'AI Assisted Development', 'Prompt Engineering'
  ];

  // Timeline Scroll Trigger Hook Helper
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end end"]
  });
  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="flex-grow flex flex-col relative">
      {/* Background Gradient Orbs */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-primary/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[500px] h-[500px] rounded-full bg-secondary/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section id="home" className="min-h-[90vh] flex flex-col justify-center max-w-7xl mx-auto px-6 sm:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text details */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Top Badges */}
            <div className="flex flex-wrap gap-2 text-[10px] font-bold font-mono tracking-wider">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                🏆 Best Performance Award Winner – 2025
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                Senior Software Engineer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
                1M+ User Scale Products
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent/10 text-accent border border-accent/20">
                <Sparkles className="w-3 h-3" /> AI Enhanced
              </span>
            </div>

            {/* Headline */}
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1] text-white"
            >
              Building scalable <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
                mobile products
              </span> <br />
              used by millions.
            </motion.h1>

            {/* Subtext */}
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-base sm:text-lg max-w-xl leading-relaxed font-medium"
            >
              Senior Software Engineer specializing in scalable mobile platforms, reusable architectures, 
              CI/CD automation pipelines, and production systems supporting 1M+ active users.
            </motion.p>

            {/* Actions */}
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-primary text-white font-bold text-xs tracking-wider uppercase hover:bg-primary/95 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                View Projects
              </button>
              <a 
                href="/BharathiNB.pdf" 
                download="Bharathi_N_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white/5 border border-white/5 text-white font-bold text-xs tracking-wider uppercase hover:bg-white/10 hover:border-white/10 transition-all hover:scale-[1.03] active:scale-[0.98] cursor-pointer"
              >
                <Download className="w-4.5 h-4.5" /> Download Resume
              </a>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-transparent border border-white/5 text-text-muted hover:text-white font-bold text-xs tracking-wider uppercase hover:bg-white/5 transition-all cursor-pointer"
              >
                Contact Me
              </button>
            </motion.div>
          </div>

          {/* Right Floating Cards deck */}
          <div className="lg:col-span-5 relative h-[380px] hidden md:block select-none">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-accent/5 rounded-full blur-[100px] w-[300px] h-[300px] top-10 left-10 pointer-events-none" />
            <FloatingCard text="React Native" x="10%" y="15%" delay={0} />
            <FloatingCard text="Redux Saga / Thunk" x="50%" y="5%" delay={0.8} />
            <FloatingCard text="Node.js &amp; SQL/NoSQL" x="15%" y="45%" delay={1.6} />
            <FloatingCard text="Firebase &amp; Analytics" x="60%" y="35%" delay={0.4} />
            <FloatingCard text="Jenkins &amp; Fastlane CI/CD" x="10%" y="75%" delay={2.2} />
            <FloatingCard text="1M+ Scale Experience" x="55%" y="65%" delay={1.2} />
          </div>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 py-10 w-full relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { metric: '1M+', title: 'Users Supported', desc: 'Production app scale' },
            { metric: '3+', title: 'Years Experience', desc: 'Mobile app development' },
            { metric: '2+', title: 'Companies Served', desc: 'Foodhub & Sunrise Technologies' },
            { metric: '100%', title: 'CI/CD Automation', desc: 'Fastlane & Jenkins pipelines' }
          ].map((m, idx) => (
            <motion.div 
              key={idx}
              className="glass-panel p-6 rounded-2xl border-white/5 text-center relative overflow-hidden group hover:border-primary/20 transition-colors"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent mb-2">
                <CountUp value={m.metric} />
              </div>
              <div className="text-white font-bold text-xs sm:text-sm tracking-wide mb-1">{m.title}</div>
              <div className="text-text-muted text-[11px] font-medium">{m.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 w-full relative z-10">
        <div className="text-left max-w-xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary font-mono">01. Professional Bio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">About Me</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="glass-panel p-8 rounded-2xl border-white/5 space-y-6 shadow-2xl">
              <p className="text-text-muted leading-relaxed text-sm md:text-base font-medium">
                Senior Software Engineer with 3+ years of experience building production mobile applications, 
                reusable architecture components, and robust CI/CD workflows. I focus on developing clean, 
                maintainable codebase solutions that improve performance and scale seamlessly to millions of users.
              </p>
              
              <div className="border-t border-white/5 pt-6">
                <div className="text-xs text-white font-bold tracking-wider uppercase mb-4">Core Areas of Specialization:</div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    'React Native', 'React.js', 'Node.js (Express)', 
                    'State Management', 'Performance Tuning', 'Product Engineering',
                    'CI/CD Pipelines', 'Automation Tools', 'AI-Assisted Workflows'
                  ].map((spec, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-text-muted font-semibold">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      {spec}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-white/5 pt-6">
                <div className="text-xs text-white font-bold tracking-wider uppercase mb-4">Engineering Practices:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-text-muted font-semibold">
                  <div className="flex items-center gap-2">✓ Full Feature Ownership &amp; Delivery</div>
                  <div className="flex items-center gap-2">✓ Scalable Mobile Architecture Layouts</div>
                  <div className="flex items-center gap-2">✓ Collaborative Code Review Practices</div>
                  <div className="flex items-center gap-2">✓ Agile &amp; Sprint Planning Execution</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <CodeSnippet />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 w-full relative z-10 bg-white/[0.01] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 text-left mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary font-mono">02. Stack Expertise</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Skills &amp; Technologies</h2>
        </div>

        {/* Marquee Row 1 */}
        <div className="flex overflow-hidden select-none w-full relative">
          <div className="flex gap-4 py-2 animate-marquee whitespace-nowrap">
            {marqueeSkills.concat(marqueeSkills).map((s, idx) => (
              <span 
                key={idx} 
                className="text-xs font-semibold tracking-wide font-mono px-5 py-2.5 rounded-full bg-surface border border-white/5 text-text-muted hover:text-white hover:border-primary/30 transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
          {/* Fade overlays */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </section>

      {/* Experience Timeline Section */}
      <section id="experience" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 w-full relative z-10">
        <div className="text-left max-w-xl mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary font-mono">03. Career Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Work Experience</h2>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Scroll progress connector line */}
          <div className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-[2px] bg-white/5" />
          <motion.div 
            className="absolute left-[20px] md:left-1/2 md:-translate-x-1/2 top-4 w-[2px] bg-gradient-to-b from-primary via-secondary to-accent origin-top" 
            style={{ height: pathHeight }}
          />

          {/* Experience Item 1 (Foodhub) */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {/* Timeline Marker Dot */}
            <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-4 w-4 h-4 rounded-full bg-background border-2 border-primary z-20 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            
            <div className="pl-12 md:pl-0 md:pr-12 md:text-right text-left space-y-2">
              <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-bold font-mono tracking-wider">
                SEP 2022 - PRESENT
              </span>
              <h3 className="text-2xl font-black text-white">Foodhub</h3>
              <p className="text-text-muted text-sm font-semibold tracking-wide uppercase">Senior Software Engineer</p>
              <div className="flex justify-start md:justify-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-[10px] text-yellow-400 font-bold tracking-wide">
                  🏆 Best Performance Award – 2025
                </span>
              </div>
            </div>

            <div className="pl-12 md:pl-12 text-left space-y-4">
              <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-3 shadow-xl">
                <p className="text-xs text-text-muted leading-relaxed font-semibold">
                  Actively maintaining cross-platform mobile apps for 1M+ active users. Developed key deployment automation structures.
                </p>
                <ul className="list-disc pl-4 text-xs text-text-muted space-y-2 leading-relaxed">
                  <li>Built automation system using **Jenkins &amp; Fastlane** for streamlining client builds.</li>
                  <li>Improved app architecture, state workflows using **Redux Saga &amp; Thunk**.</li>
                  <li>Integrated push alerts, MoEngage tracking, and Firebase setups.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Experience Item 2 (Sunrise Technologies) */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Timeline Marker Dot */}
            <div className="absolute left-[13px] md:left-1/2 md:-translate-x-1/2 top-4 w-4 h-4 rounded-full bg-background border-2 border-secondary z-20 shadow-[0_0_10px_rgba(139,92,246,0.5)]" />
            
            <div className="pl-12 md:pl-0 md:pr-12 md:text-right text-left space-y-2 md:order-1 order-none">
              <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20 text-[10px] font-bold font-mono tracking-wider">
                OCT 2021 - AUG 2022
              </span>
              <h3 className="text-2xl font-black text-white">Sunrise Technologies</h3>
              <p className="text-text-muted text-sm font-semibold tracking-wide uppercase">Junior Software Developer</p>
              <div className="flex justify-start md:justify-end">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-secondary/10 border border-secondary/20 text-[10px] text-secondary font-bold tracking-wide">
                  🚀 Bonus Increment (Within 3 Months)
                </span>
              </div>
            </div>

            <div className="pl-12 md:pl-12 text-left space-y-4 md:order-2">
              <div className="glass-panel p-6 rounded-2xl border-white/5 space-y-3 shadow-xl">
                <p className="text-xs text-text-muted leading-relaxed font-semibold">
                  Worked on mobile applications across crypto payment processors, staking platforms, and real-time media tools.
                </p>
                <ul className="list-disc pl-4 text-xs text-text-muted space-y-2 leading-relaxed">
                  <li>Integrated Web3 crypto pipelines with MetaMask and TrustWallet.</li>
                  <li>Integrated Stripe payments and Agora audio/video integrations.</li>
                  <li>Designed backend databases (SQL) and APIs on Node.js.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 w-full relative z-10">
        <div className="text-left max-w-xl mb-12">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary font-mono">04. Engineering Output</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: 'Food Delivery Platform',
              desc: 'High-performance React Native mobile applications supporting 1M+ active users. Highly optimized Redux flow and dynamic API bindings.',
              detail: '1M+ Active Users',
              tech: ['React Native', 'Redux', 'Firebase', 'MoEngage']
            },
            {
              title: 'Client App Automation Tool',
              desc: 'Internal orchestration platform streamlining the client app generation and onboarding workflow. Saves significant hours of developer overhead.',
              detail: 'Jenkins & Fastlane Pipelines',
              tech: ['Fastlane', 'Jenkins', 'Bash Scripting', 'Node.js']
            },
            {
              title: 'Crypto Payment Platform',
              desc: 'Decentralized crypto transaction suite facilitating escrow processing, token staking, and payment execution natively.',
              detail: 'MetaMask & TrustWallet',
              tech: ['React Native', 'Web3.js', 'Escrow Contract', 'Moralis']
            },
            {
              title: 'Trading Tracker Dashboard',
              desc: 'Real-time financial analytics dashboard displaying complex charts, portfolio tracking parameters, and RSI metrics.',
              detail: 'RSI & Analytics Charts',
              tech: ['React.js', 'Chart.js', 'PostgreSQL', 'Tailwind CSS']
            }
          ].map((project, idx) => (
            <ProjectCard key={idx} project={project} />
          ))}
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 w-full relative z-10 bg-white/[0.005] border-y border-white/5">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary font-mono">05. Recognition</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Honors &amp; Awards</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            {
              title: 'Best Performance Award – 2025',
              org: 'Foodhub',
              desc: 'Awarded for exceptional contributions to key mobile features, address revamp systems, and overall delivery speed.'
            },
            {
              title: 'Best Performer Of Quarter',
              org: 'Foodhub',
              desc: 'Recognized for owning the full delivery pipeline of the Address Revamp project under compressed sprint deadlines.'
            },
            {
              title: 'Bonus Increment',
              org: 'Sunrise Technologies',
              desc: 'Awarded within 3 months of joining for outstanding mobile contributions, clean code delivery, and Web3 solutions.'
            }
          ].map((a, idx) => (
            <motion.div 
              key={idx}
              className="glass-panel p-8 rounded-2xl border-white/5 flex flex-col items-center text-center space-y-4 hover:border-primary/30 transition-all hover:scale-105"
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <div className="p-4 rounded-full bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-white">{a.title}</h3>
              <p className="text-xs text-primary font-semibold font-mono tracking-wide">{a.org}</p>
              <p className="text-xs text-text-muted leading-relaxed">{a.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Engineering Workflow Diagram */}
      <section id="workflow" className="max-w-7xl mx-auto px-6 sm:px-8 py-24 w-full relative z-10">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-16">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="w-8 h-[1px] bg-primary"></span>
            <span className="text-xs uppercase font-bold tracking-widest text-primary font-mono">06. Production Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white">Engineering Workflow</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-5xl mx-auto relative">
          {[
            { step: '1', title: 'Requirements', desc: 'Core product goals setup', icon: <FileCode className="w-5 h-5" /> },
            { step: '2', title: 'AI Planning', desc: 'Cursor & ChatGPT strategies', icon: <AI className="w-5 h-5" /> },
            { step: '3', title: 'Development', desc: 'Modular React Native code', icon: <Code2 className="w-5 h-5" /> },
            { step: '4', title: 'Testing', desc: 'Unit, integration & flow tests', icon: <Shield className="w-5 h-5" /> },
            { step: '5', title: 'CI/CD Automation', desc: 'Fastlane & Jenkins pipelines', icon: <GitBranch className="w-5 h-5" /> },
            { step: '6', title: 'Production Release', desc: 'Deploy app store builds', icon: <CheckCircle className="w-5 h-5" /> }
          ].map((w, idx) => (
            <motion.div 
              key={idx}
              className="glass-panel p-6 rounded-xl border-white/5 flex flex-col items-center text-center space-y-3 hover:border-accent/30 transition-all relative group"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              {/* Connected Line indicators */}
              {idx < 5 && (
                <div className="hidden md:block absolute top-1/2 -right-[10px] w-5 h-[1.5px] bg-gradient-to-r from-primary to-secondary z-20 pointer-events-none group-hover:scale-x-125 transition-transform" />
              )}
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                {w.icon}
              </div>
              <h3 className="font-bold text-xs tracking-wider text-white uppercase">{w.title}</h3>
              <p className="text-[10px] text-text-muted leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="max-w-5xl mx-auto px-6 sm:px-8 py-24 w-full relative z-10">
        <div className="glass-panel p-10 md:p-14 rounded-3xl border-white/5 relative overflow-hidden text-center space-y-8 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-secondary/5 to-transparent pointer-events-none" />
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-xs font-bold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-ping" />
            Open for opportunities
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white">
            Let's build something <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent">
              exceptional together.
            </span>
          </h2>

          <p className="text-text-muted max-w-xl mx-auto leading-relaxed text-sm md:text-base">
            Feel free to connect if you are looking for an experienced product-focused mobile engineer, 
            need help building automation setups, or just want to collaborate!
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a 
              href="mailto:bharathinb14@gmail.com" 
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white text-xs font-bold uppercase tracking-wider hover:bg-primary/95 transition-all hover:scale-105 cursor-pointer"
            >
              <Mail className="w-4 h-4" /> bharathinb14@gmail.com
            </a>
            <a 
              href="https://www.linkedin.com/in/bharathi-nb-789a60181" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
            >
              <LinkedInIcon className="w-4 h-4 text-blue-400" /> LinkedIn Profile
            </a>
            <a 
              href="https://github.com/bharathi-nb" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-white text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-all hover:scale-105 cursor-pointer"
            >
              <GitHubIcon className="w-4 h-4" /> GitHub Profile
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
