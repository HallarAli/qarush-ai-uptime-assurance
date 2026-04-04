import { motion } from "framer-motion";
import { Bot, RefreshCw, Globe, Zap, Camera, BarChart3 } from "lucide-react";

const features = [
  { icon: Bot, title: "Automated Testing", desc: "AI creates and maintains test scenarios — no scripting required." },
  { icon: RefreshCw, title: "Continuous Monitoring", desc: "Round-the-clock checks on every critical flow in your product." },
  { icon: Globe, title: "Real Browser Execution", desc: "Tests run in actual browsers, catching issues that synthetic checks miss." },
  { icon: Zap, title: "Instant Alerts", desc: "Slack, email, or webhook notifications within seconds of failure." },
  { icon: Camera, title: "Visual Proof", desc: "Full screenshots and session recordings attached to every alert." },
  { icon: BarChart3, title: "Smart Reports", desc: "Developer-ready and executive-friendly reports generated automatically." },
];

const FeaturesSection = () => (
  <section id="features" className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Features</p>
        <h2 className="text-3xl md:text-4xl font-bold">Everything you need to stay ahead.</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="glass-card rounded-xl p-6 group hover:border-primary/20 transition-all"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
              <f.icon size={18} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default FeaturesSection;
