import { useState } from "react";
import {
  Search, Filter, Calendar, Globe, CheckCircle2, XCircle,
  Loader2, ChevronLeft, ChevronRight, Eye, Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";

const historyData = Array.from({ length: 42 }, (_, i) => {
  const statuses = ["done", "done", "done", "done", "failed", "done"] as const;
  const urls = ["qarush.com", "ahmedsedki.com", "mystore.com", "checkout.mysite.com", "portfolio.dev"];
  const url = urls[i % urls.length];
  const status = statuses[i % statuses.length];
  const passRate = status === "failed" ? Math.floor(Math.random() * 40) + 20 : Math.floor(Math.random() * 25) + 75;
  const pages = Math.floor(Math.random() * 15) + 5;
  const tests = Math.floor(Math.random() * 20) + 10;
  const mins = Math.floor(Math.random() * 5) + 1;
  const secs = Math.floor(Math.random() * 59);
  const daysAgo = Math.floor(i / 3);
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  date.setHours(Math.floor(Math.random() * 12) + 8, Math.floor(Math.random() * 60));

  return {
    id: i,
    url,
    date: date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    time: date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    pages,
    tests,
    passRate,
    status,
    duration: `${mins}m ${secs}s`,
  };
});

function getPassRateColor(rate: number) {
  if (rate >= 80) return "text-emerald-400";
  if (rate >= 50) return "text-yellow-400";
  return "text-red-400";
}

function StatusBadge({ status }: { status: string }) {
  if (status === "done") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
        <CheckCircle2 className="h-3 w-3" /> Done
      </span>
    );
  }
  if (status === "failed") {
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full">
        <XCircle className="h-3 w-3" /> Failed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
      <Loader2 className="h-3 w-3 animate-spin" /> Running
    </span>
  );
}

const PER_PAGE = 20;

export default function History() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filtered = historyData.filter(item => {
    if (searchQuery && !item.url.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterStatus !== "all" && item.status !== filterStatus) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Test History</h1>
        <p className="text-sm text-muted-foreground mt-1">Every test ever run — your complete archive</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            placeholder="Search by URL..."
            className="pl-9 bg-secondary/50"
          />
        </div>
        <Select value={filterStatus} onValueChange={(v) => { setFilterStatus(v); setPage(1); }}>
          <SelectTrigger className="w-[160px] bg-secondary/50">
            <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="done">Passed</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="surface-elevated rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3">Site</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3">Date</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3 hidden md:table-cell">Pages</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3 hidden md:table-cell">Tests</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3">Pass Rate</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3">Status</th>
                <th className="text-left text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3 hidden lg:table-cell">Duration</th>
                <th className="text-right text-[11px] uppercase tracking-wider text-muted-foreground font-medium px-5 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/20">
              {paginated.map((item) => (
                <tr key={item.id} className="hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                      <span className="text-sm text-foreground font-medium">{item.url}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <p className="text-sm text-foreground">{item.date}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-sm text-foreground">{item.pages}</span>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    <span className="text-sm text-foreground">{item.tests}</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-sm font-bold ${getPassRateColor(item.passRate)}`}>{item.passRate}%</span>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {item.duration}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-xs h-7 text-primary gap-1">
                      <Eye className="h-3 w-3" /> Results
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Page {page} of {totalPages} · {filtered.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage(p => p - 1)}
              className="h-8 gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Previous
            </Button>
            <Button
              variant="ghost"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage(p => p + 1)}
              className="h-8 gap-1"
            >
              Next <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
