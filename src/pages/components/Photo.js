"use client";
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import flashIcon from '../../assets/images/flash.svg';

const Photo = () => {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

    return (

        <div className="w-full h-full relative flex items-center justify-center">
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

            <div className="w-[150px] h-[150px] xl:h-[350px] xl:w-[398px] mix-blend-lighten absolute rounded-full">
                <img alt="Spark" src={flashIcon} />
            </div>


            {/* circle */}
            <motion.svg className="w-[300px] h-[300px] xl:h-[406px] xl:w-[406px]"
                fill="transperent"
                viewBox="0 0 506 506"
                xmlns="http://w3.org/2000/svg">
                <motion.circle
                    cx="253"
                    cy="253"
                    r="250"
                    stroke="#00ff99"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ strokeDasharray: "24 10 0 0" }}
                    animate={{
                        strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
                        rotate: [120, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                />
            </motion.svg>


        </div>


    )
}

export default Photo