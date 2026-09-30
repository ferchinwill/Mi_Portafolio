import React from 'react';
import { ArrowUp, Mail, Download } from 'lucide-react';

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.9C17.18 3.03 14.69 2 12.04 2ZM12.05 3.67C14.25 3.67 16.31 4.53 17.87 6.09C19.42 7.65 20.28 9.72 20.28 11.92C20.28 16.46 16.58 20.15 12.04 20.15C10.56 20.15 9.11 19.76 7.85 19.01L7.55 18.83L4.43 19.65L5.26 16.61L5.06 16.29C4.24 14.99 3.8 13.47 3.8 11.91C3.81 7.37 7.5 3.67 12.05 3.67ZM9.05 7.61C8.88 7.61 8.61 7.67 8.38 7.92C8.15 8.17 7.5 8.78 7.5 10.02C7.5 11.26 8.4 12.45 8.53 12.62C8.66 12.79 10.27 15.28 12.75 16.35C14.81 17.24 15.23 17.06 15.68 17.02C16.13 16.98 17.13 16.43 17.33 15.85C17.53 15.27 17.53 14.78 17.47 14.67C17.41 14.56 17.25 14.5 17.01 14.38C16.77 14.26 15.59 13.68 15.37 13.6C15.15 13.52 14.99 13.48 14.83 13.73C14.67 13.98 14.21 14.51 14.07 14.67C13.93 14.83 13.79 14.85 13.55 14.73C13.31 14.61 12.54 14.36 11.62 13.54C10.9 12.9 10.42 12.11 10.28 11.87C10.14 11.63 10.26 11.5 10.38 11.38C10.49 11.27 10.63 11.09 10.75 10.95C10.87 10.81 10.91 10.71 10.99 10.55C11.07 10.39 11.03 10.25 10.97 10.13C10.91 10.01 10.45 8.87 10.26 8.41C10.07 7.96 9.88 8.02 9.74 8.01C9.61 8.01 9.45 8 9.29 8C9.13 8 9.05 7.61 9.05 7.61Z" />
  </svg>
);

const GithubIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="simple-footer">
      <div className="container simple-footer-inner">
        
        {/* Firma simple */}
        <div className="simple-footer-signature">
          <p className="signature-name">Fernando Moreno Wilches</p>
          <p className="signature-title">
            Ingeniero en Sistemas Computacionales • Full-Stack & UI/UX Developer
          </p>
          <p className="signature-location">
            Tampico, Tamaulipas, México • © {new Date().getFullYear()}
          </p>
        </div>

        {/* Enlaces Rápidos y CV */}
        <div className="simple-footer-links">
          <a
            href="https://github.com/ferchinwill"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-pill"
            title="GitHub"
          >
            <GithubIcon size={14} />
            <span>GitHub</span>
          </a>

          <a
            href="https://wa.me/528331553481"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link-pill"
            title="WhatsApp"
          >
            <WhatsAppIcon size={14} />
            <span>WhatsApp</span>
          </a>

          <a
            href="mailto:data_will23@hotmail.com"
            className="footer-link-pill"
            title="Correo Electrónico"
          >
            <Mail size={14} />
            <span>Correo</span>
          </a>

          <a
            href="/CV_Fernando_Moreno_Wilches.pdf"
            download="CV_Fernando_Moreno_Wilches.pdf"
            className="footer-link-pill cv"
            title="Descargar CV en PDF"
          >
            <Download size={14} />
            <span>Descargar CV</span>
          </a>
        </div>

        {/* Botón Volver Arriba */}
        <button
          type="button"
          onClick={scrollToTop}
          className="simple-footer-scrolltop"
          aria-label="Volver arriba"
          title="Volver arriba"
        >
          <ArrowUp size={16} />
        </button>

      </div>
    </footer>
  );
};
