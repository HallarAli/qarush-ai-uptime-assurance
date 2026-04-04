import { motion } from "framer-motion";
import { Code2, Briefcase } from "lucide-react";

const ReportTypes = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Reports</p>
        <h2 className="text-3xl md:text-4xl font-bold">Two reports. Two audiences.</h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Technical */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
            <Code2 size={18} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Technical Report</h3>
          <ul className="space-y-3">
            {[
              "Full stack trace and error context",
              "DOM snapshot at point of failure",
              "Network request/response logs",
              "Step-by-step reproduction path",
              "Browser and environment details",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Executive */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-xl p-8"
        >
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
            <Briefcase size={18} className="text-primary" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Executive Summary</h3>
          <ul className="space-y-3">
            {[
              "Plain-language issue description",
              "Business impact assessment",
              "Estimated revenue at risk",
              "Resolution priority and timeline",
              "Visual before/after comparison",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                <span className="w-1 h-1 rounded-full bg-primary mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ReportTypes;
