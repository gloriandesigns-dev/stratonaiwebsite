import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const BlurHeading = ({ children, className, as: Component = 'h2' }: { children: React.ReactNode, className?: string, as?: any }) => {
  const MotionComponent = motion(Component);
  return (
    <MotionComponent
      initial={{ opacity: 0, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

export const RiseCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggeredText = ({ text, className }: { text: string, className?: string }) => {
  const lines = text.split('\n');
  
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };
  
  const child = {
    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.5, ease: "easeOut" } },
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  };

  return (
    <motion.div className={className} variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }}>
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line.split(" ").map((word, wordIndex) => (
            <motion.span variants={child} key={`${lineIndex}-${wordIndex}`} className="inline-block mr-[0.25em]">
              {word}
            </motion.span>
          ))}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export const ScrollFillText = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "center center"]
  });

  const fillOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Stroked Text Layer */}
      <div className="absolute inset-0" style={{ WebkitTextStroke: '1.5px #FF4D2E', color: 'transparent' }}>
        {children}
      </div>
      {/* Solid Fill Text Layer */}
      <motion.div style={{ opacity: fillOpacity, color: '#FF4D2E' }}>
        {children}
      </motion.div>
    </div>
  );
};
