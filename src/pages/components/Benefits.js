import React from 'react'
import { CheckCircle } from 'lucide-react'

const Benefits = () => {
  const benefits = [
    "Optimize energy production to meet forecasted demand efficiently",
    "Integrate renewable energy sources to maximize sustainability",
    "Reduce reliance on traditional power sources",
    "Lower operational costs through accurate forecasting",
    "Implement smart generation strategies for improved efficiency",
    "Contribute to a greener, more sustainable future"
  ]

  return (
    <section id="benefits" className="py-20 relative">
      <div className="absolute inset-0 bg-green-500/5"></div>
      <div className="container mx-auto px-4 relative">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-green-400 to-blue-400 text-transparent bg-clip-text">
          Key Benefits
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-3 bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors"
            >
              <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
              <p className="text-gray-300">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Benefits