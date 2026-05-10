/**
 * SERWA Professional - Product Data
 * 
 * PLACEHOLDER DATA: Replace with Shopify collections when integrated.
 * Structure based on client product list:
 * 
 * 1. TREATMENT - reconstruction cream 1000ml
 * 2. MASK - one mask, 2 quantities
 * 3. SERUM - one serum 250ml
 * 4. SHAMPOO - 350ml, 1000ml
 * 5. SHOTS - 3 different shots
 * 6. CONDITIONER - 350ml, 1000ml
 */

export type ProductCategory = 
  | 'treatment' 
  | 'mask' 
  | 'serum' 
  | 'shampoo' 
  | 'shots' 
  | 'conditioner'

export interface ProductVariant {
  id: string
  title: string
  price: string
  compareAtPrice?: string
  available: boolean
  option?: string // e.g. "350ml", "1000ml"
}

export interface Product {
  id: string
  handle: string
  title: string
  /** Short hero summary under the title */
  description: string
  category: ProductCategory
  variants: ProductVariant[]
  images: string[]
  featured?: boolean
  /** Optional one-liner under category */
  tagline?: string
  /** Key benefits for the buy box */
  highlights?: string[]
  /** Tab: full product story */
  story?: string
  /** Tab: key ingredients / actives */
  ingredients?: string
  /** Tab: usage steps */
  howToUse?: string
}

// =============================================================================
// Placeholder products - structure ready for content push
// =============================================================================

export const products: Product[] = [
  {
    id: '1',
    handle: 'reconstruction-cream-1000ml',
    title: 'Reconstruction Cream',
    tagline: 'The core of Molecular 360 — one base, three professional outcomes.',
    description:
      'A high-performance reconstructor designed to work in a precise 1:1 ratio with Molecular 360 treatment shots. Rebuilds strength, elasticity, and internal structure without masking damage.',
    category: 'treatment',
    highlights: [
      'Same base for Molecular, Botox-style, and collagen-style protocols',
      'Targets cortex-level repair, not just surface slip',
      'Salon-grade control: predictable processing and rinse',
    ],
    story:
      'Reconstruction Cream is the anchor of the Molecular 360 system. Instead of juggling incompatible bases, your salon works from one intelligent reconstructor and lets the chosen shot define the finish. The result is alignment across the service menu — less guesswork, more consistent repair narratives for clients who bleach, heat-style, or chemically treat their hair.',
    ingredients:
      'Professional reconstruction complex with conditioning esters, amino-acid support actives, and film-forming conditioners balanced for rinse clarity. Full INCI list will ship with retail packaging and SDS.',
    howToUse:
      'Always follow your Molecular 360 protocol sheet. Typically: mix Reconstruction Cream with the selected shot in a 1:1 ratio, apply to clean, towel-dried hair, process per timing guide, then rinse thoroughly. Finish with compatible shampoo and conditioner from the same system.',
    variants: [
      { id: 'v1', title: '1000ml', price: '0', compareAtPrice: undefined, available: true, option: '1000ml' },
    ],
    images: ['/placeholder-product.svg'],
    featured: true,
  },
  {
    id: '2',
    handle: 'hair-mask',
    title: 'Hair Mask',
    tagline: 'Weekly depth for hair that feels strong, not just soft.',
    description:
      'A rich treatment mask that extends salon results at home — seals the cuticle, improves comb-through, and helps colour and lightening look fresher for longer.',
    category: 'mask',
    highlights: [
      'Ideal after lightening, colour, or heat-heavy routines',
      'Helps reduce breakage from brushing on wet hair',
      'Leaves hair supple with movement — not coated or heavy',
    ],
    story:
      'Think of this mask as the “maintenance chapter” after Molecular 360 or any intensive service. It is formulated to support the hair’s lipid balance and reduce friction so daily styling does not undo your in-salon investment.',
    ingredients:
      'Blend of conditioning quats, plant-derived lipids, and hydrolyzed proteins at professional-use levels. Fragrance and preservative systems meet salon retail standards.',
    howToUse:
      'After shampoo, apply generously from mid-lengths to ends. Leave on 5–10 minutes for routine care, or up to 20 minutes for deeper recovery. Rinse well. Use 1–2 times per week, or as your stylist recommends.',
    variants: [
      { id: 'v2a', title: 'Size 1', price: '0', available: true, option: '250ml' },
      { id: 'v2b', title: 'Size 2', price: '0', available: true, option: '500ml' },
    ],
    images: ['/placeholder-product.svg'],
    featured: true,
  },
  {
    id: '3',
    handle: 'hair-serum-250ml',
    title: 'Hair Serum',
    tagline: 'Weightless finishing shine and thermal discipline.',
    description:
      'A lightweight serum that smooths flyaways, adds controlled shine, and helps protect against heat before blow-drying or ironing.',
    category: 'serum',
    highlights: [
      'Non-greasy slip for fine to medium hair',
      'Helps shorten blow-dry time on porous ends',
      'Pairs cleanly with Molecular 360 home care',
    ],
    story:
      'Serum is the last layer of intention — where repair meets reflection. Use it to polish the cuticle after treatment so light reads evenly along the hair shaft, especially on blondes and vivids.',
    ingredients:
      'Silicone blend for heat protection and gloss, paired with dry-touch emollients. Free of heavy oils that flatten volume at the root.',
    howToUse:
      'Dispense 1–2 pumps into palms, emulsify, then work through mid-lengths and ends on dry or damp hair before heat styling. Layer lightly; build only where needed.',
    variants: [
      { id: 'v3', title: '250ml', price: '0', available: true, option: '250ml' },
    ],
    images: ['/placeholder-product.svg'],
    featured: true,
  },
  {
    id: '4',
    handle: 'shampoo-350ml',
    title: 'Professional Shampoo',
    tagline: '350ml — ideal for retail, travel, and back-bar sampling.',
    description:
      'A sulfate-smart cleanse that removes product residue and mineral build-up while respecting a treated cuticle. Hair feels clean, not squeaky or stripped.',
    category: 'shampoo',
    highlights: [
      'Balanced surfactants for frequent salon-quality washing',
      'Prep step before Molecular 360 services',
      'Colour-safe when used with matching conditioner',
    ],
    story:
      'Cleansing sets the stage for every result. This shampoo is tuned for professionals who need predictable foam, fast rinse, and a neutral canvas before treatment or styling.',
    ingredients:
      'Mild anionic and amphoteric surfactants, glycerin, and conditioning polymers. pH balanced for professional use.',
    howToUse:
      'Wet hair thoroughly. Emulsify a small amount at the scalp, massage, then pull lather through lengths. Rinse completely. Repeat only if heavy build-up is present. Follow with Professional Conditioner.',
    variants: [
      { id: 'v4', title: '350ml', price: '0', available: true, option: '350ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '5',
    handle: 'shampoo-1000ml',
    title: 'Professional Shampoo',
    tagline: '1000ml — high-turnover back bar and retail twin.',
    description:
      'The same cleanse philosophy as the 350ml, scaled for volume. Keeps protocols consistent from chair to retail bag.',
    category: 'shampoo',
    highlights: [
      'Cost-efficient for busy salons',
      'Pump-compatible (pump sold separately)',
      'Reliable partner to Molecular 360 aftercare',
    ],
    story:
      'Large format exists so your team never compromises on the first step. One formula language across sizes reduces confusion at the basin and at checkout.',
    ingredients:
      'Identical active chassis to the 350ml variant. Refer to batch label for exact INCI.',
    howToUse:
      'Same as 350ml: cleanse scalp first, extend lather through lengths, rinse, and condition.',
    variants: [
      { id: 'v5', title: '1000ml', price: '0', available: true, option: '1000ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '6',
    handle: 'shot-1',
    title: 'Molecular Treatment Shot',
    tagline: 'Shot A — smoothness & discipline focus.',
    description:
      'Concentrated ampoule engineered to pair 1:1 with Reconstruction Cream for a Molecular-style finish: sleek alignment, reduced frizz expansion, and fluid movement.',
    category: 'shots',
    highlights: [
      'Designed for the Molecular 360 cream base',
      'Clear processing window on the protocol clock',
      'Finish reads polished, not plastic',
    ],
    story:
      'Shots are how one system becomes three different client experiences. This variant emphasizes control and reflection — ideal before events, after smoothing services, or for clients who battle humidity.',
    ingredients:
      'Professional concentrate: smoothing polymers, cationic conditioners, and stabilizers. Not intended for direct scalp application undiluted.',
    howToUse:
      'Mix with Reconstruction Cream only as directed on the technical sheet. Do not apply shot alone. Process and rinse per timing; patch test for sensitive scalps when required by local regulation.',
    variants: [
      { id: 'v6', title: 'Default', price: '0', available: true },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '7',
    handle: 'shot-2',
    title: 'Botox-Style Treatment Shot',
    tagline: 'Shot B — fill, softness & “glass” body.',
    description:
      'Ampoule calibrated for a Botox-style outcome when mixed with Reconstruction Cream: plumped softness, reduced porosity feel, and high-gloss slip.',
    category: 'shots',
    highlights: [
      'Pairs 1:1 with the same cream base as other shots',
      'Helps hair feel thicker along the lengths',
      'Popular after blonding or double-process colour',
    ],
    story:
      'Clients asking for “hair Botox” want fill without frizz. This shot biases the matrix toward cushioned body and reflective shine while staying inside one Molecular 360 narrative.',
    ingredients:
      'Fill-focused conditioning actives and film formers at professional concentration. Use only in approved cream mixtures.',
    howToUse:
      'Blend with Reconstruction Cream immediately before application. Work in sections for even saturation. Rinse with cool-to-lukewarm water to set the film.',
    variants: [
      { id: 'v7', title: 'Default', price: '0', available: true },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '8',
    handle: 'shot-3',
    title: 'Collagen Therapy Shot',
    tagline: 'Shot C — tensile strength & elasticity bias.',
    description:
      'Targets elasticity and snap-back for hair that breaks when stretched. Best for compromised lengths that need structural support more than surface shine.',
    category: 'shots',
    highlights: [
      'Elasticity-forward finish after processing',
      'Complements extensions and lightener-heavy routines',
      'Still uses the unified 1:1 cream pairing',
    ],
    story:
      'Collagen Therapy is the strength chapter. Where other shots bias toward feel and reflection, this one prioritizes integrity — the kind of resilience clients notice when brushing and air-drying.',
    ingredients:
      'Hydrolyzed protein support, elasticity-focused polymers, and reconstructor-friendly carriers. For professional use.',
    howToUse:
      'Mix with Reconstruction Cream per protocol. Process strictly within the timed window. Follow with pH-appropriate shampoo and mask if the service guide calls for it.',
    variants: [
      { id: 'v8', title: 'Default', price: '0', available: true },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '9',
    handle: 'conditioner-350ml',
    title: 'Professional Conditioner',
    tagline: '350ml — daily closure after every cleanse.',
    description:
      'Closes the cuticle after Professional Shampoo, restores combability, and helps lock in treatments without silicones that overload fine hair.',
    category: 'conditioner',
    highlights: [
      'Detangles in under a minute on most hair types',
      'Pairs with Molecular 360 home routines',
      'Retail-friendly size for replenishment',
    ],
    story:
      'Conditioner is where touch meets trust. This formula is built to feel expensive in the hand but predictable on the head — slip where you need it, rinse without residue.',
    ingredients:
      'Cationic conditioners, lightweight esters, and static control agents. Compatible with colour and keratin-style maintenance when used as directed.',
    howToUse:
      'After shampoo, squeeze excess water. Apply from mid-lengths to ends. Comb through, leave 1–3 minutes, rinse with cool water for extra shine.',
    variants: [
      { id: 'v9', title: '350ml', price: '0', available: true, option: '350ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
  {
    id: '10',
    handle: 'conditioner-1000ml',
    title: 'Professional Conditioner',
    tagline: '1000ml — basin workhorse with retail parity.',
    description:
      'Identical performance to the 350ml in a back-bar volume. Keeps aftercare messaging consistent from service to shelf.',
    category: 'conditioner',
    highlights: [
      'Fast rinse for high-volume salons',
      'Stable viscosity across climates',
      'Twin label design matches smaller SKU',
    ],
    story:
      'Volume should never mean a different story at the chair. This jug exists so every basin finishes with the same slip, scent architecture, and rinse profile clients remember.',
    ingredients:
      'Same chassis as 350ml; refer to label for lot-specific details.',
    howToUse:
      'Same application as 350ml. Use a pump or decant into a controlled dispenser for hygiene.',
    variants: [
      { id: 'v10', title: '1000ml', price: '0', available: true, option: '1000ml' },
    ],
    images: ['/placeholder-product.svg'],
  },
]

// Helper to get products by category
export function getProductsByCategory(category: ProductCategory): Product[] {
  return products.filter(p => p.category === category)
}

// Helper to get product by handle
export function getProductByHandle(handle: string): Product | undefined {
  return products.find(p => p.handle === handle)
}

// Category display names for UI
export const categoryLabels: Record<ProductCategory, string> = {
  treatment: 'Treatment',
  mask: 'Mask',
  serum: 'Serum',
  shampoo: 'Shampoo',
  shots: 'Shots',
  conditioner: 'Conditioner',
}
