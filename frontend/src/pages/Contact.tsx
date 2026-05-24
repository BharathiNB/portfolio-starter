import { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { API_URL } from '../config/env';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) throw new Error(data.message || 'Failed to send message');
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  return (
    <div className="max-w-2xl mx-auto w-full px-6 sm:px-8 py-20 animate-in fade-in duration-700 relative z-10">
      <div className="mb-10 text-left">
        <h1 className="text-4xl font-black mb-4 text-white">Get in Touch</h1>
        <p className="text-text-muted text-base font-medium leading-relaxed">
          Leave a message below for custom inquiries, project collaboration, or opportunity invites.
        </p>
      </div>

      <div className="glass-panel p-8 md:p-10 rounded-2xl border-white/5 shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent pointer-events-none" />
        
        {status === 'success' ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-12 text-center"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="p-4 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-4 animate-bounce">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
            <p className="text-text-muted text-sm font-semibold max-w-sm">
              Thank you for reaching out. I'll get back to you as soon as possible.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            {status === 'error' && (
              <div className="flex items-center gap-3 p-4 bg-red-500/10 text-red-400 rounded-lg border border-red-500/20">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-xs font-semibold">{errorMessage}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 text-left">
                <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-text-muted">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/20"
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2 text-left">
                <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-muted">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all placeholder:text-white/20"
                  placeholder="john@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2 text-left">
              <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-text-muted">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none placeholder:text-white/20"
                placeholder="Discussing opportunities, roles, or project work..."
              />
            </div>
            
            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-bold text-xs uppercase tracking-wider py-4 rounded-xl hover:bg-primary/95 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              {status === 'submitting' ? (
                <>Transmitting Message...</>
              ) : (
                <>Send Message <Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Contact;
