import React, { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Referencias para las posiciones del dot y del anillo elástico
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Detectar si es dispositivo táctil para no renderizar en móviles/tablets
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      if (!isVisible) {
        setIsVisible(true);
        ringPos.current = { x: e.clientX, y: e.clientY };
      }

      // Detectar si el elemento bajo el cursor es interactivo
      const target = e.target as HTMLElement | null;
      if (target) {
        const isInteractive = Boolean(
          target.closest('a, button, input, textarea, select, [role="button"], [role="tab"], .glass-card, .bento-skill-item, .project-card, .btn-marco-cv, .hero-marco-badge, .bento-icon-chip, .clean-thumb-btn, .clean-gallery-arrow, .window-dot, .project-demo-open-external, .project-demo-fullscreen-btn, .project-demo-close-btn')
        );
        setIsHovered(isInteractive);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnterWindow = () => setIsVisible(true);
    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      setIsHovered(false);
      setIsClicking(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);

    // Animación suave a 60fps con inercia elástica (lerp)
    let animationFrameId: number;

    const animate = () => {
      // Inercia elástica para el anillo exterior
      const ease = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      // Actualizar el punto central (instantáneo)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
      }

      // Actualizar el anillo exterior (con retraso elástico)
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
    };
  }, [isVisible]);

  if (isTouchDevice) {
    return null;
  }

  return createPortal(
    <>
      {/* Punto Central Nítido (Sigue el mouse con precisión) */}
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isVisible ? 'visible' : ''} ${isHovered ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
        aria-hidden="true"
      />

      {/* Anillo / Halo Tecnológico Elástico (Sigue con inercia suave) */}
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${isVisible ? 'visible' : ''} ${isHovered ? 'hover' : ''} ${isClicking ? 'clicking' : ''}`}
        aria-hidden="true"
      />
    </>,
    document.body
  );
};
