import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { CustomCursor } from '../components/shared/CustomCursor';
import { ToastProvider } from '../components/ui/Toast';

export const PublicLayout: React.FC = () => {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#050505] text-[#F5F2ED] flex flex-col selection:bg-[#8B0D1A]/20 selection:text-[#8B0D1A] relative">
        <CustomCursor />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ToastProvider>
  );
};
