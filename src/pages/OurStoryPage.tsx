/**
 * SERWA Professional - Our Story Page
 * 
 * Brand story, philosophy, and why we exist.
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
            In the beginning, there was a question — not a business question, not a market gap. A deeper one.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl font-serif italic text-serwa-secondary/90 mt-4"
          >
            Why does hair get temporary beauty… but never completeness?
          </motion.p>
        </div>
      </section>

      {/* Content blocks */}
      <section className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="prose prose-lg max-w-none"
        >
          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            The meaning of Serwa
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            In Sanskrit, the word <strong className="text-serwa-secondary">Serwa</strong> means
            <strong className="text-serwa-secondary"> complete</strong>. Whole. Entire. Nothing missing.
            And that is where our story begins.
          </p>
          <p className="text-serwa-secondary/80 mb-10 leading-relaxed">
            Serwa was not created inside a boardroom. It was born inside salons — in conversations between
            stylists and clients. In the silent frustration of damaged strands. In the exhaustion of repeated
            chemical services. In the moment when a client would look in the mirror and say,
            <em> “It looks good… but it doesn’t feel healthy.”</em>
            <br />
            That “but” became our mission.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            Why we exist
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            We realized something powerful — most treatments were solving one problem at a time.
            Shine without strength. Smoothness without repair. Softness without structure.
            Surface beauty without internal healing.
          </p>
          <p className="text-serwa-secondary/80 mb-12 leading-relaxed">
            And so Serwa was created with one belief:
            <br />
            <strong className="text-serwa-secondary">Beauty is incomplete without restoration.</strong>
            <br />
            <strong className="text-serwa-secondary">Repair is incomplete without structure.</strong>
            <br />
            <strong className="text-serwa-secondary">And treatment is incomplete without freedom.</strong>
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            Molecular 360 — a complete circle
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            That is why the next evolution was named <strong className="text-serwa-secondary">Molecular 360</strong>.
            Three hundred and sixty degrees. Not partial. Not halfway. A complete circle of transformation.
          </p>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            Molecular 360 was designed on a simple yet revolutionary thought — what if one core technology
            could create multiple solutions? What if a stylist did not need ten different systems, but one
            intelligent foundation?
          </p>
          <p className="text-serwa-secondary/80 mb-12 leading-relaxed">
            At the heart of Molecular 360 lies the <strong className="text-serwa-secondary">Reconstruction Cream</strong>.
            This is not just a product. It is the engine. Powered by precision. Activated by fusion.
          </p>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            One intelligent core. Three outcomes.
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            This single reconstructor, when mixed in a precise <strong className="text-serwa-secondary">1:1 ratio</strong>
            with different treatment shots, transforms into three completely distinct professional services:
            The Molecular Treatment. The Botox Treatment. The Collagen Therapy.
            <strong className="text-serwa-secondary"> Same base. Different outcome. Complete control.</strong>
          </p>
          <div className="grid gap-6 md:grid-cols-3 not-prose mb-12">
            <div className="rounded-xl border border-serwa-accent/10 bg-white/40 p-5">
              <h3 className="font-serif text-lg font-semibold text-serwa-secondary mb-2">Molecular Treatment</h3>
              <p className="text-sm text-serwa-secondary/80 leading-relaxed">
                Deep structural restoration. Rebuilds broken bonds, restores elasticity, corrects internal damage.
                Strength and resilience with controlled smoothness.
              </p>
            </div>
            <div className="rounded-xl border border-serwa-accent/10 bg-white/40 p-5">
              <h3 className="font-serif text-lg font-semibold text-serwa-secondary mb-2">Botox Treatment</h3>
              <p className="text-sm text-serwa-secondary/80 leading-relaxed">
                Surface refinement and internal filling. Reduces porosity, enhances smoothness, eliminates frizz,
                and brings visible fullness and gloss.
              </p>
            </div>
            <div className="rounded-xl border border-serwa-accent/10 bg-white/40 p-5">
              <h3 className="font-serif text-lg font-semibold text-serwa-secondary mb-2">Collagen Therapy</h3>
              <p className="text-sm text-serwa-secondary/80 leading-relaxed">
                Flexibility and hydration. Restores moisture balance, improves softness and movement, and creates
                natural shine without stiffness.
              </p>
            </div>
          </div>

          <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
            Freedom for the stylist
          </h2>
          <p className="text-serwa-secondary/80 mb-8 leading-relaxed">
            Serwa did not only aim to complete hair. It aimed to complete professional freedom.
            With Molecular 360, the stylist becomes the creator. You assess the hair. You diagnose the damage.
            You understand the client’s desire. Then you choose — strength, smoothness, or hydration.
            You decide the fusion. You control the result.
          </p>
          <p className="text-serwa-secondary/80 mb-6 leading-relaxed">
            It is science that listens to artistry. Instead of selling a pre-decided solution, you design a customized
            experience. Each client feels personally treated. Each service feels tailored. Each outcome feels intentional.
          </p>
        </motion.div>
      </section>

      {/* Quote section */}
      <section className="py-16 bg-serwa-accent/5">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl text-serwa-secondary italic"
          >
            &ldquo;Not temporary beauty. Not partial repair. Complete transformation.&rdquo;
          </motion.blockquote>
        </div>
      </section>
    </div>
  )
}
