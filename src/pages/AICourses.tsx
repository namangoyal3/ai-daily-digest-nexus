import React from 'react';
import { Helmet } from 'react-helmet';
import CoursesHero from '@/components/courses/CoursesHero';

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
      </Helmet>

      <main className="min-h-screen">
        <CoursesHero />
        
      </main>
    </>
  );
}
