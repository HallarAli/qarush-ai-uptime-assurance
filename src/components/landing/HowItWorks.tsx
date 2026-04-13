import { motion } from "framer-motion";
import { Search, Monitor, Bell, FileText } from "lucide-react";
import flowImage from "@/assets/flow-crawl.png";

const steps = [
  { icon: Search, title: "Detect", desc: "AI scans your site and maps every critical user flow automatically." },
  { icon: Monitor, title: "Monitor", desc: "Continuous real-browser testing runs 24/7 on your live pages." },
  { icon: Bell, title: "Alert", desc: "Get instant notifications the moment a flow breaks — before users notice." },
  { icon: FileText, title: "Explain", desc: "Receive visual proof and actionable reports with every alert." },
];

const HowItWorks = () => (
  <section id="how-it-works" className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">How It Works</p>
        <h2 className="text-3xl md:text-4xl font-bold">Four steps to peace of mind.</h2>
      </motion.div>

      {/* Steps row */}
      <div className="grid md:grid-cols-4 gap-6 relative mb-20">
        <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-border via-primary/30 to-border" />
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="relative text-center"
          >
            <div className="w-20 h-20 rounded-2xl surface-elevated mx-auto mb-5 flex items-center justify-center relative z-10">
              <s.icon size={24} className="text-primary" />
            </div>
            <span className="text-xs font-mono text-text-dim mb-2 block">0{i + 1}</span>
            <h3 className="font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Flow visual — full-width image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-2 gap-10 items-center"
      >
        <div className="rounded-2xl overflow-hidden glow-md border border-border/30">
          <img
            src={flowImage}
            alt="Qarush AI crawling websites and generating Playwright tests in Chrome"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">The Engine</p>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Claude crawls. Playwright generates. Chrome runs.
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Our AI agent maps your website's structure, generates production-grade Playwright test scripts, and executes them in a real Chrome browser — producing a professional report with screenshots and action logs.
          </p>
          <ul className="space-y-3">
            {["AI-powered page crawling", "Auto-generated Playwright tests", "Real Chrome browser execution", "Detailed pass/fail reports"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  </section>
);

export default HowItWorks;
