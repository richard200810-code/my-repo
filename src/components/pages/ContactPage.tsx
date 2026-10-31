import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send, AlertCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Customers } from '@/entities';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    businessType: '',
    helpOptions: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const submissionTime = new Date();
      
      // 1. Save to customers collection
      const customerData: Customers = {
        _id: crypto.randomUUID(),
        companyName: 'Contact Form Submission',
        contactPerson: formData.name,
        email: formData.email,
        phoneNumber: formData.phone,
        notes: formData.message,
        businessType: formData.businessType,
        helpOptions: formData.helpOptions.join(', '),
        source: 'Contact Form',
        customerType: 'Lead',
        salesStage: 'New Inquiry',
        createdBy: 'Contact Form',
        _createdDate: submissionTime,
      };

      await BaseCrudService.create<Customers>('customers', customerData);

      // 2. Send email notification to Richard200810@gmail.com
      // Using Wix Automations: This would be triggered by a database event
      // The automation should be configured in Wix Dashboard to:
      // - Listen for new items in 'customers' collection
      // - Send email to Richard200810@gmail.com with form details
      // See IMPLEMENTATION NOTES below for setup instructions

      // 3. Send WhatsApp notification to +52 55 3955 5886
      // This requires Wix WhatsApp Business integration
      // See IMPLEMENTATION NOTES below for setup instructions

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', message: '', businessType: '', helpOptions: [] });

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Error al enviar el formulario. Por favor, intenta de nuevo.'
      );
      
      // Reset error after 5 seconds
      setTimeout(() => setSubmitError(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      helpOptions: checked
        ? [...prev.helpOptions, name]
        : prev.helpOptions.filter(option => option !== name)
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="w-full max-w-[100rem] mx-auto px-8 md:px-16 lg:px-24 py-16">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-heading text-5xl md:text-6xl text-primary mb-6">
            Ponte en contacto
          </h1>
          <p className="font-paragraph text-lg text-primary max-w-2xl mx-auto">
            ¿Tienes preguntas sobre nuestros productos? Estamos aquí para ayudarte a encontrar las extensiones de cabello o pelucas perfectas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 className="font-heading text-3xl text-primary mb-6">
                Información de contacto
              </h2>
              <p className="font-paragraph text-base text-primary leading-relaxed mb-8">
                Comunícate con nosotros a través de cualquiera de los siguientes canales. Nuestro equipo está listo para asistirte con consultas de productos, pedidos o cualquier pregunta que tengas.
              </p>
            </div>

            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder bg-buttonbackground">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-paragraph text-base text-primary font-semibold mb-1">
                    Correo electrónico
                  </h3>
                  <p className="font-paragraph text-base text-primary/70">richard200810@gmail.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder bg-buttonbackground">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-paragraph text-base text-primary font-semibold mb-1">
                    Tel / WhatsApp:
                  </h3>
                  <p className="font-paragraph text-base text-primary/70">+52 (55) 3955 5886</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder bg-buttonbackground">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-paragraph text-base text-primary font-semibold mb-1">
                    Dirección
                  </h3>
                  <p className="font-paragraph text-base text-primary/70">CDMX / GDL / MTY</p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="pt-8 border-t border-primary/10">
              <h3 className="font-heading text-xl text-primary mb-4">
                Horario de atención
              </h3>
              <div className="space-y-2 font-paragraph text-base text-primary/70">
                <p>Lunes - Viernes: 9:00 AM - 6:00 PM</p>
                <p>Sábado: 10:00 AM - 4:00 PM</p>
                <p>Domingo: Cerrado</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <label htmlFor="name" className="font-paragraph text-base text-primary font-semibold">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-paragraph text-base text-primary font-semibold">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="tu.correo@ejemplo.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="font-paragraph text-base text-primary font-semibold">
                  Tel / WhatsApp:
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Business Type Dropdown */}
              <div className="space-y-2">
                <label htmlFor="businessType" className="font-paragraph text-base text-primary font-semibold">
                  ¿Qué tipo de negocio de cabello tienes? *
                </label>
                <select
                  id="businessType"
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Dueño/a de salón">Dueño/a de salón</option>
                  <option value="Estilista">Estilista</option>
                  <option value="Tienda en línea">Tienda en línea</option>
                  <option value="Distribuidor/a">Distribuidor/a</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>

              {/* Help Options Checkboxes */}
              <div className="space-y-3">
                <label className="font-paragraph text-base text-primary font-semibold block">
                  ¿Cómo podemos ayudarte? *
                </label>
                <div className="space-y-2">
                  {['Muestra', 'Cotización mayorista', 'Matching de color', 'Cabello personalizado', 'Empaque personalizado', 'Otro'].map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option}
                        name={option}
                        checked={formData.helpOptions.includes(option)}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 border border-buttonborder bg-background text-primary cursor-pointer"
                      />
                      <label htmlFor={option} className="ml-3 font-paragraph text-base text-primary cursor-pointer">
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* ... keep existing code (Message field and below) */}

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="font-paragraph text-base text-primary font-semibold">
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Cuéntanos sobre tu consulta..."
                />
              </div>

              {/* Success Message */}
              {submitSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-primary/20 bg-buttonbackground"
                >
                  <p className="font-paragraph text-base text-primary">
                    ¡Gracias por tu mensaje! Nos pondremos en contacto pronto.
                  </p>
                </motion.div>
              )}

              {/* Error Message */}
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border border-destructive/20 bg-destructive/10 flex gap-3"
                >
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="font-paragraph text-base text-destructive">
                    {submitError}
                  </p>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 border-2 border-buttonborder bg-buttonbackground text-primary font-paragraph text-base hover:bg-primary hover:text-primary-foreground transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  'Enviando...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Enviar mensaje
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
