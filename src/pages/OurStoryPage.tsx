/**
 * SERWA Professional - Our Story Page
 *
 * Multi-section narrative inspired by Beauty Garage's our-story layout:
 * founding → mission → values → innovation → team → CTA
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import TextureAccents from '../components/TextureAccents'

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-serwa-accent font-medium uppercase tracking-[0.25em] text-xs md:text-sm mb-3">
      {children}
    </p>
  )
}

function StoryImage({
  src,
  alt,
  className = '',
}: {
  src: string
  alt: string
  className?: string
}) {
  return (
    <div className={`relative rounded-2xl overflow-hidden bg-serwa-accent/5 border border-serwa-accent/10 p-3 md:p-4 ${className}`}>
      <img
        src={src}
        alt={alt}
        className="w-full h-auto object-contain rounded-xl"
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

const leadershipTeam = [
  {
    id: 'owner',
    name: 'Founder Name',
    role: 'Founder',
    image: '/images/team/owner.jpg',
    placeholderLabel: 'Owner photo',
  },
  {
    id: 'owner-daughter',
    name: "Founder's Daughter",
    role: 'Leadership',
    image: '/images/team/owner-daughter.jpg',
    placeholderLabel: "Owner's daughter photo",
  },
]

const missionPoints = [
  'Beauty is incomplete without restoration.',
  'Repair is incomplete without structure.',
  'Treatment is incomplete without freedom.',
]

const whyChooseSerwa = [
  {
    title: 'One System. One Solution.',
    description:
      'One intelligent reconstructor and three shots — no more layering incompatible brands and hoping for results.',
  },
  {
    title: 'Molecular 360 Technology',
    description:
      'Tri-therapy innovation that works at the molecular level where strength, elasticity, and longevity begin.',
  },
  {
    title: 'Formaldehyde-Free',
    description:
      'Professional-grade formulas designed for salon use — safe, precise, and built for real-world results.',
  },
  {
    title: 'Freedom for the Stylist',
    description:
      'Assess, diagnose, and choose — strength, smoothness, or hydration. You control the fusion and the outcome.',
  },
]

const treatmentOutcomes = [
  {
    title: 'Molecular Treatment',
    description:
      'Deep structural restoration. Rebuilds broken bonds, restores elasticity, and corrects internal damage.',
    cardClass: 'bg-serwa-accent',
    titleClass: 'text-serwa-primary',
    descClass: 'text-serwa-primary/90',
  },
  {
    title: 'Blowtox Treatment',
    description:
      'Surface refinement and internal filling. Reduces porosity, enhances smoothness, and brings visible gloss.',
    cardClass: 'bg-serwa-secondary',
    titleClass: 'text-serwa-primary',
    descClass: 'text-serwa-primary/85',
  },
  {
    title: 'Collagen Therapy',
    description:
      'Flexibility and hydration. Restores moisture balance, improves movement, and creates natural shine.',
    cardClass: 'bg-serwa-gold',
    titleClass: 'text-serwa-secondary',
    descClass: 'text-serwa-secondary/85',
  },
]

function TeamMemberCard({
  member,
  index,
}: {
  member: (typeof leadershipTeam)[number]
  index: number
}) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const showPlaceholder = !imageLoaded || imageError

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12 }}
      className="group text-center"
    >
      <div className="relative mx-auto max-w-sm aspect-[3/4] rounded-2xl overflow-hidden bg-serwa-primary border border-serwa-accent/15 shadow-sm">
        {!imageError && (
          <img
            src={member.image}
            alt={member.name}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02] ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        {showPlaceholder && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-serwa-accent/5 to-serwa-secondary/5 p-6">
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-serwa-accent/30 flex items-center justify-center">
              <svg className="w-8 h-8 text-serwa-secondary/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest text-serwa-accent font-medium">{member.placeholderLabel}</p>
            <p className="text-xs text-serwa-secondary/50 max-w-[200px]">
              Add image to <span className="font-mono text-[10px]">{member.image}</span>
            </p>
          </div>
        )}
      </div>
      <h3 className="font-serif text-xl md:text-2xl font-semibold text-serwa-secondary mt-6 mb-1">{member.name}</h3>
      <p className="text-sm uppercase tracking-wider text-serwa-accent font-medium">{member.role}</p>
    </motion.article>
  )
}

export default function OurStoryPage() {
  return (
    <div className="bg-serwa-primary">
      {/* ── Hero / Brand intro ── */}
      <section className="relative py-14 md:py-20 overflow-hidden border-b border-serwa-accent/10">
        <TextureAccents corners={['top-right']} intensity="soft" />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12 md:mb-16"
          >
            <SectionEyebrow>Our Story</SectionEyebrow>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-serwa-secondary mb-6 tracking-tight">
              SERWA Professional
            </h1>
            <p className="text-lg md:text-xl text-serwa-secondary/80 leading-relaxed">
              Serwa Professional began with a question — not a business question, not a market gap. A deeper one:
              why does hair get temporary beauty, but never completeness?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="grid md:grid-cols-2 gap-10 md:gap-14 items-center"
          >
            <div>
              <p className="text-serwa-secondary/80 leading-relaxed mb-6">
                In Sanskrit, <strong className="text-serwa-secondary">Serwa</strong> means{' '}
                <strong className="text-serwa-secondary">complete</strong>. Whole. Entire. Nothing missing.
                Serwa was not created inside a boardroom — it was born inside salons, in conversations between
                stylists and clients, in the silent frustration of damaged strands.
              </p>
              <p className="text-serwa-secondary/80 leading-relaxed">
                That &ldquo;but it doesn&apos;t feel healthy&rdquo; became our mission. One brand. One belief.
                One complete solution.
              </p>
            </div>
            <StoryImage
              src="/images/creative/story-molecular-lineup.jpg"
              alt="SERWA Molecular 360 product lineup"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Our Mission ── */}
      <section className="relative py-16 md:py-24 bg-serwa-accent text-serwa-primary overflow-hidden">
        <TextureAccents variant="pink" corners={['top-left', 'bottom-right']} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-serwa-primary/70 font-medium uppercase tracking-[0.25em] text-xs md:text-sm mb-3">
                Our Mission
              </p>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
                Beauty begins at the molecule
              </h2>
              <p className="text-serwa-primary/85 leading-relaxed mb-8">
                We make professional hair care intelligent, integrated, and intentional — for salons, stylists,
                and clients who refuse to choose between science and soul.
              </p>
              <ul className="space-y-3">
                {missionPoints.map(point => (
                  <li key={point} className="flex items-start gap-3 text-serwa-primary/90 text-sm md:text-base">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-serwa-gold shrink-0" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl overflow-hidden border border-serwa-primary/20 p-3 bg-serwa-primary/10">
                <img
                  src="/images/creative/hero-glass-capsules.jpg"
                  alt="SERWA Molecular 360 glass capsules"
                  className="w-full h-auto object-contain rounded-xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Why Choose SERWA ── */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <TextureAccents corners={['center-right']} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16 max-w-2xl mx-auto"
          >
            <SectionEyebrow>Why Choose Us</SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary mb-4">
              Uncompromising quality without the chaos
            </h2>
            <p className="text-serwa-secondary/80 leading-relaxed">
              One philosophy. One system. Molecular 360 removes the uncertainty of mixing multiple brands
              and delivers alignment, not overlap.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyChooseSerwa.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white/50 rounded-2xl p-6 border border-serwa-accent/10 hover:border-serwa-accent/25 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-serwa-accent/10 flex items-center justify-center mb-4">
                  <span className="font-serif text-lg font-semibold text-serwa-accent">{i + 1}</span>
                </div>
                <h3 className="font-serif text-lg font-semibold text-serwa-secondary mb-2">{item.title}</h3>
                <p className="text-sm text-serwa-secondary/75 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Molecular 360 Innovation ── */}
      <section className="relative py-16 md:py-24 bg-serwa-secondary/5 overflow-hidden border-y border-serwa-accent/10">
        <TextureAccents corners={['bottom-left']} />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <SectionEyebrow>Our Innovation</SectionEyebrow>
              <h2 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-secondary mb-6">
                Molecular 360 — a complete circle
              </h2>
              <p className="text-serwa-secondary/80 leading-relaxed mb-4">
                Three hundred and sixty degrees. Not partial. Not halfway. A complete circle of transformation
                powered by one intelligent foundation — the Reconstruction Cream.
              </p>
              <p className="text-serwa-secondary/80 leading-relaxed mb-6">
                Mixed in a precise <strong className="text-serwa-secondary">1:1 ratio</strong> with treatment shots,
                it becomes three distinct professional services. Same base. Different outcome. Complete control.
              </p>
              <Link to="/shop/shots" className="btn-primary inline-block text-sm">
                Explore Shots
              </Link>
            </motion.div>
            <StoryImage
              src="/images/creative/blowtox-lineup.jpg"
              alt="SERWA treatment shots lineup"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {treatmentOutcomes.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl p-6 shadow-md ${item.cardClass}`}
              >
                <h3 className={`font-serif text-lg font-semibold mb-3 ${item.titleClass}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${item.descClass}`}>{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Philosophy strip ── */}
      <section className="relative py-14 md:py-20 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-serif text-2xl md:text-3xl lg:text-4xl text-serwa-secondary italic leading-snug"
          >
            &ldquo;Hair isn&apos;t a problem to fix — it&apos;s a canvas to empower.&rdquo;
          </motion.blockquote>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-6 text-serwa-secondary/70 max-w-xl mx-auto"
          >
            Science that listens to artistry. Each client feels personally treated. Each outcome feels intentional.
          </motion.p>
        </div>
      </section>

      {/* ── Meet our team ── */}
      <section className="relative py-16 md:py-24 border-t border-serwa-accent/10 overflow-hidden">
        <TextureAccents corners={['top-right', 'bottom-left']} />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <SectionEyebrow>Meet Our Team</SectionEyebrow>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-serwa-secondary mb-6">
              The People Behind SERWA
            </h2>
            <p className="text-serwa-secondary/80 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Built by people who cared enough to perfect every detail — from formulation to feeling.
              Meet the leadership guiding our vision of complete, intelligent hair care.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-10 md:gap-14 max-w-3xl mx-auto">
            {leadershipTeam.map((member, i) => (
              <TeamMemberCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative py-16 md:py-20 bg-serwa-accent overflow-hidden">
        <TextureAccents variant="pink" corners={['center-right']} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-serwa-primary/70 font-medium uppercase tracking-[0.25em] text-xs mb-4">
              Stay Connected
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-semibold text-serwa-primary mb-4">
              Experience Molecular 360
            </h2>
            <p className="text-serwa-primary/85 mb-8 leading-relaxed">
              Discover the complete SERWA Professional range — one system, three outcomes, infinite possibilities
              for your salon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/shop"
                className="inline-block bg-serwa-secondary text-serwa-primary px-8 py-3 font-medium hover:bg-[#1A1A2E] transition-colors"
              >
                Shop Now
              </Link>
              <Link
                to="/education"
                className="inline-block border-2 border-serwa-primary text-serwa-primary px-8 py-3 font-medium hover:bg-serwa-primary/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
