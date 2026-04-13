import { motion } from "framer-motion";
import protectImage from "@/assets/protect-monitor.png";
import fixImage from "@/assets/fix-heal.png";

const ProtectFixSection = () => (
  <section className="section-padding">
    <div className="container-narrow space-y-32">
      {/* PROTECT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-2 gap-10 items-center"
      >
        <div className="order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-destructive/30 bg-destructive/5 text-xs text-destructive mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
            24/7 Active Protection
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Continuous monitoring.
            <br />
            <span className="text-muted-foreground">Instant alerts.</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Once your tests are built, Qarush enters monitoring mode — scanning your live site around the clock. The moment a flow breaks, you get an alert with visual proof, not a vague error log.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Uptime", value: "99.9%" },
              { label: "Avg Alert Time", value: "< 30s" },
              { label: "Flows Watched", value: "24/7" },
              { label: "False Positives", value: "< 1%" },
            ].map((stat) => (
              <div key={stat.label} className="glass-card rounded-lg p-4">
                <p className="text-xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="order-1 lg:order-2 rounded-2xl overflow-hidden glow-md border border-border/30">
          <img
            src={protectImage}
            alt="Qarush AI monitoring web structure with alert detection"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
      </motion.div>

      {/* FIX */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid lg:grid-cols-2 gap-10 items-center"
      >
        <div className="rounded-2xl overflow-hidden glow-md border border-border/30">
          <img
            src={fixImage}
            alt="Qarush AI self-healing mechanism fixing broken test nodes"
            className="w-full h-auto"
            loading="lazy"
          />
        </div>
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-xs text-primary mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Self-Healing AI
          </div>
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Detect, diagnose,
            <br />
            <span className="text-muted-foreground">and fix automatically.</span>
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Qarush doesn't just report problems — it understands them. Our AI generates fix suggestions, auto-retries flaky tests, and can open pull requests with proposed solutions.
          </p>
          <ul className="space-y-3">
            {[
              "Smart retry for flaky tests",
              "Root cause analysis per failure",
              "Auto-generated fix suggestions",
              "Pull request integration (coming soon)",
            ].map((item) => (
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

export default ProtectFixSection;
