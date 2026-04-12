import { useState } from "react";
import {
  Globe, Lock, ShieldCheck, ShoppingCart, Mail, Smartphone,
  Layers, MessageSquare, ArrowLeft, ArrowRight, Loader2, Check,
  Eye, EyeOff, Zap, ClipboardCheck, Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const goals = [
  { id: "health", label: "Full Health Check", desc: "Test everything — forms, links, buttons, navigation", icon: Zap },
  { id: "monitor", label: "Monitor This Site", desc: "Set up continuous monitoring with alerts", icon: ShieldCheck },
  { id: "prelaunch", label: "Pre-Launch Checklist", desc: "Verify everything works before going live", icon: ClipboardCheck },
  { id: "specific", label: "Check Something Specific", desc: "Focus on a particular flow or page", icon: Search },
];

const priorities = [
  { id: "sales", label: "Sales & Checkout", desc: "Payment flows, cart, pricing", icon: ShoppingCart },
  { id: "forms", label: "Forms & Contact", desc: "Contact forms, signups, submissions", icon: Mail },
  { id: "mobile", label: "Mobile Experience", desc: "Responsive layouts, touch targets", icon: Smartphone },
  { id: "everything", label: "Everything Equally", desc: "No specific priority — test it all", icon: Layers },
  { id: "specific", label: "Something Specific", desc: "I'll describe what to focus on", icon: MessageSquare },
];

const recentUrls = ["qarush.com", "ahmedsedki.com", "mystore.com"];

export default function NewTest() {
  const [step, setStep] = useState(1);
  const [url, setUrl] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [requiresLogin, setRequiresLogin] = useState<boolean | null>(null);
  const [loginUrl, setLoginUrl] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState("");
  const [specificText, setSpecificText] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [runStep, setRunStep] = useState(0);

  const stepNames = ["Website", "Access", "Focus"];

  const canContinueStep1 = url.length > 0 && selectedGoal;
  const canContinueStep2 = requiresLogin !== null && (requiresLogin === false || (loginUrl && loginEmail && loginPassword));
  const canContinueStep3 = selectedPriority && (selectedPriority !== "specific" || specificText);

  const handleStartTest = () => {
    setIsRunning(true);
    setRunStep(0);
    const timers = [
      setTimeout(() => setRunStep(1), 2000),
      setTimeout(() => setRunStep(2), 5000),
      setTimeout(() => setRunStep(3), 8000),
    ];
    // In real app, would redirect to results
  };

  if (isRunning) {
    const runSteps = [
      { label: "Crawling your website...", done: runStep > 0 },
      { label: "Generating AI tests...", done: runStep > 1 },
      { label: "Running tests in Chrome...", done: runStep > 2 },
    ];

    return (
      <div className="max-w-lg mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
        </div>
        <h2 className="text-xl font-semibold text-foreground mb-2">Testing {url}</h2>
        <p className="text-sm text-muted-foreground mb-8">This usually takes 2-5 minutes</p>
        <div className="w-full space-y-4">
          {runSteps.map((s, i) => (
            <div key={i} className="flex items-center gap-3 text-left">
              {s.done ? (
                <div className="h-6 w-6 rounded-full bg-emerald-400/15 flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-emerald-400" />
                </div>
              ) : i === runStep ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin shrink-0" />
              ) : (
                <div className="h-6 w-6 rounded-full bg-muted shrink-0" />
              )}
              <span className={`text-sm ${s.done ? "text-emerald-400" : i === runStep ? "text-foreground" : "text-muted-foreground"}`}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Step Indicator */}
      <div className="flex items-center gap-2">
        {stepNames.map((name, i) => (
          <div key={name} className="flex items-center gap-2">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              step === i + 1
                ? "bg-primary/15 text-primary"
                : step > i + 1
                ? "bg-emerald-400/10 text-emerald-400"
                : "bg-secondary text-muted-foreground"
            }`}>
              {step > i + 1 ? <Check className="h-3 w-3" /> : <span>{i + 1}</span>}
              <span>{name}</span>
            </div>
            {i < 2 && <div className={`w-8 h-px ${step > i + 1 ? "bg-emerald-400/40" : "bg-border"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Website + Goal */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">What website do you want to test?</h2>
            <p className="text-sm text-muted-foreground mt-1">Enter the URL and choose your testing goal</p>
          </div>

          <div>
            <Input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="h-12 text-base bg-secondary/50"
              autoFocus
            />
            {recentUrls.length > 0 && (
              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-muted-foreground">Recent:</span>
                {recentUrls.map(u => (
                  <button
                    key={u}
                    onClick={() => setUrl(u)}
                    className="text-xs px-2.5 py-1 rounded-full bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    {u}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {goals.map(goal => (
              <button
                key={goal.id}
                onClick={() => setSelectedGoal(goal.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedGoal === goal.id
                    ? "border-primary bg-primary/5"
                    : "border-border/40 bg-secondary/30 hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    selectedGoal === goal.id ? "bg-primary/15" : "bg-muted"
                  }`}>
                    <goal.icon className={`h-4 w-4 ${selectedGoal === goal.id ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{goal.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{goal.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end">
            <Button disabled={!canContinueStep1} onClick={() => setStep(2)} className="gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 2: Authentication */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Does this site require login?</h2>
            <p className="text-sm text-muted-foreground mt-1">We need to know if there's a login wall</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRequiresLogin(false)}
              className={`p-6 rounded-xl border text-center transition-all ${
                requiresLogin === false ? "border-primary bg-primary/5" : "border-border/40 bg-secondary/30 hover:border-border"
              }`}
            >
              <Globe className={`h-8 w-8 mx-auto mb-3 ${requiresLogin === false ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-sm font-medium text-foreground">Public Site</p>
              <p className="text-xs text-muted-foreground mt-1">No login needed</p>
            </button>
            <button
              onClick={() => setRequiresLogin(true)}
              className={`p-6 rounded-xl border text-center transition-all ${
                requiresLogin === true ? "border-primary bg-primary/5" : "border-border/40 bg-secondary/30 hover:border-border"
              }`}
            >
              <Lock className={`h-8 w-8 mx-auto mb-3 ${requiresLogin === true ? "text-primary" : "text-muted-foreground"}`} />
              <p className="text-sm font-medium text-foreground">Requires Login</p>
              <p className="text-xs text-muted-foreground mt-1">Has authentication</p>
            </button>
          </div>

          {requiresLogin && (
            <div className="space-y-4 p-5 rounded-xl border border-border/40 bg-secondary/20">
              <Input
                value={loginUrl}
                onChange={(e) => setLoginUrl(e.target.value)}
                placeholder="Login page URL"
                className="bg-background/50"
              />
              <Input
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email or username"
                className="bg-background/50"
              />
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Password"
                  className="bg-background/50 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-primary" /> Credentials are encrypted and deleted after the test
              </p>
            </div>
          )}

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(1)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button disabled={!canContinueStep2} onClick={() => setStep(3)} className="gap-2">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Priority + Summary */}
      {step === 3 && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">What matters most?</h2>
            <p className="text-sm text-muted-foreground mt-1">Choose a priority area for testing</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {priorities.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPriority(p.id)}
                className={`text-left p-4 rounded-xl border transition-all ${
                  selectedPriority === p.id
                    ? "border-primary bg-primary/5"
                    : "border-border/40 bg-secondary/30 hover:border-border"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-9 w-9 rounded-lg flex items-center justify-center ${
                    selectedPriority === p.id ? "bg-primary/15" : "bg-muted"
                  }`}>
                    <p.icon className={`h-4 w-4 ${selectedPriority === p.id ? "text-primary" : "text-muted-foreground"}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedPriority === "specific" && (
            <Input
              value={specificText}
              onChange={(e) => setSpecificText(e.target.value)}
              placeholder="Describe what to focus on..."
              className="bg-secondary/50"
            />
          )}

          {/* Summary */}
          <div className="p-5 rounded-xl border border-border/40 bg-secondary/20 space-y-2">
            <h3 className="text-sm font-medium text-foreground mb-3">Test Summary</h3>
            <div className="grid grid-cols-2 gap-y-2 text-sm">
              <span className="text-muted-foreground">URL</span>
              <span className="text-foreground font-medium">{url || "—"}</span>
              <span className="text-muted-foreground">Goal</span>
              <span className="text-foreground font-medium capitalize">{goals.find(g => g.id === selectedGoal)?.label || "—"}</span>
              <span className="text-muted-foreground">Authentication</span>
              <span className="text-foreground font-medium">{requiresLogin ? "Login required" : "Public site"}</span>
              <span className="text-muted-foreground">Priority</span>
              <span className="text-foreground font-medium">{priorities.find(p => p.id === selectedPriority)?.label || "—"}</span>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep(2)} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button disabled={!canContinueStep3} onClick={handleStartTest} className="gap-2">
              Start Testing <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
