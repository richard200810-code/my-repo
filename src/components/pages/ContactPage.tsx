import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setSubmitSuccess(true);
    setFormData({ name: '', email: '', phone: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setSubmitSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
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
            Get in Touch
          </h1>
          <p className="font-paragraph text-lg text-primary max-w-2xl mx-auto">
            Have questions about our products? We're here to help you find the perfect hair extensions or wigs.
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
                Contact Information
              </h2>
              <p className="font-paragraph text-base text-primary leading-relaxed mb-8">
                Reach out to us through any of the following channels. Our team is ready to assist you with product inquiries, orders, or any questions you may have.
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
                    Email
                  </h3>
                  <p className="font-paragraph text-base text-primary/70">in.com</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-3 border border-buttonborder bg-buttonbackground">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-paragraph text-base text-primary font-semibold mb-1">
                    Phone
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
                    Address
                  </h3>
                  <p className="font-paragraph text-base text-primary/70">
                    123 Beauty Avenue<br />
                    Style City, SC 12345
                  </p>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="pt-8 border-t border-primary/10">
              <h3 className="font-heading text-xl text-primary mb-4">
                Business Hours
              </h3>
              <div className="space-y-2 font-paragraph text-base text-primary/70">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
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
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label htmlFor="email" className="font-paragraph text-base text-primary font-semibold">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label htmlFor="phone" className="font-paragraph text-base text-primary font-semibold">
                  Phone
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

              {/* Message */}
              <div className="space-y-2">
                <label htmlFor="message" className="font-paragraph text-base text-primary font-semibold">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-buttonborder bg-background text-primary font-paragraph text-base focus:outline-none focus:border-primary transition-colors resize-none"
                  placeholder="Tell us about your inquiry..."
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
                    Thank you for your message! We'll get back to you soon.
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
                  'Sending...'
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
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
