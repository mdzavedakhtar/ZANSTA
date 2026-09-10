import React, { useEffect, useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { projectService } from '@/services/projectService';
import { teamService } from '@/services/teamService';
import { reviewService } from '@/services/reviewService';
import { demoRequestService } from '@/services/demoRequestService';
import { enquiryService } from '@/services/enquiryService';
import { activityService } from '@/services/activityService';
import { CMSProject, ActivityLogItem } from '@/types/cms';
import {
  FolderGit2,
  Users,
  MessageSquareQuote,
  Inbox,
  Send,
  MonitorPlay,
  Activity,
  Plus,
  ArrowUpRight,
  Globe,
  UserPlus,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage: React.FC = () => {
  const [projects, setProjects] = useState<CMSProject[]>([]);
  const [totalMembers, setTotalMembers] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [totalDemoRequests, setTotalDemoRequests] = useState(0);
  const [totalEnquiries, setTotalEnquiries] = useState(0);
  const [activities, setActivities] = useState<ActivityLogItem[]>([]);

  useEffect(() => {
    const allProjs = projectService.getProjects();
    setProjects(allProjs);
    setTotalMembers(teamService.getTeamMembers().length);
    setTotalReviews(reviewService.getReviews().length);
    setTotalDemoRequests(demoRequestService.getRequests().length);
    setTotalEnquiries(enquiryService.getEnquiries().length);
    setActivities(activityService.getActivities());
  }, []);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-black text-[#F5F2ED] tracking-tight font-display">
              ADMIN CONTROL CENTER OVERVIEW
            </h1>
            <Badge variant="crimson" size="sm">LIVE CMS</Badge>
          </div>
          <p className="text-xs text-[#F5F2ED]/55 font-sans">
            Welcome back, Owner. Manage projects, team, reviews, demo requests, and contact enquiries.
          </p>
        </div>

        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/admin/projects/new">
            <Button size="sm" variant="glow" leftIcon={<Plus className="w-3.5 h-3.5" />}>
              + Create Project
            </Button>
          </Link>
          <Link to="/admin/team/new">
            <Button size="sm" variant="outline" leftIcon={<UserPlus className="w-3.5 h-3.5" />}>
              + Add Team
            </Button>
          </Link>
          <Link to="/admin/reviews/new">
            <Button size="sm" variant="outline" leftIcon={<MessageSquareQuote className="w-3.5 h-3.5" />}>
              + Add Review
            </Button>
          </Link>
          <Link to="/admin/landing">
            <Button size="sm" variant="ghost" leftIcon={<Globe className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
              Landing Page CMS
            </Button>
          </Link>
        </div>
      </div>

      {/* Admin Derived Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Link to="/admin/projects">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-4 border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span>TOTAL PROJECTS</span>
              <FolderGit2 className="w-4 h-4 text-[#8B0D1A]" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{projects.length}</p>
            <p className="text-[10px] text-[#F5F2ED]/50 font-mono">Portfolio Showcase</p>
          </Card>
        </Link>

        <Link to="/admin/team">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-4 border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span>TEAM MEMBERS</span>
              <Users className="w-4 h-4 text-[#F5F2ED]/70" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalMembers}</p>
            <p className="text-[10px] text-[#8B0D1A] font-mono">Builders</p>
          </Card>
        </Link>

        <Link to="/admin/reviews">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-4 border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span>CLIENT REVIEWS</span>
              <MessageSquareQuote className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalReviews}</p>
            <p className="text-[10px] text-amber-400/80 font-mono">Testimonials</p>
          </Card>
        </Link>

        <Link to="/admin/demo-requests">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-4 border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span>DEMO REQUESTS</span>
              <Inbox className="w-4 h-4 text-[#8B0D1A]" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalDemoRequests}</p>
            <p className="text-[10px] text-[#F5F2ED]/50 font-mono">Client Leads</p>
          </Card>
        </Link>

        <Link to="/admin/enquiries">
          <Card surfaceTier="100" hoverEffect className="space-y-2 p-4 border border-white/10">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#F5F2ED]/55">
              <span>ENQUIRIES</span>
              <Send className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-[#F5F2ED] font-mono">{totalEnquiries}</p>
            <p className="text-[10px] text-emerald-400/80 font-mono">Project Scope Messages</p>
          </Card>
        </Link>
      </div>

      {/* Main Overview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Active Projects Showcase */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F2ED] font-display">RECENT PORTFOLIO PROJECTS</h2>
            <Link to="/admin/projects" className="text-xs text-[#8B0D1A] hover:underline font-mono">
              Manage All ({projects.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 5).map((p) => (
              <Card key={p.id} surfaceTier="200" glowOnHover className="p-4 flex items-center justify-between gap-4 border border-white/05">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#F5F2ED] font-display">{p.name}</h3>
                    <Badge variant={p.status === 'LIVE' || p.status === 'COMPLETED' ? 'active' : 'crimson'} size="sm">
                      {p.status}
                    </Badge>
                    {p.isFeatured && (
                      <Badge variant="neutral" size="sm" className="text-amber-300 border-amber-500/30">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-[#F5F2ED]/55 line-clamp-1">{p.shortDescription}</p>
                </div>
                <Link to={`/admin/projects/${p.id}/edit`}>
                  <Button size="sm" variant="ghost" rightIcon={<ArrowUpRight className="w-3.5 h-3.5 text-[#8B0D1A]" />}>
                    Edit
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>

        {/* Real-time Activity Stream */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-[#F5F2ED] font-display flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#8B0D1A]" /> CMS AUDIT STREAM
            </h2>
            <Link to="/admin/activity" className="text-xs text-[#8B0D1A] hover:underline font-mono">
              View Log →
            </Link>
          </div>

          <Card surfaceTier="200" className="p-4 space-y-4 border border-white/05">
            {activities.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-3 text-xs pb-3 border-b border-white/5 last:border-0 last:pb-0">
                <Avatar name={item.user} size="xs" />
                <div className="flex-1">
                  <p className="text-[#F5F2ED] leading-snug">
                    <span className="font-semibold text-[#F5F2ED]">{item.user}</span> {item.action} <span className="text-[#8B0D1A] font-mono">{item.target}</span>
                  </p>
                  <span className="text-[10px] font-mono text-[#F5F2ED]/35">
                    {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
};
