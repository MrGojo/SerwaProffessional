/**
 * SERWA Professional - Education Page
 * 
 * Molecular 360 technology, product guides, professional advantages.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import petaCertifiedIcon from '../../images/peta certified.png'

type AdvantageIconType =
  | 'customizing'
  | 'activation'
  | 'multiBenefit'
  | 'safeFormula'
  | 'noRinse'
  | 'inventory'
  | 'sulphate'
  | 'paraben'
  | 'peta'

type ProfessionalAdvantage = {
  title: string
  description: string
  icon: AdvantageIconType
}

function AdvantageIcon({ type }: { type: AdvantageIconType }) {
  if (!type) return null

  return (
    <div className="w-12 h-12 rounded-xl bg-serwa-accent/5 border border-serwa-accent/10 flex items-center justify-center shrink-0 overflow-hidden">
      {type === 'customizing' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m4 19 4.2-1 10-10a1.8 1.8 0 0 0-2.5-2.5l-10 10L4 19Z" />
          <path d="m13.5 6.5 4 4" />
        </svg>
      )}
      {type === 'activation' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 3v6" />
          <path d="M15 9V3" />
          <path d="M7 13h10" />
          <path d="M10 21h4" />
          <path d="M8 9h8v4a4 4 0 0 1-4 4 4 4 0 0 1-4-4V9Z" />
        </svg>
      )}
      {type === 'multiBenefit' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3v18" />
          <path d="M3 12h18" />
          <path d="m5 5 14 14" />
          <path d="m19 5-14 14" />
        </svg>
      )}
      {type === 'safeFormula' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3 5 6v6c0 4.4 2.8 7.3 7 9 4.2-1.7 7-4.6 7-9V6l-7-3Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      )}
      {type === 'noRinse' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3c2.8 3 5.5 6.4 5.5 10a5.5 5.5 0 1 1-11 0c0-3.6 2.7-7 5.5-10Z" />
          <path d="M6 18 18 6" />
        </svg>
      )}
      {type === 'inventory' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="4" y="7" width="16" height="12" rx="2" />
          <path d="M8 7V5h8v2" />
          <path d="M8 12h8" />
        </svg>
      )}
      {type === 'sulphate' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M12 3c2.8 3 5.5 6.4 5.5 10a5.5 5.5 0 1 1-11 0c0-3.6 2.7-7 5.5-10Z" />
          <path d="M6 18 18 6" />
        </svg>
      )}
      {type === 'paraben' && (
        <svg viewBox="0 0 24 24" className="w-6 h-6 text-serwa-secondary" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="8" y="4" width="8" height="3.5" rx="1" />
          <path d="M9 7.5v11a2.5 2.5 0 0 0 2.5 2.5h1A2.5 2.5 0 0 0 15 18.5v-11" />
          <path d="M5 19 19 5" />
        </svg>
      )}
      {type === 'peta' && (
        <img src={petaCertifiedIcon} alt="PETA certified icon" className="w-full h-full object-cover" />
      )}
    </div>
  )
}

const professionalAdvantages: ProfessionalAdvantage[] = [
  {
    title: 'Customizing',
    description: 'Stylist selects the right treatment (nanoplastia, botox and protein) for each client without carrying separate treatments.',
    icon: 'customizing',
  },
  {
    title: 'Instant Activation',
    description: 'Easy to prepare — Mix shot + Base Cream, Apply, Process, Rinse.',
    icon: 'activation',
  },
  {
    title: 'Multi-Benefit System',
    description: 'Smoothness, repair, strength, and hydration achieved in one range.',
    icon: 'multiBenefit',
  },
  {
    title: 'Safe Formula',
    description: 'Formaldehyde-free, designed for professional salon use.',
    icon: 'safeFormula',
  },
  {
    title: 'No Rinse Required',
    description: 'All the nutrients stay locked inside your hair, ensuring deeper repair, enhanced smoothness, and extended shine.',
    icon: 'noRinse',
  },
  {
    title: 'Simplified Inventory',
    description: 'No extra inventory needed — one cream + three ampoules replaces multiple separate products.',
    icon: 'inventory',
  },
  {
    title: 'No Sulphate',
    description: 'Gentle cleansing care that helps preserve hair health and treatment longevity.',
    icon: 'sulphate',
  },
  {
    title: 'No Paraben',
    description: 'Paraben-free formula aligned with clean, professional salon standards.',
    icon: 'paraben',
  },
  {
    title: 'PETA Certified',
    description: 'Cruelty-free commitment backed by trusted certification standards.',
    icon: 'peta',
  },
]

export default function EducationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-4xl md:text-5xl font-semibold text-serwa-secondary mb-6"
          >
            Education
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-serwa-secondary/80 max-w-2xl mx-auto"
          >
            Learn about Molecular 360 technology and how Serwa Professional is redefining hair care.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-serif text-xl italic text-serwa-secondary mt-4"
          >
            Beauty begins at the molecule.
          </motion.p>
        </div>
      </section>

      {/* Molecular 360 intro */}
      <section className="py-12 md:py-16 bg-serwa-primary">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
              What is Molecular 360?
            </h2>
            <p className="text-serwa-secondary/80 mb-6 leading-relaxed">
              Serwa Professional is a premium house of promoting new-age technology and innovation in the cosmetics industry with the evolving growth of science, simplicity and self-expression. It is a <strong>tri-therapy treatment</strong>, marking the beginning of next-generation technology promising hair restoration and straightening powered by molecular technology.
            </p>
            <p className="text-serwa-secondary/80 mb-6 leading-relaxed">
              The molecular treatment is the first-generation customisable treatment. It isn&apos;t just a treatment — it&apos;s a transformation ritual, where science meets sensorial artistry. This tailor-made treatment allows experienced stylists and end consumers to craft hair care as unique as every strand can get. Each formula blends targeted shots of Nanoplastia, Botox or Collagen Protein with the game-changing Restructuring Cream to create smooth, straight results — working deep within the fibre and renewing strength.
            </p>
            <p className="text-serwa-secondary/80 leading-relaxed">
              While creating the brand, the founders believed at heart that true beauty begins with the strength and resilience of each molecule. Immense care was taken to honour individuality, creating hair that isn&apos;t just transformed — but crafted in pursuit of perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Serwa philosophy */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary mb-6">
              The Serwa Philosophy
            </h2>
            <p className="text-serwa-secondary/80 leading-relaxed">
              Serwa was born between the space of science and self-expression. For years, salons relied on treatments that delivered one kind of beauty — smoothness, straight, or restoration — but rarely all at once. Clients learned to choose between health and transformation. Stylists learned to work between limits as guided by brands. Serwa exists to end that compromise. Created by professionals who believed hair deserved more than correction, Serwa is built on the simple truth: <em>&ldquo;Hair isn&apos;t a problem to fix — it&apos;s a canvas to empower.&rdquo;</em>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Professional Advantages */}
      <section className="py-12 md:py-20 bg-serwa-accent/5">
        <div className="max-w-6xl mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl font-semibold text-serwa-secondary text-center mb-12"
          >
            Professional Advantages
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {professionalAdvantages.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-serwa-primary/50 rounded-xl p-6 border border-serwa-accent/10"
              >
                <div className="flex items-center gap-4">
                  <AdvantageIcon type={item.icon} />
                  <h3 className="font-serif text-lg font-semibold text-serwa-secondary">
                    {item.title}
                  </h3>
                </div>
                <p className="text-serwa-secondary/80 text-sm leading-relaxed mt-4">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link to="/shop" className="btn-primary inline-block">
              Explore Products
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
