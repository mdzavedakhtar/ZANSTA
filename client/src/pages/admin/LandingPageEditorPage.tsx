import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { landingService } from '@/services/landingService';
import { CMSLandingPageContent } from '@/types/cms';
import { Globe, Save, ExternalLink, ShieldCheck, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

export const LandingPageEditorPage: React.FC = () => {
  const [content, setContent] = useState<CMSLandingPageContent>(landingService.getLandingContent());
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    landingService.updateLandingContent(content);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleVisibilityToggle = (sectionKey: keyof CMSLandingPageContent['sectionVisibility']) => {
    setContent((prev) => ({
      ...prev,
      sectionVisibility: {
        ...prev.sectionVisibility,
        [sectionKey]: !prev.sectionVisibility[sectionKey],
      },
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2.5 mb-1">
            <div className="w-8 h-8 rounded-lg bg-[#8B0D1A]/15 border border-[#8B0D1A]/30 flex items-center justify-center text-[#8B0D1A]">
              <Globe className="w-4 h-4" />
            </div>
            <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
              LANDING PAGE CMS CONTROL
            </h1>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Manage public ZANSTA landing page copy, section visibility, and presentation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a href="/" target="_blank" rel="noreferrer">
            <Button size="sm" variant="outline" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
              Preview Landing Page
            </Button>
          </a>
        </div>
      </div>

      {isSaved && (
        <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 font-mono">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Landing page CMS settings published successfully!</span>
        </div>
      )}

      {/* Warning Box on Hero Animation */}
      <div className="p-4 rounded-xl bg-[#8B0D1A]/10 border border-[#8B0D1A]/20 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#8B0D1A] shrink-0 mt-0.5" />
        <div className="text-xs space-y-0.5">
          <p className="font-bold text-[#F5F2ED]">Hero 3D Animation Protection Active</p>
          <p className="text-[#F5F2ED]/60 font-sans">
            The approved WebGL 3D animation, particles, camera, and timing systems are protected and remain intact.
            Only text copy and section visibility can be updated below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. Hero Content */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/05 pb-3">
            <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider">
              1. HERO SECTION CONTENT
            </h2>
            <button
              type="button"
              onClick={() => handleVisibilityToggle('hero')}
              className={`p-1.5 rounded-lg border text-xs font-mono flex items-center gap-1.5 transition-colors ${
                content.sectionVisibility.hero
                  ? 'bg-emerald-950/80 border-emerald-500/30 text-emerald-400'
                  : 'bg-white/05 border-white/10 text-white/40'
              }`}
            >
              {content.sectionVisibility.hero ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
              <span>{content.sectionVisibility.hero ? 'Visible' : 'Hidden'}</span>
            </button>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Hero Main Headline</label>
              <input
                type="text"
                value={content.heroHeadline || ''}
                onChange={(e) => setContent((prev) => ({ ...prev, heroHeadline: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Hero Subheadline</label>
              <textarea
                rows={2}
                value={content.heroSubheadline || ''}
                onChange={(e) => setContent((prev) => ({ ...prev, heroSubheadline: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-sans"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#F5F2ED]/80">CTA Button Label</label>
                <input
                  type="text"
                  value={content.ctaText || ''}
                  onChange={(e) => setContent((prev) => ({ ...prev, ctaText: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-[#F5F2ED]/80">CTA Target Link</label>
                <input
                  type="text"
                  value={content.ctaLink || ''}
                  onChange={(e) => setContent((prev) => ({ ...prev, ctaLink: e.target.value }))}
                  className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] font-mono focus:outline-none focus:border-[#8B0D1A]"
                />
              </div>
            </div>
          </div>
        </Card>

        {/* 2. Brand Story / Features Section */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <div className="flex items-center justify-between border-b border-white/05 pb-3">
            <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider">
              2. BRAND STORY & PHILOSOPHY
            </h2>
          </div>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Story Headline</label>
              <input
                type="text"
                value={content.brandStoryHeadline || ''}
                onChange={(e) => setContent((prev) => ({ ...prev, brandStoryHeadline: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">Story Body Text</label>
              <textarea
                rows={3}
                value={content.brandStoryText || ''}
                onChange={(e) => setContent((prev) => ({ ...prev, brandStoryText: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A] font-sans"
              />
            </div>
          </div>
        </Card>

        {/* 3. Section Visibility Grid */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            3. LANDING PAGE SECTION VISIBILITY
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Featured Project Showcase</span>
              <input
                type="checkbox"
                checked={Boolean(content.sectionVisibility.projectShowcase)}
                onChange={() => handleVisibilityToggle('projectShowcase')}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Team Showcase</span>
              <input
                type="checkbox"
                checked={Boolean(content.sectionVisibility.teamShowcase)}
                onChange={() => handleVisibilityToggle('teamShowcase')}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Services Showcase</span>
              <input
                type="checkbox"
                checked={Boolean(content.sectionVisibility.services)}
                onChange={() => handleVisibilityToggle('services')}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>

            <label className="p-3.5 rounded-xl bg-[#0E0E0E] border border-white/10 flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-[#F5F2ED]">Agency Vision</span>
              <input
                type="checkbox"
                checked={Boolean(content.sectionVisibility.agencyVision)}
                onChange={() => handleVisibilityToggle('agencyVision')}
                className="w-4 h-4 accent-[#8B0D1A] rounded"
              />
            </label>
          </div>
        </Card>

        {/* 4. Final CTA */}
        <Card surfaceTier="100" className="p-6 space-y-4 border border-white/10">
          <h2 className="text-sm font-bold text-[#F5F2ED] font-display uppercase tracking-wider border-b border-white/05 pb-3">
            4. FINAL CTA BANNER
          </h2>

          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">CTA Banner Headline</label>
              <input
                type="text"
                value={content.finalCtaHeadline || ''}
                onChange={(e) => setContent((prev) => ({ ...prev, finalCtaHeadline: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80">CTA Subtext</label>
              <input
                type="text"
                value={content.finalCtaSubtext || ''}
                onChange={(e) => setContent((prev) => ({ ...prev, finalCtaSubtext: e.target.value }))}
                className="w-full px-3.5 py-2.5 bg-[#0E0E0E] border border-white/10 rounded-xl text-xs text-[#F5F2ED] focus:outline-none focus:border-[#8B0D1A]"
              />
            </div>
          </div>
        </Card>

        {/* Save Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Button size="md" variant="glow" type="submit" leftIcon={<Save className="w-4 h-4" />}>
            Publish Landing Page Content
          </Button>
        </div>
      </form>
    </div>
  );
};
