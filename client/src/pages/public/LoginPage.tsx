import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast('Signed in successfully', 'success');
      navigate(from, { replace: true });
    } catch (error: any) {
      toast(error.message || 'Invalid login credentials', 'error');
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-radial-gradient opacity-40 pointer-events-none" />

      <Container size="sm" className="relative z-10">
        <Card surfaceTier="200" className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <Logo size="lg" className="justify-center mb-2" />
            <h2 className="text-2xl font-extrabold text-[#F5F2ED] tracking-tight font-display">
              SUPERADMIN PORTAL
            </h2>
            <p className="text-xs text-[#F5F2ED]/55">Sign in to your ZANSTA Superadmin workspace</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Admin Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              leftIcon={<Mail className="w-4 h-4 text-[#F5F2ED]/35" />}
              required
            />

            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              leftIcon={<Lock className="w-4 h-4 text-[#F5F2ED]/35" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#F5F2ED]/55 hover:text-[#F5F2ED]"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              required
            />

            <Button
              type="submit"
              size="lg"
              variant="glow"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Enter Workspace
            </Button>
          </form>

          <div className="pt-2 text-center border-t border-white/05">
            <p className="text-[11px] font-mono text-[#F5F2ED]/40 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#8B0D1A]" />
              <span>Restricted Superadmin & Workspace Portal</span>
            </p>
          </div>
        </Card>
      </Container>
    </div>
  );
};
