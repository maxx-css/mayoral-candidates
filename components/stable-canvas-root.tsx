'use client';

import { useRef, useEffect } from 'react';
import { useCanvasContext } from '@/lib/canvas-context';

export default function StableCanvasRoot() {
  const rootRef = useRef<HTMLDivElement>(null);
  const { setTargetElement } = useCanvasContext();

  //Set the target element once and never change it
  useEffect(() => {
    if (rootRef.current) {
      setTargetElement(rootRef.current);
    }
  }, [setTargetElement]);

  return (
    <div
      ref={rootRef}
      id='stable-canvas-root'
      className='fixed inset-0'
      
    />
  );
}
