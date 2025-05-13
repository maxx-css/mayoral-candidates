"use client"
import React, { createContext, useContext, useState } from 'react';
import type { Candidate } from './candidate-data';

type ViewMode = 'single' | 'comparison' | 'grid' | 'preview' | 'selector';

interface CanvasContextType {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  selectedCandidates: Candidate[];
  setSelectedCandidates: (candidates: Candidate[]) => void;
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined);

export function CanvasProvider({ children }: { children: React.ReactNode }) {
  const [viewMode, setViewMode] = useState<ViewMode>('single');
  const [selectedCandidates, setSelectedCandidates] = useState<Candidate[]>([]);

  return (
    <CanvasContext.Provider
      value={{
        viewMode,
        setViewMode,
        selectedCandidates,
        setSelectedCandidates,
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
