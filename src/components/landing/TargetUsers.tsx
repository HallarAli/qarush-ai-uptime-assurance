import { motion } from "framer-motion";
import { User, Users, ShoppingCart, Bug } from "lucide-react";

const personas = [
  { icon: User, title: "Freelancers", desc: "Monitor client sites without building custom test suites." },
  { icon: Users, title: "Agencies", desc: "Manage dozens of client properties from a single dashboard." },
  { icon: ShoppingCart, title: "Store Owners", desc: "Protect checkout and payment flows around the clock." },
  { icon: Bug, title: "QA Engineers", desc: "Augment your testing pipeline with continuous AI monitoring." },
];

const TargetUsers = () => (
  <section className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Built For</p>
        <h2 className="text-3xl md:text-4xl font-bold">Made for teams that ship.</h2>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {personas.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-xl p-6 text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <p.icon size={20} className="text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TargetUsers;
