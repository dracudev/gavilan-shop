"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HeroVariant, DEFAULT_HERO_VARIANT } from "./hero-variants";

interface HeroSectionProps {
  variant?: HeroVariant;
  className?: string;
}

export const HeroSection = ({
  variant = DEFAULT_HERO_VARIANT,
  className = "",
}: HeroSectionProps) => {
  const scrollToProducts = () => {
    const heroHeight = window.innerHeight - 64; // 64px = 4rem navbar height
    window.scrollTo({
      top: heroHeight,
      behavior: "smooth",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 150,
        damping: 10,
      },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <section
      className={`hero-section relative h-[calc(100vh-4rem)] w-screen overflow-hidden ${className}`}
      role="banner"
      aria-label="El Gavilán Hero Section"
    >
      {/* Background Image */}
      <div className="hero-section__background absolute inset-0 z-0">
        <div className="relative h-full w-full">
          {/* Mobile Banner */}
          <Image
            src="/img/banner-gav-mobile.jpg"
            alt="El Gavilán traditional storefront in Alicante, showcasing hats, bags, and accessories"
            fill
            className="object-cover object-center block sm:hidden"
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli/hSBc/wTT9pGPaV8x8BOdO+Y0wovJdSE5gg=="
          />

          {/* Desktop Banner */}
          <Image
            src="/img/banner-gav.jpg"
            alt="El Gavilán traditional storefront in Alicante, showcasing hats, bags, and accessories"
            fill
            className="object-cover object-center hidden sm:block"
            priority
            quality={90}
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyLli/hSBc/wTT9pGPaV8x8BOdO+Y0wovJdSE5gg=="
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        className="hero-section__content relative z-10 flex h-full items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              className="hero-section__text space-y-8 text-white"
              variants={itemVariants}
            >
              {/* Main Headline */}
              <motion.h1
                className="hero-section__headline text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-title font-bold leading-tight tracking-tight"
                variants={itemVariants}
              >
                <span className="block text-white drop-shadow-lg">
                  {variant.headline}
                </span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                className="hero-section__subheading text-lg sm:text-xl lg:text-2xl leading-relaxed text-white/90 max-w-2xl font-body"
                variants={itemVariants}
              >
                {variant.subheading}
              </motion.p>

              {/* Call-to-Action */}
              <motion.div
                className="hero-section__actions flex flex-col sm:flex-row gap-4 pt-4"
                variants={itemVariants}
              >
                {/* Primary CTA */}
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <button
                    onClick={scrollToProducts}
                    className="hero-section__cta-primary inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold text-lg rounded-lg shadow-lg backdrop-blur-sm border border-primary/20 transition-all duration-300 hover:bg-primary/90 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/30 min-w-[200px]"
                    aria-label={`${variant.primaryCtaText} - Scroll to browse our featured collection`}
                  >
                    <span>{variant.primaryCtaText}</span>
                    <svg
                      className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </motion.div>

                {/* Secondary CTA */}
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    href="/about"
                    className="hero-section__cta-secondary inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold text-lg rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:bg-white/20 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white/30 min-w-[200px]"
                    aria-label={`${variant.secondaryCtaText} - Learn about our heritage and craftsmanship`}
                  >
                    <span>{variant.secondaryCtaText}</span>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Highlights */}
              <motion.div
                className="hero-section__highlights flex flex-wrap gap-6 pt-8 text-sm text-white/80"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Artisanal Craftsmanship</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Premium Materials</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Traditional Excellence</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Statistics Column */}
            <motion.div
              className="hero-section__stats hidden lg:flex justify-end items-center"
              variants={itemVariants}
            >
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse" />

                {/* Statistics Card */}
                <motion.div
                  className="relative bg-primary/90 backdrop-blur-sm rounded-2xl p-8 border border-primary/30 shadow-2xl"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-center space-y-4">
                    <div className="text-6xl sm:text-7xl lg:text-8xl font-title font-bold text-white">
                      +145
                    </div>
                    <div className="h-1 w-16 bg-white/80 mx-auto rounded-full" />
                    <div className="text-lg font-semibold text-white/90 uppercase tracking-wide">
                      Years of Excellence
                    </div>
                    <div className="text-sm text-white/70 max-w-xs">
                      Authentic Spanish craftsmanship from the heart of Alicante
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
