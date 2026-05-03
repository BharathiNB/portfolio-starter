import { ArrowRight, Terminal } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex-grow flex flex-col justify-center items-center text-center animate-in fade-in duration-1000">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary mb-8">
        <Terminal className="w-4 h-4" />
        <span className="text-sm font-medium">Full Stack Developer</span>
      </div>
      
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
        Building digital <br className="hidden md:block" />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          experiences.
        </span>
      </h1>
      
      <p className="max-w-2xl text-lg md:text-xl text-text-muted mb-10">
        Hi, I'm a developer passionate about creating clean, scalable, and user-centric applications. 
        Specializing in React, Node.js, and modern web technologies.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link 
          to="/projects" 
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
        >
          View Projects <ArrowRight className="w-4 h-4" />
        </Link>
        <Link 
          to="/contact" 
          className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-surface border border-white/10 font-medium hover:bg-white/5 transition-all hover:scale-105 active:scale-95"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
};

export default Home;
