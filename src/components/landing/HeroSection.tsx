import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-find.png";

const HeroSection = () => (
  <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
    {/* Background effects */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/3 rounded-full blur-[100px]" />
    </div>

    <div className="container-narrow relative z-10">
      {/* Centered text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-12"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-secondary/50 text-xs text-muted-foreground mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          Now monitoring 10,000+ user flows
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] mb-6">
          Catch broken flows
          <br />
          <span className="text-gradient">before your users do.</span>
        </h1>

        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mb-8">
          Qarush AI continuously monitors your website's critical paths — forms,
          checkout, navigation — and alerts you the moment something breaks.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-4">
          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-6">
            Start Free Trial
            <ArrowRight size={16} />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-border/60 text-foreground hover:bg-secondary/60 gap-2"
          >
            <Play size={14} />
            Watch Demo
          </Button>
        </div>

        <p className="text-xs text-text-dim">
          No credit card required. Setup in under 2 minutes.
        </p>
      </motion.div>

      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative max-w-4xl mx-auto"
      >
        <div className="rounded-2xl overflow-hidden glow-md border border-border/30">
          <img
            src={heroImage}
            alt="Qarush AI — paste a URL, AI generates tests in under 5 minutes"
            className="w-full h-auto"
            loading="eager"
          />
        </div>
        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="absolute -left-4 top-1/3 hidden lg:block glass-card rounded-lg px-4 py-3 shadow-lg"
        >
          <p className="text-xs font-medium text-primary">FIND</p>
          <p className="text-[11px] text-muted-foreground">Paste URL, get tests</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className="absolute -right-4 bottom-1/4 hidden lg:block glass-card rounded-lg px-4 py-3 shadow-lg"
        >
          <p className="text-xs font-mono font-medium text-primary">04:59</p>
          <p className="text-[11px] text-muted-foreground">Tests ready</p>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
