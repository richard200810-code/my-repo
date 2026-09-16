import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
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
                Premium hair extensions crafted for elegance and confidence
              </p>
            </div>
            
            <p className="font-paragraph text-lg text-secondary/70 leading-relaxed max-w-md">
              Experience the transformation with our curated collection of human and premium synthetic hair extensions. Each strand is selected for quality, durability, and natural beauty.
            </p>
            
            <Link
              to="/products"
              className="inline-block px-8 py-4 bg-primary text-primary-foreground font-paragraph font-semibold rounded-lg hover:bg-secondary transition-colors duration-300"
            >
              Shop Collection
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-background rounded-lg overflow-hidden aspect-square">
              <Image
                src="https://static.wixstatic.com/media/37e681_4272dcd4eeb3410a96669df2b1b3418f~mv2.png?originWidth=576&originHeight=576"
                alt="Premium hair extensions showcase"
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-20 bg-secondary/5">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl text-primary mb-4">Why Luxe Strands</h2>
          <p className="font-paragraph text-lg text-secondary/70 max-w-2xl mx-auto">
            We're committed to providing the highest quality hair extensions with exceptional customer service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Premium Quality",
              description: "100% human hair and premium synthetic options, carefully selected for durability and natural appearance"
            },
            {
              title: "Expert Application",
              description: "Multiple application methods including Tape-in, K-tip, and Clip-in for your convenience"
            },
            {
              title: "Lifetime Support",
              description: "Detailed care instructions and customer support to ensure your extensions last"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-lg border border-background"
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
          <h2 className="font-heading text-5xl text-primary mb-4">Featured Collection</h2>
          <p className="font-paragraph text-lg text-secondary/70">
            Discover our most popular hair extension styles
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              name: "Tape-In Extensions",
              image: "https://static.wixstatic.com/media/37e681_a173bdda04d647dc8dd59b1b85f95d5f~mv2.png?originWidth=384&originHeight=384",
              description: "Seamless, lightweight application method"
            },
            {
              name: "K-Tip Extensions",
              image: "https://static.wixstatic.com/media/37e681_55613b01249949c7af094b2a82828985~mv2.png?originWidth=384&originHeight=384",
              description: "Durable keratin-bonded extensions"
            },
            {
              name: "Clip-In Extensions",
              image: "https://static.wixstatic.com/media/37e681_247244dd6d8240159aca55e91e8cab7a~mv2.png?originWidth=384&originHeight=384",
              description: "Temporary, damage-free styling"
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
              <div className="bg-background rounded-lg overflow-hidden mb-4 aspect-square">
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
            View All Products
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-20 bg-primary text-primary-foreground rounded-lg">
        <div className="text-center space-y-6">
          <h2 className="font-heading text-5xl">Ready to Transform?</h2>
          <p className="font-paragraph text-lg max-w-2xl mx-auto opacity-90">
            Join thousands of satisfied customers who've discovered their confidence with Luxe Strands
          </p>
          <Link
            to="/products"
            className="inline-block px-8 py-4 bg-primary-foreground text-primary font-paragraph font-semibold rounded-lg hover:bg-background transition-colors duration-300"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
