
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoogleSheetsSetup from '@/components/GoogleSheetsSetup';
import { Helmet } from 'react-helmet';

export default function GoogleSheetsIntegration() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Google Sheets Integration - AI Digest</title>
        <meta name="description" content="Connect your newsletter to Google Sheets" />
      </Helmet>
      
      <header className="bg-white shadow-sm">
        <Header />
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Google Sheets Integration</h1>
          
          <div className="space-y-8">
            <GoogleSheetsSetup />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
