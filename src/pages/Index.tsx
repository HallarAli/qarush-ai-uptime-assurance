import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import HowItWorks from "@/components/landing/HowItWorks";
import FeaturesSection from "@/components/landing/FeaturesSection";
import DashboardPreview from "@/components/landing/DashboardPreview";
import ReportTypes from "@/components/landing/ReportTypes";
import TargetUsers from "@/components/landing/TargetUsers";
import PricingSection from "@/components/landing/PricingSection";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <HeroSection />
    <ProblemSection />
    <HowItWorks />
    <FeaturesSection />
    <DashboardPreview />
    <ReportTypes />
    <TargetUsers />
    <PricingSection />
    <FinalCTA />
    <Footer />
  </div>
);

export default Index;
