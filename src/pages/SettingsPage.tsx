import { useState } from "react";
import {
  User, Bell, Shield, Palette, Key, Trash2, AlertTriangle, Save, Mail
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const [alertEmail, setAlertEmail] = useState("ahmed@qarush.com");
  const [immediateCritical, setImmediateCritical] = useState(true);
  const [immediateHigh, setImmediateHigh] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [improvementAlert, setImprovementAlert] = useState(false);
  const [digestDay, setDigestDay] = useState("monday");
  const [defaultSchedule, setDefaultSchedule] = useState("daily");
  const [alertSensitivity, setAlertSensitivity] = useState("10");

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-foreground tracking-tight">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account and preferences</p>
      </div>

      {/* Profile */}
      <section className="surface-elevated rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-base font-medium text-foreground">Profile</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Full Name</Label>
            <Input defaultValue="Ahmed Sedki" className="mt-1 bg-secondary/50" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input defaultValue="ahmed@qarush.com" className="mt-1 bg-secondary/50" disabled />
          </div>
        </div>
        <Button size="sm" className="gap-2 mt-2"><Save className="h-3.5 w-3.5" /> Save Changes</Button>
      </section>

      {/* Notifications */}
      <section className="surface-elevated rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Bell className="h-5 w-5 text-primary" />
          <h2 className="text-base font-medium text-foreground">Notifications</h2>
        </div>

        <div>
          <Label className="text-xs text-muted-foreground">Alert Email Address</Label>
          <div className="flex gap-2 mt-1">
            <Input value={alertEmail} onChange={e => setAlertEmail(e.target.value)} className="bg-secondary/50 flex-1" />
            <Button variant="outline" size="sm"><Mail className="h-4 w-4" /></Button>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: "Immediate alerts for critical failures", checked: immediateCritical, set: setImmediateCritical },
            { label: "Immediate alerts for high-severity failures", checked: immediateHigh, set: setImmediateHigh },
            { label: "Weekly digest every Monday", checked: weeklyDigest, set: setWeeklyDigest },
            { label: "Alert when monitoring detects improvement", checked: improvementAlert, set: setImprovementAlert },
          ].map(item => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="text-sm text-foreground">{item.label}</span>
              <Switch checked={item.checked} onCheckedChange={item.set} />
            </div>
          ))}
        </div>

        {weeklyDigest && (
          <div>
            <Label className="text-xs text-muted-foreground">Digest Day</Label>
            <Select value={digestDay} onValueChange={setDigestDay}>
              <SelectTrigger className="w-[200px] mt-1 bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {["monday", "tuesday", "wednesday", "thursday", "friday"].map(d => (
                  <SelectItem key={d} value={d}>{d.charAt(0).toUpperCase() + d.slice(1)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </section>

      {/* Monitoring Preferences */}
      <section className="surface-elevated rounded-xl p-6 space-y-5">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="h-5 w-5 text-primary" />
          <h2 className="text-base font-medium text-foreground">Monitoring Preferences</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs text-muted-foreground">Default Schedule</Label>
            <Select value={defaultSchedule} onValueChange={setDefaultSchedule}>
              <SelectTrigger className="mt-1 bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hourly">Hourly</SelectItem>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Alert Sensitivity</Label>
            <Select value={alertSensitivity} onValueChange={setAlertSensitivity}>
              <SelectTrigger className="mt-1 bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Pass rate drops by 10%</SelectItem>
                <SelectItem value="20">Pass rate drops by 20%</SelectItem>
                <SelectItem value="critical">Critical failures only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Appearance (future) */}
      <section className="surface-elevated rounded-xl p-6 space-y-4 opacity-60">
        <div className="flex items-center gap-3 mb-1">
          <Palette className="h-5 w-5 text-primary" />
          <h2 className="text-base font-medium text-foreground">Appearance</h2>
          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Coming Soon</span>
        </div>
        <p className="text-sm text-muted-foreground">Theme and report style customization</p>
      </section>

      {/* API Access (future) */}
      <section className="surface-elevated rounded-xl p-6 space-y-4 opacity-60">
        <div className="flex items-center gap-3 mb-1">
          <Key className="h-5 w-5 text-primary" />
          <h2 className="text-base font-medium text-foreground">API Access</h2>
          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">Team Plan</span>
        </div>
        <p className="text-sm text-muted-foreground">API key management and usage stats</p>
      </section>

      {/* Danger Zone */}
      <section className="rounded-xl border border-red-400/20 p-6 space-y-4">
        <div className="flex items-center gap-3 mb-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          <h2 className="text-base font-medium text-red-400">Danger Zone</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-400/30 text-red-400 hover:bg-red-400/10 gap-2">
                <Trash2 className="h-4 w-4" /> Delete All Test History
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete all test history?</DialogTitle>
                <DialogDescription>
                  This will permanently delete all test runs, reports, and associated data. This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Everything</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-red-400/30 text-red-400 hover:bg-red-400/10 gap-2">
                <Trash2 className="h-4 w-4" /> Delete Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete your account?</DialogTitle>
                <DialogDescription>
                  This will permanently delete your account, all monitored sites, test history, and reports. This cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button variant="destructive">Delete Account</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}
