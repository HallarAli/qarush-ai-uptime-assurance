import { useState } from "react";
import {
  Globe, Plus, MoreVertical, Play, Pause, Trash2, Clock, Mail,
  CalendarClock, Eye, Settings, CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const sites = [
  {
    url: "qarush.com", schedule: "Daily", alertEmail: "ahmed@qarush.com",
    lastRun: "2 hours ago", passRate: 100, passed: 23, failed: 0,
    nextCheck: "In 4 hours", status: "active" as const,
    history: [95, 98, 100, 97, 100, 99, 100],
  },
  {
    url: "ahmedsedki.com", schedule: "Daily", alertEmail: "ahmed@qarush.com",
    lastRun: "5 hours ago", passRate: 76, passed: 13, failed: 4,
    nextCheck: "In 12 hours", status: "active" as const,
    history: [85, 82, 80, 78, 76, 75, 76],
  },
  {
    url: "mystore.com", schedule: "Hourly", alertEmail: "alerts@mystore.com",
    lastRun: "45 min ago", passRate: 83, passed: 20, failed: 4,
    nextCheck: "In 15 min", status: "active" as const,
    history: [78, 80, 79, 81, 82, 83, 83],
  },
  {
    url: "checkout.mysite.com", schedule: "Hourly", alertEmail: "ahmed@qarush.com",
    lastRun: "1 hour ago", passRate: 42, passed: 10, failed: 14,
    nextCheck: "In 1 hour", status: "active" as const,
    history: [61, 58, 55, 50, 48, 45, 42],
  },
  {
    url: "portfolio.dev", schedule: "Weekly", alertEmail: "ahmed@qarush.com",
    lastRun: "2 days ago", passRate: 98, passed: 18, failed: 0,
    nextCheck: "In 5 days", status: "paused" as const,
    history: [96, 96, 97, 97, 98, 98, 98],
  },
];

function getPassRateColor(rate: number) {
  if (rate >= 80) return "text-emerald-400";
  if (rate >= 50) return "text-yellow-400";
  return "text-red-400";
}

function MiniHealthBars({ data }: { data: number[] }) {
  return (
    <div className="flex items-end gap-0.5 h-5">
      {data.map((val, i) => (
        <div
          key={i}
          className={`w-2 rounded-sm transition-all ${
            val >= 80 ? "bg-emerald-400/70" : val >= 50 ? "bg-yellow-400/70" : "bg-red-400/70"
          }`}
          style={{ height: `${Math.max(20, (val / 100) * 100)}%` }}
        />
      ))}
    </div>
  );
}

export default function MonitoredSites() {
  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Monitored Sites</h1>
          <p className="text-sm text-muted-foreground mt-1">Sites being checked automatically</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" /> Add Site
        </Button>
      </div>

      {/* Sites List */}
      <div className="space-y-4">
        {sites.map((site) => (
          <div key={site.url} className="surface-elevated rounded-xl p-5">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              {/* Left */}
              <div className="flex items-center gap-3 lg:w-[260px] shrink-0">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{site.url}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-medium">
                      {site.schedule}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                    <Mail className="h-3 w-3" /> {site.alertEmail}
                  </p>
                </div>
              </div>

              {/* Middle */}
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Last Run</p>
                  <p className="text-sm text-foreground mt-0.5">{site.lastRun}</p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Pass Rate</p>
                  <p className={`text-xl font-bold mt-0.5 ${getPassRateColor(site.passRate)}`}>
                    {site.passRate}%
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Tests</p>
                  <p className="text-sm text-foreground mt-0.5">
                    <span className="text-emerald-400">{site.passed} passed</span>
                    {site.failed > 0 && <span className="text-red-400"> · {site.failed} failed</span>}
                  </p>
                </div>
                <div>
                  <p className="text-[11px] text-muted-foreground uppercase tracking-wider">Next Check</p>
                  <p className="text-sm text-foreground mt-0.5 flex items-center gap-1">
                    <CalendarClock className="h-3 w-3 text-muted-foreground" /> {site.nextCheck}
                  </p>
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-3 shrink-0">
                <span className={`text-[11px] font-semibold uppercase px-2.5 py-1 rounded-full ${
                  site.status === "active"
                    ? "bg-emerald-400/10 text-emerald-400"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {site.status}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem className="gap-2"><Eye className="h-4 w-4" /> View Latest Report</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Play className="h-4 w-4" /> Run Now</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Clock className="h-4 w-4" /> Change Schedule</DropdownMenuItem>
                    <DropdownMenuItem className="gap-2"><Mail className="h-4 w-4" /> Change Alert Email</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2">
                      <Pause className="h-4 w-4" /> {site.status === "active" ? "Pause" : "Resume"} Monitoring
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 text-destructive"><Trash2 className="h-4 w-4" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Bottom: mini health bars */}
            <div className="mt-4 pt-3 border-t border-border/30 flex items-center justify-between">
              <p className="text-[11px] text-muted-foreground">Last 7 days</p>
              <MiniHealthBars data={site.history} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
