import { Activity, AlertTriangle, CheckCircle2, XCircle } from "lucide-react";

const statusItems = [
  { label: "Checkout Flow", status: "healthy", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Contact Form", status: "warning", icon: AlertTriangle, color: "text-amber-400" },
  { label: "Login Page", status: "healthy", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Payment API", status: "error", icon: XCircle, color: "text-red-400" },
  { label: "Search Flow", status: "healthy", icon: CheckCircle2, color: "text-emerald-400" },
];

const DashboardMockup = () => (
  <div className="glass-card rounded-xl p-1 glow-md">
    <div className="surface-elevated rounded-lg overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
        </div>
        <span className="text-[10px] text-text-dim font-mono ml-2">qarush.ai/dashboard</span>
      </div>

      <div className="p-5 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Flows Monitored", value: "247" },
            { label: "Issues Found", value: "3" },
            { label: "Uptime", value: "99.8%" },
          ].map((s) => (
            <div key={s.label} className="bg-background/50 rounded-lg p-3">
              <p className="text-[10px] text-text-dim uppercase tracking-wider">{s.label}</p>
              <p className="text-xl font-semibold mt-1">{s.value}</p>
            </div>
          ))}
        </div>

        {/* Activity graph placeholder */}
        <div className="bg-background/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={12} className="text-primary" />
            <span className="text-xs text-muted-foreground">Activity — Last 24h</span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 75, 50, 88, 72, 65, 82, 90, 78, 85, 70, 92].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm bg-primary/30"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        {/* Status list */}
        <div className="space-y-1.5">
          {statusItems.map((item) => (
            <div key={item.label} className="flex items-center justify-between bg-background/30 rounded-md px-3 py-2">
              <div className="flex items-center gap-2">
                <item.icon size={13} className={item.color} />
                <span className="text-xs">{item.label}</span>
              </div>
              <span className={`text-[10px] capitalize ${item.color}`}>{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default DashboardMockup;
