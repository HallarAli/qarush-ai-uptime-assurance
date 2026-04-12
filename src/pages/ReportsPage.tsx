import { useState } from "react";
import {
  FileText, Download, Link2, Globe, Search, X, CheckCircle2, AlertTriangle, Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const reports = [
  { id: 1, site: "qarush.com", date: "12 Apr 2026", passRate: 94, pages: 12, issues: 0 },
  { id: 2, site: "ahmedsedki.com", date: "12 Apr 2026", passRate: 67, pages: 8, issues: 4 },
  { id: 3, site: "mystore.com", date: "11 Apr 2026", passRate: 83, pages: 15, issues: 3 },
  { id: 4, site: "checkout.mysite.com", date: "11 Apr 2026", passRate: 42, pages: 6, issues: 8 },
  { id: 5, site: "qarush.com", date: "10 Apr 2026", passRate: 92, pages: 12, issues: 1 },
  { id: 6, site: "portfolio.dev", date: "9 Apr 2026", passRate: 98, pages: 5, issues: 0 },
  { id: 7, site: "mystore.com", date: "8 Apr 2026", passRate: 80, pages: 14, issues: 4 },
  { id: 8, site: "ahmedsedki.com", date: "7 Apr 2026", passRate: 72, pages: 8, issues: 3 },
];

function getPassRateColor(rate: number) {
  if (rate >= 80) return "text-emerald-400 bg-emerald-400/10";
  if (rate >= 50) return "text-yellow-400 bg-yellow-400/10";
  return "text-red-400 bg-red-400/10";
}

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [previewId, setPreviewId] = useState<number | null>(null);

  const filtered = reports.filter(r =>
    !searchQuery || r.site.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const previewReport = reports.find(r => r.id === previewId);

  return (
    <div className="max-w-[1400px] mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Access all generated PDF reports</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" /> Download All
        </Button>
      </div>

      {/* Filters */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Filter by site URL..."
          className="pl-9 bg-secondary/50"
        />
      </div>

      {/* Reports Grid + Side Panel */}
      <div className="flex gap-6">
        <div className={`flex-1 grid grid-cols-1 sm:grid-cols-2 ${previewId ? "lg:grid-cols-2" : "lg:grid-cols-3"} gap-4`}>
          {filtered.map(report => (
            <div
              key={report.id}
              className={`surface-elevated rounded-xl p-5 cursor-pointer transition-all hover:border-primary/30 ${
                previewId === report.id ? "ring-1 ring-primary" : ""
              }`}
              onClick={() => setPreviewId(report.id)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">{report.site}</span>
                </div>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${getPassRateColor(report.passRate)}`}>
                  {report.passRate}%
                </span>
              </div>

              <p className="text-xs text-muted-foreground">{report.date}</p>

              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span>{report.pages} pages</span>
                <span>{report.issues} issues</span>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 flex-1">
                  <Download className="h-3 w-3" /> PDF
                </Button>
                <Button variant="ghost" size="sm" className="text-xs h-7 gap-1 flex-1">
                  <Link2 className="h-3 w-3" /> Share
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Side Panel Preview */}
        {previewReport && (
          <div className="hidden lg:block w-[360px] shrink-0 surface-elevated rounded-xl p-6 sticky top-6 self-start">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-foreground">Report Preview</h3>
              <button onClick={() => setPreviewId(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground">{previewReport.site}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <p className={`text-2xl font-bold ${
                    previewReport.passRate >= 80 ? "text-emerald-400" : previewReport.passRate >= 50 ? "text-yellow-400" : "text-red-400"
                  }`}>{previewReport.passRate}%</p>
                  <p className="text-xs text-muted-foreground">Pass Rate</p>
                </div>
                <div className="p-3 rounded-lg bg-secondary/50 text-center">
                  <p className="text-2xl font-bold text-foreground">{previewReport.pages}</p>
                  <p className="text-xs text-muted-foreground">Pages</p>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-2">Summary</p>
                <div className="space-y-1.5">
                  {previewReport.issues === 0 ? (
                    <div className="flex items-center gap-2 text-sm text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" /> All tests passed
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-sm text-yellow-400">
                        <AlertTriangle className="h-3.5 w-3.5" /> {previewReport.issues} issues found
                      </div>
                    </>
                  )}
                  <p className="text-xs text-muted-foreground">Generated on {previewReport.date}</p>
                </div>
              </div>

              <Button className="w-full gap-2">
                <Download className="h-4 w-4" /> Download Full Report
              </Button>
            </div>
          </div>
        )}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FileText className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
          <p className="text-foreground font-medium">No reports yet</p>
          <p className="text-sm text-muted-foreground mt-1">Run your first test to generate a report</p>
        </div>
      )}
    </div>
  );
}
