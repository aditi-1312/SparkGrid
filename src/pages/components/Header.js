import React from 'react'
import { Zap } from 'lucide-react'

const Header = () => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-md border-b border-gray-800">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Zap className="h-8 w-8 text-green-400" />
          <span className="text-xl font-bold text-white">EnergyOptimize</span>
        </div>
        <div className="space-x-6">
          <a href="#features" className="text-gray-300 hover:text-green-400 transition-colors">Features</a>
          <a href="#benefits" className="text-gray-300 hover:text-green-400 transition-colors">Benefits</a>
          <a href="#cta" className="bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded-md hover:bg-green-500/30 transition duration-300">Register Now</a>
        </div>
      </nav>
    </header>
  )
}

export default Header