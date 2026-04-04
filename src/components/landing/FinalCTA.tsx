import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FinalCTA = () => (
  <section className="section-padding relative overflow-hidden">
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="container-narrow relative z-10 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-4">
        Stop losing customers to broken flows.
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-8">
        Set up Qarush AI in minutes and never miss a critical issue again.
      </p>
      <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2 px-8">
        Start Your Free Trial
        <ArrowRight size={16} />
      </Button>
    </motion.div>
  </section>
);

export default FinalCTA;
