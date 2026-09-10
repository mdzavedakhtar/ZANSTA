import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';
import { useToast } from '@/components/ui/Toast';
import { CheckCircle2, ShieldCheck, ArrowRight, Loader2 } from 'lucide-react';

export const InviteAcceptPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    setAccepted(true);
    toast('Invitation accepted! Welcome to Zansta Core Team.', 'success');
    setTimeout(() => {
      navigate('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-radial-gradient opacity-40 pointer-events-none" />

      <Container size="sm" className="relative z-10">
        <Card surfaceTier="200" className="p-8 space-y-6 text-center">
          <Logo size="lg" className="justify-center mb-2" />

          {loading ? (
            <div className="py-8 flex flex-col items-center space-y-3">
              <Loader2 className="w-8 h-8 text-[#8B0D1A] animate-spin" />
              <p className="text-xs font-mono text-[#F5F2ED]/55">Verifying Invitation Token...</p>
            </div>
          ) : accepted ? (
            <div className="py-6 space-y-4">
              <CheckCircle2 className="w-12 h-12 text-[#F5F2ED]/70 mx-auto" />
              <h2 className="text-2xl font-bold text-[#F5F2ED] font-display">WELCOME TO THE TEAM!</h2>
              <p className="text-xs text-[#F5F2ED]/55 font-mono">Redirecting to workspace dashboard...</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <Badge variant="crimson" size="md">YOU HAVE BEEN INVITED</Badge>
                <h2 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
                  ZANSTA CORE TEAM WORKSPACE
                </h2>
                <p className="text-xs text-[#F5F2ED]/80">
                  You have been granted <span className="font-mono text-[#8B0D1A] font-bold">MEMBER</span> access to collaborate on projects.
                </p>
              </div>

              <div className="p-4 bg-[#121212] border border-white/10 rounded-xl space-y-2 text-xs font-mono text-left text-[#F5F2ED]/55">
                <div className="flex justify-between">
                  <span>Invitation Token:</span>
                  <span className="text-[#F5F2ED] truncate max-w-[180px]">{token}</span>
                </div>
                <div className="flex justify-between">
                  <span>Invited By:</span>
                  <span className="text-[#F5F2ED]">MD Zaved Akhtar (Owner)</span>
                </div>
              </div>

              <Button size="lg" variant="glow" onClick={handleAccept} className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
                Accept Invitation & Enter Workspace
              </Button>
            </div>
          )}
        </Card>
      </Container>
    </div>
  );
};
