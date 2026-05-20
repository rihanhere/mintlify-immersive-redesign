import React, { useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import Lenis from 'lenis';
import Experience from './components/Experience';
import Overlays from './components/Overlays';

export default function App() {
  const scrollProgress = useRef(0);

  useEffect(() => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // 2. Scroll Callback to Calculate Relative Scroll Progress [0 to 1]
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
      
      // Update Ref directly for extremely fast R3F updates without triggering React re-renders
      scrollProgress.current = progress;
      
      // Update global CSS custom property for scroll animations
      document.documentElement.style.setProperty('--scroll-progress', progress);
    };

    lenis.on('scroll', handleScroll);

    // 3. Keep local scroll active inside requestAnimationFrame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Initial trigger
    handleScroll();

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <>
      {/* 🚀 Global WebGL fixed Canvas Container */}
      <div id="canvas-container">
        <Canvas
          shadows
          dpr={[1, 2]} // Dynamic responsive resolution limits
          gl={{ 
            antialias: false, // Performance boost since postprocessing implements MSAA
            alpha: true,
            powerPreference: "high-performance"
          }}
          camera={{ position: [0, 0, 6], fov: 45 }}
        >
          <Experience scrollProgress={scrollProgress} />
        </Canvas>
      </div>

      {/* 📄 Beautiful HTML Editorial DOM Overlays on top of the Canvas */}
      <Overlays />
    </>
  );
}
