// components/global-canvas.tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect } from 'react';
import { Environment, OrbitControls } from '@react-three/drei';
import { useCanvasContext } from '@/lib/canvas-context';
import CandidateModel from './candidate-model';
import CandidateGrid from './candidate-grid';
import { createPortal } from 'react-dom';

export default function GlobalCanvas() {
  const { viewMode, selectedCandidates, targetRef } = useCanvasContext();

  useEffect(() => {
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log('WebGL context lost - will attempt to restore');
    };

    const handleContextRestored = () => {
      console.log('WebGL context restored successfully');
    };

    const canvas = document.querySelector('canvas');
    if (canvas) {
      canvas.addEventListener('webglcontextlost', handleContextLost);
      canvas.addEventListener('webglcontextrestored', handleContextRestored);
    }

    return () => {
      if (canvas) {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
        canvas.removeEventListener(
          'webglcontextrestored',
          handleContextRestored
        );
      }
    };
  }, []);

  useEffect(() => {
    fetch('/assets/max2.glb')
      .then((response) => {
        if (response.ok) {
          console.log('Model File Exists');
        } else {
          console.error('Model file not found:', response.status);
        }
      })
      .catch((error) => {
        console.error('Error checking modal file', error);
      });
  }, []);

  if (!targetRef.current) {
    //If not target element has been registered, don't render
    console.log('No target element registered for canvas');

    return null;
  }

  return createPortal(
    <div className='w-full h-full'>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          failIfMajorPerformanceCaveat: false,
          //import for performance
          alpha: true,
          preserveDrawingBuffer: true,
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />

          {/*Comparison Mode*/}
          {viewMode === 'comparison' && selectedCandidates.length === 2 && (
            <>
              <CandidateModel
                candidate={selectedCandidates[0]}
                position={[-2.5, 0, 0]}
              />
              <CandidateModel
                candidate={selectedCandidates[1]}
                position={[2.5, 0, 0]}
              />
            </>
          )}

          {/*Single candidate modes*/}
          {(viewMode === 'single' ||
            viewMode === 'preview' ||
            viewMode === 'selector') && selectedCandidates.length > 0 && (
              <CandidateModel candidate={selectedCandidates[0]} />
            )}

          {/*Grid Mode*/}
          {viewMode === 'grid' && selectedCandidates.length > 0 && (
            <CandidateGrid candidates={selectedCandidates} />
          )}

          <Environment preset='city' />
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
          />
        </Suspense>
      </Canvas>
    </div>,
    targetRef.current
  );
}
