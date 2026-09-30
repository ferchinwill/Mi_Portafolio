import React from 'react';
import { X, Calendar, Wrench, Palette, CheckCircle2 } from 'lucide-react';
import { ImagePlaceholder } from './ImagePlaceholder';

export interface ProjectItem {
  id: number;
  title: string;
  category: 'desarrollo-software' | 'marketing-digital' | 'identidad-visual' | 'diseno-corporativo';
  categoryLabel: string;
  description: string;
  detailedDescription: string;
  date: string;
  software: string[];
  colors: string[];
  highlights: string[];
  placeholderText: string;
  theme?: 'tech' | 'orion';
}

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="modal-overlay">
      {/* Backdrop */}
      <div 
        style={{ position: 'absolute', inset: 0 }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="modal-content">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="modal-close-btn"
          aria-label="Cerrar modal"
        >
          <X size={18} />
        </button>

        {/* Left column: Visual Showcase */}
        <div className="modal-left-col">
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ borderRadius: '0.75rem', overflow: 'hidden', border: '1px solid var(--border-color)' }}>
              <ImagePlaceholder 
                text={project.placeholderText} 
                aspectRatio="aspect-[4/3]"
                theme={project.theme || (project.category === 'desarrollo-software' ? 'tech' : 'orion')}
              />
            </div>
            <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
              Caso de estudio y especificaciones técnicas
            </p>
          </div>
        </div>

        {/* Right column: Project Details */}
        <div className="modal-right-col">
          <div className="modal-body">
            {/* Header */}
            <div>
              <span className="modal-badge">
                {project.categoryLabel}
              </span>
              <h3 className="modal-title">
                {project.title}
              </h3>
            </div>

            {/* Date */}
            <div className="modal-meta">
              <Calendar size={14} />
              <span>Proyecto creado en: {project.date}</span>
            </div>

            {/* Detailed description */}
            <div>
              <h4 className="modal-section-title">
                Descripción del Proyecto
              </h4>
              <p className="modal-text">
                {project.detailedDescription}
              </p>
            </div>

            {/* Highlights */}
            <div>
              <h4 className="modal-section-title">
                Tareas Realizadas
              </h4>
              <ul className="modal-list">
                {project.highlights.map((highlight, index) => (
                  <li key={index} className="modal-list-item">
                    <CheckCircle2 size={16} className="text-emerald-500" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Palette & Tools */}
            <div className="modal-meta-grid">
              {/* Tools */}
              <div className="modal-meta-section">
                <span className="modal-meta-label">
                  <Wrench size={12} /> Software
                </span>
                <div className="modal-tags">
                  {project.software.map((sw) => (
                    <span 
                      key={sw}
                      className="project-tag"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="modal-meta-section">
                <span className="modal-meta-label">
                  <Palette size={12} /> Colores
                </span>
                <div className="modal-tags">
                  {project.colors.map((color) => (
                    <span 
                      key={color} 
                      className="color-badge"
                    >
                      <span style={{ width: '0.625rem', height: '0.625rem', borderRadius: '50%', border: '1px solid rgba(0,0,0,0.1)', backgroundColor: color }} />
                      <span style={{ fontSize: '0.65rem', fontFamily: 'monospace', textTransform: 'uppercase' }}>{color}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={onClose}
              className="btn btn-secondary"
              style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
            >
              Cerrar Vista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
