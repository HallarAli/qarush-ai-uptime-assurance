import { Shield } from "lucide-react";

interface AuthLeftPanelProps {
  headline: string;
  subline: string;
}

const AuthLeftPanel = ({ headline, subline }: AuthLeftPanelProps) => {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, hsl(260 60% 50%) 0%, hsl(220 70% 40%) 40%, hsl(170 60% 30%) 100%)",
        }}
      />

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/20 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/15 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-12 w-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white tracking-tight">
            Qarush AI
          </span>
        </div>

        {/* Bottom text */}
        <div className="space-y-4">
          <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight">
            {headline}
          </h2>
          <p className="text-lg text-white/60">{subline}</p>
        </div>
      </div>
    </div>
  );
};

export default AuthLeftPanel;
