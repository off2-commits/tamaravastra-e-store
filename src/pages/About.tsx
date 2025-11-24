import { Card, CardContent } from '@/components/ui/card';
import { LazyReveal } from '@/components/LazyReveal';
import { Search, ShieldCheck, HeartHandshake, Gem } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-background page-transition">
      {/* Hero Section */}
      <section className="relative py-24 bg-secondary overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-primary font-serif">Our Story</h1>
          <div className="w-24 h-1 bg-accent mx-auto mb-8" />
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-light leading-relaxed">
            Curating the timeless elegance of India's textile heritage for the modern connoisseur.
          </p>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Introduction */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <LazyReveal>
                <img
                  src="https://images.unsplash.com/photo-1606293926075-69a00dbfde81?q=80&w=1000&auto=format&fit=crop"
                  alt="Saree Texture"
                  className="rounded-lg shadow-xl w-full h-[500px] object-cover"
                />
              </LazyReveal>
            </div>
            <div className="order-1 lg:order-2">
              <LazyReveal>
                <h2 className="text-3xl font-bold mb-6 text-primary">A Passion for Authenticity</h2>
                <p className="text-muted-foreground leading-relaxed text-lg mb-6">
                  Tamaravastra was born not from a loom, but from a deep-seated appreciation for the artistry that goes into creating one. We are not weavers; we are admirers, collectors, and curators. Our journey began with a simple realization: the true beauty of Indian textiles lies in their diversity and the stories they carry.
                </p>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  We traverse the length and breadth of India to identify and partner with master artisans and heritage weaving clusters. Our role is to select the finest examples of their craft—pieces that speak of tradition, skill, and uncompromising quality—and bring them to a platform where they can be cherished by you.
                </p>
              </LazyReveal>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center text-primary">Our Philosophy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Search className="w-12 h-12 text-accent mb-4" />,
                title: "Meticulous Curation",
                desc: "We don't just sell sarees; we curate collections. Every piece is handpicked for its design, fabric quality, and authenticity, ensuring it meets our high standards of elegance."
              },
              {
                icon: <HeartHandshake className="w-12 h-12 text-accent mb-4" />,
                title: "Ethical Partnerships",
                desc: "We believe in fair trade. By sourcing directly from weaving communities and respected cooperatives, we ensure that the artisans receive fair value for their exceptional skill."
              },
              {
                icon: <Gem className="w-12 h-12 text-accent mb-4" />,
                title: "Uncompromising Quality",
                desc: "Our promise is authenticity. We verify the origin and material of every saree, so you can trust that you are investing in a genuine piece of heritage."
              }
            ].map((item, i) => (
              <LazyReveal key={i}>
                <Card className="h-full border-none shadow-md bg-secondary/30 hover:bg-secondary/50 transition-colors">
                  <CardContent className="p-8 text-center flex flex-col items-center h-full">
                    {item.icon}
                    <h3 className="text-xl font-bold mb-3 text-primary">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </LazyReveal>
            ))}
          </div>
        </section>

        {/* The Curation Process */}
        <section className="mb-12 bg-primary/5 rounded-2xl p-8 md:p-16">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">The Curation Process</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Our selection process is rigorous. We look for the distinct signature of the region—be it the geometric precision of a Pochampally or the opulent zari of a Kanjivaram. We examine the fabric's weight, the dye's richness, and the weave's density. Only when a saree passes our scrutiny for aesthetics and quality does it find a place in the Tamaravastra collection.
            </p>
            <p className="text-lg font-serif italic text-primary">
              "We don't make the saree. We make sure it finds the one who deserves to wear it."
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}