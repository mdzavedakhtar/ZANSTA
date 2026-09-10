import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/useAuthStore';
import { UserRole } from '@/types/auth';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, isLoading } = useAuthStore();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 rounded-full border-2 border-[#8B0D1A] border-t-transparent animate-spin" />
          <p className="text-xs font-mono text-[#F5F2ED]/55">Authenticating Zansta Session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-[#8B0D1A] font-display">403 FORBIDDEN</h2>
          <p className="text-sm text-[#F5F2ED]/55">
            Your current role (<span className="font-mono text-[#F5F2ED]">{user.role}</span>) does not have authorization to view this section.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
