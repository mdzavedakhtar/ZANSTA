import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';
import { ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 flex items-center justify-center text-center">
      <Container size="sm" className="space-y-6">
        <div className="font-mono text-6xl font-extrabold text-[#8B0D1A]">404</div>
        <h1 className="text-3xl font-extrabold text-[#F5F2ED] font-display">PAGE NOT FOUND</h1>
        <p className="text-[#F5F2ED]/55 text-sm">
          The route you requested does not exist or has been moved inside the workspace engine.
        </p>
        <Link to="/">
          <Button size="lg" variant="glow" leftIcon={<ArrowLeft className="w-4 h-4" />}>
            Back to Home
          </Button>
        </Link>
      </Container>
    </div>
  );
};
