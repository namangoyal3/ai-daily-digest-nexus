
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - NeuralNextGen</title>
        <meta name="description" content="NeuralNextGen's privacy policy explaining how we collect, use, and protect your personal information." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-aiblue mb-6">Privacy Policy</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to NeuralNextGen ("Company", "we", "our", "us")! We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. The Data We Collect</h2>
              <p className="mb-4">
                We may collect, use, store and transfer different kinds of personal data about you including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Identity Data: includes first name, last name, username or similar identifier</li>
                <li className="mb-2">Contact Data: includes email address and telephone numbers</li>
                <li className="mb-2">Technical Data: includes internet protocol (IP) address, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website</li>
                <li className="mb-2">Usage Data: includes information about how you use our website, products, and services</li>
                <li className="mb-2">Marketing Data: includes your preferences in receiving marketing from us</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. How We Collect Your Personal Data</h2>
              <p className="mb-4">
                We use different methods to collect data from and about you including through:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Direct interactions: You may give us your Identity and Contact data by filling in forms or by corresponding with us</li>
                <li className="mb-2">Automated technologies: As you interact with our website, we may automatically collect Technical Data about your browsing actions and patterns</li>
                <li className="mb-2">Third parties: We may receive personal data about you from various third-party service providers</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. How We Use Your Personal Data</h2>
              <p className="mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Where we need to perform a contract we are about to enter into or have entered into with you</li>
                <li className="mb-2">Where it is necessary for our legitimate interests and your interests and fundamental rights do not override those interests</li>
                <li className="mb-2">Where we need to comply with a legal or regulatory obligation</li>
                <li className="mb-2">To provide you with information about our services and products</li>
                <li className="mb-2">To improve our website, products, and services</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Newsletter Subscription</h2>
              <p className="mb-4">
                When you subscribe to our newsletter, we collect your email address to send you updates, news, and information about our products and services. You can unsubscribe at any time using the link provided in each newsletter.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Data Security</h2>
              <p className="mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, or accessed in an unauthorized way. We limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Data Retention</h2>
              <p className="mb-4">
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Your Legal Rights</h2>
              <p className="mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Request access to your personal data</li>
                <li className="mb-2">Request correction of your personal data</li>
                <li className="mb-2">Request erasure of your personal data</li>
                <li className="mb-2">Object to processing of your personal data</li>
                <li className="mb-2">Request restriction of processing your personal data</li>
                <li className="mb-2">Request transfer of your personal data</li>
                <li className="mb-2">Right to withdraw consent</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Third-Party Links</h2>
              <p className="mb-4">
                This website may include links to third-party websites, plug-ins, and applications. Clicking on those links may allow third parties to collect or share data about you. We do not control these third-party websites and are not responsible for their privacy statements.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Changes to This Privacy Policy</h2>
              <p className="mb-4">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the "Last updated" date.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">11. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this privacy policy or our privacy practices, please contact us at:
              </p>
              <p className="mb-4">
                Email: support@neuralnextgen.com<br />
                Address: 123 AI Avenue, San Francisco, CA 94107<br />
                Phone: +1 (555) 123-4567
              </p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
