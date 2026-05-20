import React from 'react';
import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import Synthesizer from './Synthesizer';

export default function Experience({ scrollProgress }) {
  return (
    <>
      {/* 💡 Cinematic Lighting Stage */}
      <ambientLight intensity={0.4} />
      
      {/* Warm Gold Spotlight for Refraction Accent */}
      <spotLight
        position={[8, 10, 5]}
        angle={0.4}
        penumbra={1}
        intensity={2.5}
        color="#f59e0b"
        castShadow
      />

      {/* Emerald Key Spotlight pointing at main Glass cards */}
      <spotLight
        position={[-8, 8, 4]}
        angle={0.5}
        penumbra={0.8}
        intensity={3}
        color="#10b981"
        castShadow
      />

      {/* Atmospheric Cyan Fill Point Light */}
      <pointLight
        position={[0, -2, 2]}
        intensity={1.5}
        color="#06b6d4"
      />

      {/* 🚀 Main WebGL Experience Core */}
      <Synthesizer scrollProgress={scrollProgress} />

      {/* 🎬 Premium Cinematic Post-Processing Pipeline */}
      <EffectComposer disableNormalPass multisampling={4}>
        {/* Soft, magical emissive bloom */}
        <Bloom 
          luminanceThreshold={0.15} 
          luminanceSmoothing={0.9} 
          mipmapBlur 
          intensity={1.2} 
        />
        
        {/* Cinematic Film Grain */}
        <Noise opacity={0.03} />
        
        {/* Spatial Edge Focus */}
        <Vignette eskil={false} offset={0.15} darkness={1.05} />
        
        {/* Movement-reactive Chromatic Aberration fringe */}
        <ChromaticAberration offset={[0.001, 0.001]} />
      </EffectComposer>
    </>
  );
}
