import { useState } from "react";
import {
  ArrowUpRight, Globe, FlaskConical, Bug, CheckCircle2, AlertTriangle,
  XCircle, TrendingUp, TrendingDown, Activity, Clock, ChevronRight, X,
  Lightbulb, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";

// --- Mock Data ---
const quickStats = [
  { label: "Total Sites Monitored", value: "5", icon: Globe, trend: null },
  { label: "Tests Run This Month", value: "1,247", icon: FlaskConical, trend: "+12% vs last month" },
  { label: "Issues Found This Month", value: "12", icon: Bug, trend: null, isRed: true },
  { label: "Issues Fixed This Month", value: "9", icon: CheckCircle2, trend: null, isGreen: true },
];

const healthScores = [
  {
    site: "qarush.com", score: 94, trend: "up" as const, lastCheck: "2 min ago",
    sparkline: [88, 90, 91, 89, 93, 92, 94],
  },
  {
    site: "ahmedsedki.com", score: 67, trend: "down" as const, lastCheck: "5 min ago",
    sparkline: [82, 78, 75, 72, 70, 68, 67],
  },
  {
    site: "mystore.com", score: 83, trend: "up" as const, lastCheck: "12 min ago",
    sparkline: [76, 78, 79, 80, 81, 82, 83],
  },
  {
    site: "checkout.mysite.com", score: 42, trend: "down" as const, lastCheck: "1 hr ago",
    sparkline: [61, 58, 55, 50, 48, 45, 42],
  },
  {
    site: "portfolio.dev", score: 98, trend: "up" as const, lastCheck: "30 min ago",
    sparkline: [95, 96, 96, 97, 97, 98, 98],
  },
];

const activeAlerts = [
  { id: 1, message: "checkout.mysite.com — checkout flow completely broken, 0% pass rate on payment tests", site: "checkout.mysite.com" },
  { id: 2, message: "ahmedsedki.com — contact form submit button unresponsive since 3 hours ago", site: "ahmedsedki.com" },
];

const recentActivity = [
  { message: "qarush.com checked — 23 passed, 0 failed", time: "2 hours ago", type: "success" as const },
  { message: "mystore.com alert sent — pass rate dropped to 61%", time: "5 hours ago", type: "warning" as const },
  { message: "checkout.mysite.com — critical bug confirmed", time: "1 day ago", type: "error" as const },
  { message: "portfolio.dev checked — 18 passed", time: "1 day ago", type: "success" as const },
  { message: "ahmedsedki.com — contact form broken", time: "1 day ago", type: "error" as const },
  { message: "qarush.com checked — 21 passed, 0 failed", time: "2 days ago", type: "success" as const },
  { message: "mystore.com checked — 20 passed, 4 failed", time: "2 days ago", type: "warning" as const },
  { message: "New monitoring started for checkout.mysite.com", time: "3 days ago", type: "info" as const },
  { message: "portfolio.dev checked — 18 passed", time: "3 days ago", type: "success" as const },
  { message: "qarush.com checked — 22 passed, 1 failed", time: "4 days ago", type: "success" as const },
];

const confirmedBugs = [
  {
    site: "checkout.mysite.com",
    test: "Payment Form Submit",
    severity: "critical" as const,
    description: "Payment form submit button triggers no action. The click handler is not attached after recent DOM update.",
    brokenSince: "3 days",
    fix: "Re-bind click event listener on #payment-submit after the React re-render cycle completes.",
  },
  {
    site: "ahmedsedki.com",
    test: "Contact Form Submission",
    severity: "high" as const,
    description: "Contact form returns 500 error on submit. Backend endpoint /api/contact is failing.",
    brokenSince: "1 day",
    fix: "Check server logs for /api/contact — likely a missing environment variable or database connection timeout.",
  },
];

const upcomingChecks = [
  { site: "qarush.com", next: "In 4 hours" },
  { site: "mystore.com", next: "In 12 hours" },
  { site: "ahmedsedki.com", next: "Tomorrow at 9am" },
  { site: "checkout.mysite.com", next: "In 2 hours" },
  { site: "portfolio.dev", next: "Tomorrow at 6am" },
];

// --- Helpers ---
function getScoreColor(score: number) {
  if (score >= 80) return "text-emerald-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}

function getScoreRingColor(score: number) {
  if (score >= 80) return "stroke-emerald-400";
  if (score >= 50) return "stroke-yellow-400";
  return "stroke-red-400";
}

function getScoreRingTrack(score: number) {
  if (score >= 80) return "stroke-emerald-400/15";
  if (score >= 50) return "stroke-yellow-400/15";
  return "stroke-red-400/15";
}

function ScoreRing({ score, size = 72 }: { score: number; size?: number }) {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth}
          className={getScoreRingTrack(score)} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={strokeWidth}
          className={getScoreRingColor(score)}
          strokeDasharray={circumference} strokeDashoffset={offset}
          strokeLinecap="round" style={{ transition: "stroke-dashoffset 0.6s ease" }} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className={`text-lg font-bold ${getScoreColor(score)}`}>{score}</span>
      </div>
    </div>
  );
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 80;
  const h = 24;
  const points = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");

  return (
    <svg width={w} height={h} className="shrink-0">
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function getActivityIcon(type: "success" | "warning" | "error" | "info") {
  switch (type) {
    case "success": return <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />;
    case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />;
    case "error": return <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />;
    case "info": return <Activity className="h-4 w-4 text-primary shrink-0 mt-0.5" />;
  }
}

// --- Component ---
export default function DashboardOverview() {
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const visibleAlerts = activeAlerts.filter(a => !dismissedAlerts.includes(a.id));

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Overview</h1>
        <p className="text-sm text-muted-foreground mt-1">Everything at a glance — is your web presence healthy?</p>
      </div>

      {/* Active Alerts Banner */}
      {visibleAlerts.length > 0 && (
        <div className="rounded-xl border border-red-400/30 bg-red-400/8 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <XCircle className="h-5 w-5 text-red-400" />
              <span className="text-sm font-semibold text-red-400">
                {visibleAlerts.length} critical issue{visibleAlerts.length > 1 ? "s" : ""} need your attention
              </span>
            </div>
          </div>
          <div className="space-y-2">
            {visibleAlerts.map(alert => (
              <div key={alert.id} className="flex items-center justify-between bg-red-400/5 rounded-lg px-4 py-2.5 border border-red-400/10">
                <p className="text-sm text-foreground/90">{alert.message}</p>
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <Button variant="ghost" size="sm" className="text-xs text-red-400 hover:text-red-300 h-7 px-2">
                    <Eye className="h-3 w-3 mr-1" /> View
                  </Button>
                  <button
                    onClick={() => setDismissedAlerts(prev => [...prev, alert.id])}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => (
          <div key={stat.label} className="surface-elevated rounded-xl p-4 flex items-center gap-4">
            <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${
              stat.isRed ? "bg-red-400/10" : stat.isGreen ? "bg-emerald-400/10" : "bg-primary/10"
            }`}>
              <stat.icon className={`h-5 w-5 ${
                stat.isRed ? "text-red-400" : stat.isGreen ? "text-emerald-400" : "text-primary"
              }`} />
            </div>
            <div>
              <p className={`text-2xl font-semibold ${
                stat.isRed ? "text-red-400" : stat.isGreen ? "text-emerald-400" : "text-foreground"
              }`}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              {stat.trend && (
                <p className="text-[11px] text-emerald-400 mt-0.5 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {stat.trend}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Health Scores */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Health Scores</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {healthScores.map((site) => (
            <div key={site.site} className="surface-elevated rounded-xl p-5 flex flex-col items-center text-center">
              <ScoreRing score={site.score} />
              <p className="text-sm font-medium text-foreground mt-3">{site.site}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Last check: {site.lastCheck}</p>
              <div className="flex items-center gap-1.5 mt-2">
                {site.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-emerald-400" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-400" />
                )}
                <Sparkline
                  data={site.sparkline}
                  color={site.score >= 80 ? "#34d399" : site.score >= 50 ? "#facc15" : "#f87171"}
                />
              </div>
              <Button variant="ghost" size="sm" className="mt-3 text-xs text-primary hover:text-primary h-7 px-3">
                View Report <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column: Activity Feed + Confirmed Bugs */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-3 surface-elevated rounded-xl">
          <div className="px-5 py-4 border-b border-border/40 flex items-center justify-between">
            <h2 className="text-sm font-medium text-foreground">Recent Activity</h2>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground h-7">View All</Button>
          </div>
          <div className="divide-y divide-border/20">
            {recentActivity.map((activity, i) => (
              <div key={i} className="px-5 py-3 flex items-start gap-3">
                {getActivityIcon(activity.type)}
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground/90 leading-snug">{activity.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Confirmed Bugs */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Confirmed Bugs</h2>
          {confirmedBugs.length > 0 ? (
            confirmedBugs.map((bug, i) => (
              <div key={i} className="rounded-xl border border-red-400/20 bg-red-400/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">{bug.site}</span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                    bug.severity === "critical"
                      ? "bg-red-400/15 text-red-400"
                      : "bg-yellow-400/15 text-yellow-400"
                  }`}>{bug.severity}</span>
                </div>
                <p className="text-xs font-medium text-muted-foreground mb-1">{bug.test}</p>
                <p className="text-sm text-foreground/80 mb-2">{bug.description}</p>
                <p className="text-xs text-muted-foreground mb-3">Broken for {bug.brokenSince}</p>
                <Button variant="ghost" size="sm" className="text-xs h-7 text-primary hover:text-primary gap-1.5">
                  <Lightbulb className="h-3 w-3" /> Fix Suggestion
                </Button>
              </div>
            ))
          ) : (
            <div className="surface-elevated rounded-xl p-8 text-center">
              <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
              <p className="text-sm text-foreground">No confirmed bugs</p>
              <p className="text-xs text-muted-foreground mt-1">Your sites are healthy</p>
            </div>
          )}
        </div>
      </div>

      {/* Upcoming Checks */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">Upcoming Checks</h2>
        <div className="surface-elevated rounded-xl divide-y divide-border/20">
          {upcomingChecks.map((check, i) => (
            <div key={i} className="px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{check.site}</span>
              </div>
              <span className="text-xs text-muted-foreground">{check.next}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
