import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible>
              <AccordionItem value="data">
                <AccordionTrigger>Data Collected</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">We collect basic order and contact information to process your purchases and provide support.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="usage">
                <AccordionTrigger>Usage</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">Your data is used for order processing, delivery, and customer service. We do not sell your data.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="security">
                <AccordionTrigger>Security</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">We use secure services, including Supabase, to store order data. Access is restricted.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cookies">
                <AccordionTrigger>Cookies</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">We may use cookies to improve site experience. You can manage cookies via your browser settings.</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="contact">
                <AccordionTrigger>Contact</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground">For privacy requests, contact us via the Contact page.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}