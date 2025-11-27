import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function ReplacementPolicy() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-4xl font-bold">Replacement Policy</h1>
          <Link to="/replacement-request"><Button variant="outline">Request Replacement</Button></Link>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
              <p className="text-muted-foreground leading-relaxed">
                At Tamaravastra, we take pride in the quality of our products. We source our products from trusted partner sellers and artisans. While we do not offer a general return policy, we do provide a replacement facility in specific cases such as manufacturing defects or damage during transit.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Please note that due to the handcrafted nature of many of our products, slight variations in color, texture, and weave are to be expected and are not considered defects. These variations add to the unique charm and authenticity of the product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Eligibility for Replacement</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be eligible for a replacement, your request must meet the following criteria:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>The replacement request must be raised within 3 days of the delivery date.</li>
                <li>The item must be unused and in the same condition that you received it.</li>
                <li>The item must be in the original packaging with all tags intact.</li>
                <li>The request must be for a manufacturing defect or for an item that was damaged in transit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Replacement Process</h2>
              <p className="text-muted-foreground leading-relaxed">
                To initiate a replacement, please use the "Request Replacement" button on this page or navigate to the Replacement Request page. You will need to verify your phone number and select the relevant order.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You may be asked to upload clear photographs of the defect or damage. Our support team will review your request and, if approved, will arrange for the replacement item to be dispatched by the seller. We will keep you updated on the status of your request via email or SMS.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Exclusions</h2>
              <p className="text-muted-foreground leading-relaxed">
                The following situations are not covered under our replacement policy:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                <li>Minor color variations due to screen display differences.</li>
                <li>Normal wear and tear.</li>
                <li>Damage caused by improper handling, washing, or care after delivery.</li>
                <li>Requests made after the 3-day window has expired.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions regarding our replacement policy, please contact us at <strong className="text-foreground">support@tamaravastra.store</strong>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}