
import React, { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';

// Lazy load components
const CoursesHero = lazy(() => import('@/components/courses/CoursesHero'));
const Header = lazy(() => import('@/components/Header'));
const Footer = lazy(() => import('@/components/Footer'));

export default function AICourses() {
  return (
    <>
      <Helmet>
        <title>AI Courses & Training Programs | AI Daily Digest</title>
        <meta 
          name="description" 
          content="Master artificial intelligence with our comprehensive AI courses. Learn from industry experts and get practical experience in machine learning, deep learning, and AI applications."
        />
        <meta 
          name="keywords" 
          content="AI courses, artificial intelligence training, machine learning courses, deep learning tutorials, AI certification"
        />
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/poppins-v15-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/inter-v3-latin-regular.woff2" as="font" type="font/woff2" crossOrigin="" />
      </Helmet>

      <div className="min-h-screen">
        <Suspense fallback={<div className="h-16 bg-white"></div>}>
          <Header />
        </Suspense>
        
        <main>
          <Suspense fallback={<div className="h-[90vh] flex items-center justify-center">Loading courses...</div>}>
            <CoursesHero />
          </Suspense>
        </main>

        <Suspense fallback={<div className="h-20 bg-gray-100"></div>}>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}
