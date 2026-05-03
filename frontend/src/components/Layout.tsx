import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background text-text">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-grow flex flex-col">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
