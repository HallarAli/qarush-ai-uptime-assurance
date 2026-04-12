import {
  CreditCard, Zap, Check, Download, ChevronRight, Plus, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const currentPlan = {
  name: "Pro",
  price: "£29/mo",
  features: [
    "50 test sessions/month",
    "5 monitored sites",
    "Daily automated checks",
    "PDF reports",
    "Email alerts",
    "Priority support",
  ],
};

const usage = {
  sessions: { used: 34, total: 50 },
  pages: 847,
  sites: { active: 5, allowed: 5 },
  daysUntilReset: 18,
};

const addOns = [
  { sessions: 10, price: "£6" },
  { sessions: 50, price: "£25" },
];

const billingHistory = [
  { date: "12 Apr 2026", desc: "Pro Plan — Monthly", amount: "£29.00", invoiceId: "INV-0042" },
  { date: "12 Mar 2026", desc: "Pro Plan — Monthly", amount: "£29.00", invoiceId: "INV-0039" },
  { date: "8 Mar 2026", desc: "10 Extra Sessions", amount: "£6.00", invoiceId: "INV-0038" },
  { date: "12 Feb 2026", desc: "Pro Plan — Monthly", amount: "£29.00", invoiceId: "INV-0035" },
  { date: "12 Jan 2026", desc: "Pro Plan — Monthly", amount: "£29.00", invoiceId: "INV-0031" },
];

const plans = [
  { name: "Starter", price: "Free", sessions: "5/mo", sites: "1", features: ["Basic tests", "Manual runs only", "Community support"], current: false },
  { name: "Pro", price: "£29/mo", sessions: "50/mo", sites: "5", features: ["Daily monitoring", "PDF reports", "Email alerts", "Priority support"], current: true },
  { name: "Team", price: "£79/mo", sessions: "200/mo", sites: "20", features: ["Everything in Pro", "API access", "Team members", "Custom reports", "Dedicated support"], current: false },
];

export default function BillingPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Billing</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your plan, usage, and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="surface-elevated rounded-xl p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h2 className="text-base font-medium text-foreground">{currentPlan.name} Plan</h2>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Current</span>
            </div>
            <p className="text-2xl font-bold text-foreground mt-1">{currentPlan.price}</p>
          </div>
          <Button variant="outline" size="sm" className="gap-1.5">
            Upgrade <ChevronRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {currentPlan.features.map(f => (
            <div key={f} className="flex items-center gap-2 text-sm text-foreground/80">
              <Check className="h-3.5 w-3.5 text-primary shrink-0" /> {f}
            </div>
          ))}
        </div>
      </div>

      {/* Usage */}
      <div className="surface-elevated rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="h-5 w-5 text-primary" />
          <h2 className="text-base font-medium text-foreground">Usage This Month</h2>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-foreground">Sessions</span>
              <span className="text-sm text-muted-foreground">{usage.sessions.used} / {usage.sessions.total}</span>
            </div>
            <Progress value={(usage.sessions.used / usage.sessions.total) * 100} className="h-2" />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-lg font-semibold text-foreground">{usage.pages}</p>
              <p className="text-xs text-muted-foreground">Pages tested</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-lg font-semibold text-foreground">{usage.sites.active}/{usage.sites.allowed}</p>
              <p className="text-xs text-muted-foreground">Active sites</p>
            </div>
            <div className="p-3 rounded-lg bg-secondary/50">
              <p className="text-lg font-semibold text-foreground">{usage.daysUntilReset}</p>
              <p className="text-xs text-muted-foreground">Days until reset</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add-On Credits */}
      <div className="surface-elevated rounded-xl p-6">
        <h2 className="text-base font-medium text-foreground mb-4">Need More Sessions?</h2>
        <div className="flex gap-3">
          {addOns.map(addon => (
            <Button key={addon.sessions} variant="outline" className="gap-2">
              <Plus className="h-4 w-4" /> {addon.sessions} sessions — {addon.price}
            </Button>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="surface-elevated rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium text-foreground">Visa ending in 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2028</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Update Card</Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="surface-elevated rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-border/40">
          <h2 className="text-base font-medium text-foreground">Billing History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-6 py-3">Date</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-6 py-3">Description</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-6 py-3">Amount</th>
                <th className="text-right text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-6 py-3">Invoice</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {billingHistory.map(item => (
                <tr key={item.invoiceId} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-3 text-sm text-foreground">{item.date}</td>
                  <td className="px-6 py-3 text-sm text-foreground">{item.desc}</td>
                  <td className="px-6 py-3 text-sm text-foreground font-medium">{item.amount}</td>
                  <td className="px-6 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 text-primary">
                      <Download className="h-3 w-3" /> PDF
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Plan Comparison */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Compare Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map(plan => (
            <div key={plan.name} className={`rounded-xl p-5 border ${
              plan.current ? "border-primary bg-primary/5" : "border-border/40 surface-elevated"
            }`}>
              <p className="text-sm font-medium text-foreground">{plan.name}</p>
              <p className="text-2xl font-bold text-foreground mt-1">{plan.price}</p>
              <p className="text-xs text-muted-foreground mt-1">{plan.sessions} sessions · {plan.sites} sites</p>
              <div className="mt-4 space-y-2">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-xs text-foreground/80">
                    <Check className="h-3 w-3 text-primary shrink-0" /> {f}
                  </div>
                ))}
              </div>
              {plan.current ? (
                <div className="mt-4 text-xs font-medium text-primary text-center py-2 rounded-lg bg-primary/10">Current Plan</div>
              ) : (
                <Button variant="outline" size="sm" className="w-full mt-4">
                  {plan.price === "Free" ? "Downgrade" : "Upgrade"}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
