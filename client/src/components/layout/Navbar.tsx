import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { MagneticButton } from '../ui/MagneticButton';

interface NavItem {
  label: string;
  id: string;
  path: string;
}

// Nav items sequence matched strictly to HomePage section order
const navItems: NavItem[] = [
  { label: 'Home', id: 'hero', path: '/' },
  { label: 'About', id: 'about', path: '/about' },
  { label: 'Services', id: 'services', path: '/services' },
  { label: 'Projects', id: 'projects', path: '/projects' },
  { label: 'Team', id: 'team', path: '/team' },
  { label: 'Contact', id: 'contact', path: '/contact' },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('hero');
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/';

  // Handle scroll detection for background glass effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle ScrollSpy active section highlight when on Home Page
  useEffect(() => {
    if (!isHomePage) return;

    const sectionIds = navItems.map((item) => item.id);

    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220; // Offset for header navbar height

      if (window.scrollY < 100) {
        setActiveSection('hero');
        return;
      }

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionIds[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [isHomePage]);

  // Handle hash scrolling if user lands on home with a hash (e.g. /#services)
  useEffect(() => {
    if (isHomePage && location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(targetId);
        }, 100);
      }
    }
  }, [isHomePage, location.hash]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    if (isHomePage) {
      e.preventDefault();
      const el = document.getElementById(item.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(item.id);
        window.history.pushState(null, '', item.id === 'hero' ? '/' : `#${item.id}`);
      }
      setMobileMenuOpen(false);
    } else {
      e.preventDefault();
      navigate(`/#${item.id}`);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 pt-4 px-[3vw] sm:px-[4vw] transition-all duration-300">
      {/* Main Navbar Bar */}
      <div
        className={`relative flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0B0B0B]/92 backdrop-blur-xl border border-[#F5F2ED]/10 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            : 'bg-[#F5F2ED]/[0.02] backdrop-blur-md border border-[#F5F2ED]/[0.06]'
        }`}
      >
        {/* LEFT — Logo */}
        <div className="flex items-center shrink-0 z-10">
          <Logo size="md" />
        </div>

        {/* CENTER — Desktop Nav (absolutely centered) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-[#0E0E0E]/80 border border-[#F5F2ED]/10 px-3 py-1.5 rounded-full shadow-inner">
          {navItems.map((item) => {
            const isActive = isHomePage
              ? activeSection === item.id
              : location.pathname === item.path;

            return (
              <a
                key={item.id}
                href={isHomePage ? `#${item.id}` : item.path}
                onClick={(e) => handleNavClick(e, item)}
                className={`relative px-4 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-[#F5F2ED]' : 'text-[#F5F2ED]/50 hover:text-[#F5F2ED]/80'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="navActiveIndicator"
                    className="absolute inset-0 bg-[#8B0D1A]/20 border border-[#8B0D1A]/35 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* RIGHT — CTA + Mobile Toggle */}
        <div className="flex items-center gap-3 shrink-0 z-10">
          <Link to="/login" className="hidden sm:inline-block">
            <span className="text-xs font-medium text-[#F5F2ED]/55 hover:text-[#F5F2ED] px-3 py-2 transition-colors duration-200">
              Sign In
            </span>
          </Link>

          <Link to="/dashboard" className="hidden sm:inline-block">
            <MagneticButton
              size="sm"
              variant="glow"
              rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            >
              Workspace
            </MagneticButton>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#F5F2ED]/60 hover:text-[#F5F2ED] rounded-lg bg-[#F5F2ED]/[0.05] border border-[#F5F2ED]/10 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 mx-0 p-5 bg-[#0E0E0E] border border-[#F5F2ED]/12 rounded-2xl shadow-2xl space-y-4"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => {
                const isActive = isHomePage
                  ? activeSection === item.id
                  : location.pathname === item.path;

                return (
                  <a
                    key={item.id}
                    href={isHomePage ? `#${item.id}` : item.path}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`px-4 py-3 text-sm font-medium rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#8B0D1A]/15 text-[#F5F2ED] border border-[#8B0D1A]/35'
                        : 'text-[#F5F2ED]/60 hover:bg-[#F5F2ED]/05 hover:text-[#F5F2ED]'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>

            <div className="pt-4 border-t border-[#F5F2ED]/08 flex flex-col gap-2">
              <Link to="/login" className="w-full">
                <span className="block text-center text-sm font-medium text-[#F5F2ED]/70 py-2.5 rounded-xl border border-[#F5F2ED]/10 bg-[#F5F2ED]/05 hover:text-[#F5F2ED] transition-colors">
                  Sign In
                </span>
              </Link>
              <Link to="/dashboard" className="w-full">
                <span className="block text-center text-sm font-semibold text-[#F5F2ED] py-2.5 rounded-xl bg-[#8B0D1A] hover:bg-[#A01020] transition-colors">
                  Enter Workspace
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

