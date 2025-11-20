import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent } from '@/components/ui/card';

export default function Terms() {
  const sections = [
    { id: 'use', title: 'Use of the Site', content: 'By using this website you agree to follow all applicable laws and our policies.' },
    { id: 'products', title: 'Products & Pricing', content: 'Product descriptions and pricing are subject to change. Variations are expected in handcrafted items.' },
    { id: 'orders', title: 'Orders', content: 'Orders are fulfilled by partner sellers. We reserve the right to cancel orders due to stock or verification issues.' },
    { id: 'liability', title: 'Liability', content: 'We are not liable for indirect or consequential damages. Our liability is limited to the value of the order.' },
    { id: 'law', title: 'Governing Law', content: 'These terms are governed by the laws of India.' },
  ];

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-6">Terms & Conditions</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <Card>
              <CardContent className="pt-6">
                <nav className="space-y-2">
                  {sections.map(s => (
                    <a key={s.id} href={`#${s.id}`} className="block text-sm text-muted-foreground hover:text-foreground transition-smooth">
                      {s.title}
                    </a>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </aside>
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <ScrollArea className="h-[600px]">
                  <div className="prose prose-slate max-w-none">
                    {sections.map(s => (
                      <section key={s.id} id={s.id} className="mb-6">
                        <h2>{s.title}</h2>
                        <p>{s.content}</p>
                      </section>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}