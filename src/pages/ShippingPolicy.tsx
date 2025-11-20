import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-6">Shipping Policy</h1>
        <Card>
          <CardHeader>
            <CardTitle>Information</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="timelines">
                <AccordionTrigger>Timelines</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Order processing: 1–2 business days.</li>
                    <li>Standard delivery: 3–7 business days depending on location.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="coverage">
                <AccordionTrigger>Coverage</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">We ship across India via trusted logistics partners. Delivery to remote areas may take longer.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="tracking">
                <AccordionTrigger>Tracking</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Once dispatched, you will receive a tracking number. You can also view it in your order details.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="fees">
                <AccordionTrigger>Shipping Fees</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Standard shipping is nominal or free as indicated at checkout. Any special handling charges will be shown before payment.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="damage">
                <AccordionTrigger>Damage in Transit</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">If your item arrives damaged, raise a replacement request within 3 days of delivery.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}