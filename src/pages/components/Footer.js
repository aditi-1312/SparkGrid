import React from 'react'
import { Zap } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900/50 backdrop-blur-md border-t border-gray-800 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-green-400" />
            <div>
              <h3 className="text-xl font-semibold text-white">EnergyOptimize Hackathon</h3>
              <p className="text-gray-400">Powering a sustainable future</p>
            </div>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Terms of Service</a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">Contact Us</a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-500">
          &copy; {new Date().getFullYear()} EnergyOptimize. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

export default Footer