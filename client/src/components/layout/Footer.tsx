import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../shared/Logo';
import { Container } from '../ui/Container';
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  ShieldCheck,
  Award,
  ExternalLink,
  CheckCircle2,
  X,
  FileText,
  Lock,
  Sparkles,
  Building2,
} from 'lucide-react';
import { CMSCertificate } from '@/types/cms';
import { certificateService } from '@/services/certificateService';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';
import { motion, AnimatePresence } from 'framer-motion';

export const Footer: React.FC = () => {
  const [certificates, setCertificates] = useState<CMSCertificate[]>(() =>
    certificateService.getCertificates().filter((c) => c.isVisible)
  );
  const [selectedCert, setSelectedCert] = useState<CMSCertificate | null>(null);
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | 'security' | null>(null);

  // Live real-time sync when Superadmin updates/adds/deletes certificates
  useCmsLiveSync('certificate', () => {
    setCertificates(certificateService.getCertificates().filter((c) => c.isVisible));
  });

  useEffect(() => {
    let mounted = true;
    certificateService.fetchCertificates().then((data) => {
      if (mounted) {
        setCertificates(data.filter((c) => c.isVisible));
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer className="bg-[#080808] border-t border-[#F5F2ED]/[0.08] pt-16 pb-12 text-[#F5F2ED]/65 relative overflow-hidden">
      {/* Background Ambient Cyber Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-48 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-primary-950/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 w-96 h-96 bg-emerald-950/15 rounded-full blur-3xl pointer-events-none" />

      <Container size="xl" className="relative z-10">
        {/* Main Footer Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#F5F2ED]/[0.08]">
          {/* Brand & Direct Contact Col */}
          <div className="lg:col-span-2 space-y-5">
            <Logo size="lg" />
            <p className="text-sm text-[#F5F2ED]/60 max-w-sm leading-relaxed">
              ZANSTA is a high-performance developer workspace & enterprise software engineering agency. We architect AI-driven cloud ecosystems, full-stack web architectures, and mission-critical applications.
            </p>

            {/* Direct Contact Badges */}
            <div className="space-y-2.5 pt-2 text-xs">
              <a
                href="https://maps.google.com/?q=Bhilai,Kohka,Durg,Chhattisgarh,490023"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2.5 text-[#F5F2ED]/75 hover:text-white transition-colors group"
              >
                <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0 group-hover:border-primary-500/40">
                  <MapPin className="w-3.5 h-3.5 text-primary-400 shrink-0" />
                </div>
                <span>Bhilai, Kohka, Durg, Chhattisgarh 490023</span>
              </a>

              <div className="flex flex-wrap items-center gap-2.5 text-[#F5F2ED]/75">
                <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                  <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                </div>
                <a
                  href="tel:+916202888431"
                  className="hover:text-white transition-colors font-mono font-medium hover:underline"
                >
                  +91 6202888431
                </a>
                <span className="text-zinc-600">•</span>
                <a
                  href="tel:+916287786639"
                  className="hover:text-white transition-colors font-mono font-medium hover:underline"
                >
                  +91 6287786639
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[#F5F2ED]/75">
                <div className="w-6 h-6 rounded-md bg-white/[0.04] border border-white/10 flex items-center justify-center shrink-0">
                  <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                </div>
                <a
                  href="mailto:zanstacom@gmail.com"
                  className="hover:text-white transition-colors font-mono font-medium hover:underline"
                >
                  zanstacom@gmail.com
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/mdzavedakhtar"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center text-[#F5F2ED]/60 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all hover:scale-105"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/md-zaved-akhtar-22013828b"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center text-[#F5F2ED]/60 hover:text-[#0a66c2] hover:border-[#0a66c2]/40 hover:shadow-[0_0_15px_rgba(10,102,194,0.2)] transition-all hover:scale-105"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:zanstacom@gmail.com"
                className="w-9 h-9 rounded-xl bg-[#111111] border border-white/10 flex items-center justify-center text-[#F5F2ED]/60 hover:text-amber-400 hover:border-amber-400/40 hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] transition-all hover:scale-105"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product & Solutions Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F2ED]/90 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
              Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/projects"
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150"
                >
                  Showcase Hub
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard"
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150"
                >
                  Team Workspace
                </Link>
              </li>
              <li>
                <Link
                  to="/services"
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150"
                >
                  Agency Services
                </Link>
              </li>
              <li>
                <Link
                  to="/client"
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-flex items-center gap-1.5 transform duration-150"
                >
                  <span>Client Portal</span>
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-semibold">
                    ACTIVE
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#F5F2ED]/90 font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to="/about"
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150"
                >
                  About Story
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150"
                >
                  Core Engineering Team
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150"
                >
                  Client Inquiries
                </Link>
              </li>
              <li>
                <a
                  href="#reviews"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById('reviews');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else window.location.href = '/#reviews';
                  }}
                  className="text-[#F5F2ED]/70 hover:text-white transition-colors hover:translate-x-1 inline-block transform duration-150 cursor-pointer"
                >
                  Verified Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Let's Build CTA Card */}
          <div className="space-y-4 bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/10 rounded-2xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-primary-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Let's Build</span>
            </div>
            <p className="text-xs text-[#F5F2ED]/60 leading-relaxed">
              Have an ambitious vision? Partner with ZANSTA engineers to build high-converting, scalable software.
            </p>
            <Link
              to="/contact"
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-primary-600/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Start Project Request <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Company Verification & Government MSME Udyam Certificates Showcase */}
        <div className="py-10 border-b border-[#F5F2ED]/[0.08]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white tracking-wide uppercase font-mono">
                  Trust Credentials & Government Recognitions
                </h3>
              </div>
              <p className="text-xs text-[#F5F2ED]/50 mt-1">
                ZANSTA Platform is officially verified, certified, and compliant with government MSME & enterprise security protocols.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Official Verified Business
              </span>
            </div>
          </div>

          {/* Certificate Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() => setSelectedCert(cert)}
                className="group relative bg-[#0e0e0e]/90 hover:bg-[#151515] border border-white/[0.08] hover:border-emerald-500/40 rounded-2xl p-4 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.1)] cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/15 to-primary-500/15 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform overflow-hidden">
                      {cert.logoUrl ? (
                        <img
                          src={cert.logoUrl}
                          alt={cert.title}
                          className="w-full h-full object-contain p-1"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <Award className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-semibold border border-emerald-500/20">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      VERIFIED
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {cert.title}
                  </h4>
                  <p className="text-[11px] text-[#F5F2ED]/50 mt-0.5 line-clamp-1">
                    {cert.issuer}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px]">
                  <span className="font-mono text-[#F5F2ED]/70 font-medium">
                    {cert.certificateNumber || 'Verified ID'}
                  </span>
                  <span className="text-emerald-400/80 group-hover:text-emerald-300 font-medium flex items-center gap-0.5">
                    View <ArrowUpRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Copyright & Compliance Modals Trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#F5F2ED]/45 gap-4">
          <p>© {new Date().getFullYear()} ZANSTA Platform Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <button
              onClick={() => setActiveModal('privacy')}
              className="hover:text-white transition-colors cursor-pointer text-xs"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="hover:text-white transition-colors cursor-pointer text-xs"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setActiveModal('security')}
              className="hover:text-white transition-colors cursor-pointer text-xs"
            >
              Security Standards
            </button>
          </div>
        </div>
      </Container>

      {/* Certificate Modal Dialog */}
      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-lg bg-[#0e0e0e] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                    {selectedCert.logoUrl ? (
                      <img
                        src={selectedCert.logoUrl}
                        alt={selectedCert.title}
                        className="w-full h-full object-contain p-2"
                      />
                    ) : (
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <div>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/20">
                      {selectedCert.badgeText || 'GOVERNMENT VERIFIED CREDENTIAL'}
                    </span>
                    <h3 className="text-lg font-bold text-white mt-1">
                      {selectedCert.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedCert(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm text-[#F5F2ED]/70">
                <div className="bg-black/50 border border-white/[0.08] rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F5F2ED]/45">Issuing Authority</span>
                    <span className="text-white font-medium">{selectedCert.issuer}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#F5F2ED]/45">Registration / Certificate ID</span>
                    <span className="font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      {selectedCert.certificateNumber || 'Verified ID'}
                    </span>
                  </div>
                  {selectedCert.issuedDate && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-[#F5F2ED]/45">Issued Date</span>
                      <span className="text-white font-medium">{selectedCert.issuedDate}</span>
                    </div>
                  )}
                </div>

                {selectedCert.description && (
                  <p className="text-xs text-[#F5F2ED]/60 leading-relaxed bg-white/[0.02] border border-white/5 rounded-xl p-3.5">
                    {selectedCert.description}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-end gap-3">
                  {selectedCert.verificationUrl && (
                    <a
                      href={selectedCert.verificationUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-lg shadow-emerald-500/20 cursor-pointer"
                    >
                      Verify Document Online <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setSelectedCert(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Legal & Compliance Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto custom-scrollbar bg-[#0f0f0f] border border-white/15 rounded-3xl p-6 md:p-8 shadow-2xl"
            >
              <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/10 mb-5">
                <div className="flex items-center gap-2.5">
                  {activeModal === 'privacy' && <Lock className="w-5 h-5 text-primary-400" />}
                  {activeModal === 'terms' && <FileText className="w-5 h-5 text-amber-400" />}
                  {activeModal === 'security' && <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                  <h3 className="text-base font-bold text-white">
                    {activeModal === 'privacy' && 'Privacy Policy & Data Protection'}
                    {activeModal === 'terms' && 'Terms of Service & Agency Engagement'}
                    {activeModal === 'security' && 'Security Standards & Compliance'}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-xs text-[#F5F2ED]/70 space-y-4 leading-relaxed">
                {activeModal === 'privacy' && (
                  <>
                    <p className="font-semibold text-white">1. Information We Collect</p>
                    <p>
                      ZANSTA collects project requirements, client contact details, and authentication credentials strictly for delivering software development, workspace collaboration, and client demo services.
                    </p>
                    <p className="font-semibold text-white">2. Data Security & Storage</p>
                    <p>
                      All intellectual property, proprietary codebases, and client documents are encrypted at rest using AES-256 and transmitted exclusively over TLS 1.3 encrypted sockets.
                    </p>
                    <p className="font-semibold text-white">3. Zero Data Sharing</p>
                    <p>
                      We never sell or monetize client data. Information shared with ZANSTA remains strictly confidential and bound by bilateral Non-Disclosure Agreements (NDAs).
                    </p>
                  </>
                )}

                {activeModal === 'terms' && (
                  <>
                    <p className="font-semibold text-white">1. Scope of Work & Deliverables</p>
                    <p>
                      All software engineering sprints, milestones, and architectural deliverables are governed by explicit proposals and project agreements issued through the ZANSTA Agency platform.
                    </p>
                    <p className="font-semibold text-white">2. Intellectual Property Rights</p>
                    <p>
                      Upon full project settlement, 100% of source code, intellectual property, design assets, and production deployment credentials transfer entirely to the client.
                    </p>
                    <p className="font-semibold text-white">3. Service Level Agreement (SLA)</p>
                    <p>
                      We offer dedicated maintenance, uptime guarantees, and emergency bug remediation according to client-tier SLA contracts.
                    </p>
                  </>
                )}

                {activeModal === 'security' && (
                  <>
                    <p className="font-semibold text-white">1. Government MSME Verification</p>
                    <p>
                      ZANSTA is an enterprise registered under the Ministry of Micro, Small & Medium Enterprises (Govt. of India) under Registration No. <span className="font-mono text-emerald-400">UDYAM-CG-02-0018924</span>.
                    </p>
                    <p className="font-semibold text-white">2. Encryption & Infrastructure</p>
                    <p>
                      Our infrastructure utilizes end-to-end 256-Bit SSL certificates, real-time WebSocket protocol filtering, and role-based access control (RBAC) across Superadmin, Engineer, and Client tiers.
                    </p>
                    <p className="font-semibold text-white">3. Vulnerability Remediation</p>
                    <p>
                      Automated vulnerability scanning and continuous dependency auditing ensure zero compromise across all production deployments.
                    </p>
                  </>
                )}
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex justify-end">
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Understood
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </footer>
  );
};
