/**
 * Shared animation variants that can be reused across components
 * This helps maintain consistency in animations across the cart page
 */

// Card animation variants
export const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", damping: 25, stiffness: 500 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };
  
  // List item animation variants
  export const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05, duration: 0.3 },
    }),
    exit: { opacity: 0, x: 20, transition: { duration: 0.2 } },
    removed: {
      opacity: 0,
      x: -100,
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        height: { delay: 0.1 },
        marginTop: { delay: 0.1 },
        marginBottom: { delay: 0.1 },
      },
    },
  };
  
  // Toast notification animation variants
  export const toastVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  
  // Page transition animation variants
  export const pageTransitionVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };
  
  // Fade in with configurable delay
  export const fadeInWithDelay = (delay: number = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { delay, duration: 0.3 }
    },
    exit: { opacity: 0, y: 20 }
  });
  
  // Button hover/tap animations
  export const buttonHoverVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };
  
  // Icon hover/tap animations
  export const iconHoverVariants = {
    hover: { y: -2 },
    tap: { scale: 0.9 }
  };
  
  // Scale animation for elements that should grow/shrink
  export const scaleVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", damping: 15, stiffness: 400 }
    },
    exit: { scale: 0.9, opacity: 0 }
  };
  
  // Staggered children animation for lists
  export const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  // Child animation to use with staggered containers
  export const staggerItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 20 }
    }
  };
  
  // Slide in from side animation
  export const slideInVariants = (direction: 'left' | 'right' = 'right') => ({
    hidden: { 
      x: direction === 'left' ? -100 : 100, 
      opacity: 0 
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 500 }
    },
    exit: {
      x: direction === 'left' ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  });
  
  // Bounce animation for attention-grabbing elements
  export const bounceVariants = {
    initial: { scale: 1 },
    bounce: {
      scale: [1, 1.1, 0.9, 1.05, 0.95, 1],
      transition: { duration: 0.8 }
    }
  };
  
  // Pulse animation for subtle emphasis
  export const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: { 
        duration: 2,
        repeat: Infinity,
        repeatType: "loop" 
      }
    }
  };