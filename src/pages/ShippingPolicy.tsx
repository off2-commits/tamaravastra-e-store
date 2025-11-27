import { Card, CardContent } from '@/components/ui/card';

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-6">Shipping Policy</h1>

        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Shipping Timelines</h2>
              <p className="text-muted-foreground leading-relaxed">
                We strive to process and ship all orders as quickly as possible. Most orders are processed within 1-2 business days of receipt. Once your order has been processed and dispatched, the estimated delivery time is between 3 to 7 business days, depending on your location and the courier service provider.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Please note that delivery times may vary during peak seasons, holidays, or due to unforeseen circumstances such as extreme weather conditions or logistical delays. We appreciate your patience and understanding in such situations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Shipping Coverage</h2>
              <p className="text-muted-foreground leading-relaxed">
                We currently ship to addresses across India. We partner with reputed logistics providers to ensure that your order reaches you safely and on time. Please ensure that you provide a complete and accurate shipping address, including the PIN code and a valid phone number, to avoid any delivery issues.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                At this time, we do not offer international shipping. However, we are constantly evaluating our shipping capabilities and may expand our reach in the future.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Order Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                Once your order has been dispatched, you will receive a confirmation email and/or SMS containing the tracking details. You can use the provided tracking number to monitor the status of your shipment on the courier partner's website.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                You can also view the status of your order by logging into your account on our website and visiting the "Order History" section.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Shipping Charges</h2>
              <p className="text-muted-foreground leading-relaxed">
                We offer free standard shipping on most orders. However, nominal shipping charges may apply to certain products or for delivery to specific remote locations. Any applicable shipping fees will be clearly calculated and displayed at the checkout page before you complete your payment.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Damaged or Lost Shipments</h2>
              <p className="text-muted-foreground leading-relaxed">
                In the rare event that your shipment arrives damaged or is lost in transit, please contact our customer support team immediately. If you receive a package that appears to be tampered with or damaged, please do not accept delivery and inform us right away.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                For damaged items, please refer to our Replacement Policy for instructions on how to request a replacement.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-2">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any further questions about our shipping policy or need assistance with your order, please feel free to contact us at <strong className="text-foreground">support@tamaravastra.store</strong>.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}