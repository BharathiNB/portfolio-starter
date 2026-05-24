import { Code2, Mail } from 'lucide-react';

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

const Footer = () => {
  return (
    <footer className="border-t border-white/5 bg-background/50 backdrop-blur-md relative z-10">
      <div className="max-w-7xl mx-auto py-12 px-6 sm:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-primary" />
            <span className="font-bold text-sm tracking-wider text-white">
              BHARATHI N<span className="text-primary font-extrabold font-mono">.</span>
            </span>
          </div>
          
          <div>
            <p className="text-text-muted text-xs text-center md:text-left tracking-wide">
              &copy; {new Date().getFullYear()} Bharathi N. Built with React, TypeScript, and Framer Motion. All rights reserved.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/bharathi-nb" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-muted hover:text-white hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer"
            >
              <GitHubIcon className="h-4 w-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/bharathi-nb-789a60181" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-muted hover:text-white hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer"
            >
              <LinkedInIcon className="h-4 w-4" />
            </a>
            <a 
              href="mailto:bharathinb14@gmail.com" 
              className="p-2 rounded-lg bg-white/5 border border-white/5 text-text-muted hover:text-white hover:bg-white/10 hover:border-primary/20 transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

