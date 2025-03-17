import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';
import React, { useRef } from 'react';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal // Smooths shadows over time
      frames={60}
      alphaTest={0.75} // Lowered for softer shadow edges
      scale={5} 
      rotation={[Math.PI / 2, 0, 0]} // Flat plane for shadow casting
      position={[0, 0, -0.14]} 
    >
      {/* Primary light source */}
      <RandomizedLight
        amount={4} // Fewer lights for a cleaner shadow
        radius={9} // Softens shadow edges
        intensity={1.2} // Strong but not overpowering
        ambient={0.3} 
        position={[5, 5, -8]} 
      />
      {/* Secondary light source */}
      <RandomizedLight
        amount={4} // Consistent with primary light
        radius={12} // Slightly softer for variation
        intensity={1.24} // Less intense for fill light
        ambient={0.5} // Higher ambient for softer fill
        position={[-3, 4, -7]} // Offset to simulate natural light bounce
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;