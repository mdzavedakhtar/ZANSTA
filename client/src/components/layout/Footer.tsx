import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { Container } from '../ui/Container';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';

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

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#F5F2ED]/10 flex items-center justify-center text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:border-[#8B0D1A]/50 hover:shadow-[0_0_12px_rgba(139,13,26,0.20)] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#F5F2ED]/10 flex items-center justify-center text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:border-[#8B0D1A]/50 hover:shadow-[0_0_12px_rgba(139,13,26,0.20)] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:contact@zansta.dev"
                className="w-9 h-9 rounded-lg bg-[#0E0E0E] border border-[#F5F2ED]/10 flex items-center justify-center text-[#F5F2ED]/50 hover:text-[#F5F2ED] hover:border-[#8B0D1A]/50 hover:shadow-[0_0_12px_rgba(139,13,26,0.20)] transition-all"
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
                  Client Portal <span className="text-[10px] bg-white/5 px-1.5 py-0.5 rounded text-[#F5F2ED]/55">Soon</span>
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
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8B0D1A] hover:text-[#F5F2ED] transition-colors pt-1"
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
