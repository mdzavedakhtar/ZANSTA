import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';
import { Logo } from '../shared/Logo';
import { MagneticButton } from '../ui/MagneticButton';
import { AdvertisementModal } from '../modals/AdvertisementModal';

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
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
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
      const scrollPosition = window.scrollY + 120; // Offset for header navbar height

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
      } else {
        navigate(item.path);
      }
      setMobileMenuOpen(false);
    } else {
      e.preventDefault();
      navigate(item.path);
      setMobileMenuOpen(false);
    }
  };

  // Sign In action now smoothly routes to Contact section as requested
  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isHomePage) {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#contact');
      } else {
        navigate('/contact');
      }
    } else {
      navigate('/contact');
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 pt-4 px-[3vw] sm:px-[4vw] transition-all duration-300">
        {/* Main Navbar Bar */}
        <div
          className={`relative flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-[#0B0B0B]/92 backdrop-blur-xl border border-[#F5F2ED]/10 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
              : 'bg-[#F5F2ED]/[0.02] backdrop-blur-md border border-[#F5F2ED]/[0.06]'
          }`}
        >
          {/* LEFT — Official Brand Logo (Large & Crisp) */}
          <div className="flex items-center shrink-0 z-10">
            <Link
              to="/"
              className="flex items-center justify-center group select-none transition-transform duration-200 hover:scale-105"
              title="ZANSTA"
            >
              <img
                src="/logo.png"
                alt="ZANSTA"
                className="h-10 sm:h-12 md:h-14 w-auto max-h-14 object-contain drop-shadow-[0_0_18px_rgba(139,13,26,0.45)] transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_28px_rgba(225,29,72,0.70)]"
              />
            </Link>
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
                  className={`relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                    isActive ? 'text-[#F5F2ED]' : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED]/90'
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

            {/* ADVERTISEMENT BUTTON RIGHT NEXT TO CONTACT */}
            <button
              type="button"
              onClick={() => setIsAdModalOpen(true)}
              className="relative ml-1 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-200 cursor-pointer text-[#F5F2ED] bg-[#8B0D1A]/20 border border-[#8B0D1A]/40 hover:bg-[#8B0D1A]/35 hover:border-[#8B0D1A]/70 flex items-center gap-1.5 shadow-[0_0_12px_rgba(139,13,26,0.25)] group"
              title="Click to view featured advertisement poster"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0D1A]"></span>
              </span>
              <span className="font-semibold text-[#F5F2ED] tracking-wide">Advertisement</span>
            </button>
          </nav>

          {/* RIGHT — Workspace CTA + Mobile Toggle */}
          <div className="flex items-center gap-3 shrink-0 z-10">
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
              className="md:hidden mt-3 mx-0 p-5 bg-[#0E0E0E] border border-[#F5F2ED]/12 rounded-2xl shadow-2xl space-y-3"
            >
              {/* Drawer Top Logo Header */}
              <div className="flex items-center justify-between pb-3 border-b border-[#F5F2ED]/10">
                <img src="/logo.png" alt="ZANSTA" className="h-9 w-auto object-contain drop-shadow-[0_0_12px_rgba(139,13,26,0.4)]" />
                <span className="text-[10px] font-mono text-[#F5F2ED]/50 uppercase tracking-wider">Navigation</span>
              </div>

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
                      className={`px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between cursor-pointer ${
                        isActive
                          ? 'bg-[#8B0D1A]/15 text-[#F5F2ED] border border-[#8B0D1A]/35'
                          : 'text-[#F5F2ED]/60 hover:bg-[#F5F2ED]/05 hover:text-[#F5F2ED]'
                      }`}
                    >
                      {item.label}
                    </a>
                  );
                })}

                {/* Mobile Advertisement Button */}
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAdModalOpen(true);
                  }}
                  className="w-full mt-1 px-4 py-2.5 text-sm font-medium rounded-xl transition-colors flex items-center justify-between cursor-pointer bg-[#8B0D1A]/20 text-[#F5F2ED] border border-[#8B0D1A]/40 hover:bg-[#8B0D1A]/30"
                >
                  <span className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E11D48] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8B0D1A]"></span>
                    </span>
                    Advertisement & Offers
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#8B0D1A] text-white">
                    View Poster
                  </span>
                </button>
              </div>

              <div className="pt-3 border-t border-[#F5F2ED]/08 flex flex-col gap-2">
                <Link to="/dashboard" className="w-full">
                  <span className="block text-center text-sm font-semibold text-[#F5F2ED] py-2.5 rounded-xl bg-[#8B0D1A] hover:bg-[#A01020] transition-colors shadow-[0_0_15px_rgba(139,13,26,0.35)]">
                    Enter Workspace
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Advertisement Poster Modal Popup */}
      <AdvertisementModal
        isOpen={isAdModalOpen}
        onClose={() => setIsAdModalOpen(false)}
      />
    </>
  );
};
