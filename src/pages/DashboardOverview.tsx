import { ArrowUpRight, ArrowDownRight, Globe, FlaskConical, Bug, CheckCircle2, AlertTriangle, XCircle, ExternalLink, TrendingUp, TrendingDown, Activity } from "lucide-react";

// --- Mock Data ---
const healthScores = [
  { site: "qarush.com", score: 94, trend: "up" as const, lastCheck: "2 min ago" },
  { site: "ahmedsedki.com", score: 67, trend: "down" as const, lastCheck: "5 min ago" },
  { site: "mystore.com", score: 83, trend: "up" as const, lastCheck: "12 min ago" },
];

const monitoredSites = [
  { name: "qarush.com", lastCheck: "2 min ago", passRate: 100, status: "all_good" as const, tests: 21 },
  { name: "ahmedsedki.com", lastCheck: "5 min ago", passRate: 76, status: "issues" as const, tests: 17 },
  { name: "mystore.com", lastCheck: "12 min ago", passRate: 83, status: "all_good" as const, tests: 24 },
];

const recentActivity = [
  { message: "qarush.com checked — 21 passed, 0 failed", time: "2 min ago", type: "success" as const },
  { message: "ahmedsedki.com alert sent — pass rate dropped", time: "5 min ago", type: "warning" as const },
  { message: "New test completed on mystore.com — 83%", time: "12 min ago", type: "info" as const },
  { message: "qarush.com — checkout flow verified", time: "18 min ago", type: "success" as const },
  { message: "ahmedsedki.com — contact form broken", time: "22 min ago", type: "error" as const },
];

const criticalIssues = [
  {
    site: "ahmedsedki.com",
    issue: "Contact form submit button unresponsive",
    fix: "Check event listener binding on #contact-form submit handler",
    time: "22 min ago",
  },
  {
    site: "ahmedsedki.com",
    issue: "Newsletter signup returns 500 error",
    fix: "Backend endpoint /api/subscribe is returning server error — check logs",
    time: "5 min ago",
  },
];

const quickStats = [
  { label: "Total Sites", value: "3", icon: Globe },
  { label: "Tests This Month", value: "1,247", icon: FlaskConical },
  { label: "Issues Found", value: "12", icon: Bug },
  { label: "Issues Fixed", value: "9", icon: CheckCircle2 },
];

// --- Helpers ---
function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function getScoreBg(score: number) {
  if (score >= 80) return "bg-emerald-400/10 border-emerald-400/20";
  if (score >= 50) return "bg-yellow-400/10 border-yellow-400/20";
  return "bg-red-400/10 border-red-400/20";
}

function getStatusBadge(status: "all_good" | "issues") {
  if (status === "all_good") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
        <CheckCircle2 className="h-3 w-3" /> All Good
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-full">
      <AlertTriangle className="h-3 w-3" /> Issues Found
    </span>
  );
}

function getActivityIcon(type: "success" | "warning" | "error" | "info") {
  switch (type) {
    case "success": return <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />;
    case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0" />;
    case "error": return <XCircle className="h-4 w-4 text-red-400 shrink-0" />;
    case "info": return <Activity className="h-4 w-4 text-primary shrink-0" />;
  }
}

// --- Component ---
export default function DashboardOverview() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Your monitoring dashboard at a glance</p>
      </div>

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="surface-elevated rounded-xl p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Health Scores */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Health Scores</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {healthScores.map((site) => (
            <div key={site.site} className={`rounded-xl border p-5 ${getScoreBg(site.score)}`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{site.site}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Last check: {site.lastCheck}</p>
                </div>
                <div className="flex items-center gap-1">
                  <span className={`text-3xl font-bold ${getScoreColor(site.score)}`}>{site.score}</span>
                  {site.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-400" />
                  )}
                </div>
              </div>
              <div className="mt-3 h-1.5 rounded-full bg-background/50 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
                    site.score >= 80 ? "bg-emerald-400" : site.score >= 50 ? "bg-yellow-400" : "bg-red-400"
                  }`}
                  style={{ width: `${site.score}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Monitored Sites + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Monitored Sites */}
        <div className="lg:col-span-3 surface-elevated rounded-xl">
          <div className="px-5 py-4 border-b border-border/40">
            <h2 className="text-sm font-medium text-foreground">Active Monitored Sites</h2>
          </div>
          <div className="divide-y divide-border/30">
            {monitoredSites.map((site) => (
              <div key={site.name} className="px-5 py-4 flex items-center justify-between hover:bg-secondary/30 transition-colors">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Globe className="h-4 w-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{site.name}</p>
                    <p className="text-xs text-muted-foreground">Last check: {site.lastCheck} · {site.tests} tests</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm font-mono font-medium text-foreground">{site.passRate}%</span>
                  {getStatusBadge(site.status)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 surface-elevated rounded-xl">
          <div className="px-5 py-4 border-b border-border/40">
            <h2 className="text-sm font-medium text-foreground">Recent Activity</h2>
          </div>
          <div className="divide-y divide-border/20">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-5 py-3.5 flex items-start gap-3">
                {getActivityIcon(activity.type)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground/90 leading-snug">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Critical Issues */}
      {criticalIssues.length > 0 && (
        <div>
          <h2 className="text-sm font-medium text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2">
            <XCircle className="h-4 w-4" /> Critical Issues
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {criticalIssues.map((issue, i) => (
              <div key={i} className="rounded-xl border border-red-400/20 bg-red-400/5 p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">{issue.site}</span>
                  <span className="text-xs text-muted-foreground">{issue.time}</span>
                </div>
                <p className="text-sm font-medium text-foreground mb-2">{issue.issue}</p>
                <div className="bg-background/40 rounded-lg px-3 py-2">
                  <p className="text-xs text-muted-foreground font-mono leading-relaxed">{issue.fix}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
