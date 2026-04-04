import { motion } from "framer-motion";
import { Search, Monitor, Bell, FileText } from "lucide-react";

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

      <div className="grid md:grid-cols-4 gap-6 relative">
        {/* Connecting line */}
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
    </div>
  </section>
);

export default HowItWorks;
