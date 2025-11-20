import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-muted-foreground">
              We source products from partner sellers and offer a nominal replacement facility in case of manufacturing
              defects or transit damage. We do not offer returns.
            </p>
            <Accordion type="single" collapsible>
              <AccordionItem value="eligibility">
                <AccordionTrigger>Eligibility</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Replacement requests must be raised within 3 days of delivery.</li>
                    <li>Applicable only for manufacturing defects or items damaged in transit.</li>
                    <li>Product must be unused, with original tags and packaging.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="process">
                <AccordionTrigger>Process</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Use the Request Replacement page to verify your phone and select the relevant order.</li>
                    <li>Upload photos of the defect/damage if requested by support.</li>
                    <li>Once approved, a replacement will be dispatched by the seller.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="exclusions">
                <AccordionTrigger>Exclusions</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-6 space-y-2 text-sm">
                    <li>Color variation due to display differences.</li>
                    <li>Minor weaving or handcraft variations inherent to artisanal products.</li>
                    <li>Damage due to improper handling after delivery.</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}