'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Card from './Card'

export default function Stats() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])


  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1])

  const stats = [
    {
      label: 'Energy Savings',
      value: '45%',
      description: 'Average reduction in energy consumption',
      color: 'from-blue-600/30 to-cyan-600/30'
    },
    {
      label: 'Carbon Reduction',
      value: '10K tons',
      description: 'Annual carbon emissions prevented',
      color: 'from-purple-600/30 to-blue-600/30'
    },
    {
      label: 'Cost Efficiency',
      value: '60%',
      description: 'Improvement in operational costs',
      color: 'from-cyan-600/30 to-blue-600/30'
    },
    {
      label: 'Renewable Usage',
      value: '85%',
      description: 'Clean energy integration achieved',
      color: 'from-blue-600/30 to-purple-600/30'
    }
  ]

  return (
    <section ref={ref} className="py-32 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 animate-pulse" />
        <motion.div
          className="absolute inset-0 opacity-75"
          style={{
            backgroundImage: 'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
            y,
            opacity,
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-4 w-4 bg-blue-500/30 rounded-full"
            animate={{
              x: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              y: [Math.random() * 100 - 50, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Card
                title={
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                    {stat.value}
                  </span>
                }
                description={
                  <span className="text-xl font-semibold text-blue-50">{stat.label}</span>
                }
              >
                <p className="text-blue-200/70">{stat.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
