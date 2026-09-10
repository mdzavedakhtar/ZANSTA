import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { PublicLayout } from '@/layouts/PublicLayout';
import { WorkspaceLayout } from '@/layouts/WorkspaceLayout';
import { ProjectWorkspaceLayout } from '@/layouts/ProjectWorkspaceLayout';
import { ClientLayout } from '@/layouts/ClientLayout';
import { AgencyLayout } from '@/layouts/AgencyLayout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

// Public pages
import { HomePage } from '@/pages/public/HomePage';
import { AboutPage } from '@/pages/public/AboutPage';
import { TeamPage } from '@/pages/public/TeamPage';
import { PublicProjectsPage } from '@/pages/public/PublicProjectsPage';
import { ProjectCaseStudyPage } from '@/pages/public/ProjectCaseStudyPage';
import { ClientDemoPage } from '@/pages/public/ClientDemoPage';
import { ServicesPage } from '@/pages/public/ServicesPage';
import { ContactPage } from '@/pages/public/ContactPage';
import { LoginPage } from '@/pages/public/LoginPage';
import { RegisterPage } from '@/pages/public/RegisterPage';
import { InviteAcceptPage } from '@/pages/public/InviteAcceptPage';

// Client Portal pages
import { ClientDashboardPage } from '@/pages/client/ClientDashboardPage';
import { ClientProjectsPage } from '@/pages/client/ClientProjectsPage';
import { ClientProjectDetailPage } from '@/pages/client/ClientProjectDetailPage';
import { ClientProjectDemoPage } from '@/pages/client/ClientProjectDemoPage';
import { ClientProjectFeedbackPage } from '@/pages/client/ClientProjectFeedbackPage';

// Agency Studio pages
import { AgencyOverviewPage } from '@/pages/agency/AgencyOverviewPage';
import { AgencyServicesPage } from '@/pages/agency/AgencyServicesPage';
import { AgencyRequestsPage } from '@/pages/agency/AgencyRequestsPage';
import { AgencyClientsPage } from '@/pages/agency/AgencyClientsPage';
import { AgencyProposalsPage } from '@/pages/agency/AgencyProposalsPage';

// Workspace & Admin CMS pages
import { DashboardPage } from '@/pages/workspace/DashboardPage';
import { WorkspaceFilesPage } from '@/pages/workspace/WorkspaceFilesPage';
import { WorkspaceSettingsPage } from '@/pages/workspace/WorkspaceSettingsPage';
import { WorkspaceNotificationsPage } from '@/pages/workspace/WorkspaceNotificationsPage';

// Admin CMS Management Modules
import { ProjectManagerPage } from '@/pages/admin/ProjectManagerPage';
import { ProjectFormPage } from '@/pages/admin/ProjectFormPage';
import { TeamManagerPage } from '@/pages/admin/TeamManagerPage';
import { TeamMemberFormPage } from '@/pages/admin/TeamMemberFormPage';
import { DemoManagerPage } from '@/pages/admin/DemoManagerPage';
import { DemoFormPage } from '@/pages/admin/DemoFormPage';
import { ServiceManagerPage } from '@/pages/admin/ServiceManagerPage';
import { ServiceFormPage } from '@/pages/admin/ServiceFormPage';
import { ReviewManagerPage } from '@/pages/admin/ReviewManagerPage';
import { ReviewFormPage } from '@/pages/admin/ReviewFormPage';
import { DemoRequestManagerPage } from '@/pages/admin/DemoRequestManagerPage';
import { EnquiryManagerPage } from '@/pages/admin/EnquiryManagerPage';
import { LandingPageEditorPage } from '@/pages/admin/LandingPageEditorPage';
import { AdminActivityPage } from '@/pages/admin/AdminActivityPage';

// Project Workspace Sub-routes
import { ProjectOverviewPage } from '@/pages/workspace/ProjectOverviewPage';
import { ProjectTasksPage } from '@/pages/workspace/ProjectTasksPage';
import { ProjectFilesPage } from '@/pages/workspace/ProjectFilesPage';
import { ProjectCodePage } from '@/pages/workspace/ProjectCodePage';
import { ProjectActivityPage } from '@/pages/workspace/ProjectActivityPage';
import { ProjectTeamPage } from '@/pages/workspace/ProjectTeamPage';
import { ProjectSettingsPage } from '@/pages/workspace/ProjectSettingsPage';

import { NotFoundPage } from '@/pages/NotFoundPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'projects', element: <PublicProjectsPage /> },
      { path: 'projects/:slug', element: <ProjectCaseStudyPage /> },
      { path: 'services', element: <ServicesPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'invite/:token', element: <InviteAcceptPage /> },
    ],
  },
  {
    path: '/demo/:token',
    element: <ClientDemoPage />,
  },
  {
    path: '/client',
    element: <ClientLayout />,
    children: [
      { index: true, element: <ClientDashboardPage /> },
      { path: 'projects', element: <ClientProjectsPage /> },
      { path: 'projects/:id', element: <ClientProjectDetailPage /> },
      { path: 'projects/:id/demo', element: <ClientProjectDemoPage /> },
      { path: 'projects/:id/feedback', element: <ClientProjectFeedbackPage /> },
    ],
  },
  {
    path: '/agency',
    element: <AgencyLayout />,
    children: [
      { index: true, element: <AgencyOverviewPage /> },
      { path: 'services', element: <AgencyServicesPage /> },
      { path: 'requests', element: <AgencyRequestsPage /> },
      { path: 'clients', element: <AgencyClientsPage /> },
      { path: 'proposals', element: <AgencyProposalsPage /> },
    ],
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <WorkspaceLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'admin', element: <DashboardPage /> },

      // Admin Projects CRUD
      { path: 'admin/projects', element: <ProjectManagerPage /> },
      { path: 'admin/projects/new', element: <ProjectFormPage /> },
      { path: 'admin/projects/:id/edit', element: <ProjectFormPage /> },
      { path: 'projects/new', element: <ProjectFormPage /> },

      // Admin Team CRUD
      { path: 'admin/team', element: <TeamManagerPage /> },
      { path: 'admin/team/new', element: <TeamMemberFormPage /> },
      { path: 'admin/team/:id/edit', element: <TeamMemberFormPage /> },
      { path: 'team', element: <TeamManagerPage /> },

      // Admin Client Demos CRUD
      { path: 'admin/demos', element: <DemoManagerPage /> },
      { path: 'admin/demos/new', element: <DemoFormPage /> },
      { path: 'admin/demos/:id/edit', element: <DemoFormPage /> },

      // Admin Services CRUD
      { path: 'admin/services', element: <ServiceManagerPage /> },
      { path: 'admin/services/new', element: <ServiceFormPage /> },
      { path: 'admin/services/:id/edit', element: <ServiceFormPage /> },

      // Admin Reviews CRUD
      { path: 'admin/reviews', element: <ReviewManagerPage /> },
      { path: 'admin/reviews/new', element: <ReviewFormPage /> },
      { path: 'admin/reviews/:id/edit', element: <ReviewFormPage /> },

      // Admin Leads & Enquiries
      { path: 'admin/demo-requests', element: <DemoRequestManagerPage /> },
      { path: 'admin/enquiries', element: <EnquiryManagerPage /> },

      // Admin Landing Page & Activity CMS
      { path: 'admin/landing', element: <LandingPageEditorPage /> },
      { path: 'admin/activity', element: <AdminActivityPage /> },

      // Legacy Workspace Navigation Compatibility
      { path: 'workspace/team', element: <TeamManagerPage /> },
      { path: 'workspace/projects', element: <ProjectManagerPage /> },
      { path: 'workspace/activity', element: <AdminActivityPage /> },
      { path: 'workspace/files', element: <WorkspaceFilesPage /> },
      { path: 'settings', element: <WorkspaceSettingsPage /> },
      { path: 'notifications', element: <WorkspaceNotificationsPage /> },

      // Project Workspace Sub-routes
      {
        path: 'projects/:id',
        element: <ProjectWorkspaceLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: 'overview', element: <ProjectOverviewPage /> },
          { path: 'tasks', element: <ProjectTasksPage /> },
          { path: 'files', element: <ProjectFilesPage /> },
          { path: 'code', element: <ProjectCodePage /> },
          { path: 'activity', element: <ProjectActivityPage /> },
          { path: 'team', element: <ProjectTeamPage /> },
          { path: 'settings', element: <ProjectSettingsPage /> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);
