"use client"
import React, { createContext, useContext, useState, useRef, RefObject } from 'react';
import type { Candidate } from './candidate-data';

type ViewMode = 'single' | 'comparison' | 'grid' | 'preview' | 'selector';

interface CanvasContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedCandidates: Candidate[];
  setSelectedCandidates: (candidates: Candidate[]) => void;
  targetRef: RefObject<HTMLDivElement | null>;
  setTargetElement: (element: HTMLDivElement | null) => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);
  const targetRef = useRef<HTMLDivElement | null>(null);

  const setTargetElement = (element: HTMLDivElement | null) => {
    if (element){
      targetRef.current = element
    }
  }

  return (
    <CanvasContext.Provider
      value={{
        viewMode,
        setViewMode,
        selectedCandidates,
        setSelectedCandidates,
        targetRef,
        setTargetElement
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
}

export const useCanvasContext = () => {
  const context = useContext(CanvasContext);
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  return context;
};
