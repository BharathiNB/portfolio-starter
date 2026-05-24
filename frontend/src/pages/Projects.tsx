import { useEffect, useState, useRef } from 'react';
import { ExternalLink, Loader2 } from 'lucide-react';
import type { Project } from '../types';
import { API_URL } from '../config/env';
import { motion } from 'framer-motion';

// Custom inline SVG icons for brand items
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

// 3D Card Tilt Hook for Projects Page
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

// Project Grid Card Component
const ProjectGridCard = ({ project }: { project: Project }) => {
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
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_var(--x,50%)_var(--y,50%),rgba(59,130,246,0.08)_0%,transparent_50%)] pointer-events-none" />

      <div className="space-y-4" style={{ transform: 'translateZ(30px)' }}>
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 text-text-muted hover:text-primary transition-colors" />
            </a>
          )}
        </div>
        <p className="text-text-muted text-sm leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-8 space-y-6">
        <div className="flex flex-wrap gap-2" style={{ transform: 'translateZ(15px)' }}>
          {project.technologies.map((t, idx) => (
            <span key={idx} className="text-[10px] uppercase font-mono px-2 py-1 rounded bg-white/5 text-text-muted border border-white/5">
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 mt-auto border-t border-white/5 pt-4 text-xs font-bold uppercase tracking-wider">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-text-muted hover:text-white transition-colors cursor-pointer"
            >
              <GitHubIcon className="w-4 h-4" /> Code Repository
            </a>
          )}
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-primary hover:text-white transition-colors cursor-pointer"
            >
              <ExternalLink className="w-4 h-4" /> Live Execution
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);
        if (!response.ok) throw new Error('Failed to fetch projects');
        const data = await response.json();
        setProjects(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex-grow flex justify-center items-center min-h-[70vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex justify-center items-center min-h-[70vh]">
        <div className="text-red-400 bg-red-400/10 px-4 py-3 rounded-lg border border-red-400/20 text-sm font-semibold">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 py-20 w-full animate-in fade-in duration-700 relative z-10">
      <div className="mb-12 text-left">
        <h1 className="text-4xl font-black mb-4 text-white">Full Projects Portfolio</h1>
        <p className="text-text-muted text-base max-w-2xl font-medium leading-relaxed">
          Explore complete production cases, libraries, and tools I have engineered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectGridCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
