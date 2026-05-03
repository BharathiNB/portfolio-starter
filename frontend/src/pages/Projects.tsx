import { useEffect, useState } from 'react';
import { ExternalLink, Code, Loader2 } from 'lucide-react';
import type { Project } from '../types';
import { API_URL } from '../config/env';

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
      <div className="flex-grow flex justify-center items-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex justify-center items-center">
        <div className="text-red-400 bg-red-400/10 px-4 py-3 rounded-lg border border-red-400/20">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 animate-in fade-in duration-700">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Selected Works</h1>
        <p className="text-text-muted text-lg max-w-2xl">
          A collection of projects I've worked on. Ranging from web applications to open-source tools.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id} 
            className="group bg-surface border border-white/5 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="h-48 bg-gradient-to-br from-white/5 to-white/10 relative overflow-hidden">
              {/* Fallback image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center text-white/20 font-bold text-2xl group-hover:scale-110 transition-transform duration-500">
                {project.title.substring(0, 2).toUpperCase()}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-text-muted text-sm mb-6 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {project.technologies.map(tech => (
                  <span key={tech} className="text-xs px-2 py-1 rounded-md bg-white/5 text-text-muted">
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                {project.githubUrl && (
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-text hover:text-primary transition-colors"
                  >
                    <Code className="w-4 h-4" /> Code
                  </a>
                )}
                {project.liveUrl && (
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-text hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
