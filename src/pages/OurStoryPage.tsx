/**
 * SERWA Professional - Our Story Page
 * 
 * About the brand, company history, values.
 * Content placeholders - ready for client content.
 */

import { motion } from 'framer-motion'

export default function OurStoryPage() {
  return (
    <div>
      {/* Hero section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-serwa-primary to-serwa-primary/80" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-6"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-serwa-secondary/80"
          >
            Content placeholder - add brand story introduction from client.
          </motion.p>
        </div>
      </section>

      {/* Content blocks - structure for easy content push */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="font-serif text-2xl font-semibold text-serwa-secondary mb-4">
            Our Mission
          </h2>
          <p className="text-serwa-secondary/80 mb-8">
            Content placeholder - add mission statement from client. 
            Example: SERWA Professional is dedicated to providing premium haircare 
            solutions that restore, repair, and rejuvenate hair.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-serwa-secondary mb-4">
            Our Values
          </h2>
          <p className="text-serwa-secondary/80 mb-8">
            Content placeholder - add company values from client.
          </p>

          <h2 className="font-serif text-2xl font-semibold text-serwa-secondary mb-4">
            The Journey
          </h2>
          <p className="text-serwa-secondary/80">
            Content placeholder - add brand history and journey from client.
          </p>
        </motion.div>
      </section>

      {/* Image + quote section - optional */}
      <section className="py-16 bg-serwa-secondary/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-serwa-secondary italic"
          >
            &ldquo;Content placeholder - add inspiring quote from founder or brand.&rdquo;
          </motion.blockquote>
        </div>
      </section>
    </div>
  )
}
