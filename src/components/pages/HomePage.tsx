// HPI 1.7-V
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView, MotionValue } from 'framer-motion';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ArrowRight, Star, Sparkles, Heart } from 'lucide-react';

// --- Utility Components for Motion & Layout ---

const ParallaxImage = ({ src, alt, className, speed = 0.1 }: { src: string; alt: string; className?: string; speed?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-[120%] -mt-[10%]">
        <Image
          src={src}
          alt={alt}
          width={800}
          className="w-full h-full object-cover"
        />
      </motion.div>
    </div>
  );
};

const RevealText = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SectionDivider = () => (
  <div className="w-full flex justify-center py-12">
    <div className="h-24 w-px bg-primary/20" />
  </div>
);

// --- Main Page Component ---

export default function HomePage() {
  // Canonical Data Sources (Preserved from original code)
  const features = [
    {
      title: 'Premium Quality',
      description: 'Sourced from the finest materials, each piece is crafted to perfection for lasting beauty and durability.',
      icon: Star
    },
    {
      title: 'Natural Look',
      description: 'Seamlessly blend with your natural hair for an authentic, undetectable appearance that enhances your style.',
      icon: Sparkles
    },
    {
      title: 'Expert Guidance',
      description: 'Our team provides personalized recommendations to help you find the perfect match for your needs.',
      icon: Heart
    }
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-primary selection:bg-primary selection:text-background overflow-clip">
      <Header />

      {/* --- HERO SECTION: Inspired by "Crafting Style" Image --- */}
      {/* Layout: Massive Headline Top, 3-Column Grid Bottom */}
      <section className="relative w-full pt-32 pb-20 px-6 md:px-12 lg:px-20 max-w-[120rem] mx-auto min-h-screen flex flex-col justify-center">
        
        {/* 1. Massive Headline */}
        <div className="w-full mb-16 md:mb-24 relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[15vw] md:text-[13vw] leading-[0.8] text-center md:text-left tracking-tighter text-primary w-full"
          >
            ELEVATE <span className="italic font-light block md:inline">YOUR</span> BEAUTY
          </motion.h1>
        </div>

        {/* 2. The Triad Grid (Text - Image - Image) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          
          {/* Column 1: Narrative & CTA (Spans 4 cols) */}
          <div className="md:col-span-4 flex flex-col justify-between h-full pt-4 md:pt-12">
            <RevealText delay={0.2} className="space-y-8">
              <div className="w-12 h-px bg-primary mb-8" />
              <p className="font-paragraph text-xl md:text-2xl leading-relaxed max-w-md">
                Step into a world of premium hair extensions and wigs where tradition meets innovation. 
                Discover pieces where quality meets artistry.
              </p>
              <div className="pt-8">
                <Link
                  to="/products"
                  className="group relative inline-flex items-center justify-center px-8 py-4 border border-primary overflow-hidden transition-all duration-300 hover:bg-primary"
                >
                  <span className="relative z-10 font-paragraph text-lg group-hover:text-background transition-colors duration-300">
                    Explore Collection
                  </span>
                </Link>
              </div>
            </RevealText>
          </div>

          {/* Column 2: Center Image (Spans 4 cols) */}
          <div className="md:col-span-4 relative mt-12 md:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
              className="aspect-[3/4] w-full relative overflow-hidden"
            >
               <ParallaxImage 
                src="https://static.wixstatic.com/media/37e681_2270ccbe0fcb4fa58005304334a96411~mv2.png?originWidth=768&originHeight=1024"
                alt="Premium texture detail"
                className="w-full h-full"
                speed={0.05}
               />
            </motion.div>
            <div className="absolute -bottom-6 -right-6 font-heading text-6xl opacity-10 pointer-events-none">01</div>
          </div>

          {/* Column 3: Right Image (Spans 4 cols, Offset Down) */}
          <div className="md:col-span-4 relative mt-0 md:mt-32">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
              className="aspect-[3/4] w-full relative overflow-hidden"
            >
              <ParallaxImage 
                src="https://static.wixstatic.com/media/37e681_14585b69cb6048b4a0fb0c88e96fe698~mv2.png?originWidth=768&originHeight=1024"
                alt="Model wearing luxury wig"
                className="w-full h-full"
                speed={0.15}
               />
            </motion.div>
            <div className="absolute -top-6 -left-6 font-heading text-6xl opacity-10 pointer-events-none">02</div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* --- SECTION 2: STICKY NARRATIVE --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          
          {/* Sticky Left Content */}
          <div className="hidden lg:block relative h-full">
            <div className="sticky top-32 space-y-12">
              <h2 className="font-heading text-6xl md:text-7xl leading-none">
                The Art of <br/> Transformation
              </h2>
              <p className="font-paragraph text-xl max-w-md leading-relaxed text-primary/80">
                Our collection is more than just hair; it is an expression of identity. 
                We curate textures that speak to the soul and styles that empower your presence.
              </p>
              <ul className="space-y-4 font-paragraph text-lg">
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Ethically Sourced
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Hand-Crafted Precision
                </li>
                <li className="flex items-center gap-4">
                  <span className="w-2 h-2 bg-primary rounded-full" />
                  Unmatched Longevity
                </li>
              </ul>
              <Link to="/products" className="inline-flex items-center gap-2 border-b border-primary pb-1 hover:opacity-60 transition-opacity">
                Read Our Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Scrolling Right Content (Mobile: Stacked) */}
          <div className="space-y-24 lg:space-y-40">
            {/* Mobile Title (Visible only on small screens) */}
            <div className="lg:hidden mb-12">
               <h2 className="font-heading text-5xl leading-none mb-6">The Art of Transformation</h2>
               <p className="font-paragraph text-lg">Our collection is more than just hair; it is an expression of identity.</p>
            </div>

            <div className="group">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <Image 
                  src="https://static.wixstatic.com/media/37e681_3dbc4c8d9a494f8a8fbe0138857f89d9~mv2.png?originWidth=768&originHeight=960"
                  alt="Silky straight texture"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-heading text-3xl">Silky Straight</h3>
              <p className="font-paragraph text-sm mt-2 opacity-70">The epitome of sleek elegance.</p>
            </div>

            <div className="group pl-0 lg:pl-20">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <Image 
                  src="https://static.wixstatic.com/media/37e681_c14f7f90f0c749f5b6e73a4f169e9ac8~mv2.png?originWidth=768&originHeight=960"
                  alt="Deep wave texture"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-heading text-3xl">Deep Wave</h3>
              <p className="font-paragraph text-sm mt-2 opacity-70">Voluminous, ocean-like waves.</p>
            </div>

            <div className="group">
              <div className="aspect-[4/5] overflow-hidden mb-6">
                <Image 
                  src="https://static.wixstatic.com/media/37e681_09cefe7d4f2d4d5c8e332d77b57455e8~mv2.png?originWidth=768&originHeight=960"
                  alt="Kinky curly texture"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <h3 className="font-heading text-3xl">Kinky Curly</h3>
              <p className="font-paragraph text-sm mt-2 opacity-70">Bold, beautiful, and unapologetic.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: FEATURES GRID (Architectural) --- */}
      <section className="w-full bg-secondary text-secondary-foreground py-32">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-1 md:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`
                  relative p-12 border-secondary-foreground/20
                  ${index !== 2 ? 'md:border-r' : ''}
                  ${index !== 0 ? 'border-t md:border-t-0' : ''}
                `}
              >
                <div className="mb-8 text-secondary-foreground/80">
                  <feature.icon className="w-8 h-8" strokeWidth={1} />
                </div>
                <h3 className="font-heading text-3xl mb-4">{feature.title}</h3>
                <p className="font-paragraph text-lg leading-relaxed opacity-80">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 3B: SHOPPING MALL SECTION --- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-32">
        <div className="text-center mb-16">
          <h2 className="font-heading text-5xl md:text-7xl text-primary mb-6">
            Discover Our Vendors
          </h2>
          <p className="font-paragraph text-lg text-primary/70 max-w-2xl mx-auto">
            Explore a curated marketplace of premium hair extension and wig vendors, each offering unique collections and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h3 className="font-heading text-3xl text-primary">
                A Marketplace of Excellence
              </h3>
              <p className="font-paragraph text-lg text-primary/70 leading-relaxed">
                Our shopping mall brings together the finest vendors in the hair industry. Each store is carefully selected to ensure quality, authenticity, and exceptional customer service.
              </p>
            </div>

            <ul className="space-y-3 font-paragraph text-lg">
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Curated vendor selection
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Diverse product collections
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Expert vendor support
              </li>
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full" />
                Unified shopping experience
              </li>
            </ul>

            <Link
              to="/stores"
              className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            >
              Browse All Vendors
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="aspect-[4/5] overflow-hidden"
          >
            <Image
              src="https://static.wixstatic.com/media/37e681_3dbc4c8d9a494f8a8fbe0138857f89d9~mv2.png?originWidth=768&originHeight=960"
              alt="Shopping mall vendors"
              width={600}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 4: VISUAL BREATHER (Full Bleed) --- */}
      <section className="relative w-full h-[80vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <ParallaxImage 
            src="https://static.wixstatic.com/media/37e681_b47948c9880b49299634b891fb3af307~mv2.png?originWidth=1280&originHeight=704"
            alt="Atmospheric background"
            className="w-full h-full"
            speed={0.2}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <p className="font-heading text-5xl md:text-7xl text-white leading-tight drop-shadow-lg">
              "Beauty is not just seen, <br/> it is felt."
            </p>
            <div className="mt-12">
              <Link 
                to="/products"
                className="inline-block px-12 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-paragraph hover:bg-white hover:text-black transition-all duration-300"
              >
                Shop The Look
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SECTION 5: FINAL CTA --- */}
      <section className="w-full py-32 px-6 md:px-12 lg:px-20 max-w-[120rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="aspect-square overflow-hidden rounded-full border border-primary/10 p-4">
               <div className="w-full h-full rounded-full overflow-hidden">
                 <Image 
                    src="https://static.wixstatic.com/media/37e681_e807b4cb55684b95b9faf52462f1afbb~mv2.png?originWidth=768&originHeight=768"
                    alt="Circular showcase"
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000"
                 />
               </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 space-y-8 text-center lg:text-left">
            <h2 className="font-heading text-6xl md:text-8xl text-primary leading-[0.9]">
              READY TO <br/> TRANSFORM?
            </h2>
            <p className="font-paragraph text-xl text-primary/70 max-w-md mx-auto lg:mx-0">
              Browse our extensive collection and find the perfect extensions or wigs tailored to your unique style.
            </p>
            <div className="pt-4">
              <Link
                to="/products"
                className="inline-block px-16 py-5 bg-primary text-primary-foreground font-paragraph text-lg hover:bg-secondary transition-colors duration-300"
              >
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}