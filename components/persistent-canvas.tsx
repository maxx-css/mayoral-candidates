'use client';

import type React from 'react';
import { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FallbackCandidateView from './fallback-candidate-view';
import type { Candidate } from '@/lib/candidate-data';

//This component handles the camera and scene setup
function SceneSetup() {
  const { gl } = useThree();

  useEffect(() => {
    //Set renderer parameters for better performance
    gl.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);

    //Clean up function to prevent memory leaks
    return () => {
      //Dispose of the renderer when component unmounts
      gl.dispose();
    };
  }, [gl]);

  return null;
}

//This component handles WebGL context events
function ContextEventHandler({ onContextLost }: { onContextLost: () => void }) {
  const { gl } = useThree();

  useEffect(() => {
    const canvas = gl.domElement;

    // Handle context loss
    const handleContextLost = (event: Event) => {
      event.preventDefault();
      console.log('WebGL context lost, attempting to restore...');
      onContextLost();
    };

    // Handle context restoration
    const handleContextRestored = () => {
      console.log('WebGL context restored');
    };

    // Add event listeners
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    // Clean up event listeners
    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [gl, onContextLost]);
  return null;
}

//This component renders the candidate model
function CandidateShape({ candidate }: { candidate: Candidate }) {
  return (
    <group>
      {/* Platform */}
      <mesh receiveShadow position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2, 2, 0.1, 32]} />
        <meshStandardMaterial color={candidate.color} />
      </mesh>

      {/* Candidate shape */}
      <mesh position={[0, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 2, 1.5]} />
        <meshStandardMaterial color={candidate.color} />
      </mesh>
    </group>
  );
}

//Simple error boundary component
function ErrorBoundary({
  children,
  onError,
}: {
  children: React.ReactNode;
  onError: () => void;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Set up global error handler for Three.js errors
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Check if this is a Three.js related error
      const errorString = args.join(' ');
      if (
        errorString.includes('THREE') ||
        errorString.includes('WebGL') ||
        errorString.includes('GL_')
      ) {
        setHasError(true);
        onError();
      }
      originalConsoleError(...args);
    };

    return () => {
      // Restore original console.error
      console.error = originalConsoleError;
    };
  }, [onError]);

  if (hasError) {
    return null; // Parent will handle fallback
  }

  return <>{children}</>;
}

interface PersistentCanvasProps {
  candidate: Candidate;
  height?: string;
}

export default function PersistentCanvas({
  candidate,
  height = 'h-full',
}: PersistentCanvasProps) {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState(true);
  const [hasRenderingFailed, setHasRenderingFailed] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Check if WebGL is available
    try {
      const canvas = document.createElement('canvas');
      const gl =
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLAvailable(!!gl);
    } catch (e) {
      console.error(e);
      setIsWebGLAvailable(false);
    }
  }, []);

  // Handle rendering errors
  const handleRenderingError = () => {
    console.log('Rendering failed, switching to fallback view');
    setHasRenderingFailed(true);
  };

  // If WebGL is not available or rendering has failed, use the fallback view
  if (!isWebGLAvailable || hasRenderingFailed) {
    return <FallbackCandidateView candidate={candidate} height={height} />;
  }

  return (
    <div className={`${height} relative`}>
      <ErrorBoundary onError={handleRenderingError}>
        <Canvas
          ref={canvasRef}
          shadows
          camera={{ position: [0, 0, 5], fov: 50 }}
          onCreated={({ gl }) => {
            // The canvas element is what we need to listen for WebGL context errors
            const canvas = gl.domElement;

            // Set up error handling for general canvas errors
            canvas.addEventListener('error', () => {
              handleRenderingError();
            });
          }}
        >
          {/* Scene setup */}
          <SceneSetup />

          {/* Context event handler */}
          <ContextEventHandler onContextLost={handleRenderingError} />

          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

          {/* Candidate model */}
          <CandidateShape candidate={candidate} />

          {/* Controls */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            rotateSpeed={0.5}
            autoRotate
            autoRotateSpeed={1}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
