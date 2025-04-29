
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function TermsOfService() {
  return (
    <>
      <Helmet>
        <title>Terms of Service - NeuralNextGen</title>
        <meta name="description" content="NeuralNextGen's terms of service outlining the rules, guidelines, and legal agreements between users and our platform." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-aiblue mb-6">Terms of Service</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to NeuralNextGen. These Terms of Service ("Terms") govern your use of our website, services, and products (collectively referred to as the "Services") operated by NeuralNextGen ("Company", "we", "us", or "our"). By accessing or using our Services, you agree to be bound by these Terms. If you disagree with any part of these Terms, you may not access the Services.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. Use of Services</h2>
              <p className="mb-4">
                By using our Services, you agree to:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">Use the Services in accordance with these Terms and applicable laws and regulations</li>
                <li className="mb-2">Provide accurate and complete information when creating an account or subscribing to our newsletter</li>
                <li className="mb-2">Be responsible for maintaining the security of your account and password</li>
                <li className="mb-2">Not use the Services for any illegal or unauthorized purpose</li>
                <li className="mb-2">Not attempt to interfere with or compromise the system integrity or security of the Services</li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. Intellectual Property</h2>
              <p className="mb-4">
                The Services and their original content, features, and functionality are and will remain the exclusive property of NeuralNextGen and its licensors. The Services are protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without our prior written consent.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. User Content</h2>
              <p className="mb-4">
                Our Services may allow you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material. By providing such content, you grant us the right to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through our Services. You retain any and all of your rights to any content you submit, post, or display on or through the Services.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. Termination</h2>
              <p className="mb-4">
                We may terminate or suspend your access to our Services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Upon termination, your right to use the Services will immediately cease.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. Limitation of Liability</h2>
              <p className="mb-4">
                In no event shall NeuralNextGen, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Services; (ii) any conduct or content of any third party on the Services; (iii) any content obtained from the Services; and (iv) unauthorized access, use, or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory, whether or not we have been informed of the possibility of such damage.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Disclaimer</h2>
              <p className="mb-4">
                Your use of the Services is at your sole risk. The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The Services are provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">8. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">9. Changes to Terms</h2>
              <p className="mb-4">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised Terms. If you do not agree to the new Terms, please stop using the Services.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
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
