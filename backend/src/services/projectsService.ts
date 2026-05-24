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
    title: 'Foodhub Mobile App & Automation Tool',
    description: 'Developed and maintained Foodhub cross-platform React Native apps supporting 1M+ active users. Built an internal app automation system utilizing Fastlane and Jenkins to streamline client app builds, dramatically improving delivery efficiency.',
    technologies: ['React Native', 'Redux Saga', 'Jenkins', 'Fastlane', 'Firebase', 'MoEngage'],
    liveUrl: 'https://foodhub.co.uk',
  },
  {
    id: '2',
    title: 'Web3 Crypto Staking & Escrow Payments',
    description: 'React Native WebView integration of Web3 and React Moralis, enabling secure decentralized crypto transactions, tokens staking, and escrow payments using MetaMask & TrustWallet.',
    technologies: ['React Native', 'Web3.js', 'Moralis', 'MetaMask', 'TypeScript', 'WebView'],
    githubUrl: 'https://github.com/bharathi-nb',
  },
  {
    id: '3',
    title: 'Athletes Social Network & Agora Streaming',
    description: 'Social networking and athlete profile management application. Integrated Agora API for real-time live audio/video streaming, and Stripe payment gateway for subscription-based access and premium services.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Agora SDK', 'Stripe', 'PostgreSQL'],
    githubUrl: 'https://github.com/bharathi-nb',
  }
];

export const getProjects = (): Project[] => {
  return projects;
};

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(p => p.id === id);
};

