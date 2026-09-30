import React from 'react';
import { Download, MapPin, Calendar } from 'lucide-react';

// Icono SVG de GitHub
const GithubIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
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

// Icono SVG de LinkedIn
const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

export const Hero: React.FC = () => {
  return (
    <section className="hero-marco-section" id="inicio">
      {/* ========================================================
          Estructura estilo Marco (Texto + Bio + Blob Foto con Borde Azul)
          ======================================================== */}

      {/* ========================================================
          Estructura estilo Marco (Texto + Bio + Blob Foto con Borde Azul)
          ======================================================== */}
      <div className="container" style={{ position: 'relative', zIndex: 10, maxWidth: '1200px' }}>
        <div className="hero-marco-grid">

          {/* Columna Izquierda: Saludo, Nombre, Badges, Bio y Botones */}
          <div className="hero-marco-left animate-fade-in">
            <h1 className="hero-marco-greeting">
              ¡Hola! <span className="greeting-emoji">✌️</span>
            </h1>

            <h2 className="hero-marco-name">
              Soy <span className="hero-name-blue">Fernando Moreno Wilches</span>
            </h2>

            <p className="hero-marco-role">
              Ingeniero en Sistemas Computacionales | Desarrollador Full-Stack / Front-End
            </p>

            {/* Badges de ubicación y edad */}
            <div className="hero-marco-badges">
              <span className="hero-marco-badge">
                <MapPin size={13} className="text-blue-400" /> Tampico, Tamaulipas
              </span>
              <span className="hero-marco-badge">
                <Calendar size={13} className="text-indigo-400" /> 25 Años
              </span>
            </div>

            {/* Párrafo Bio trasladado de Sobre Mí */}
            <p className="hero-marco-bio">
              Ingeniero en Sistemas Computacionales y desarrollador web especializado en construir soluciones digitales funcionales, escalables y de alto impacto visual. Amplia experiencia abarcando tanto el diseño de interfaces centradas en el usuario como la arquitectura y lógica del sistema. Profesional autodidacta con capacidad de adaptación continua, orientado a la resolución eficiente de problemas técnicos y a la adopción de herramientas de inteligencia artificial para acelerar flujos de trabajo, optimizar tiempos de entrega y maximizar la calidad del software.
            </p>

            {/* Fila de Botones: Descargar CV, GitHub y LinkedIn */}
            <div className="hero-marco-actions">
              <a
                href="/CV_Fernando_Moreno_Wilches.pdf"
                download="CV_Fernando_Moreno_Wilches.pdf"
                className="btn-marco-cv"
                title="Descargar Curriculum Vitae en formato PDF"
              >
                <Download size={17} />
                <span>Descargar CV</span>
              </a>

              <a
                href="https://github.com/ferchinwill"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-marco-social"
                title="Ver perfil de GitHub"
                aria-label="Perfil de GitHub"
              >
                <GithubIcon size={20} />
              </a>

              <a
                href="https://wa.me/528331553481"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-marco-social"
                title="Contactar directamente por WhatsApp"
                aria-label="WhatsApp / LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </div>

          {/* Columna Derecha: Foto de Fernando con Marco Orgánico Blob y Borde Azul */}
          <div className="hero-marco-right animate-fade-in">
            <div className="blob-photo-container">
              <div className="blob-photo-frame">
                <img
                  src="/foto-fernando.jpg"
                  alt="Fernando Moreno Wilches"
                  className="blob-photo-img"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
