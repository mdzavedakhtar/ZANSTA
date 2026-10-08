import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { projectService } from '@/services/projectService';
import { teamService } from '@/services/teamService';
import { reviewService } from '@/services/reviewService';
import { demoRequestService } from '@/services/demoRequestService';
import { enquiryService } from '@/services/enquiryService';
import { serviceService } from '@/services/serviceService';
import { CMSProject, CMSService } from '@/types/cms';
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
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [services, setServices] = useState<CMSService[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalDemoRequests, setTotalDemoRequests] = useState(0);
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    // Synchronous immediate cache first
    setProjects(projectService.getProjects());
    setServices(serviceService.getServices());
    setTotalMembers(teamService.getTeamMembers().length);
    setTotalReviews(reviewService.getReviews().length);
    setTotalDemoRequests(demoRequestService.getRequests().length);
    setTotalEnquiries(enquiryService.getEnquiries().length);

    try {
      const [projs, team, revs, reqs, enqs, svcs] = await Promise.all([
        projectService.fetchProjects(),
        teamService.fetchTeamMembers(),
        reviewService.fetchReviews(),
        demoRequestService.fetchRequests(),
        enquiryService.fetchEnquiries(),
        serviceService.fetchServices(),
      ]);
      if (projs) setProjects(projs);
      if (team) setTotalMembers(team.length);
      if (revs) setTotalReviews(revs.length);
      if (reqs) setTotalDemoRequests(reqs.length);
      if (enqs) setTotalEnquiries(enqs.length);
      if (svcs) setServices(svcs);
    } catch (e) {
      console.warn('Dashboard live refresh error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="space-y-8 pb-12 w-full max-w-full overflow-x-hidden">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 w-full">
        <div className="space-y-1 max-w-full">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-[#F5F2ED] tracking-tight font-display break-words">
              ADMIN CONTROL CENTER OVERVIEW
            </h1>
            <Badge variant="crimson" size="sm" className="shrink-0">LIVE CMS</Badge>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans leading-relaxed">
            Welcome back, Owner. Manage projects, sequence ordering, team members, services, reviews, and client inquiries.
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <Link to="/admin/projects/new" className="shrink-0">
            <Button size="sm" variant="glow" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              + Create Project
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
              Landing Page CMS
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin Derived Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 w-full">
        <Link to="/admin/projects">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">PORTFOLIO PROJECTS</span>
              <FolderGit2 className="w-4 h-4 text-[#8B0D1A] shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{projects.length}</p>
            <p className="text-[10px] text-[#F5F2ED]/50 font-mono truncate">Showcase Items</p>
          </Card>
        </Link>

        <Link to="/admin/services">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">AGENCY SERVICES</span>
              <Layers className="w-4 h-4 text-[#8B0D1A] shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{services.length}</p>
            <p className="text-[10px] text-[#8B0D1A] font-mono truncate">Offerings & Stacks</p>
          </Card>
        </Link>

        <Link to="/admin/team">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">TEAM BUILDERS</span>
              <Users className="w-4 h-4 text-[#F5F2ED]/70 shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalMembers}</p>
            <p className="text-[10px] text-[#8B0D1A] font-mono truncate">Active Engineers</p>
          </Card>
        </Link>

        <Link to="/admin/reviews">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">CLIENT REVIEWS</span>
              <MessageSquareQuote className="w-4 h-4 text-amber-400 shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalReviews}</p>
            <p className="text-[10px] text-amber-400/80 font-mono truncate">Testimonials</p>
          </Card>
        </Link>

        <Link to="/admin/enquiries">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-3.5 sm:p-4 border border-white/10 w-full">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span className="truncate">CLIENT ENQUIRIES</span>
              <Send className="w-4 h-4 text-emerald-400 shrink-0 ml-1" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalEnquiries}</p>
            <p className="text-[10px] text-emerald-400/80 font-mono truncate">Incoming Requests</p>
          </Card>
        </Link>
      </div>

      {/* Main Overview Grid */}
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
