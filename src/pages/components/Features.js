'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { LineChart, Battery, Cpu, Gauge, Cloud, Lightbulb } from 'lucide-react'
import { Card } from '@/components/ui/card'

export default function Features() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"])

  const features = [
    {
      icon: LineChart,
      title: "Predictive Analytics",
      description: "ML-powered demand forecasting with real-time adaptation",
      stats: "95% Accuracy",
      color: "from-blue-600/20 to-cyan-600/20"
    },
    {
      icon: Battery,
      title: "Smart Generation",
      description: "Automated power distribution optimization",
      stats: "30% Efficiency Gain",
      color: "from-purple-600/20 to-blue-600/20"
    },
    {
      icon: Cpu,
      title: "AI Core",
      description: "Advanced algorithms for continuous learning",
      stats: "24/7 Optimization",
      color: "from-cyan-600/20 to-blue-600/20"
    },
    {
      icon: Gauge,
      title: "Performance Metrics",
      description: "Comprehensive energy usage analytics",
      stats: "Real-time Monitoring",
      color: "from-blue-600/20 to-purple-600/20"
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless cloud-based deployment",
      stats: "99.9% Uptime",
      color: "from-cyan-600/20 to-purple-600/20"
    },
    {
      icon: Lightbulb,
      title: "Smart Solutions",
      description: "Intelligent energy-saving recommendations",
      stats: "40% Cost Reduction",
      color: "from-purple-600/20 to-cyan-600/20"
    }
  ]

  return (
    <section ref={ref} className="py-32 relative">
      <motion.div
        style={{ opacity, y }}
        className="container mx-auto px-4"
      >
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent"
          >
            Powerful Features
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-blue-200/70 max-w-3xl mx-auto"
          >
            Advanced AI-driven solutions for optimal energy management
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`relative p-8 overflow-hidden bg-gradient-to-br ${feature.color} border-white/10 hover:border-blue-500/50 transition-all duration-300 group`}>
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <div className="relative z-10">
                  <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                    <feature.icon className="w-12 h-12 text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-blue-50">{feature.title}</h3>
                  <p className="text-blue-200/70 mb-4">{feature.description}</p>
                  <div className="text-blue-400 font-semibold">{feature.stats}</div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
