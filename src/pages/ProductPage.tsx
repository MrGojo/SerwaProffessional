/**
 * SERWA Professional - Product Detail Page
 *
 * Modern PDP: gallery, buy box, tabbed detail panels (Beauty Garage–style structure, SERWA palette).
 */

import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProductByHandle, categoryLabels } from '../data/products'
import { useShopify } from '../lib/shopify'
import type { ProductVariant } from '../data/products'

type DetailTab = 'description' | 'ingredients' | 'howToUse'

function buildVisibleTabs(product: NonNullable<ReturnType<typeof getProductByHandle>>) {
  const tabs: { id: DetailTab; label: string; content: string | undefined }[] = [
    { id: 'description', label: 'Description', content: product.story || product.description },
    { id: 'ingredients', label: 'Ingredients', content: product.ingredients },
    { id: 'howToUse', label: 'How to use', content: product.howToUse },
  ]
  return tabs.filter(t => t.content && t.content.trim().length > 0)
}

export default function ProductPage() {
  const { productHandle } = useParams<{ productHandle: string }>()
  const product = productHandle ? getProductByHandle(productHandle) : undefined
  const { addToCart } = useShopify()
  const navigate = useNavigate()

  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [detailTab, setDetailTab] = useState<DetailTab>('description')

  const visibleTabs = useMemo(() => (product ? buildVisibleTabs(product) : []), [product])

  useEffect(() => {
    if (!product) return
    setSelectedVariant(product.variants[0] || null)
    setQuantity(1)
    setActiveImage(0)
  }, [product])

  useEffect(() => {
    if (visibleTabs.length === 0) return
    setDetailTab(visibleTabs[0]!.id)
  }, [product?.id, visibleTabs])

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center">
        <h1 className="text-2xl font-semibold text-serwa-secondary mb-4">Product not found</h1>
        <Link to="/shop" className="text-serwa-accent hover:underline">
          Back to shop
        </Link>
      </div>
    )
  }

  const variant = selectedVariant || product.variants[0]
  const images = product.images.length > 0 ? product.images : ['/placeholder-product.svg']
  const mainImage = images[Math.min(activeImage, images.length - 1)]!

  const addLineToCart = () => {
    addToCart({
      variantId: variant.id,
      title: `${product.title}${variant.option ? ` - ${variant.option}` : ''}`,
      quantity,
      price: variant.price,
      image: mainImage,
    })
  }

  const handleAddToCart = () => {
    if (!variant.available) return
    addLineToCart()
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const handleBuyNow = () => {
    if (!variant.available) return
    addLineToCart()
    navigate('/cart')
  }

  const activeTabContent = visibleTabs.find(t => t.id === detailTab)?.content ?? visibleTabs[0]?.content

  return (
    <div className="bg-serwa-primary min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-serwa-secondary/70 hover:text-serwa-accent transition-colors mb-8 md:mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to shop
          </Link>

          <div className="grid gap-10 lg:gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start">
            {/* Gallery */}
            <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">
              {images.length > 1 && (
                <div className="flex sm:flex-col gap-2 sm:max-h-[520px] sm:overflow-y-auto sm:pr-1 order-2 sm:order-1">
                  {images.map((src, i) => (
                    <button
                      key={`${src}-${i}`}
                      type="button"
                      onClick={() => setActiveImage(i)}
                      className={`relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImage === i
                          ? 'border-serwa-accent ring-2 ring-serwa-accent/30 shadow-md'
                          : 'border-serwa-accent/15 hover:border-serwa-accent/40 opacity-90 hover:opacity-100'
                      }`}
                      aria-label={`View image ${i + 1}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-contain" loading="lazy" decoding="async" />
                    </button>
                  ))}
                </div>
              )}
              <div
                className={`relative flex-1 order-1 sm:order-2 rounded-2xl overflow-hidden bg-gradient-to-b from-serwa-primary to-serwa-accent/5 border border-serwa-accent/10 shadow-[0_24px_48px_-12px_rgba(46,46,74,0.12)] aspect-square sm:aspect-[4/5] max-h-[min(85vh,560px)] mx-auto w-full max-w-lg lg:max-w-none`}
              >
                <img src={mainImage} alt={product.title} className="w-full h-full object-contain p-6 md:p-10 rounded-2xl" decoding="async" />
              </div>
            </div>

            {/* Buy column */}
            <div className="lg:pt-2">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-serwa-accent">
                  {categoryLabels[product.category]}
                </span>
                <span className="text-serwa-secondary/25" aria-hidden>
                  ·
                </span>
                <span className="text-xs text-serwa-secondary/60">Molecular 360 system</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] font-semibold text-serwa-secondary tracking-tight leading-tight mb-3">
                {product.title}
              </h1>

              {product.tagline && (
                <p className="text-serwa-accent font-medium text-sm sm:text-base mb-5 leading-snug">{product.tagline}</p>
              )}

              <p className="text-serwa-secondary/85 text-sm sm:text-base leading-relaxed mb-6">{product.description}</p>

              {product.highlights && product.highlights.length > 0 && (
                <ul className="space-y-2.5 mb-8 border-l-2 border-serwa-accent/40 pl-4">
                  {product.highlights.map(line => (
                    <li key={line} className="text-sm text-serwa-secondary/90 flex gap-2">
                      <span className="text-serwa-accent font-bold shrink-0" aria-hidden>
                        ✓
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              )}

              <div className="rounded-2xl border border-serwa-accent/15 bg-white/50 backdrop-blur-sm px-5 py-5 sm:px-6 sm:py-6 mb-8 shadow-sm">
                <div className="flex flex-wrap items-baseline justify-between gap-3 mb-5">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-serwa-secondary/50 mb-1">Price</p>
                    <p className="font-serif text-2xl sm:text-3xl font-semibold text-serwa-secondary">
                      {variant.price === '0' ? 'Price on request' : `₹${variant.price}`}
                    </p>
                  </div>
                  <p className="text-xs text-serwa-secondary/55 max-w-[14rem] leading-snug">
                    Salon pricing may vary. Contact your distributor for pro rates.
                  </p>
                </div>

                {product.variants.length > 1 && (
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-serwa-secondary/60 mb-2">Option</p>
                    <div className="flex flex-wrap gap-2">
                      {product.variants.map(v => {
                        const active = selectedVariant?.id === v.id || (!selectedVariant && v.id === variant.id)
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                              active
                                ? 'bg-serwa-secondary text-serwa-primary shadow-md'
                                : 'bg-serwa-primary/80 text-serwa-secondary border border-serwa-accent/25 hover:border-serwa-accent/50'
                            }`}
                          >
                            {v.option || v.title}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-serwa-secondary/60 mb-2">Quantity</p>
                    <div className="inline-flex items-center rounded-xl border border-serwa-accent/25 bg-serwa-primary/60 overflow-hidden">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-4 py-3 text-serwa-secondary hover:bg-serwa-accent/10 transition-colors disabled:opacity-40"
                        disabled={quantity <= 1}
                        onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      >
                        −
                      </button>
                      <span className="min-w-[2.5rem] text-center text-sm font-semibold text-serwa-secondary tabular-nums">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-4 py-3 text-serwa-secondary hover:bg-serwa-accent/10 transition-colors disabled:opacity-40"
                        disabled={quantity >= 10}
                        onClick={() => setQuantity(q => Math.min(10, q + 1))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!variant.available}
                    className={`flex-1 min-h-[52px] rounded-xl font-semibold text-sm uppercase tracking-wide transition-all ${
                      added
                        ? 'bg-emerald-600 text-white shadow-lg'
                        : variant.available
                          ? 'btn-primary border-0'
                          : 'bg-serwa-secondary/20 text-serwa-secondary/50 cursor-not-allowed'
                    }`}
                  >
                    {added ? 'Added to cart' : variant.available ? 'Add to cart' : 'Sold out'}
                  </button>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!variant.available}
                    className={`flex-1 min-h-[52px] rounded-xl font-semibold text-sm uppercase tracking-wide border-2 transition-all ${
                      variant.available
                        ? 'border-serwa-secondary text-serwa-secondary bg-transparent hover:bg-serwa-secondary hover:text-serwa-primary'
                        : 'border-serwa-secondary/20 text-serwa-secondary/40 cursor-not-allowed'
                    }`}
                  >
                    Buy now
                  </button>
                </div>
              </div>

              <p className="text-xs text-serwa-secondary/50 leading-relaxed">
                Professional use only unless sold as retail by an authorised salon. Patch test when required by local
                regulation.
              </p>
            </div>
          </div>

          {/* Tabbed detail panel */}
          {visibleTabs.length > 0 && activeTabContent && (
            <motion.section
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="mt-14 md:mt-20 rounded-2xl border border-serwa-accent/12 bg-white/60 backdrop-blur-md shadow-[0_20px_40px_-20px_rgba(46,46,74,0.15)] overflow-hidden"
              aria-labelledby="product-detail-heading"
            >
              <h2 id="product-detail-heading" className="sr-only">
                Product details
              </h2>
              <div className="border-b border-serwa-accent/10 px-4 sm:px-6 overflow-x-auto scrollbar-subtle">
                <div className="flex gap-1 min-w-min">
                  {visibleTabs.map(t => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setDetailTab(t.id)}
                      className={`relative shrink-0 px-4 sm:px-5 py-4 text-sm font-semibold transition-colors ${
                        detailTab === t.id ? 'text-serwa-secondary' : 'text-serwa-secondary/50 hover:text-serwa-secondary/75'
                      }`}
                    >
                      {t.label}
                      {detailTab === t.id && (
                        <motion.span
                          layoutId="product-tab-line"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-serwa-accent rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-5 sm:px-8 py-7 sm:py-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={detailTab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-serwa-secondary/90 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                      {activeTabContent}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </motion.div>
      </div>
    </div>
  )
}
