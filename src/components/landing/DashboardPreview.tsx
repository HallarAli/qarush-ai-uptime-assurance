import { motion } from "framer-motion";
import DashboardMockup from "./DashboardMockup";

const DashboardPreview = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Product</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">A dashboard built for clarity.</h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Real-time status, historical trends, and actionable insights — all in one place.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <DashboardMockup />
      </motion.div>

      <p className="text-center text-xs text-text-dim mt-6">
        Live monitoring dashboard showing flow health, activity trends, and alert status.
      </p>
    </div>
  </section>
);

export default DashboardPreview;
