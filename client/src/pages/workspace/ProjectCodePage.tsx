import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useGitHubStore, GitHubRepo } from '@/store/useGitHubStore';
import {
  Code2,
  GitBranch,
  GitCommit,
  GitPullRequest,
  AlertCircle,
  Users,
  ExternalLink,
  Star,
  GitFork,
  CheckCircle2,
  Plus,
  X,
  Search,
  Copy,
  Check
} from 'lucide-react';

export const ProjectCodePage: React.FC = () => {
  const { id: projectId } = useParams<{ id: string }>();
  const {
    repoData,
    activeBranch,
    isLoading,
    isConnecting,
    repositories,
    fetchProjectRepoData,
    fetchRepositories,
    connectRepoToProject,
    selectBranch
  } = useGitHubStore();

  const [activeSubTab, setActiveSubTab] = useState<'commits' | 'prs' | 'issues' | 'contributors'>('commits');
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [repoSearch, setRepoSearch] = useState('');
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      fetchProjectRepoData(projectId);
    }
  }, [projectId, fetchProjectRepoData]);

  const handleOpenConnectModal = () => {
    fetchRepositories();
    setIsConnectModalOpen(true);
  };

  const handleConnectRepo = async (repo: GitHubRepo) => {
    if (!projectId) return;
    await connectRepoToProject(projectId, repo.full_name);
    setIsConnectModalOpen(false);
  };

  const handleCopySha = (sha: string) => {
    navigator.clipboard.writeText(sha);
    setCopiedSha(sha);
    setTimeout(() => setCopiedSha(null), 2000);
  };

  const filteredRepos = repositories.filter(r =>
    r.full_name.toLowerCase().includes(repoSearch.toLowerCase()) ||
    r.description?.toLowerCase().includes(repoSearch.toLowerCase())
  );

  const repo = repoData.repo;

  return (
    <div className="space-y-6">
      {/* Top Header & Connected Repository Banner */}
      <Card surfaceTier="100" className="p-6 relative overflow-hidden border border-white/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-[#8B0D1A]/10 via-[#8B0D1A]/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#8B0D1A]/20 to-[#8B0D1A]/20 border border-white/10 flex items-center justify-center shrink-0">
              <Code2 className="w-6 h-6 text-[#8B0D1A]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-[#F5F2ED] font-display tracking-tight">
                  {repo?.full_name || 'zansta/zansta-core-platform'}
                </h2>
                <Badge variant="crimson" size="sm" className="gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#8B0D1A]" /> Connected
                </Badge>
              </div>
              <p className="text-xs text-[#F5F2ED]/55 mt-1">
                Real-time GitHub repository code stream, pull requests & commit activity telemetry.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {/* Branch Selector */}
            {repo && repo.branches && (
              <div className="flex items-center gap-2 bg-[#121212] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-[#F5F2ED]/80">
                <GitBranch className="w-3.5 h-3.5 text-[#8B0D1A]" />
                <select
                  value={activeBranch}
                  onChange={(e) => projectId && selectBranch(projectId, e.target.value)}
                  className="bg-transparent text-[#F5F2ED] font-mono text-xs focus:outline-none cursor-pointer"
                >
                  {repo.branches.map((b) => (
                    <option key={b} value={b} className="bg-[#121212] text-[#F5F2ED]">
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenConnectModal}
              className="gap-2 text-xs border-white/10 hover:border-[#8B0D1A]/50"
            >
              <Plus className="w-3.5 h-3.5 text-[#8B0D1A]" /> Connect Repo
            </Button>

            {repo?.url && (
              <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-[#121212] border border-white/10 hover:border-white/30 text-[#F5F2ED]/55 hover:text-[#F5F2ED] transition-colors"
                title="View on GitHub"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        {/* Repository Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-xs font-mono">
          <div className="flex items-center gap-2 text-[#F5F2ED]/55">
            <Star className="w-4 h-4 text-[#F5F2ED]/60" />
            <span>Stars: <strong className="text-[#F5F2ED] font-sans">{repo?.stars || 142}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#F5F2ED]/55">
            <GitFork className="w-4 h-4 text-[#8B0D1A]" />
            <span>Forks: <strong className="text-[#F5F2ED] font-sans">{repo?.forks || 28}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#F5F2ED]/55">
            <GitPullRequest className="w-4 h-4 text-purple-400" />
            <span>Open PRs: <strong className="text-[#F5F2ED] font-sans">{repo?.open_prs_count || 1}</strong></span>
          </div>
          <div className="flex items-center gap-2 text-[#F5F2ED]/55">
            <AlertCircle className="w-4 h-4 text-[#F5F2ED]/70" />
            <span>Issues: <strong className="text-[#F5F2ED] font-sans">{repo?.open_issues_count || 2}</strong></span>
          </div>
        </div>
      </Card>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-2">
        <button
          onClick={() => setActiveSubTab('commits')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'commits'
              ? 'bg-[#8B0D1A]/10 text-[#8B0D1A] border border-[#8B0D1A]/30 shadow-[0_0_15px_rgba(139,13,26,0.25)]'
              : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
          }`}
        >
          <GitCommit className="w-4 h-4" />
          Commits
          <Badge variant="crimson" size="sm" className="ml-1 text-[10px]">
            {repoData.commits.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveSubTab('prs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'prs'
              ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]'
              : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
          }`}
        >
          <GitPullRequest className="w-4 h-4" />
          Pull Requests
          <Badge variant="crimson" size="sm" className="ml-1 text-[10px]">
            {repoData.pullRequests.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveSubTab('issues')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'issues'
              ? 'bg-[#8B0D1A]/10 text-[#F5F2ED]/70 border border-[#F5F2ED]/20/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
              : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          Issues
          <Badge variant="active" size="sm" className="ml-1 text-[10px]">
            {repoData.issues.length}
          </Badge>
        </button>

        <button
          onClick={() => setActiveSubTab('contributors')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeSubTab === 'contributors'
              ? 'bg-amber-500/10 text-[#F5F2ED]/60 border border-amber-500/30 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
              : 'text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/5'
          }`}
        >
          <Users className="w-4 h-4" />
          Contributors
          <Badge variant="neutral" size="sm" className="ml-1 text-[10px]">
            {repoData.contributors.length}
          </Badge>
        </button>
      </div>

      {/* Sub-Tab Content Views */}
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-12 text-center text-[#F5F2ED]/55 font-mono text-xs flex items-center justify-center gap-3"
          >
            <div className="w-5 h-5 border-2 border-[#8B0D1A] border-t-transparent rounded-full animate-spin" />
            Fetching repository telemetry stream...
          </motion.div>
        ) : activeSubTab === 'commits' ? (
          /* COMMITS VIEW */
          <motion.div
            key="commits"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {repoData.commits.map((c) => {
              const shortSha = c.sha.substring(0, 7);
              return (
                <Card
                  key={c.sha}
                  surfaceTier="100"
                  className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 hover:border-[#8B0D1A]/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={c.author.avatar_url}
                      alt={c.author.login}
                      className="w-8 h-8 rounded-full border border-white/10 shrink-0 mt-0.5"
                    />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[#F5F2ED] group-hover:text-[#8B0D1A] transition-colors">
                          {c.commit.message}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-[#F5F2ED]/55 font-mono">
                        <span>{c.author.login}</span>
                        <span>•</span>
                        <span>{new Date(c.commit.author.date).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 self-end md:self-center shrink-0 font-mono text-xs">
                    {c.stats && (
                      <div className="flex items-center gap-2 text-[11px]">
                        <span className="text-[#F5F2ED]/70">+{c.stats.additions}</span>
                        <span className="text-[#8B0D1A]">-{c.stats.deletions}</span>
                      </div>
                    )}
                    <button
                      onClick={() => handleCopySha(shortSha)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#121212] border border-white/10 hover:border-white/30 text-[#F5F2ED]/60 transition-colors"
                      title="Copy Commit Hash"
                    >
                      <GitCommit className="w-3.5 h-3.5" />
                      <span>{shortSha}</span>
                      {copiedSha === shortSha ? (
                        <Check className="w-3 h-3 text-[#F5F2ED]/70" />
                      ) : (
                        <Copy className="w-3 h-3 text-[#F5F2ED]/35 hover:text-[#F5F2ED]" />
                      )}
                    </button>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        ) : activeSubTab === 'prs' ? (
          /* PULL REQUESTS VIEW */
          <motion.div
            key="prs"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {repoData.pullRequests.map((pr) => (
              <Card
                key={pr.id}
                surfaceTier="100"
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 hover:border-purple-500/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shrink-0">
                    <GitPullRequest className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#F5F2ED]">#{pr.number} {pr.title}</span>
                      <Badge
                        variant={pr.merged ? 'crimson' : pr.state === 'open' ? 'active' : 'crimson'}
                        size="sm"
                      >
                        {pr.merged ? 'MERGED' : pr.state.toUpperCase()}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[#F5F2ED]/55 font-mono">
                      <span>Opened by {pr.user.login}</span>
                      <span>•</span>
                      <span className="text-[#F5F2ED]/80 bg-white/5 px-2 py-0.5 rounded border border-white/10">
                        {pr.head.ref} → {pr.base.ref}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 font-mono text-xs text-[#F5F2ED]/55">
                  <span>{pr.comments} comments</span>
                  <span className="text-[#F5F2ED]/35">{new Date(pr.created_at).toLocaleDateString()}</span>
                </div>
              </Card>
            ))}
          </motion.div>
        ) : activeSubTab === 'issues' ? (
          /* ISSUES VIEW */
          <motion.div
            key="issues"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-3"
          >
            {repoData.issues.map((issue) => (
              <Card
                key={issue.id}
                surfaceTier="100"
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-white/5 hover:border-[#F5F2ED]/20/30 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-[#8B0D1A]/10 border border-[#F5F2ED]/20/20 text-[#F5F2ED]/70 shrink-0">
                    <AlertCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-[#F5F2ED]">#{issue.number} {issue.title}</span>
                      {issue.labels.map((l) => (
                        <span
                          key={l.name}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-white/10"
                          style={{ backgroundColor: `#${l.color}20`, color: `#${l.color}` }}
                        >
                          {l.name}
                        </span>
                      ))}
                    </div>
                    <div className="text-xs text-[#F5F2ED]/55 font-mono">
                      Opened by {issue.user.login} • {new Date(issue.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                <div className="text-xs font-mono text-[#F5F2ED]/55 shrink-0">
                  {issue.comments} comments
                </div>
              </Card>
            ))}
          </motion.div>
        ) : (
          /* CONTRIBUTORS VIEW */
          <motion.div
            key="contributors"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          >
            {repoData.contributors.map((contrib, idx) => (
              <Card
                key={contrib.login}
                surfaceTier="100"
                className="p-4 flex items-center gap-4 border border-white/5 hover:border-amber-500/30 transition-all"
              >
                <img
                  src={contrib.avatar_url}
                  alt={contrib.login}
                  className="w-12 h-12 rounded-2xl border border-white/10 shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#F5F2ED]">@{contrib.login}</span>
                    <Badge variant="neutral" size="sm" className="text-[10px]">
                      #{idx + 1}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#F5F2ED]/55 font-mono">
                    {contrib.contributions} commits contributed
                  </p>
                </div>
              </Card>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connect Repository Modal */}
      <AnimatePresence>
        {isConnectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-lg bg-[#0E0E0E] border border-white/10 rounded-2xl p-6 space-y-4 shadow-2xl relative"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-[#8B0D1A]" />
                  <h3 className="text-lg font-extrabold text-[#F5F2ED] font-display">CONNECT GITHUB REPOSITORY</h3>
                </div>
                <button
                  onClick={() => setIsConnectModalOpen(false)}
                  className="p-1 rounded-lg text-[#F5F2ED]/55 hover:text-[#F5F2ED] hover:bg-white/10"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-[#F5F2ED]/55 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search your GitHub repositories..."
                  value={repoSearch}
                  onChange={(e) => setRepoSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#121212] border border-white/10 rounded-xl text-xs text-[#F5F2ED] placeholder-slate-500 focus:outline-none focus:border-[#8B0D1A]"
                />
              </div>

              {/* Repositories List */}
              <div className="max-h-72 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                {filteredRepos.length === 0 ? (
                  <p className="text-xs text-[#F5F2ED]/35 text-center py-6">No repositories found matching search.</p>
                ) : (
                  filteredRepos.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-xl bg-[#121212] border border-white/5 hover:border-[#8B0D1A]/30 flex items-center justify-between gap-3 group transition-all"
                    >
                      <div className="space-y-1 overflow-hidden">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-[#F5F2ED] group-hover:text-[#8B0D1A] truncate">
                            {r.full_name}
                          </span>
                          {r.private && (
                            <Badge variant="crimson" size="sm" className="text-[9px]">Private</Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-[#F5F2ED]/55 truncate">{r.description}</p>
                      </div>

                      <Button
                        size="sm"
                        variant="glow"
                        disabled={isConnecting}
                        onClick={() => handleConnectRepo(r)}
                        className="shrink-0 text-xs gap-1"
                      >
                        <Plus className="w-3 h-3" /> Select
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
