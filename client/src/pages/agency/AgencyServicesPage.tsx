import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useAgencyStore } from '@/store/useAgencyStore';
import { ProjectRequestModal } from '@/components/modals/ProjectRequestModal';
import {
  Code2,
  Smartphone,
  Sparkles,
  Layers,
  Palette,
  Cpu,
  Plus,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const AgencyServicesPage: React.FC = () => {
  const { services } = useAgencyStore();
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [preselectedService, setPreselectedService] = useState<string>('');

  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code2': return Code2;
      case 'Smartphone': return Smartphone;
      case 'Sparkles': return Sparkles;
      case 'Layers': return Layers;
      case 'Palette': return Palette;
      case 'Cpu': return Cpu;
      default: return Code2;
    }
  };

  const handleOpenIntake = (serviceTitle?: string) => {
    if (serviceTitle) setPreselectedService(serviceTitle);
    setIsRequestModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-black text-[#F5F2ED] font-display">AGENCY SERVICES CATALOG</h1>
          <p className="text-xs text-[#F5F2ED]/55 font-sans mt-1">
            Enterprise software development, AI agent pipelines, and digital studio design capabilities.
          </p>
        </div>

        <Button
          variant="glow"
          size="md"
          onClick={() => handleOpenIntake()}
          leftIcon={<Plus className="w-4 h-4" />}
          className="shrink-0 text-xs font-bold"
        >
          Submit Project Inquiry
        </Button>
      </div>

      {/* Services Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => {
          const Icon = getServiceIcon(srv.icon);
          return (
            <Card
              key={srv.id}
              surfaceTier="100"
              className="p-6 border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#8B0D1A]/40 transition-all group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B0D1A]/20 to-[#8B0D1A]/20 border border-white/10 flex items-center justify-center text-[#8B0D1A]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="crimson" size="sm">{srv.category}</Badge>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-extrabold text-[#F5F2ED] font-display group-hover:text-[#8B0D1A] transition-colors">
                    {srv.title}
                  </h3>
                  <span className="text-xs font-mono text-[#8B0D1A] block">
                    Starting at {srv.startingPrice}
                  </span>
                </div>

                <p className="text-xs text-[#F5F2ED]/80 font-sans leading-relaxed">
                  {srv.description}
                </p>

                {/* Deliverables checklist */}
                <div className="space-y-1.5 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-mono text-[#F5F2ED]/35 uppercase tracking-wider block">Key Deliverables</span>
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-sans text-[#F5F2ED]/55">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8B0D1A] shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleOpenIntake(srv.title)}
                className="w-full text-xs border-white/10 hover:border-[#8B0D1A]"
              >
                Inquire For {srv.title}
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Project Request Intake Modal */}
      <ProjectRequestModal
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        initialProjectType={preselectedService}
      />
    </div>
  );
};
