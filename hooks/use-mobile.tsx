'use client'

import { useState, useEffect } from "react"

const MOBILE_BREAKPOINT = 768

export function useMobile(){
    const [isMobile,setIsMobile] = useState<boolean | undefined>(undefined)
    const [isSmallScreen, setIsSmallScreen] = useState(false)

    useEffect(() => {
      // Check if user agent indicates mobile device
      const checkMobileDevice = () => {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      };

      // Check screen size
      const checkScreenSize = () => {
        setIsSmallScreen(window.innerWidth < MOBILE_BREAKPOINT);
        setIsMobile(
          window.innerWidth < MOBILE_BREAKPOINT || checkMobileDevice()
        );
      };

      // Initial check
      checkScreenSize();

      // Add resize listener
      window.addEventListener('resize', checkScreenSize);

      // Clean up
      return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    return { isMobile : !!isMobile, isSmallScreen}
}