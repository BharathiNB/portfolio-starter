import { Code, User, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-surface border-t border-white/10 mt-auto">
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-text-muted text-sm text-center md:text-left">
              &copy; {new Date().getFullYear()} Developer Portfolio. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="sr-only">GitHub</span>
              <Code className="h-5 w-5" />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="sr-only">LinkedIn</span>
              <User className="h-5 w-5" />
            </a>
            <a href="#" className="text-text-muted hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <MessageCircle className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
