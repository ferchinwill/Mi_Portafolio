import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import {
  X,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 18 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

export interface ProjectScreenshot {
  id: string;
  name: string;
  src: string;
  badge?: string;
  description?: string;
}

export interface ShowcaseProject {
  id: number;
  title: string;
  description: string;
  detailedDescription?: string;
  image?: string;
  screenshots?: ProjectScreenshot[];
  techs: {
    name: string;
    iconKey:
      | 'angular'
      | 'node'
      | 'leaf'
      | 'docker'
      | 'react'
      | 'flutter'
      | 'ts'
      | 'tailwind'
      | 'mysql'
      | 'supabase'
      | 'php'
      | 'bootstrap';
  }[];
  codeUrl: string;
  demoUrl?: string;
  stackblitzUrl?: string;
  wrapperBg: string;
  features?: string[];
  statusBadge?: string;
}

interface ProjectDemoModalProps {
  project: ShowcaseProject | null;
  onClose: () => void;
}

export const ProjectDemoModal: React.FC<ProjectDemoModalProps> = ({ project, onClose }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeScreenshotIdx, setActiveScreenshotIdx] = useState(0);
  const [imgFailed, setImgFailed] = useState(false);

  // Amazon Zoom states
  const [zoomActive, setZoomActive] = useState(false);
  const [lensPos, setLensPos] = useState({ x: 0, y: 0, width: 140, height: 140 });
  const [zoomBgPos, setZoomBgPos] = useState({ x: 0, y: 0 });
  const [zoomWindowSide, setZoomWindowSide] = useState<'right' | 'left'>('right');

  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const thumbnailsStripRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setImgFailed(false);
    setActiveScreenshotIdx(0);
    setZoomActive(false);
  }, [project?.id]);

  const screenshots: ProjectScreenshot[] =
    project?.screenshots && project.screenshots.length > 0
      ? project.screenshots
      : project?.image
      ? [{ id: 'main', name: project.title, src: project.image }]
      : [];

  const currentScreenshot = screenshots[activeScreenshotIdx] || null;
  const activeDisplayImg = currentScreenshot ? currentScreenshot.src : project?.image || '';

  const nextScreenshot = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveScreenshotIdx((prev) => (prev + 1) % screenshots.length);
  }, [screenshots.length]);

  const prevScreenshot = useCallback(() => {
    if (screenshots.length === 0) return;
    setActiveScreenshotIdx((prev) => (prev - 1 + screenshots.length) % screenshots.length);
  }, [screenshots.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') nextScreenshot();
      if (e.key === 'ArrowLeft') prevScreenshot();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextScreenshot, prevScreenshot, onClose]);

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (!thumbnailsStripRef.current) return;
    const thumbItem = thumbnailsStripRef.current.children[activeScreenshotIdx] as HTMLElement;
    if (thumbItem) {
      thumbItem.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [activeScreenshotIdx]);

  // Handle Amazon-style zoom lens calculation
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const imgRect = imageRef.current.getBoundingClientRect();

    const mouseX = e.clientX - imgRect.left;
    const mouseY = e.clientY - imgRect.top;

    // Boundary check
    if (mouseX < 0 || mouseX > imgRect.width || mouseY < 0 || mouseY > imgRect.height) {
      setZoomActive(false);
      return;
    }

    // Lens dimensions proportional to image size (e.g. 26% width)
    const lensW = Math.max(100, Math.min(180, imgRect.width * 0.28));
    const lensH = Math.max(80, Math.min(150, imgRect.height * 0.28));

    let lx = mouseX - lensW / 2;
    let ly = mouseY - lensH / 2;

    const maxLx = imgRect.width - lensW;
    const maxLy = imgRect.height - lensH;

    // Clamp coordinates within image
    lx = Math.max(0, Math.min(lx, maxLx));
    ly = Math.max(0, Math.min(ly, maxLy));

    // Percentages for background-position
    const percentX = maxLx > 0 ? (lx / maxLx) * 100 : 50;
    const percentY = maxLy > 0 ? (ly / maxLy) * 100 : 50;

    setLensPos({ x: lx, y: ly, width: lensW, height: lensH });
    setZoomBgPos({ x: percentX, y: percentY });

    // Amazon behavior: if cursor is on the right side of the image, show zoom box on the left, and vice versa
    if (mouseX > imgRect.width * 0.5) {
      setZoomWindowSide('left');
    } else {
      setZoomWindowSide('right');
    }

    setZoomActive(true);
  };

  const handleMouseLeave = () => {
    setZoomActive(false);
  };

  // Lock body scroll when modal is open to keep view perfectly centered and stable
  useEffect(() => {
    if (!project) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [project]);

  if (!project) return null;

  return createPortal(
    <div
      className="project-demo-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Vista de ${project.title}`}
    >
      <div
        className={`project-demo-window clean-mode ${isFullscreen ? 'fullscreen' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabecera limpia estilo ventana moderna */}
        <header className="project-demo-header clean-header">
          {/* Botones estilo macOS */}
          <div className="project-demo-window-controls">
            <button
              type="button"
              className="window-dot red"
              onClick={onClose}
              title="Cerrar modal"
              aria-label="Cerrar"
            />
            <button
              type="button"
              className="window-dot yellow"
              onClick={() => setIsFullscreen((prev) => !prev)}
              title={isFullscreen ? 'Restaurar tamaño' : 'Pantalla completa'}
              aria-label="Pantalla completa"
            />
            <button
              type="button"
              className="window-dot green"
              onClick={() => setIsFullscreen((prev) => !prev)}
              title={isFullscreen ? 'Restaurar tamaño' : 'Pantalla completa'}
              aria-label="Pantalla completa"
            />
          </div>

          {/* Título central limpio con contador de imágenes */}
          <div className="clean-modal-header-title">
            <span className="clean-modal-title-bold">{project.title}</span>
            {currentScreenshot && (
              <>
                <span className="clean-modal-title-sep">•</span>
                <span className="clean-modal-screen-name">{currentScreenshot.name}</span>
              </>
            )}
            {screenshots.length > 1 && (
              <span className="clean-modal-counter">
                ({activeScreenshotIdx + 1} / {screenshots.length})
              </span>
            )}
          </div>

          {/* Acciones mínimas: enlace GitHub, fullscreen y cerrar */}
          <div className="project-demo-header-actions">
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-demo-open-external"
              title="Ver código en GitHub"
            >
              <GithubIcon size={16} />
            </a>

            <button
              type="button"
              className="project-demo-fullscreen-btn"
              onClick={() => setIsFullscreen((prev) => !prev)}
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              type="button"
              className="project-demo-close-btn"
              onClick={onClose}
              title="Cerrar (Esc)"
            >
              <X size={18} />
            </button>
          </div>
        </header>

        {/* Contenedor central: Imagen en el centro con zoom tipo Amazon */}
        <div className="clean-modal-body">
          <div className="amazon-preview-wrapper" ref={containerRef}>
            <div
              className="amazon-img-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                ref={imageRef}
                key={activeDisplayImg}
                src={activeDisplayImg}
                alt={currentScreenshot ? currentScreenshot.name : project.title}
                className="amazon-main-image"
                onError={() => setImgFailed(true)}
              />

              {/* Lente rectangular semitransparente tipo Amazon */}
              {zoomActive && !imgFailed && (
                <div
                  className="amazon-zoom-lens"
                  style={{
                    left: `${lensPos.x}px`,
                    top: `${lensPos.y}px`,
                    width: `${lensPos.width}px`,
                    height: `${lensPos.height}px`,
                  }}
                />
              )}

              {/* Cuadrado flotante de Zoom tipo Amazon */}
              {zoomActive && !imgFailed && (
                <div
                  className={`amazon-zoom-result-window ${zoomWindowSide}`}
                  style={{
                    backgroundImage: `url("${activeDisplayImg}")`,
                    backgroundPosition: `${zoomBgPos.x}% ${zoomBgPos.y}%`,
                    backgroundSize: '280%',
                  }}
                >
                  <div className="amazon-zoom-badge">
                    <ZoomIn size={13} />
                    <span>Zoom 2.8x</span>
                  </div>
                </div>
              )}

              {/* Indicador sutil de hover zoom */}
              {!zoomActive && !imgFailed && (
                <div className="amazon-zoom-hint">
                  <ZoomIn size={13} />
                  <span>Pasa el cursor sobre la imagen para hacer zoom</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tira inferior con las demás imágenes en miniatura y flechas de navegación */}
        {screenshots.length > 1 && (
          <div className="clean-modal-gallery-bar">
            <button
              type="button"
              className="clean-gallery-arrow prev"
              onClick={prevScreenshot}
              title="Imagen anterior (Flecha Izq)"
              aria-label="Anterior"
            >
              <ChevronLeft size={22} />
            </button>

            <div className="clean-gallery-thumbnails" ref={thumbnailsStripRef}>
              {screenshots.map((s, idx) => {
                const isActive = activeScreenshotIdx === idx;
                return (
                  <button
                    key={s.id || idx}
                    type="button"
                    className={`clean-thumb-btn ${isActive ? 'active' : ''}`}
                    onClick={() => setActiveScreenshotIdx(idx)}
                    title={s.name}
                  >
                    <img src={s.src} alt={s.name} className="clean-thumb-img" />
                    <span className="clean-thumb-label">{s.name}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              className="clean-gallery-arrow next"
              onClick={nextScreenshot}
              title="Siguiente imagen (Flecha Der)"
              aria-label="Siguiente"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
