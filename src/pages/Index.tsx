
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ContentPreview from "@/components/ContentPreview";
import SubscriptionForm from "@/components/SubscriptionForm";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <Benefits />
        <ContentPreview />
        <Pricing />
        <SubscriptionForm />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
