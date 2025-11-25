import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            </p>
            <p>
              Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and information about how you interact with the Site. We refer to this automatically-collected information as "Device Information". When you make a purchase or attempt to make a purchase through the Site, we collect certain information from you, including your name, billing address, shipping address, payment information, email address, and phone number. We refer to this information as "Order Information".
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">How We Use Your Data</h2>
            <p className="mb-2">
              We use the Order Information that we collect generally to fulfill any orders placed through the Site (including processing your payment information, arranging for shipping, and providing you with invoices and/or order confirmations).
            </p>
            <p>
              Additionally, we use this Order Information to:
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Communicate with you;</li>
                <li>Screen our orders for potential risk or fraud; and</li>
                <li>When in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
              </ul>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Data Security</h2>
            <p>
              We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. We use secure third-party services, including Supabase for database management and secure payment gateways, to ensure your data is encrypted and stored safely. Access to your personal data is strictly restricted to authorized personnel only.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Cookies</h2>
            <p>
              We use cookies to maintain your session and preferences. Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the website that you visit and are stored on your computer's hard drive. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your computer.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-foreground mb-2">Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at <strong className="text-foreground">support@tamaravastra.online</strong> or by phone at <strong className="text-foreground">+91 9488069538</strong>.
            </p>
          </section>
        </CardContent >
      </Card >
    </div >
    </div >
  );
}