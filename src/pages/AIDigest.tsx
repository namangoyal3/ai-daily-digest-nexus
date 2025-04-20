import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import ContentPreview from "@/components/ContentPreview";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import SubscriptionForm from "@/components/SubscriptionForm";
import Footer from "@/components/Footer";

interface AIDigestProps {
  isEditMode?: boolean;
}

export default function AIDigest({ isEditMode = false }: AIDigestProps) {
  return (
    <>
      <Helmet>
        <title>AI Daily Digest - NeuralNextGen</title>
        <meta name="description" content="Stay ahead with AI insights delivered daily. NeuralNextGen brings you curated AI news, breakthroughs, and analysis in a 5-minute daily read." />
      </Helmet>
      <Header />
      <main>
        <Hero isEditMode={isEditMode} />
        <Benefits />
        <ContentPreview />
        <Pricing />
        <FAQ />
        <SubscriptionForm />
      </main>
      <Footer />
      {isEditMode && <div className="fixed bottom-20 right-6 bg-black/80 text-white px-4 py-2 rounded text-sm">Edit mode active for AI Digest page</div>}
    </>
  );
}
