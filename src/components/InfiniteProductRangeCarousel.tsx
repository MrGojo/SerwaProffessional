/**
 * Infinite horizontal product strip: triplicated list + scroll repositioning.
 * The card nearest viewport center scales up with a pink (accent) highlight.
 */

import { useRef, useEffect, useState, useCallback } from 'react'
import type { Product } from '../data/products'
import ProductCard from './ProductCard'

export default function InfiniteProductRangeCarousel({ products: items }: { products: Product[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [centerIndex, setCenterIndex] = useState(0)

  const measureSetWidth = useCallback(() => {
    const root = scrollerRef.current
    if (!root || items.length === 0) return 0
    const nodes = root.querySelectorAll<HTMLElement>('[data-range-card]')
    if (nodes.length < items.length + 1) return 0
    return nodes[items.length].offsetLeft - nodes[0].offsetLeft
  }, [items.length])

  const updateFromScroll = useCallback(() => {
    const el = scrollerRef.current
    if (!el || items.length === 0) return
    const setW = measureSetWidth()
    if (setW <= 0) return

    const sl = el.scrollLeft
    if (sl >= setW * 2 - 2) {
      el.scrollLeft = sl - setW
    } else if (sl <= 2) {
      el.scrollLeft = sl + setW
    }

    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const nodes = el.querySelectorAll<HTMLElement>('[data-range-card]')
    let best = 0
    let bestDist = Infinity
    nodes.forEach((node, i) => {
      const r = node.getBoundingClientRect()
      const mid = r.left + r.width / 2
      const d = Math.abs(mid - cx)
      if (d < bestDist) {
        bestDist = d
        best = i
      }
    })
    setCenterIndex(best)
  }, [items.length, measureSetWidth])

  useEffect(() => {
    const el = scrollerRef.current
    if (!el || items.length === 0) return

    const snapToMiddleCopy = () => {
      const setW = measureSetWidth()
      if (setW > 0) {
        el.scrollLeft = setW
        updateFromScroll()
      }
    }

    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(snapToMiddleCopy)
    })

    const ro = new ResizeObserver(() => {
      updateFromScroll()
    })
    ro.observe(el)

    el.addEventListener('scroll', updateFromScroll, { passive: true })

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
    el.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
      ro.disconnect()
      el.removeEventListener('scroll', updateFromScroll)
      el.removeEventListener('wheel', onWheel)
    }
  }, [items.length, measureSetWidth, updateFromScroll])

  if (items.length === 0) return null

  const triple = [...items, ...items, ...items]

  return (
    <div
      className="relative w-full -mx-4 sm:-mx-6 lg:-mx-8"
      role="region"
      aria-label="SERWA product range"
    >
      <div
        ref={scrollerRef}
        className="flex touch-pan-x gap-6 overflow-x-auto overflow-y-hidden py-8 pl-[max(1rem,calc(50vw-9rem))] pr-[max(1rem,calc(50vw-9rem))] scrollbar-subtle"
      >
        {triple.map((product, i) => {
          const active = i === centerIndex
          return (
            <div
              key={`${product.id}-${i}`}
              data-range-card
              className={`flex w-[240px] shrink-0 flex-col items-stretch justify-center sm:w-[272px] ${
                active ? 'z-10' : 'z-0'
              }`}
            >
              <div
                className={`w-full rounded-2xl p-1 transition-all duration-300 ease-out ${
                  active
                    ? 'scale-[1.1] ring-2 ring-serwa-accent ring-offset-4 ring-offset-serwa-primary shadow-[0_0_28px_rgba(255,0,127,0.4)]'
                    : 'scale-100 opacity-[0.9]'
                }`}
              >
                <ProductCard product={product} layout="carousel" animated={false} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
