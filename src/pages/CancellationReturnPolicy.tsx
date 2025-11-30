import { Card, CardContent } from '@/components/ui/card';

export default function CancellationReturnPolicy() {
    return (
        <div className="min-h-screen bg-background page-transition">
            <div className="container-custom py-12">
                <h1 className="text-4xl font-bold mb-6">Cancellation & Return Policy</h1>

                <Card className="shadow-lg">
                    <CardContent className="p-6 space-y-6">
                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Overview</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                At Tamaravastra, we strive to provide you with the finest quality ethnic sarees. We understand that sometimes plans change, which is why we have established clear policies for order cancellations and replacements. Please read this policy carefully to understand your rights and our procedures.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Order Cancellation Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                We allow order cancellations within a limited timeframe to ensure we can process your request before the order is prepared for shipment.
                            </p>

                            <div className="mt-4 space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">Cancellation Window</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Orders can be cancelled within <strong className="text-foreground">3-4 hours</strong> of placing the order. After this time window, the order enters our processing system and cannot be cancelled.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">How to Cancel Your Order</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-2">
                                        If you wish to cancel your order within the 3-4 hour window, please contact us immediately:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                        <li>Email: <strong className="text-foreground">support@tamaravastra.online</strong></li>
                                        <li>Phone: <strong className="text-foreground">9488069538</strong></li>
                                    </ul>
                                    <p className="text-muted-foreground leading-relaxed mt-3">
                                        Please provide your order number and registered phone number when contacting us for cancellation.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">Refund Process for Cancelled Orders</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        If your order is successfully cancelled within the allowed time window, a full refund will be processed to your original payment method within 5-7 business days. You will receive a confirmation email once the refund has been initiated.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">Late Cancellation Requests</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Cancellation requests made after the 3-4 hour window cannot be honored as the order will have already entered our fulfillment process. In such cases, please wait to receive the product and consider our replacement policy if applicable.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Return Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                <strong className="text-foreground">We do not accept returns</strong> on our products. This policy is in place due to the handcrafted, artisanal nature of our ethnic sarees and to maintain the highest standards of hygiene and quality for all our customers.
                            </p>
                            <p className="text-muted-foreground leading-relaxed mt-3">
                                Each saree is carefully sourced from trusted artisans and partner sellers, and many are unique pieces with slight variations that add to their authentic charm. We encourage you to review product descriptions, images, and size charts carefully before placing your order.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Replacement Policy</h2>
                            <p className="text-muted-foreground leading-relaxed">
                                While we do not accept returns, we are committed to ensuring you receive products of the highest quality. We offer replacements in cases where the product quality does not meet our standards.
                            </p>

                            <div className="mt-4 space-y-4">
                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">Eligibility for Replacement</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-2">
                                        Replacements are available only in the following circumstances:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                        <li>Manufacturing defects (e.g., faulty stitching, torn fabric, or significant quality issues)</li>
                                        <li>Damage during transit (e.g., product received in damaged condition)</li>
                                        <li>Material quality does not meet the standard described in the product listing</li>
                                        <li>Wrong item delivered (different product or color than ordered)</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">Replacement Request Timeline</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        Replacement requests must be raised within <strong className="text-foreground">3 days of the delivery date</strong>. Requests made after this period cannot be accommodated.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">Replacement Request Requirements</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-2">
                                        To ensure a smooth replacement process, please ensure:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                        <li>The item is unused and in the same condition as received</li>
                                        <li>The item is in its original packaging with all tags intact</li>
                                        <li>You have clear photographs showing the defect or damage</li>
                                        <li>You have your order number and delivery proof ready</li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium text-foreground mb-2">How to Request a Replacement</h3>
                                    <p className="text-muted-foreground leading-relaxed mb-2">
                                        To initiate a replacement request:
                                    </p>
                                    <ol className="list-decimal pl-6 space-y-2 text-muted-foreground">
                                        <li>Visit our <a href="/replacement-request" className="text-accent hover:underline font-medium">Replacement Request page</a></li>
                                        <li>Verify your phone number and select your order</li>
                                        <li>Upload clear photographs of the defect or damage</li>
                                        <li>Submit your request with a detailed description of the issue</li>
                                    </ol>
                                    <p className="text-muted-foreground leading-relaxed mt-3">
                                        Our support team will review your request within 24-48 hours and contact you with the next steps. If approved, a replacement item will be dispatched at no additional cost.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Exclusions</h2>
                            <p className="text-muted-foreground leading-relaxed mb-2">
                                The following situations are not eligible for replacement or refund:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                                <li>Minor color variations due to screen display differences or photography lighting</li>
                                <li>Slight variations in pattern, texture, or weave (these are normal for handcrafted items)</li>
                                <li>Change of mind or preference after receiving the product</li>
                                <li>Normal wear and tear after use</li>
                                <li>Damage caused by improper handling, washing, or care after delivery</li>
                                <li>Products that have been altered, washed, or worn</li>
                                <li>Requests made after the 3-day replacement window</li>
                                <li>Products purchased during clearance or final sale events (unless defective)</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Important Notes</h2>
                            <div className="space-y-3">
                                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                                    <h4 className="font-medium text-foreground mb-1">Handcrafted Variations</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Many of our sarees are handcrafted by skilled artisans. Slight variations in color, weave, and texture are inherent characteristics of handmade products and are not considered defects. These variations make each piece unique and authentic.
                                    </p>
                                </div>

                                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                                    <h4 className="font-medium text-foreground mb-1">Color Accuracy</h4>
                                    <p className="text-sm text-muted-foreground">
                                        We make every effort to display product colors accurately. However, actual colors may vary slightly from what you see on your screen due to device settings and lighting conditions.
                                    </p>
                                </div>

                                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                                    <h4 className="font-medium text-foreground mb-1">Quality Assurance</h4>
                                    <p className="text-sm text-muted-foreground">
                                        All our products undergo quality checks before dispatch. We work closely with our trusted partner sellers and artisans to ensure the highest standards.
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-xl font-semibold text-foreground mb-2">Contact Information</h2>
                            <p className="text-muted-foreground leading-relaxed mb-3">
                                If you have any questions or concerns about our Cancellation & Return Policy, please don't hesitate to reach out to us:
                            </p>
                            <div className="space-y-2">
                                <p className="text-muted-foreground">
                                    <strong className="text-foreground">Email:</strong> support@tamaravastra.online
                                </p>
                                <p className="text-muted-foreground">
                                    <strong className="text-foreground">Phone:</strong> 9488069538
                                </p>
                                <p className="text-muted-foreground">
                                    <strong className="text-foreground">Business Hours:</strong> Monday - Saturday, 10:00 AM - 6:00 PM IST
                                </p>
                            </div>
                        </section>

                        <section className="pt-4 border-t border-border/40">
                            <p className="text-sm text-muted-foreground italic">
                                This policy was last updated on November 30, 2025. We reserve the right to update or modify this policy at any time. Any changes will be posted on this page with an updated revision date.
                            </p>
                        </section>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
