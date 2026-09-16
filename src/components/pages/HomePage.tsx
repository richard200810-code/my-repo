import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-24 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h1 className="font-heading text-6xl md:text-7xl text-primary mb-4 leading-tight">
                Luxe Strands
              </h1>
              <p className="font-paragraph text-xl text-secondary/80">
                Extensiones de cabello premium elaboradas para elegancia y confianza
              </p>
            </div>
            
            <p className="font-paragraph text-lg text-secondary/70 leading-relaxed max-w-md">
              Experimenta la transformación con nuestra colección seleccionada de extensiones de cabello humano y sintético premium. Cada hebra se selecciona por calidad, durabilidad y belleza natural.
            </p>
            
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors duration-300"
            >
              Ver Colección
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-lg overflow-hidden aspect-square shadow-sm">
              <Image
                src="https://static.wixstatic.com/media/37e681_4272dcd4eeb3410a96669df2b1b3418f~mv2.png?originWidth=576&originHeight=576"
                alt="Escaparate de extensiones de cabello premium"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl text-primary mb-4">Por Qué Luxe Strands</h2>
          <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
            Nos comprometemos a proporcionar extensiones de cabello de la más alta calidad con servicio al cliente excepcional
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Calidad Premium",
              description: "Cabello 100% humano y opciones sintéticas premium, cuidadosamente seleccionadas por durabilidad y apariencia natural"
            },
            {
              title: "Aplicación Experta",
              description: "Múltiples métodos de aplicación incluyendo Tape-in, K-tip y Clip-in para tu conveniencia"
            },
            {
              title: "Soporte de por Vida",
              description: "Instrucciones detalladas de cuidado y soporte al cliente para asegurar que tus extensiones duren"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg border border-background/30"
            >
              <h3 className="font-heading text-2xl text-primary mb-3">{item.title}</h3>
              <p className="font-paragraph text-secondary/70">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl text-primary mb-4">Colección Destacada</h2>
          <p className="font-paragraph text-lg text-secondary/70">
            Descubre nuestros estilos de extensiones de cabello más populares
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Extensiones Tape-In",
              image: "https://static.wixstatic.com/media/37e681_a173bdda04d647dc8dd59b1b85f95d5f~mv2.png?originWidth=384&originHeight=384",
              description: "Método de aplicación sin costuras y ligero"
            },
            {
              name: "Extensiones K-Tip",
              image: "https://static.wixstatic.com/media/37e681_55613b01249949c7af094b2a82828985~mv2.png?originWidth=384&originHeight=384",
              description: "Extensiones duraderas unidas con queratina"
            },
            {
              name: "Extensiones Clip-In",
              image: "https://static.wixstatic.com/media/37e681_247244dd6d8240159aca55e91e8cab7a~mv2.png?originWidth=384&originHeight=384",
              description: "Peinado temporal sin daño"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-lg overflow-hidden mb-4 aspect-square">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-heading text-2xl text-primary mb-2">{item.name}</h3>
              <p className="font-paragraph text-secondary/70">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block px-8 py-4 border-2 border-primary text-primary font-paragraph font-semibold rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors duration-300"
          >
            Ver Todos los Productos
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-20 bg-primary text-primary-foreground rounded-lg">
        <div className="text-center space-y-6">
          <h2 className="font-heading text-5xl">¿Listo para Transformarte?</h2>
          <p className="font-paragraph text-lg max-w-2xl mx-auto opacity-90">
            Únete a miles de clientes satisfechos que han descubierto su confianza con Luxe Strands
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-primary-foreground text-primary font-paragraph font-semibold rounded-lg hover:bg-white transition-colors duration-300"
          >
            Comenzar a Comprar
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
