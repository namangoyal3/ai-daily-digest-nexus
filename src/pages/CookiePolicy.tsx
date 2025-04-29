
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - NeuralNextGen</title>
        <meta name="description" content="NeuralNextGen's cookie policy explaining how we use cookies and similar technologies on our website." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30">
        <Header />
        <main className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 md:p-8 lg:p-10">
            <h1 className="text-3xl md:text-4xl font-bold text-aiblue mb-6">Cookie Policy</h1>
            
            <div className="prose max-w-none">
              <p className="text-gray-700 mb-4">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p className="mb-4">
                This Cookie Policy explains how NeuralNextGen ("Company", "we", "us", and "our") uses cookies and similar technologies to recognize you when you visit our website ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">2. What are Cookies?</h2>
              <p className="mb-4">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
              <p className="mb-4">
                Cookies set by the website owner (in this case, NeuralNextGen) are called "first-party cookies". Cookies set by parties other than the website owner are called "third-party cookies". Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">3. Why Do We Use Cookies?</h2>
              <p className="mb-4">
                We use first-party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. Third parties serve cookies through our Website for advertising, analytics, and other purposes.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">4. Types of Cookies We Use</h2>
              <p className="mb-4">
                The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li className="mb-2">
                  <strong>Essential Cookies:</strong> These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas.
                </li>
                <li className="mb-2">
                  <strong>Performance and Functionality Cookies:</strong> These cookies are used to enhance the performance and functionality of our Website but are non-essential to their use. However, without these cookies, certain functionality may become unavailable.
                </li>
                <li className="mb-2">
                  <strong>Analytics and Customization Cookies:</strong> These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
                </li>
                <li className="mb-2">
                  <strong>Advertising Cookies:</strong> These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
                </li>
                <li className="mb-2">
                  <strong>Social Media Cookies:</strong> These cookies are used to enable you to share pages and content that you find interesting on our Website through third-party social networking and other websites. These cookies may also be used for advertising purposes.
                </li>
              </ul>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">5. How Can You Control Cookies?</h2>
              <p className="mb-4">
                You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
              </p>
              <p className="mb-4">
                You can also set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted. As the means by which you can refuse cookies through your web browser controls vary from browser to browser, you should visit your browser's help menu for more information.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">6. How Often Will We Update This Cookie Policy?</h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore re-visit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
              </p>
              <p className="mb-4">
                The date at the top of this Cookie Policy indicates when it was last updated.
              </p>
              
              <h2 className="text-xl font-semibold mt-8 mb-4">7. Where Can You Get Further Information?</h2>
              <p className="mb-4">
                If you have any questions about our use of cookies or other technologies, please contact us at:
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
