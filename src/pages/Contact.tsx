import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder submit handler; integrate with backend later
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background page-transition">
      <div className="container-custom py-12">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" name="email" type="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" name="subject" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" name="message" value={form.message} onChange={handleChange} required rows={6} />
                  </div>
                  <Button type="submit" className="bg-accent text-accent-foreground">Send Message</Button>
                  {submitted && (
                    <p className="text-sm text-green-700">Thanks! We received your message and will respond soon.</p>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-2">Customer Service</h2>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>Hours: Mon–Sat, 10:00–18:00 IST</li>
                  <li>Response time: within 24–48 hours</li>
                  <li>Email: support@tamaravastra.online</li>
                  <li>Phone: +91 9488069538</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}