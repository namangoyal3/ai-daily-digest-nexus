
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DatabaseConnectionTest from '@/components/DatabaseConnectionTest';

export default function DbTestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <Header />
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12">
          <DatabaseConnectionTest />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
