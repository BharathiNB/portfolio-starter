export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
}

const projects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with cart and checkout functionality.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com/example/ecommerce',
  },
  {
    id: '2',
    title: 'Task Management App',
    description: 'A Kanban-style task manager with real-time updates.',
    technologies: ['Vue.js', 'Firebase', 'Tailwind CSS'],
    liveUrl: 'https://example.com/tasks',
  },
  {
    id: '3',
    title: 'Weather Dashboard',
    description: 'A weather app providing current conditions and forecasts using a public API.',
    technologies: ['JavaScript', 'HTML', 'CSS', 'OpenWeather API'],
    githubUrl: 'https://github.com/example/weather',
  }
];

export const getProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};
