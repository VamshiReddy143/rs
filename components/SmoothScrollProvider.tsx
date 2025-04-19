"use client";

import Lenis from "lenis";
import { useEffect } from "react";

const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle data-scroll and data-scroll-speed with medium viewport-relative offset
    lenis.on("scroll", () => {
      const scrollElements = document.querySelectorAll("[data-scroll]");
      scrollElements.forEach((el) => {
        const speed = parseFloat(el.getAttribute("data-scroll-speed") || "1");
        const rect = el.getBoundingClientRect();
        const viewportCenter = window.innerHeight / 2;
        const distanceFromCenter = rect.top - viewportCenter;

        // Calculate offsetY and scale
        const offsetY = distanceFromCenter * speed * -0.05; // Medium slide intensity
        const scale = 1 + Math.abs(distanceFromCenter) * 0.00005; // Gentle scale effect

        // Apply transform only when in or near viewport
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          (el as HTMLElement).style.transform = `translateY(${offsetY}px) scale(${scale})`;
        } else {
          (el as HTMLElement).style.transform = `translateY(0px) scale(1)`; // Reset when out of view
        }
      });
    });

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;