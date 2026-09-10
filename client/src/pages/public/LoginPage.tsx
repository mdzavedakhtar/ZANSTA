import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { Lock, Mail, ArrowRight, Github, Eye, EyeOff } from 'lucide-react';

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
              WELCOME BACK
            </h2>
            <p className="text-xs text-[#F5F2ED]/55">Sign in to your ZANSTA workspace</p>
          </div>

          <button
            type="button"
            onClick={async () => {
              await login('mdzavedakhtar620@gmail.com', 'password123');
              toast('Signed in as MD Zaved Akhtar (Owner)', 'success');
              navigate('/dashboard');
            }}
            className="w-full flex items-center justify-center gap-3 bg-[#121212] border border-white/10 hover:border-[#8B0D1A]/40 py-2.5 rounded-xl text-xs font-semibold text-[#F5F2ED] transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-[#8B0D1A]" />
            Sign in as Demo Owner (MD Zaved Akhtar)
          </button>

          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-white/10" />
            <span className="px-3 text-[10px] text-[#F5F2ED]/35 font-mono">OR EMAIL</span>
            <div className="flex-1 h-px bg-white/10" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mdzavedakhtar620@gmail.com"
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

          <p className="text-center text-xs text-[#F5F2ED]/55">
            Don't have a workspace account?{' '}
            <Link to="/register" className="text-[#8B0D1A] hover:underline font-semibold">
              Create account
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
};
