import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Menu,
  X,
  Plus,
  Minus,
  Search,
  Zap,
  Shield,
  Wrench,
  Bell,
  Phone,
  Mail,
  LayoutGrid,
  Headphones,
  ThumbsUp,
  Users,
} from "lucide-react";

/* ---------- Shared tokens (scoped to landing) ---------- */
const ACCENT = "text-emerald-600";
const ACCENT_BG = "bg-emerald-600";
const ACCENT_BORDER = "border-emerald-600";
const HEADING = "text-slate-900";
const BODY = "text-slate-500";
const SUBTLE_BORDER = "border-slate-200";

/* ---------- Navbar ---------- */
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#home" className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-md ${ACCENT_BG} flex items-center justify-center`}>
            <Zap size={14} className="text-white" />
          </div>
          <span className={`text-base font-semibold ${HEADING}`}>Qarush</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900">
            Log in
          </Link>
          <Link
            to="/signup"
            className={`text-sm font-medium px-4 py-2 rounded-md border ${ACCENT_BORDER} ${ACCENT} hover:bg-emerald-50 transition-colors`}
          >
            Get it now
          </Link>
        </div>

        <button className="md:hidden text-slate-900" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 space-y-3">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-sm text-slate-600 hover:text-slate-900"
            >
              {l.label}
            </a>
          ))}
          <Link to="/signup" className={`block text-sm font-medium ${ACCENT}`}>
            Get it now →
          </Link>
        </div>
      )}
    </nav>
  );
};

/* ---------- Hero ---------- */
const Hero = () => (
  <section id="home" className="pt-32 pb-20 md:pt-40 md:pb-28">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] ${HEADING}`}
      >
        AI Testing Designed
        <br />
        to Grow with You
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`mt-6 text-base md:text-lg ${BODY} max-w-xl mx-auto`}
      >
        Qarush continuously monitors your website's critical flows — forms, checkout, navigation —
        and alerts you the moment something breaks. Setup in under 5 minutes.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-9 flex items-center justify-center gap-3"
      >
        <Link
          to="/signup"
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-md ${ACCENT_BG} text-white text-sm font-medium hover:bg-emerald-700 transition-colors`}
        >
          Start free trial <ArrowRight size={15} />
        </Link>
        <a
          href="#features"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
        >
          See how it works
        </a>
      </motion.div>

      <p className="mt-4 text-xs text-slate-400">No credit card required.</p>
    </div>
  </section>
);

/* ---------- Pricing ---------- */
const plans = [
  {
    name: "Standard",
    price: "$39",
    desc: "All the basics for businesses that are just getting started.",
    features: ["Single project use", "Basic dashboard", "All components included"],
    accent: "blue",
  },
  {
    name: "Essentials",
    price: "$99",
    desc: "Better for growing businesses that want more customers.",
    features: ["Unlimited project use", "Advanced dashboard", "All components included", "Advanced insight"],
    accent: "slate",
  },
  {
    name: "Premium",
    price: "$339",
    desc: "Advanced features for pros who need more customization.",
    features: ["Unlimited project use", "Advanced dashboard", "Multivariate components", "Phone Support"],
    accent: "emerald",
    highlighted: true,
  },
];

const Pricing = () => {
  const [annual, setAnnual] = useState(true);
  return (
    <section id="pricing" className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold ${HEADING}`}>
            Flexible Plans Designed
            <br />
            to Grow with You
          </h2>
          <p className={`mt-4 ${BODY} max-w-md mx-auto`}>
            Whether you're just starting out or managing a pro-level workflow, we've got you covered.
          </p>

          <div className="mt-8 inline-flex items-center gap-4 text-sm">
            <span className={annual ? "text-slate-400" : HEADING}>Bill Monthly</span>
            <button
              onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full bg-emerald-100"
              aria-label="Toggle billing"
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full ${ACCENT_BG} transition-all ${
                  annual ? "left-[26px]" : "left-0.5"
                }`}
              />
            </button>
            <div className="flex flex-col items-start">
              <span className={annual ? HEADING : "text-slate-400"}>Bill Annually</span>
              <span className={`text-xs ${ACCENT} font-medium`}>Save 15%</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {plans.map((plan) => {
            const isPremium = plan.highlighted;
            const topBar =
              plan.accent === "blue"
                ? "bg-blue-500"
                : plan.accent === "emerald"
                ? "bg-emerald-500"
                : "bg-slate-800";
            const priceColor =
              plan.accent === "blue"
                ? "text-blue-600"
                : plan.accent === "emerald"
                ? "text-emerald-600"
                : "text-slate-900";
            return (
              <div
                key={plan.name}
                className={`relative rounded-xl border ${SUBTLE_BORDER} bg-white p-6 flex flex-col`}
              >
                <div className={`absolute top-0 left-6 right-6 h-1 rounded-b-full ${topBar}`} />
                <div className="flex items-baseline gap-1 mt-2">
                  <span className={`text-3xl font-bold ${priceColor}`}>{plan.price}</span>
                  <span className="text-sm text-slate-400">/month</span>
                </div>
                <h3 className={`mt-4 text-lg font-semibold ${HEADING}`}>{plan.name}</h3>
                <p className={`mt-1 text-sm ${BODY}`}>{plan.desc}</p>

                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-slate-600">
                      <Check size={15} className={ACCENT} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={`mt-8 inline-flex items-center justify-center gap-2 py-2.5 rounded-md text-sm font-medium border transition-colors ${
                    isPremium
                      ? `${ACCENT_BG} text-white border-transparent hover:bg-emerald-700`
                      : "border-slate-200 text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Get Started <ArrowRight size={14} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- Features ("Elevate Your Business") ---------- */
const features = [
  {
    icon: LayoutGrid,
    title: "Marketing tools",
    desc: "Materials, education and campaigns to help you share with current and future clients.",
  },
  {
    icon: ThumbsUp,
    title: "Benefits",
    desc: "Digital employee records, quoting, enrollment, and reporting in English and Indonesian.",
  },
  {
    icon: Headphones,
    title: "Customer services",
    desc: "Access to our team of industry experts, personal training, support line and help desk.",
  },
  {
    icon: Users,
    title: "Become partners",
    desc: "We can help you set up and manage your groups if you are become our partner.",
  },
];

const Features = () => (
  <section id="features" className="py-24 border-t border-slate-100">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <span className={`inline-block text-xs font-medium px-3 py-1 rounded-full bg-emerald-50 ${ACCENT}`}>
          PREMIUM
        </span>
        <h2 className={`mt-4 text-3xl md:text-4xl font-bold ${HEADING}`}>
          Elevate Your Business with
          <br />
          Premium Standard Features
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-x-10 gap-y-10">
        {features.map((f) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <div className="w-11 h-11 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
              <f.icon size={20} className={ACCENT} />
            </div>
            <div>
              <h4 className={`text-base font-semibold ${HEADING}`}>{f.title}</h4>
              <p className={`mt-1.5 text-sm ${BODY} leading-relaxed`}>{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- How it works (FIND / FLOW / PROTECT / FIX) ---------- */
const steps = [
  { icon: Search, title: "Find", desc: "Paste a URL — Qarush AI maps every critical user flow on your site." },
  { icon: Zap, title: "Flow", desc: "Claude crawls, Playwright generates tests, Chrome runs them — in minutes." },
  { icon: Shield, title: "Protect", desc: "Continuous monitoring with instant alerts whenever something breaks." },
  { icon: Wrench, title: "Fix", desc: "Self-healing AI diagnoses root cause and suggests an auto-fix." },
];

const HowItWorks = () => (
  <section className="py-24 border-t border-slate-100">
    <div className="max-w-5xl mx-auto px-6">
      <div className="text-center mb-16">
        <h2 className={`text-3xl md:text-4xl font-bold ${HEADING}`}>How Qarush works</h2>
        <p className={`mt-4 ${BODY} max-w-md mx-auto`}>From URL to production-grade monitoring in four simple steps.</p>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-slate-200 p-5 bg-white"
          >
            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center">
              <s.icon size={18} className={ACCENT} />
            </div>
            <p className="mt-4 text-xs font-mono text-slate-400">0{i + 1}</p>
            <h4 className={`mt-1 text-base font-semibold ${HEADING}`}>{s.title}</h4>
            <p className={`mt-2 text-sm ${BODY} leading-relaxed`}>{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- FAQ ---------- */
const faqs = [
  {
    q: "How do I pay for the Essentials or Premium plan?",
    a: "You can pay with a credit card or via net banking. We will renew your subscription automatically at the end of every billing cycle.",
  },
  { q: "Can I cancel my Essentials or Premium plan subscription at any time?", a: "Yes — cancel anytime from your billing settings. You'll keep access until the end of the current period." },
  { q: "We need to add new users to our team. How will that be billed?", a: "Additional seats are pro-rated and added to your next invoice." },
  { q: "My team wants to cancel its subscription. How do we do that? Can we get a refund?", a: "You can cancel from settings. Refunds are handled on a case-by-case basis for annual plans." },
  { q: "Do you offer discounts for non-profit organizations or educational institutions?", a: "Yes — reach out to our sales team and we'll get you set up with a discounted plan." },
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-24 border-t border-slate-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className={`text-3xl md:text-4xl font-bold text-center ${HEADING}`}>Frequently asked questions</h2>

        <div className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-lg border transition-colors ${
                  isOpen ? `${ACCENT_BORDER} bg-emerald-50/30` : "border-slate-200"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left"
                >
                  <span className={`text-sm font-medium ${isOpen ? ACCENT : HEADING}`}>{item.q}</span>
                  {isOpen ? <Minus size={16} className={ACCENT} /> : <Plus size={16} className="text-slate-400" />}
                </button>
                {isOpen && <p className={`px-5 pb-5 text-sm ${BODY} leading-relaxed`}>{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ---------- Contact ---------- */
const Contact = () => (
  <section className="py-24 border-t border-slate-100">
    <div className="max-w-3xl mx-auto px-6 text-center">
      <h2 className={`text-3xl md:text-4xl font-bold ${HEADING}`}>Still have a question?</h2>
      <p className={`mt-4 ${BODY} max-w-md mx-auto`}>
        If you cannot find answer to your question in our FAQ, you can always contact us. We will answer you shortly.
      </p>

      <div className="mt-12 grid sm:grid-cols-2 gap-5">
        {[
          { icon: Phone, title: "+1 (234) 786-5432", sub: "We are always happy to help." },
          { icon: Mail, title: "support@qarush.com", sub: "Alternative way to get answer faster." },
        ].map((c) => (
          <div key={c.title} className="rounded-xl border border-slate-200 p-8 hover:border-emerald-300 transition-colors">
            <div className="w-10 h-10 mx-auto rounded-lg bg-emerald-50 flex items-center justify-center">
              <c.icon size={18} className={ACCENT} />
            </div>
            <p className={`mt-4 font-semibold ${HEADING}`}>{c.title}</p>
            <p className={`mt-1 text-sm ${BODY}`}>{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------- Footer ---------- */
const footerCols = [
  { title: "Product", links: ["Features", "Pricing", "Documentation", "Changelog"] },
  { title: "Services", links: ["Monitoring", "AI Testing", "Auto-fix", "Alerts"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
  { title: "More", links: ["Documentation", "Support", "Privacy", "Terms"] },
];

const Footer = () => (
  <footer className="border-t border-slate-100 py-14">
    <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-5 gap-10">
      <div className="md:col-span-1">
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-md ${ACCENT_BG} flex items-center justify-center`}>
            <Zap size={14} className="text-white" />
          </div>
          <span className={`text-base font-semibold ${HEADING}`}>Qarush</span>
        </div>
        <p className={`mt-3 text-sm ${BODY}`}>AI testing designed to grow with you.</p>
      </div>

      {footerCols.map((col) => (
        <div key={col.title}>
          <h4 className={`text-sm font-semibold ${HEADING}`}>{col.title}</h4>
          <ul className="mt-4 space-y-2.5">
            {col.links.map((l) => (
              <li key={l}>
                <a href="#" className="text-sm text-slate-500 hover:text-slate-900 transition-colors">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="max-w-6xl mx-auto px-6 mt-12 pt-6 border-t border-slate-100 flex items-center justify-between">
      <p className="text-xs text-slate-400">© {new Date().getFullYear()} Qarush AI. All rights reserved.</p>
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Bell size={12} /> All systems operational
      </div>
    </div>
  </footer>
);

/* ---------- Page ---------- */
const Index = () => (
  <div className="min-h-screen bg-white text-slate-900 font-sans">
    <Navbar />
    <Hero />
    <Pricing />
    <Features />
    <HowItWorks />
    <FAQ />
    <Contact />
    <Footer />
  </div>
);

export default Index;
