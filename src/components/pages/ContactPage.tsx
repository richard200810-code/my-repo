import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd send this to a backend
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Page Header */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <h1 className="font-heading text-5xl md:text-6xl text-primary mb-4">Get in Touch</h1>
        <p className="font-paragraph text-lg text-secondary/70 max-w-2xl">
          Have questions about our products? We're here to help. Reach out to our team anytime.
        </p>
      </section>

      {/* Contact Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl text-primary mb-6">Información de Contacto</h2>
              <p className="font-paragraph text-secondary/70 mb-8">
                Ya sea que tengas preguntas sobre nuestras extensiones de cabello, necesites consejos de estilo o desees hacer un pedido al por mayor, nuestro equipo está listo para ayudarte.
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-primary mb-1">Correo Electrónico</h3>
                  <a href="mailto:hello@luxestrands.com" className="font-paragraph text-secondary/70 hover:text-primary transition-colors">
                    hello@luxestrands.com
                  </a>
                  <p className="font-paragraph text-sm text-secondary/50 mt-1">
                    Responderemos dentro de 24 horas
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-primary mb-1">Teléfono</h3>
                  <a href="tel:+1234567890" className="font-paragraph text-secondary/70 hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                  <p className="font-paragraph text-sm text-secondary/50 mt-1">
                    Lun - Vie, 9am - 6pm EST
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-lg text-primary mb-1">Dirección</h3>
                  <p className="font-paragraph text-secondary/70">
                    123 Fashion Avenue<br />
                    New York, NY 10001<br />
                    Estados Unidos
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Quick Links */}
            <div className="bg-background/20 rounded-lg p-6">
              <h3 className="font-heading text-lg text-primary mb-4">Ayuda Rápida</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="font-paragraph text-secondary/70 hover:text-primary transition-colors">
                    → Envío y Devoluciones
                  </a>
                </li>
                <li>
                  <a href="#" className="font-paragraph text-secondary/70 hover:text-primary transition-colors">
                    → Guía de Cuidado del Cabello
                  </a>
                </li>
                <li>
                  <a href="#" className="font-paragraph text-secondary/70 hover:text-primary transition-colors">
                    → Métodos de Aplicación
                  </a>
                </li>
                <li>
                  <a href="#" className="font-paragraph text-secondary/70 hover:text-primary transition-colors">
                    → Pedidos al Por Mayor
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="bg-background/10 rounded-lg p-8 space-y-6">
              <div>
                <label htmlFor="name" className="block font-paragraph text-sm font-semibold text-primary mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-background rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block font-paragraph text-sm font-semibold text-primary mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-background rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="tu@correo.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block font-paragraph text-sm font-semibold text-primary mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-background rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="¿Cómo podemos ayudarte?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block font-paragraph text-sm font-semibold text-primary mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-background rounded-lg font-paragraph text-secondary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="Cuéntanos más sobre tu consulta..."
                />
              </div>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <p className="font-paragraph text-green-800">
                    ✓ ¡Gracias! Hemos recibido tu mensaje y nos pondremos en contacto pronto.
                  </p>
                </motion.div>
              )}

              <button
                type="submit"
                className="w-full px-6 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Enviar Mensaje
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
