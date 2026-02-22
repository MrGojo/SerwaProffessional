/**
 * SERWA Professional - Education Page
 * 
 * Haircare education, product usage guides, tips.
 * Content placeholders - ready for client content.
 */

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Placeholder education topics - replace with actual content
const educationTopics = [
  {
    id: 1,
    title: 'Hair Care Basics',
    description: 'Content placeholder - add education topic description.',
    image: '/placeholder-product.svg',
  },
  {
    id: 2,
    title: 'Product Usage Guides',
    description: 'Content placeholder - how to use SERWA products effectively.',
    image: '/placeholder-product.svg',
  },
  {
    id: 3,
    title: 'Professional Tips',
    description: 'Content placeholder - expert tips for salon professionals.',
    image: '/placeholder-product.svg',
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
            Content placeholder - add education section intro from client.
            Learn about professional haircare and product expertise.
          </motion.p>
        </div>
      </section>

      {/* Education topics grid */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {educationTopics.map((topic, i) => (
            <motion.article
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group"
            >
              <div className="aspect-video rounded-lg overflow-hidden bg-serwa-secondary/10 mb-4">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h2 className="font-serif text-xl font-semibold text-serwa-secondary mb-2">
                {topic.title}
              </h2>
              <p className="text-serwa-secondary/80 text-sm mb-4">
                {topic.description}
              </p>
              <Link
                to={`/education/${topic.id}`}
                className="text-serwa-accent font-medium hover:underline"
              >
                Learn more →
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
