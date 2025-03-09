import { motion, useScroll, useTransform } from 'framer-motion';
import { Zap, BarChart2, Wind, Waves } from 'lucide-react';
import Button from './Button';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import Photo from './Photo';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-purple-900/30 animate-pulse" />
        <motion.div
          className="absolute inset-0 opacity-75"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%)',
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

      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-5xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 inline-block"
          >
            <Waves className="w-20 h-20 text-blue-400 mx-auto animate-pulse" />
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
            SparkGrid
          </h1>

          <motion.p
            className="text-2xl md:text-3xl text-blue-200/80 mb-12 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Revolutionizing energy efficiency through AI-powered demand
            forecasting and sustainable generation optimization
          </motion.p>

          <div className="flex flex-wrap gap-6 justify-center mb-20">
            <Button
              size="lg"
              className="border-blue-400/50 text-blue-400 hover:bg-blue-400/10 rounded-full px-10 h-24 text-2xl"
            >
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>

          {/* <div className="flex gap-x-[10rem]">
            <div className="flex flex-col p-[10px]">
              <Photo className="ml-[10px]" />
            </div>
          </div> */}

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Zap,
                title: 'Smart Prediction',
                description: 'AI-driven demand forecasting with 95% accuracy',
                gradient: 'from-blue-600/20 to-cyan-600/20',
              },
              {
                icon: BarChart2,
                title: 'Real-time Analytics',
                description: 'Live monitoring and optimization strategies',
                gradient: 'from-purple-600/20 to-blue-600/20',
              },
              {
                icon: Wind,
                title: 'Green Energy',
                description: 'Sustainable power integration & optimization',
                gradient: 'from-cyan-600/20 to-blue-600/20',
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className={`p-12 rounded-2xl bg-gradient-to-br ${card.gradient} backdrop-blur-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 group`}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity" />
                  <card.icon className="w-16 h-16 text-blue-400 mb-2 relative z-10" />
                </div>
                <h3 className="text-4xl font-semibold mb-2 text-blue-50">
                  {card.title}
                </h3>
                <p className="text-blue-200/70 text-xl">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}