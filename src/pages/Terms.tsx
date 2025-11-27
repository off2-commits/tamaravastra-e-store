import { Card, CardContent } from '@/components/ui/card';

export default function Terms() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                This website is operated by Tamaravastra. Throughout the site, the terms "we", "us" and "our" refer to Tamaravastra. Tamaravastra offers this website, including all information, tools and services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                By visiting our site and/ or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced herein and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/ or contributors of content.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Use of the Site</h2>
              <p className="text-muted-foreground leading-relaxed">
                By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature. A breach or violation of any of the Terms will result in an immediate termination of your Services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Products & Pricing</h2>
              <p className="text-muted-foreground leading-relaxed">
                Prices for our products are subject to change without notice. We reserve the right at any time to modify or discontinue the Service (or any part or content thereof) without notice at any time. We shall not be liable to you or to any third-party for any modification, price change, suspension or discontinuance of the Service.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We have made every effort to display as accurately as possible the colors and images of our products that appear at the store. We cannot guarantee that your computer monitor's display of any color will be accurate. All descriptions of products or product pricing are subject to change at anytime without notice, at the sole discretion of us. We reserve the right to discontinue any product at any time.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Accuracy of Billing and Account Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to refuse any order you place with us. We may, in our sole discretion, limit or cancel quantities purchased per person, per household or per order. These restrictions may include orders placed by or under the same customer account, the same credit card, and/or orders that use the same billing and/or shipping address. In the event that we make a change to or cancel an order, we may attempt to notify you by contacting the e-mail and/or billing address/phone number provided at the time the order was made.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Service and any separate agreements whereby we provide you Services shall be governed by and construed in accordance with the laws of India.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about the Terms of Service should be sent to us at <strong className="text-foreground">support@tamaravastra.store</strong>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}