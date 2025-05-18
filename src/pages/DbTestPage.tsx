
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DatabaseConnectionTest from '@/components/DatabaseConnectionTest';
import ApiRouteCheck from '@/components/ApiRouteCheck';

export default function DbTestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm">
        <Header />
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-gray-900">Database Connection Test</h1>
          
          <div className="space-y-8">
            <ApiRouteCheck />
            <DatabaseConnectionTest />
          </div>
          
          <div className="mt-12 p-6 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-bold mb-4">Common Troubleshooting Steps:</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check that API routes (<code>/api/health-check</code> and <code>/api/subscribe</code>) are correctly deployed</li>
              <li>Verify that PostgreSQL database credentials are correct</li>
              <li>Ensure the database server is accessible from the deployment environment</li>
              <li>Check that SSL is properly configured if required by the database</li>
              <li>Examine the browser console and network requests for detailed error messages</li>
            </ol>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
