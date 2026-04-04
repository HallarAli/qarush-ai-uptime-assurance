import { motion } from "framer-motion";
import { FileWarning, Route, EyeOff, TrendingDown } from "lucide-react";

const problems = [
  {
    icon: FileWarning,
    title: "Broken Forms",
    desc: "Submission failures silently lose leads and revenue every day.",
  },
  {
    icon: Route,
    title: "Failed User Flows",
    desc: "Critical paths break after deployments without anyone noticing.",
  },
  {
    icon: EyeOff,
    title: "Silent Errors",
    desc: "JavaScript errors go undetected until customers complain.",
  },
  {
    icon: TrendingDown,
    title: "Lost Revenue",
    desc: "Every minute of downtime costs you customers and trust.",
  },
];

const ProblemSection = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Your website is breaking.
          <br />
          <span className="text-muted-foreground">You just don't know it yet.</span>
        </h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {problems.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6 hover:border-primary/20 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <p.icon size={18} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProblemSection;
