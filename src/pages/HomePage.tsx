/**
 * SERWA Professional - Home Page
 * 
 * BIOTOP-inspired design with:
 * - Full-width hero with tagline
 * - Product range carousels (like 911 Quinoa section)
 * - Full-width image banners with overlay text (split layout)
 * - Bestsellers section
 * - Scroll-triggered animations via Framer Motion
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import InfiniteProductRangeCarousel from '../components/InfiniteProductRangeCarousel'

// Use your shampoo bottle image - add it to public/shampoo-bottle.jpg
const SHAMPOO_BOTTLE_IMG = '/shampoo-bottle.jpg'

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

export default function HomePage() {
  const bestsellers = products.slice(0, 4) // First 4 as placeholders

  return (
    <div className="relative">
      {/* ========== HERO SECTION ========== */}
      <section className="relative w-full min-h-[70vh] md:min-h-[85vh] flex items-center justify-center overflow-hidden bg-serwa-primary">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Text content - Left side */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="text-serwa-secondary/80 uppercase tracking-[0.3em] text-sm mb-4"
            >
              SERWA Professional
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-3xl md:text-5xl lg:text-6xl font-semibold text-serwa-secondary mb-6 leading-tight"
            >
              This is not a game changer, The game is changed.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base md:text-lg text-serwa-secondary/90 max-w-2xl mx-auto md:mx-0 mb-4"
            >
              The future of hair care is Integrated, Intelligent and Intentional.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="max-w-2xl mx-auto md:mx-0 space-y-1 text-serwa-secondary/90 italic"
            >
              <p className="text-base md:text-lg">One brand.</p>
              <p className="text-lg md:text-xl">One belief.</p>
              <p className="text-xl md:text-2xl">One complete solution.</p>
              <p className="text-xl md:text-3xl lg:text-4xl font-bold underline not-italic text-serwa-secondary">
                Beauty begins at the molecule.
              </p>
            </motion.div>
          </div>

          {/* Hero image placeholder - Right side */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="relative w-full max-w-md aspect-[4/5]">
              <img
                src="/model-with-bottle.jpg"
                alt="SERWA Professional"
                className="w-full h-full object-contain object-center rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== OUR STORY SECTION - With shampoo image on left ========== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-serwa-primary py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16 min-h-[70vh]">
            {/* Shampoo image - Left side (empty space) */}
            <div className="flex-shrink-0 w-full md:w-1/2 max-w-md flex justify-center md:justify-start">
              <div className="relative w-full max-w-sm aspect-[3/5]">
                <img
                  src={SHAMPOO_BOTTLE_IMG}
                  alt="SERWA Professional Shampoo"
                  className="w-full h-full object-contain object-center drop-shadow-2xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.svg'
                  }}
                />
              </div>
            </div>

            {/* Company content - Right side */}
            <div className="flex-1 text-center md:text-left z-10">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4"
              >
                Why We Exist?
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6"
              >
                SERWA Professional
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-serwa-secondary/80 text-lg max-w-xl mb-8"
              >
                Serwa Professional began with a question: Why does beauty ask us to choose between science and soul?

We refused that choice.

Serwa Professional was built in the space between formulation and feeling—where precision meets intuition.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/our-story" className="btn-outline inline-block">
                  Our Story
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SHOTS SECTION - Star product ========== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-serwa-primary py-20">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-16 min-h-[70vh]">
            <div className="flex-shrink-0 w-full md:w-1/2 max-w-md flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm aspect-[3/5]">
                <img
                  src="/placeholder-product.svg"
                  alt="SERWA Professional Shots"
                  className="w-full h-full object-contain object-center drop-shadow-2xl"
                />
              </div>
            </div>

            <div className="flex-1 max-w-xl text-center md:text-left z-10">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-4"
              >
                Our Star Product
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6"
              >
                Molecular 360 Shots
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-serwa-secondary/80 text-lg mb-8"
              >
                One cream. Three ampoules. Mix shot + Reconstruction Cream in a 1:1 ratio to create Molecular,
                Blowtox, or Collagen outcomes — smoothness, repair, and hydration in one intelligent system.
                Instant activation. No extra inventory. Complete professional control.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <Link to="/shop/shots" className="btn-primary inline-block">
                  Shop Shots
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== PRODUCT RANGE SECTION - Like BIOTOP 911 Quinoa ========== */}
      <section className="py-16 md:py-24 bg-serwa-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary mb-4">
              SERWA Professional Range
            </h2>
            <p className="text-serwa-secondary/80 max-w-2xl mx-auto">
              Introducing Molecular 360 — a tri-therapy treatment where science meets sensorial artistry. 
              One cream, three ampoules. Smoothness, repair, strength, and hydration achieved in one system.
            </p>
          </motion.div>

          <InfiniteProductRangeCarousel products={products} />

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/shop" className="btn-outline inline-block">
              View all
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== BANNER 1 - Split layout, BIOTOP "Chemically-treated hair" style ========== */}
      <section className="py-16 md:py-24 bg-serwa-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-serwa-accent/10">
              <img
                src="/placeholder-product.svg"
                alt="Hair care"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-2">For</p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                Chemically-treated or damaged hair
              </h2>
              <p className="text-serwa-secondary/80 mb-6">
                Treatments smooth. Blowtox fills. Collagen coats. Molecular 360 works at the molecular level 
                where strength, elasticity, repair, and longevity actually begin. One philosophy. One system. One solution.
              </p>
              <Link to="/shop/conditioner" className="btn-primary inline-block">
                Explore Treatment Range
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== BANNER 2 - "Scalp problems" style ========== */}
      <section className="py-16 md:py-24 bg-serwa-accent text-serwa-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className="order-2 md:order-1">
              <p className="text-serwa-secondary font-medium uppercase tracking-wider text-sm mb-2">
                Want to break-free of
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-primary mb-6">
                Scalp problems?
              </h2>
              <p className="text-serwa-primary/80 mb-6">
                Different brands mean mixing intentions. With Molecular 360, stylists don&apos;t have to compromise, 
                consumers don&apos;t have to chase solutions, and hair doesn&apos;t have to recover from over-treatment. 
                Everything works in alignment, not overlap.
              </p>
              <Link to="/shop/shampoo" className="btn-primary inline-block">
                Explore More
              </Link>
            </div>
            <div className="order-1 md:order-2 relative aspect-[4/5] rounded-lg overflow-hidden">
              <img
                src="/placeholder-product.svg"
                alt="Scalp care"
                className="w-full h-full object-cover opacity-90"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== BANNER 3 - Professional system ========== */}
      <section className="py-16 md:py-24 bg-serwa-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
          >
            <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-serwa-accent/10">
              <img
                src="/placeholder-product.svg"
                alt="Molecular 360 professional treatment"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-serwa-accent font-medium uppercase tracking-wider text-sm mb-2">
                Built for professionals
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
                One system. Three outcomes.
              </h2>
              <p className="text-serwa-secondary/80 mb-6">
                Hair isn&apos;t a problem to fix — it&apos;s a canvas to empower. Mix Reconstruction Cream with
                Molecular, Blowtox, or Collagen shots in a 1:1 ratio and deliver strength, smoothness, or hydration
                without juggling multiple brands. Formaldehyde-free. Salon-ready. Designed for real results.
              </p>
              <Link to="/shop/shots" className="btn-outline inline-block">
                Explore Shots
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ========== BESTSELLERS - BIOTOP style grid ========== */}
      <section className="py-16 md:py-24 bg-serwa-primary border-t border-serwa-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary text-center mb-12"
          >
            Bestsellers
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {bestsellers.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} layout="grid" />
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link to="/shop" className="btn-outline inline-block">
              View all
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
