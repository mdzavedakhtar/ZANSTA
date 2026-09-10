import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/shared/Logo';
import { useAuthStore } from '@/store/useAuthStore';
import { useToast } from '@/components/ui/Toast';
import { UserRole } from '@/types/auth';
import { User, Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('MEMBER');
  const { register, isLoading } = useAuthStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(name, email, password, role);
      toast('Workspace account registered successfully!', 'success');
      navigate('/dashboard');
    } catch (error: any) {
      toast(error.message || 'Registration failed', 'error');
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
              CREATE WORKSPACE ACCOUNT
            </h2>
            <p className="text-xs text-[#F5F2ED]/55">Join or build your developer workspace team</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="MD Zaved Akhtar"
              leftIcon={<User className="w-4 h-4 text-[#F5F2ED]/35" />}
              required
            />

            <Input
              label="Work Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mdzavedakhtar62@gmail.com"
              leftIcon={<Mail className="w-4 h-4 text-[#F5F2ED]/35" />}
              required
            />

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              leftIcon={<Lock className="w-4 h-4 text-[#F5F2ED]/35" />}
              required
            />

            <Select
              label="Workspace Role"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              options={[
                { value: 'OWNER', label: 'Workspace Owner (Full Admin & Billing)' },
                { value: 'ADMIN', label: 'Team Admin (Manage Projects & Members)' },
                { value: 'MEMBER', label: 'Engineering Member (Code & Tasks)' },
                { value: 'CLIENT', label: 'Client Access (View Demos & Feedback)' },
              ]}
            />

            <Button
              type="submit"
              size="lg"
              variant="glow"
              className="w-full"
              isLoading={isLoading}
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              Create Account
            </Button>
          </form>

          <p className="text-center text-xs text-[#F5F2ED]/55">
            Already registered?{' '}
            <Link to="/login" className="text-[#8B0D1A] hover:underline font-semibold">
              Sign In
            </Link>
          </p>
        </Card>
      </Container>
    </div>
  );
};
