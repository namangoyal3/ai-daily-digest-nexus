
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

interface ParentLandingProps {
  isEditMode?: boolean;
}

export default function ParentLanding({ isEditMode = false }: ParentLandingProps) {
  return (
    <>
      <Helmet>
        <title>NeuralNextGen - AI Daily Digest</title>
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
    </>
  );
}
