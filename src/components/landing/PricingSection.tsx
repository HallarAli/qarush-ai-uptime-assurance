import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    desc: "For freelancers and small sites.",
    features: ["5 monitored flows", "Hourly checks", "Email alerts", "Basic reports", "1 team member"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mo",
    desc: "For growing teams and agencies.",
    features: ["50 monitored flows", "5-minute checks", "Slack + email alerts", "Full reports with screenshots", "5 team members", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For large-scale operations.",
    features: ["Unlimited flows", "1-minute checks", "Custom integrations", "Dedicated account manager", "SSO & audit logs", "SLA guarantee"],
    highlighted: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="section-padding">
    <div className="container-narrow">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium text-primary mb-3 uppercase tracking-wider">Pricing</p>
        <h2 className="text-3xl md:text-4xl font-bold">Simple, transparent pricing.</h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`rounded-xl p-6 flex flex-col ${
              plan.highlighted
                ? "border border-primary/40 bg-primary/5 glow-sm"
                : "glass-card"
            }`}
          >
            {plan.highlighted && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-primary mb-3">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mt-3 mb-1">
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-6">{plan.desc}</p>

            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-sm">
                  <Check size={14} className="text-primary shrink-0" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>

            <Button
              className={
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80 w-full"
              }
            >
              {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PricingSection;
