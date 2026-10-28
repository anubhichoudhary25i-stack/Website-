import React, { useState, useEffect, useRef } from 'react';
import { useLiveProfile } from '@/hooks/useLiveProfile';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

interface HeroSectionProps {
  setActivePage?: (page: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ setActivePage }) => {
  const { profile } = useLiveProfile();
  const nameParts = profile.basics.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ');

  // ========== TYPING EFFECT STATE ==========
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullTagline = profile.basics.heroTagline || "Curious • Creative • Driven";
  const charIndexRef = useRef(0);

  // Typing effect - matches index23.html
  useEffect(() => {
    if (charIndexRef.current < fullTagline.length) {
      const timeout = setTimeout(() => {
        const currentIndex = charIndexRef.current;
        if (currentIndex < fullTagline.length) {
          const char = fullTagline.charAt(currentIndex);
          if (char) {
            setDisplayText(prev => prev + char);
          }
          charIndexRef.current = currentIndex + 1;
        }
        if (charIndexRef.current >= fullTagline.length) {
          setIsTypingComplete(true);
        }
      }, 80);
      return () => clearTimeout(timeout);
    } else {
      setIsTypingComplete(true);
    }
  }, [displayText, fullTagline]);

  // ========== ANIMATION VARIANTS ==========
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-[85vh] flex items-center relative overflow-hidden bg-gradient-to-br from-white via-[#fef8f6] to-[#fffdfc] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container max-w-content mx-auto px-4 py-12 md:py-20">

        <motion.div
          className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* ========== LEFT COLUMN: TEXT CONTENT ========== */}
          <div className="flex-1 text-center lg:text-left">

            {/* Heading with Highlight */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
              variants={itemVariants}
            >
              {firstName} <span className="text-primary">{lastName}</span>
            </motion.h1>

            {/* Typewriter Tagline */}
            <motion.div
              className="mb-6 pl-4 border-l-4 border-primary"
              variants={itemVariants}
            >
              <span className="text-lg md:text-xl font-medium text-primary">
                {displayText}
                {!isTypingComplete && (
                  <span className="animate-pulse ml-1">|</span>
                )}
              </span>
            </motion.div>

            {/* Role & Taglines */}
            {profile.basics.heroRoles && profile.basics.heroRoles.length > 0 && (
              <motion.div
                className="space-y-2 mb-6"
                variants={itemVariants}
              >
                {profile.basics.heroRoles.map((role, idx) => (
                  <p
                    key={idx}
                    className={idx === 0 ? "text-lg font-semibold text-primary" : "text-muted-foreground"}
                  >
                    {role}
                  </p>
                ))}
              </motion.div>
            )}

            {/* Credentials */}
            {profile.basics.heroCredentials && (
              <motion.p
                className="text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0"
                variants={itemVariants}
              >
                {profile.basics.heroCredentials}
              </motion.p>
            )}

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white"
                onClick={() => {
                  if (setActivePage) {
                    setActivePage('portfolio');
                  } else {
                    document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                View Portfolio
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary/10"
                onClick={() => {
                  if (setActivePage) {
                    setActivePage('contact');
                  } else {
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Let's Connect
              </Button>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              className="mt-12"
              variants={itemVariants}
            >
              <a
                href="#about"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  if (setActivePage) {
                    setActivePage('about');
                  } else {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span>Explore my journey</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </a>
            </motion.div>
          </div>

          {/* ========== RIGHT COLUMN: PROFILE IMAGE ========== */}
          <motion.div
            className="flex-shrink-0"
            variants={imageVariants}
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-4 border-white shadow-2xl cursor-pointer"
                whileHover={{
                  scale: 1.05,
                  rotate: 2,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={profile.basics.picture || '/anubhi.jpeg'}
                  alt={profile.basics.name}
                  className="w-full h-full object-cover object-[center_18%]"
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.src =
                      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='50' fill='%23fae9e4'/%3E%3Ctext x='50' y='50' text-anchor='middle' dy='.3em' fill='%23aa5b4e' font-size='40'%3E👤%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>

              {/* Decorative Ring - Pulsing */}
              <motion.div
                className="absolute -inset-2 rounded-full border-2 border-primary/20 -z-10"
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Decorative Ring 2 - Subtle rotation */}
              <motion.div
                className="absolute -inset-4 rounded-full border border-primary/10 -z-20"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* ========== BACKGROUND DECORATIVE ELEMENTS ========== */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-20 left-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl -z-10" />
    </section>
  );
};

export default HeroSection;