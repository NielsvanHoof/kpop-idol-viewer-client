"use client";

import { Button } from "@headlessui/react";
import { motion, Variant } from "framer-motion";

function FloatingElement({
  className,
  animationProps,
  children,
}: {
  className: string;
  animationProps: Variant;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={animationProps}
      transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
    >
      {children}
    </motion.div>
  );
}

export default function HeroSection() {
  const animationProps = [
    { opacity: 0.4, scale: 1, y: [-20, 20] },
    { opacity: 0.3, scale: 1.2, x: [-15, 15], y: [-15, 15] },
    { opacity: 0.5, scale: 0.9, y: [10, -10] },
  ];

  return (
    <section className="relative bg-gradient-to-r from-purple-500 to-pink-500 text-white py-20 overflow-hidden">
      {/* Sprinkle animated icons */}
      <FloatingElement
        className="top-10 left-10"
        animationProps={animationProps[0]}
      >
        <svg
          className="w-10 h-10 text-yellow-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 15l-5.5 3.3L6 10 .5 6.7 7 6l2.5-6L12 6l6.5.7L14 10l1.5 8z" />
        </svg>
      </FloatingElement>
      <FloatingElement
        className="top-1/3 right-14"
        animationProps={animationProps[1]}
      >
        <svg
          className="w-8 h-8 text-pink-400"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M10 2a7 7 0 00-7 7c0 4 3 5 7 11 4-6 7-7 7-11a7 7 0 00-7-7z" />
        </svg>
      </FloatingElement>
      <FloatingElement
        className="bottom-20 left-1/4"
        animationProps={animationProps[2]}
      >
        <svg
          className="w-6 h-6 text-purple-600"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2a10 10 0 00-9.05 5.45A7 7 0 017 17h1v-4a5 5 0 015-5 5 5 0 015 5v4h1a7 7 0 003.05-9.55A10 10 0 0012 2z" />
        </svg>
      </FloatingElement>
      <FloatingElement
        className="bottom-32 right-1/3"
        animationProps={animationProps[1]}
      >
        <svg
          className="w-7 h-7 text-blue-300"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M3 12l2-2 4 4L20 4l2 2-12 12L3 12z" />
        </svg>
      </FloatingElement>

      {/* Main Hero content */}
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">
          Track Your Favorite K-pop Idols
        </h1>
        <p className="text-lg mb-8">
          Stay up to date with your favorite K-pop stars, see their schedules,
          and get notified about upcoming releases and events.
        </p>
        <Button className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-gray-100">
          Get Started
        </Button>
      </div>
    </section>
  );
}
