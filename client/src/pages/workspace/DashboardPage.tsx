import React, { useEffect, useState, useCallback } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { projectService } from '@/services/projectService';
import { teamService } from '@/services/teamService';
import { reviewService } from '@/services/reviewService';
import { demoRequestService } from '@/services/demoRequestService';
import { enquiryService } from '@/services/enquiryService';
import { serviceService } from '@/services/serviceService';
import { bannerService } from '@/services/bannerService';
import { CMSProject, CMSService, ContactEnquiry, CMSBanner, EnquiryStatus } from '@/types/cms';
import { useCmsLiveSync } from '@/hooks/useCmsLiveSync';
import {
  FolderGit2,
  Users,
  MessageSquareQuote,
  Inbox,
  Send,
  Layers,
  Plus,
  ArrowUpRight,
  Globe,
  UserPlus,
  Code2,
  Megaphone,
  Mail,
  Phone,
  Building,
  DollarSign,
  Clock,
  Sparkles,
  CheckCircle2,
  Radio,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [services, setServices] = useState<CMSService[]>([]);
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>([]);
  const [banners, setBanners] = useState<CMSBanner[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalDemoRequests, setTotalDemoRequests] = useState(0);
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [loading, setLoading] = useState(true);
  const [updatingEnquiryId, setUpdatingEnquiryId] = useState<string | null>(null);

  const loadData = useCallback(async () => {
    // Synchronous immediate cache first
    setProjects(projectService.getProjects());
    setServices(serviceService.getServices());
    setEnquiries(enquiryService.getEnquiries());
    setBanners(bannerService.getBanners());
    setTotalMembers(teamService.getTeamMembers().length);
    setTotalReviews(reviewService.getReviews().length);
    setTotalDemoRequests(demoRequestService.getRequests().length);
    setTotalEnquiries(enquiryService.getEnquiries().length);

    try {
      const [projs, team, revs, reqs, enqs, svcs, bans] = await Promise.all([
        projectService.fetchProjects(),
        teamService.fetchTeamMembers(),
        reviewService.fetchReviews(),
        demoRequestService.fetchRequests(),
        enquiryService.fetchEnquiries(),
        serviceService.fetchServices(),
        bannerService.fetchBanners(),
      ]);
      if (projs) setProjects(projs);
      if (team) setTotalMembers(team.length);
      if (revs) setTotalReviews(revs.length);
      if (reqs) setTotalDemoRequests(reqs.length);
      if (enqs) {
        setEnquiries(enqs);
        setTotalEnquiries(enqs.length);
      }
      if (svcs) setServices(svcs);
      if (bans) setBanners(bans);
    } catch {
      // Silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Real-time live sync hook - updates instantly when any CMS data changes on any device
  useCmsLiveSync('all', () => {
    loadData();
  });

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      setUpdatingEnquiryId(enquiryId);
      await enquiryService.updateStatus(enquiryId, newStatus);
      const updated = enquiryService.getEnquiries();
      setEnquiries(updated);
      setTotalEnquiries(updated.length);
    } catch (err) {
      console.error('Failed to update enquiry status', err);
    } finally {
      setUpdatingEnquiryId(null);
    }
  };

  return (
    <div className="space-y-8 pb-12 w-full max-w-full overflow-x-hidden">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 w-full">
        <div className="space-y-1 max-w-full">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#F5F2ED] tracking-tight font-display break-words">
              ADMIN CONTROL CENTER OVERVIEW
            </h1>
            <Badge variant="crimson" size="sm" className="shrink-0 flex items-center gap-1">
              <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
              REAL-TIME SYNC
            </Badge>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans leading-relaxed">
            Live command center. Updates synchronize instantly across all devices without requiring page refresh.
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Link to="/admin/projects/new" className="shrink-0">
            <Button size="sm" variant="glow" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              + Create Project
            </Button>
          </Link>
          <Link to="/admin/banners/new" className="shrink-0">
            <Button size="sm" variant="glow" leftIcon={<Megaphone className="w-3.5 h-3.5 text-cyan-400" />}>
              + Add Offer Banner
            </Button>
          </Link>
          <Link to="/admin/services/new" className="shrink-0">
            <Button size="sm" variant="outline" leftIcon={<Layers className="w-3.5 h-3.5" />}>
              + Add Service
            </Button>
          </Link>
          <Link to="/admin/team/new" className="shrink-0">
            <Button size="sm" variant="outline" leftIcon={<UserPlus className="w-3.5 h-3.5" />}>
              + Add Team
            </Button>
          </Link>
          <Link to="/admin/landing" className="shrink-0">
            <Button size="sm" variant="ghost" leftIcon={<Globe className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
              Landing CMS
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin Derived Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 sm:gap-4 w-full">
        <Link to="/admin/projects">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">PORTFOLIO</span>
              <FolderGit2 className="w-4 h-4 text-[#8B0D1A] shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{projects.length}</p>
            <p className="text-[10px] text-[#F5F2ED]/50 font-mono truncate">Showcase Items</p>
          </Card>
        </Link>

        <Link to="/admin/services">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">SERVICES</span>
              <Layers className="w-4 h-4 text-[#8B0D1A] shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{services.length}</p>
            <p className="text-[10px] text-[#8B0D1A] font-mono truncate">Offerings & Stacks</p>
          </Card>
        </Link>

        <Link to="/admin/banners">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400/80">
              <span className="truncate">PROMO OFFERS</span>
              <Megaphone className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-cyan-400 font-mono">{banners.length}</p>
            <p className="text-[10px] text-cyan-400/70 font-mono truncate">5s Slider Banners</p>
          </Card>
        </Link>

        <Link to="/admin/team">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">TEAM</span>
              <Users className="w-4 h-4 text-[#F5F2ED]/70 shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalMembers}</p>
            <p className="text-[10px] text-[#8B0D1A] font-mono truncate">Active Engineers</p>
          </Card>
        </Link>

        <Link to="/admin/reviews">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">REVIEWS</span>
              <MessageSquareQuote className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalReviews}</p>
            <p className="text-[10px] text-amber-400/80 font-mono truncate">Testimonials</p>
          </Card>
        </Link>

        <Link to="/admin/enquiries">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full bg-emerald-950/20">
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-400">
              <span className="truncate">LIVE LEADS</span>
              <Send className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-emerald-400 font-mono">{totalEnquiries}</p>
            <p className="text-[10px] text-emerald-400/80 font-mono truncate">Incoming Enquiries</p>
          </Card>
        </Link>
      </div>

      {/* Real-time Client Enquiries & Leads Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <Inbox className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#F5F2ED] font-display flex items-center gap-2">
                <span>RECENT CLIENT ENQUIRIES & LEADS</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono">
                  LIVE SOCKET STREAM
                </span>
              </h2>
              <p className="text-xs text-[#F5F2ED]/50 font-sans">
                Real-time enquiries submitted via website contact forms appear here instantly.
              </p>
            </div>
          </div>
          <Link to="/admin/enquiries" className="text-xs text-emerald-400 hover:underline font-mono shrink-0">
            View All Enquiries ({enquiries.length}) →
          </Link>
        </div>

        {enquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#F5F2ED]/40 bg-[#0E0E0E] rounded-2xl border border-white/05">
            No contact enquiries received yet. Forms submitted by visitors will instantly appear here in real time.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {enquiries.slice(0, 6).map((enq) => (
              <Card
                key={enq.id}
                surfaceTier="200"
                glowOnHover
                className="p-4 space-y-3.5 border border-white/10 rounded-xl relative overflow-hidden group hover:border-emerald-500/30 transition-all"
              >
                {/* Header row */}
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate font-display">{enq.name}</h4>
                    {enq.company && (
                      <p className="text-xs text-[#F5F2ED]/60 flex items-center gap-1 truncate">
                        <Building className="w-3 h-3 text-[#F5F2ED]/40 shrink-0" />
                        {enq.company}
                      </p>
                    )}
                  </div>
                  <Badge
                    variant={
                      enq.status === 'NEW'
                        ? 'crimson'
                        : enq.status === 'IN_DISCUSSION'
                        ? 'neutral'
                        : 'active'
                    }
                    size="sm"
                    className="shrink-0 uppercase font-mono text-[10px]"
                  >
                    {enq.status.replace('_', ' ')}
                  </Badge>
                </div>

                {/* Contact info badges */}
                <div className="space-y-1.5 text-xs text-[#F5F2ED]/70 font-mono">
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <a href={`mailto:${enq.email}`} className="hover:text-cyan-400 hover:underline truncate">
                      {enq.email}
                    </a>
                  </div>
                  {enq.phone && (
                    <div className="flex items-center gap-2 truncate">
                      <Phone className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <a href={`tel:${enq.phone}`} className="hover:text-emerald-400 hover:underline">
                        {enq.phone}
                      </a>
                    </div>
                  )}
                  {enq.serviceInterested && (
                    <div className="flex items-center gap-2 truncate">
                      <Layers className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="text-[#F5F2ED]/90 truncate">{enq.serviceInterested}</span>
                    </div>
                  )}
                  {enq.budget && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-amber-300 font-semibold">{enq.budget}</span>
                    </div>
                  )}
                </div>

                {/* Message preview */}
                <div className="p-2.5 rounded-lg bg-black/40 border border-white/05 text-xs text-[#F5F2ED]/80 line-clamp-3 leading-relaxed">
                  &ldquo;{enq.message}&rdquo;
                </div>

                {/* Footer action and timestamp */}
                <div className="flex items-center justify-between pt-2 border-t border-white/05 text-[11px] text-[#F5F2ED]/40 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(enq.createdAt).toLocaleDateString()}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {enq.status === 'NEW' && (
                      <button
                        onClick={() => handleStatusChange(enq.id, 'IN_DISCUSSION')}
                        disabled={updatingEnquiryId === enq.id}
                        className="px-2 py-1 rounded bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono transition-colors"
                      >
                        Discuss
                      </button>
                    )}
                    {enq.status !== 'CLOSED' && (
                      <button
                        onClick={() => handleStatusChange(enq.id, 'CLOSED')}
                        disabled={updatingEnquiryId === enq.id}
                        className="px-2 py-1 rounded bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono transition-colors"
                      >
                        Close
                      </button>
                    )}
                    <a
                      href={`mailto:${enq.email}?subject=Regarding your enquiry with ZANSTA`}
                      className="px-2 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono transition-colors"
                    >
                      Reply
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Main Portfolio & Services Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 w-full">
        {/* Active Projects Showcase with Sequence Number */}
        <div className="lg:col-span-2 space-y-4 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F2ED] font-display flex items-center gap-2">
              <FolderGit2 className="w-4 h-4 text-[#8B0D1A]" />
              <span>PORTFOLIO PROJECTS (ORDERED)</span>
            </h2>
            <Link to="/admin/projects" className="text-xs text-[#8B0D1A] hover:underline font-mono shrink-0">
              Manage All ({projects.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#F5F2ED]/40 bg-[#0E0E0E] rounded-2xl border border-white/05">
                No projects found. Click "+ Create Project" to add your first portfolio item.
              </div>
            ) : (
              projects.slice(0, 6).map((p, idx) => (
                <Card key={p.id} surfaceTier="200" glowOnHover className="p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border border-white/05 w-full">
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-[#8B0D1A] text-white font-mono text-[10px] font-bold shadow">
                        #{p.order !== undefined ? p.order : idx + 1}
                      </span>
                      <h3 className="text-sm font-bold text-[#F5F2ED] font-display truncate max-w-[200px] sm:max-w-none">{p.name}</h3>
                      <Badge variant={p.status === 'LIVE' || p.status === 'COMPLETED' ? 'active' : 'crimson'} size="sm" className="shrink-0">
                        {p.status}
                      </Badge>
                      {p.isFeatured && (
                        <Badge variant="neutral" size="sm" className="text-amber-300 border-amber-500/30 shrink-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[#F5F2ED]/55 line-clamp-2 sm:line-clamp-1">{p.shortDescription}</p>
                  </div>
                  <Link to={`/admin/projects/${p.id}/edit`} className="self-end sm:self-center shrink-0">
                    <Button size="sm" variant="ghost" rightIcon={<ArrowUpRight className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
                      Edit
                    </Button>
                  </Link>
                </Card>
              ))
            )}
          </div>
        </div>

        {/* Agency Services Panel */}
        <div className="space-y-4 min-w-0">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F2ED] font-display flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#8B0D1A] shrink-0" />
              <span>SERVICES OVERVIEW</span>
            </h2>
            <Link to="/admin/services" className="text-xs text-[#8B0D1A] hover:underline font-mono shrink-0">
              Manage ({services.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {services.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#F5F2ED]/40 bg-[#0E0E0E] rounded-2xl border border-white/05">
                No services added yet. Click "+ Add Service" to configure agency offerings.
              </div>
            ) : (
              services.slice(0, 5).map((s, idx) => (
                <Card key={s.id} surfaceTier="200" className="p-3.5 space-y-2 border border-white/05 w-full">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/10 text-white font-mono text-[10px] font-bold">
                        #{s.order !== undefined ? s.order : idx + 1}
                      </span>
                      <h4 className="text-xs font-bold text-[#F5F2ED] truncate">{s.name}</h4>
                    </div>
                    <Link to={`/admin/services/${s.id}/edit`} className="shrink-0 text-xs text-[#8B0D1A] hover:underline">
                      Edit
                    </Link>
                  </div>
                  <p className="text-[11px] text-[#F5F2ED]/50 line-clamp-1">{s.shortDescription}</p>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

