import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">About Us</h1>

        {/* Company History & Mission */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Tamaravastra was born from a passion for timeless craftsmanship and the rich textile heritage of India. From the vivid sheen of pure silk to the gentle comfort of cotton, we curate sarees that honor tradition while embracing modern design. Our mission is to bring authentic, high-quality garments to discerning customers around the world, celebrating the artisans whose skill and dedication make each piece unique. We work closely with trusted weavers, maintain transparent sourcing, and prioritize thoughtful design, ensuring every saree tells a story of care, culture, and elegance. As we grow, we remain committed to ethical practices, fair trade partnerships, and a seamless shopping experience that respects your time and values.
                </p>
              </CardContent>
            </Card>
          </div>
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold mb-4">Mission</h2>
                <p className="text-muted-foreground leading-relaxed text-base">
                  Preserve heritage, elevate quality, and deliver joy through thoughtfully curated sarees.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Product Philosophy & Quality Standards */}
        <section className="mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Our Product Philosophy</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
                <li className="p-4 bg-secondary rounded-lg">Authentic fabrics and traditional weaving techniques.</li>
                <li className="p-4 bg-secondary rounded-lg">Rigorous quality checks for fabric, dyes, and finish.</li>
                <li className="p-4 bg-secondary rounded-lg">Ethical sourcing and fair compensation for artisans.</li>
                <li className="p-4 bg-secondary rounded-lg">Designs that balance elegance, comfort, and longevity.</li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Team Introduction removed as requested */}
      </div>
    </div>
  );
}