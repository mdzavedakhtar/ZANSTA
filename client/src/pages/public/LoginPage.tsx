import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SEO } from '@/components/shared/SEO';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { Lock, Mail, ArrowRight, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center px-4 sm:px-6 relative overflow-hidden bg-[#050508]">
      <SEO
        title="Admin Portal Authentication"
        description="Secure workspace sign in for authorized ZANSTA administrators."
        keywords="ZANSTA login, admin authentication, workspace access"
      />

      {/* Ambient Crimson Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-[#8B0D1A]/20 via-[#3b0764]/15 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Compact & Enhanced Card Container */}
      <div className="w-full max-w-[400px] relative z-10 mx-auto">
        <div className="relative rounded-3xl bg-[#0C0D14]/95 border border-white/10 hover:border-[#8B0D1A]/50 p-7 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.85),0_0_35px_rgba(139,13,26,0.18)] backdrop-blur-2xl transition-all duration-300 space-y-6">
          
          {/* Subtle Ambient Card Accent */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#8B0D1A]/15 to-transparent rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col items-center justify-center space-y-3 text-center relative z-10">
            <Link to="/" className="group inline-block transition-transform duration-200 hover:scale-105" title="Back to Home">
              <img
                src="/logo.png"
                alt="ZANSTA"
                className="h-14 sm:h-16 w-auto object-contain mx-auto drop-shadow-[0_0_20px_rgba(139,13,26,0.45)] transition-all duration-300 group-hover:drop-shadow-[0_0_30px_rgba(225,29,72,0.7)]"
              />
            </Link>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8B0D1A]/15 border border-[#8B0D1A]/35 text-[10px] font-mono font-bold text-[#F5F2ED] uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] animate-pulse" />
              RESTRICTED PORTAL
            </div>

            <div className="space-y-1 pt-0.5">
              <h2 className="text-xl sm:text-2xl font-black text-[#F5F2ED] tracking-tight font-display uppercase">
                WORKSPACE SIGN IN
              </h2>
              <p className="text-xs text-[#F5F2ED]/50 font-sans">
                Enter your authorized credentials to access workspace
              </p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4 relative z-10">
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80 font-medium">
                Admin Email Address
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                leftIcon={<Mail className="w-4 h-4 text-[#F5F2ED]/40" />}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-mono text-[#F5F2ED]/80 font-medium">
                Password
              </label>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                leftIcon={<Lock className="w-4 h-4 text-[#F5F2ED]/40" />}
                rightIcon={
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#F5F2ED]/55 hover:text-[#F5F2ED] transition-colors p-1"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
                required
              />
            </div>

            <Button
              type="submit"
              size="lg"
              variant="glow"
              className="w-full justify-center bg-[#8B0D1A] hover:bg-[#A01020] text-[#F5F2ED] mt-2 shadow-[0_0_20px_rgba(139,13,26,0.4)]"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Sign In to Workspace
            </Button>
          </form>

          {/* Footer Assistance & Security Notice */}
          <div className="pt-4 text-center border-t border-white/[0.08] space-y-2 relative z-10">
            <p className="text-[11px] font-mono text-[#F5F2ED]/40 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>TLS 1.3 End-to-End Encrypted Session</span>
            </p>
            <p className="text-xs text-[#F5F2ED]/60 font-sans">
              Need client service?{' '}
              <Link to="/contact" className="text-[#E11D48] hover:text-white font-semibold underline underline-offset-2 transition-colors">
                Contact ZANSTA Agency
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
