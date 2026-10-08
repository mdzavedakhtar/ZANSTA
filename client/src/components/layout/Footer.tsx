import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { Container } from '../ui/Container';
import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B0B0B] border-t border-[#F5F2ED]/[0.07] pt-16 pb-12 text-[#F5F2ED]/55 relative overflow-hidden">
      {/* Background Subtle Radial Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-64 bg-radial-gradient opacity-40 pointer-events-none" />

      <Container size="xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-[#F5F2ED]/[0.06]">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-[#F5F2ED]/50 max-w-sm leading-relaxed">
              ZANSTA is a high-performance developer workspace & software agency platform. Build, manage, and showcase extraordinary digital products.
            </p>

            {/* Direct Contact Badges in Footer */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2 text-[#F5F2ED]/70">
                <MapPin className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>Bhilai, Kohka, Durg, Chhattisgarh 490023</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[#F5F2ED]/70">
                <Phone className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <a href="tel:+916202888431" className="hover:text-white transition-colors font-mono">+91 6202888431</a>
                <span className="text-zinc-600">•</span>
                <a href="tel:+916287786639" className="hover:text-white transition-colors font-mono">+91 6287786639</a>
              </div>
              <div className="flex items-center gap-2 text-[#F5F2ED]/70">
                <Mail className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <a href="mailto:zanstacom@gmail.com" className="hover:text-white transition-colors font-mono">zanstacom@gmail.com</a>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/mdzavedakhtar"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#F5F2ED]/10 flex items-center justify-center text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:border-white/30 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-zaved-akhtar-22013828b"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#F5F2ED]/10 flex items-center justify-center text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:border-white/30 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:zanstacom@gmail.com"
                className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#F5F2ED]/10 flex items-center justify-center text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:border-white/30 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F2ED]/80 font-semibold">
              Product
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/projects" className="hover:text-[#F5F2ED] transition-colors">
                  Showcase Hub
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-[#F5F2ED] transition-colors">
                  Team Workspace
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-[#F5F2ED] transition-colors">
                  Agency Services
                </Link>
              </li>
              <li>
                <span className="text-slate-600 flex items-center gap-1 cursor-not-allowed">
                  Client Portal <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-[#F5F2ED]/55">Live</span>
                </span>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F2ED]/80 font-semibold">
              Company
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="hover:text-[#F5F2ED] transition-colors">
                  About Story
                </Link>
              </li>
              <li>
                <Link to="/team" className="hover:text-[#F5F2ED] transition-colors">
                  Core Engineering Team
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#F5F2ED] transition-colors">
                  Client Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA Box */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F2ED]/80 font-semibold">
              Let's Build
            </h4>
            <p className="text-xs text-[#F5F2ED]/55 leading-relaxed">
              Have an ambitious product vision? Let's engineer something remarkable together.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white hover:text-white/80 transition-colors pt-1"
            >
              Start Project Request <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F2ED]/35 gap-4">
          <p>© {new Date().getFullYear()} ZANSTA Platform Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-[#F5F2ED]/70 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#F5F2ED]/70 cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#F5F2ED]/70 cursor-pointer transition-colors">Security Standards</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};
