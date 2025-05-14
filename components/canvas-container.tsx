'use client'

import { forwardRef, HTMLAttributes } from 'react'

interface CanvasContainerProps extends HTMLAttributes<HTMLDivElement> {
  id? : string;
}

const CanvasContainer = forwardRef<HTMLDivElement, CanvasContainerProps>(({className, id = 'default', ...props}, ref) => {
  return (
    <div ref={ref} className={className || 'w-full h-full'} id={`canvas-container-${id}`} {...props}/>
  )
})

CanvasContainer.displayName = 'CanvasContainer';

export default CanvasContainer