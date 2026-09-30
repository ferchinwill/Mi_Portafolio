import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Award,
  GraduationCap,
  BookOpen,
  Languages,
  Code2,
  PenTool,
  Briefcase,
  Database,
  Terminal,
  Sparkles,
  MapPin,
  Globe,
  ExternalLink,
  PlaneTakeoff,
  CheckCircle2,
  X,
  Maximize2
} from 'lucide-react';
import { TechIcon, techDetailsMap, type TechKey } from './TechIcons';

interface CertificateModalData {
  title: string;
  subtitle: string;
  url: string;
  type: 'pdf' | 'image';
}

// Icono vectorial oficial de Facebook
const FacebookIcon: React.FC<{ size?: number }> = ({ size = 12 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// Bandera vectorial de México de alta definición
const MexicoFlag: React.FC = () => (
  <svg
    viewBox="0 0 60 42"
    className="flag-svg"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Bandera de México"
  >
    <defs>
      <clipPath id="mx-round">
        <rect width="60" height="42" rx="5" />
      </clipPath>
    </defs>
    <g clipPath="url(#mx-round)">
      {/* Franja verde */}
      <rect x="0" y="0" width="20" height="42" fill="#006847" />
      {/* Franja blanca */}
      <rect x="20" y="0" width="20" height="42" fill="#FFFFFF" />
      {/* Franja roja */}
      <rect x="40" y="0" width="20" height="42" fill="#CE1126" />
      {/* Escudo Nacional Mexicano estilizado */}
      <g transform="translate(30, 21)">
        {/* Nopal y base */}
        <path d="M-6,8 C-4,5 4,5 6,8 C4,9 -4,9 -6,8 Z" fill="#2E7D32" />
        <ellipse cx="-4" cy="5" rx="3" ry="4" fill="#388E3C" />
        <ellipse cx="4" cy="5" rx="3" ry="4" fill="#388E3C" />
        <ellipse cx="0" cy="3" rx="4" ry="4" fill="#43A047" />
        {/* Águila real */}
        <path d="M-4,-2 C-6,-8 0,-10 3,-7 C5,-5 4,0 2,3 C-1,4 -3,2 -4,-2 Z" fill="#5D4037" />
        <path d="M-5,-4 C-9,-7 -7,-2 -4,0 Z" fill="#795548" />
        {/* Detalles dorados / pico */}
        <circle cx="3" cy="-7" r="1.5" fill="#FBC02D" />
        {/* Serpiente */}
        <path d="M3,-7 Q6,-9 4,-11 Q1,-10 2,-8" stroke="#2E7D32" strokeWidth="1" fill="none" />
        {/* Guirnalda de laurel */}
        <path d="M-7,6 Q0,11 7,6" stroke="#1B5E20" strokeWidth="1.2" fill="none" />
        <circle cx="-5" cy="8" r="0.8" fill="#CE1126" />
        <circle cx="5" cy="8" r="0.8" fill="#CE1126" />
      </g>
    </g>
  </svg>
);

// Bandera vectorial de USA de alta definición
const UsaFlag: React.FC = () => (
  <svg
    viewBox="0 0 60 42"
    className="flag-svg"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Bandera de Estados Unidos"
  >
    <defs>
      <clipPath id="us-round">
        <rect width="60" height="42" rx="5" />
      </clipPath>
    </defs>
    <g clipPath="url(#us-round)">
      {/* 13 Franjas rojas y blancas */}
      {Array.from({ length: 13 }).map((_, i) => (
        <rect
          key={i}
          x="0"
          y={(i * 42) / 13}
          width="60"
          height={42 / 13 + 0.2}
          fill={i % 2 === 0 ? '#B22234' : '#FFFFFF'}
        />
      ))}
      {/* Cantón Azul */}
      <rect x="0" y="0" width="26" height={(7 * 42) / 13} fill="#3C3B6E" />
      {/* Estrellas */}
      <g fill="#FFFFFF">
        <circle cx="4.5" cy="4" r="1.1" />
        <circle cx="9.5" cy="4" r="1.1" />
        <circle cx="14.5" cy="4" r="1.1" />
        <circle cx="19.5" cy="4" r="1.1" />

        <circle cx="7" cy="8" r="1.1" />
        <circle cx="12" cy="8" r="1.1" />
        <circle cx="17" cy="8" r="1.1" />
        <circle cx="22" cy="8" r="1.1" />

        <circle cx="4.5" cy="12" r="1.1" />
        <circle cx="9.5" cy="12" r="1.1" />
        <circle cx="14.5" cy="12" r="1.1" />
        <circle cx="19.5" cy="12" r="1.1" />

        <circle cx="7" cy="16" r="1.1" />
        <circle cx="12" cy="16" r="1.1" />
        <circle cx="17" cy="16" r="1.1" />
        <circle cx="22" cy="16" r="1.1" />

        <circle cx="4.5" cy="19.5" r="1.1" />
        <circle cx="9.5" cy="19.5" r="1.1" />
        <circle cx="14.5" cy="19.5" r="1.1" />
        <circle cx="19.5" cy="19.5" r="1.1" />
      </g>
    </g>
  </svg>
);

export const About: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<CertificateModalData | null>(null);
  const [activeSkillTab, setActiveSkillTab] = useState<number>(0);
  const [isSkillsPaused, setIsSkillsPaused] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCert(null);
    };
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCert]);

  // Slider automático cada 5 segundos
  useEffect(() => {
    if (isSkillsPaused) return;
    const interval = setInterval(() => {
      setActiveSkillTab((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [isSkillsPaused]);

  interface SkillItem {
    name: string;
    category: string;
    desc: string;
    color: string;
    glow: string;
    techs: TechKey[];
  }

  const frontEndSkills: SkillItem[] = [
    {
      name: 'React',
      category: 'Frontend & SPAs',
      desc: 'Desarrollo de SPAs reactivas y componentes reutilizables con Hooks.',
      color: '#61DAFB',
      glow: 'rgba(97, 218, 251, 0.25)',
      techs: ['react'],
    },
    {
      name: 'Flutter',
      category: 'Multiplataforma',
      desc: 'Creación de aplicaciones fluidas para web, Android e iOS con Dart.',
      color: '#47C5FB',
      glow: 'rgba(71, 197, 251, 0.25)',
      techs: ['flutter'],
    },
    {
      name: 'Tailwind & Bootstrap',
      category: 'CSS Frameworks',
      desc: 'Diseño responsivo ágil, sistemas de diseño utilitarios y componentes UI.',
      color: '#38BDF8',
      glow: 'rgba(56, 189, 248, 0.25)',
      techs: ['tailwind', 'bootstrap'],
    },
    {
      name: 'JavaScript & HTML5 / CSS3',
      category: 'Fundamentos Web',
      desc: 'Estructura semántica, lógica interactiva moderna (ES6+) y animaciones.',
      color: '#F7DF1E',
      glow: 'rgba(247, 223, 30, 0.25)',
      techs: ['javascript', 'html5', 'css3'],
    },
  ];

  const backEndSkills: SkillItem[] = [
    {
      name: 'Node.js',
      category: 'Runtime Backend',
      desc: 'Servidores ligeros, APIs asíncronas y lógica de servidor en tiempo real.',
      color: '#5FA04E',
      glow: 'rgba(95, 160, 78, 0.25)',
      techs: ['nodejs'],
    },
    {
      name: 'Laravel',
      category: 'Framework PHP',
      desc: 'Arquitectura MVC, migraciones de base de datos y endpoints REST seguros.',
      color: '#FF2D20',
      glow: 'rgba(255, 45, 32, 0.25)',
      techs: ['laravel'],
    },
    {
      name: 'RESTful APIs',
      category: 'Servicios Web',
      desc: 'Diseño, consumo y documentación de servicios web con Postman.',
      color: '#FF6C37',
      glow: 'rgba(255, 108, 55, 0.25)',
      techs: ['postman', 'restapi'],
    },
    {
      name: 'MySQL & XAMPP',
      category: 'Bases de Datos',
      desc: 'Modelado relacional, consultas SQL optimizadas y entornos locales.',
      color: '#00758F',
      glow: 'rgba(0, 117, 143, 0.25)',
      techs: ['mysql', 'xampp'],
    },
  ];

  const designTools: SkillItem[] = [
    {
      name: 'Figma & Adobe XD',
      category: 'Prototipado UX/UI',
      desc: 'Diseño de interfaces intuitivas, wireframes de alta fidelidad y design systems.',
      color: '#F24E1E',
      glow: 'rgba(242, 78, 30, 0.25)',
      techs: ['figma', 'adobexd'],
    },
    {
      name: 'Adobe Illustrator',
      category: 'Vectorial & Branding',
      desc: 'Creación de activos vectoriales, logotipos, iconografía e identidad visual.',
      color: '#FF9A00',
      glow: 'rgba(255, 154, 0, 0.25)',
      techs: ['illustrator'],
    },
    {
      name: 'Adobe Photoshop',
      category: 'Edición Digital',
      desc: 'Retoque fotográfico, composición gráfica y optimización de medios para web.',
      color: '#31A8FF',
      glow: 'rgba(49, 168, 255, 0.25)',
      techs: ['photoshop'],
    },
    {
      name: 'Premiere Pro & Canva',
      category: 'Multimedia & Social',
      desc: 'Edición de video, contenidos audiovisuales y piezas gráficas promocionales.',
      color: '#9999FF',
      glow: 'rgba(153, 153, 255, 0.25)',
      techs: ['premiere', 'canva'],
    },
  ];

  const environmentSkills: SkillItem[] = [
    {
      name: 'Git & GitHub',
      category: 'Control de Versiones',
      desc: 'Flujo de trabajo con ramas, commits convencionales y colaboración en equipo.',
      color: '#F05032',
      glow: 'rgba(240, 80, 50, 0.25)',
      techs: ['git', 'github'],
    },
    {
      name: 'VS Code & Visual Studio',
      category: 'Entornos IDE',
      desc: 'Configuración personalizada, extensiones productivas y depuración eficiente.',
      color: '#007ACC',
      glow: 'rgba(0, 122, 204, 0.25)',
      techs: ['vscode', 'visualstudio'],
    },
    {
      name: 'Terminal CLI & CMD',
      category: 'Línea de Comandos',
      desc: 'Automatización de tareas, scripts, manejo de paquetes y utilidades de sistema.',
      color: '#4AF626',
      glow: 'rgba(74, 246, 38, 0.25)',
      techs: ['terminal', 'cmd'],
    },
    {
      name: 'Inteligencia Artificial',
      category: 'Productividad & IA',
      desc: 'Asistencia con LLMs para refactorización, depuración y aceleración de código.',
      color: '#10A37F',
      glow: 'rgba(16, 163, 127, 0.25)',
      techs: ['openai', 'gemini'],
    },
  ];

  const skillCategories = [
    {
      id: 'frontend',
      label: 'Front-End',
      fullName: 'Front-End Dev',
      subtitle: 'Interfaces Reactivas & Experiencias Web',
      icon: Code2,
      colorClass: 'blue',
      skills: frontEndSkills,
    },
    {
      id: 'backend',
      label: 'Back-End & APIs',
      fullName: 'Back-End & APIs',
      subtitle: 'Arquitectura del Servidor & Persistencia',
      icon: Database,
      colorClass: 'emerald',
      skills: backEndSkills,
    },
    {
      id: 'design',
      label: 'Diseño UX/UI',
      fullName: 'Diseño UX/UI & Gráfico',
      subtitle: 'Prototipado, Identidad & Medios Digitales',
      icon: PenTool,
      colorClass: 'violet',
      skills: designTools,
    },
    {
      id: 'environment',
      label: 'Entornos & DevOps',
      fullName: 'Entornos & Metodologías',
      subtitle: 'Herramientas de Desarrollo & Flujo Ágil',
      icon: Terminal,
      colorClass: 'cyan',
      skills: environmentSkills,
    },
  ];

  return (
    <section id="sobre-mi" className="py-20 relative">
      <div className="container relative z-10" style={{ maxWidth: '1200px' }}>
        {/* Section Title */}
        <div className="section-title-wrapper">
          <span className="section-subtitle">Trayectoria y Conocimientos</span>
          <h2 className="section-title">Sobre Mí</h2>
          <div className="section-line"></div>
        </div>

        {/* ========================================================
            Distribución en 3 Bloques:
            1. Experiencia Laboral (Columna Izquierda Completa)
            2. Educación Académica (Columna Derecha - Arriba)
            3. Idiomas con Banderas de México y USA (Columna Derecha - Abajo)
            ======================================================== */}
        <div className="about-grid">
          {/* ========================================================
              BLOQUE 1: Experiencia Laboral
              ======================================================== */}
          <div className="about-experience-col">
            <div className="glass-card experience-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  <Briefcase size={22} className="text-blue-500" /> Experiencia Laboral
                </h3>
                <span className="card-header-badge">3 Trayectorias</span>
              </div>

              <div className="timeline" style={{ marginTop: '0.5rem' }}>
                {/* Experiencia 1: HTV Telecom */}
                <div className="timeline-item">
                  <div className="timeline-marker">
                    <Briefcase size={12} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span className="timeline-date">2025 - 2026</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} /> Tampico, Tamps.
                    </span>
                  </div>
                  <h4 className="timeline-title" style={{ fontSize: '1.05rem', marginTop: '0.2rem' }}>Desarrollador Full-Stack Jr.</h4>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.2rem' }}>
                    <span className="timeline-institution" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      HTV Telecom S.A. de C.V.
                    </span>
                    <a
                      href="https://htvtelecom.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-web-link web"
                      title="Visitar sitio web oficial de HTV Telecom"
                    >
                      <Globe size={11} />
                      <span>Sitio Web</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.35rem', marginBottom: '0.5rem', lineHeight: '1.45' }}>
                    Desarrollo de soluciones tecnológicas internas para optimizar la gestión y operación de la empresa.
                  </p>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '1.15rem', margin: 0, lineHeight: '1.55' }}>
                    <li>Colaboración en el diseño, desarrollo y mantenimiento de una aplicación multiplataforma (web y móvil) con Flutter para rutas de fibra óptica y trazabilidad de cuadrillas.</li>
                    <li>Módulos operativos en tiempo real para registro y envío de reportes de campo.</li>
                    <li>Integración de APIs y almacenamiento con bases de datos para red técnica.</li>
                    <li>Optimización continua orientada a reducir incidencias y acelerar decisiones operativas.</li>
                  </ul>
                  <div className="role-tags">
                    <span className="role-tag">Flutter</span>
                    <span className="role-tag">Multiplataforma</span>
                    <span className="role-tag">APIs REST</span>
                    <span className="role-tag">Tiempo Real</span>
                    <span className="role-tag">Full-Stack</span>
                  </div>
                </div>

                {/* Experiencia 2: Market Tibiano */}
                <div className="timeline-item">
                  <div className="timeline-marker">
                    <Code2 size={12} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span className="timeline-date">2024 - 2025</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} /> Tampico, Tamps.
                    </span>
                  </div>
                  <h4 className="timeline-title" style={{ fontSize: '1.05rem', marginTop: '0.2rem' }}>Desarrollador Front-End</h4>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.2rem' }}>
                    <span className="timeline-institution" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      Market Tibiano S.A. de C.V.
                    </span>
                    <a
                      href="https://www.pctechdreams.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-web-link web"
                      title="Visitar sitio web oficial PCTech Dreams"
                    >
                      <Globe size={11} />
                      <span>PCTech Dreams</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '1.15rem', marginTop: '0.45rem', margin: 0, lineHeight: '1.55' }}>
                    <li>Contribución activa en el levantamiento, análisis y diseño de requerimientos técnicos para plataformas web interactivas.</li>
                    <li>Creación de interfaces intuitivas y adaptables para sistemas de gestión interna (UX/UI).</li>
                    <li>Implementación de maquetas y prototipos de alta fidelidad con diseño responsivo.</li>
                  </ul>
                  <div className="role-tags">
                    <span className="role-tag">Front-End</span>
                    <span className="role-tag">Diseño UX/UI</span>
                    <span className="role-tag">Prototipos</span>
                    <span className="role-tag">Web Interactiva</span>
                  </div>
                </div>

                {/* Experiencia 3: Colegio Henry Wallon */}
                <div className="timeline-item">
                  <div className="timeline-marker">
                    <Sparkles size={12} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                    <span className="timeline-date">2021 - 2024</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={12} /> Tampico, Tamps.
                    </span>
                  </div>
                  <h4 className="timeline-title" style={{ fontSize: '1.05rem', marginTop: '0.2rem' }}>Marketing & Redes Sociales</h4>
                  <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.2rem' }}>
                    <span className="timeline-institution" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                      Colegio Henry Wallon
                    </span>
                    <a
                      href="https://www.facebook.com/p/Colegio-Henry-Wallon-Tampico-61567580759900/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="company-web-link facebook"
                      title="Ver página oficial de Facebook de Colegio Henry Wallon"
                    >
                      <FacebookIcon size={11} />
                      <span>Facebook</span>
                      <ExternalLink size={10} />
                    </a>
                  </div>
                  <ul style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', paddingLeft: '1.15rem', marginTop: '0.45rem', margin: 0, lineHeight: '1.55' }}>
                    <li>Gestión estratégica de canales digitales (Facebook e Instagram), aumentando la interacción con la comunidad escolar.</li>
                    <li>Diseño de material publicitario (flyers, banners promocionales y anuncios) y producción multimedia audiovisual.</li>
                    <li>Administración y optimización de campañas publicitarias en Meta Ads, generando prospectos calificados.</li>
                  </ul>
                  <div className="role-tags">
                    <span className="role-tag">Meta Ads</span>
                    <span className="role-tag">Social Media</span>
                    <span className="role-tag">Diseño Gráfico</span>
                    <span className="role-tag">Multimedia</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              COLUMNA DERECHA:
              - BLOQUE 2: Educación Académica & Posgrados
              - BLOQUE 3: Idiomas (con banderas 🇲🇽 y 🇺🇸)
              ======================================================== */}
          <div className="about-side-col">
            {/* BLOQUE 2: Educación Académica */}
            <div className="glass-card education-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  <GraduationCap size={22} className="text-blue-500" /> Educación Académica
                </h3>
                <span className="card-header-badge">Universidad</span>
              </div>

              {/* Grado Universitario Principal */}
              <div className="timeline" style={{ marginTop: '0.75rem', gap: '1.25rem' }}>
                <div className="timeline-item" style={{ paddingLeft: '2rem' }}>
                  <div className="timeline-marker">
                    <GraduationCap size={12} />
                  </div>
                  <div className="edu-card-flex">
                    <div className="edu-card-info">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
                        <span className="timeline-date">2019 - 2024</span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tampico, Tamps.</span>
                      </div>
                      <h4 className="timeline-title" style={{ fontSize: '1rem', marginTop: '0.2rem' }}>
                        Ingeniería en Sistemas Computacionales
                      </h4>
                      <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.6rem', marginTop: '0.2rem' }}>
                        <span className="timeline-institution" style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                          Universidad Autónoma de Tamaulipas (UAT)
                        </span>
                        <a
                          href="https://www.uat.edu.mx"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="company-web-link web"
                          title="Visitar portal oficial de la UAT"
                        >
                          <Globe size={11} />
                          <span>uat.edu.mx</span>
                          <ExternalLink size={10} />
                        </a>
                      </div>
                      <p style={{ fontSize: '0.81rem', color: 'var(--text-secondary)', marginTop: '0.35rem', lineHeight: '1.5' }}>
                        Formación integral en desarrollo de software, algoritmos, arquitectura de sistemas, bases de datos y gestión de proyectos tecnológicos.
                      </p>
                    </div>

                    {/* Vista Previa Interactiva de Carta de Pasante */}
                    <div
                      className="edu-cert-preview portrait"
                      onClick={() => setSelectedCert({
                        title: 'Carta de Pasante',
                        subtitle: 'Ingeniería en Sistemas Computacionales • Universidad Autónoma de Tamaulipas',
                        url: '/certificados/preview-carta-pasante.jpg',
                        type: 'image'
                      })}
                      title="Clic para ver Carta de Pasante ampliada"
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src="/certificados/preview-carta-pasante.jpg"
                        alt="Vista previa Carta de Pasante UAT"
                        className="edu-cert-thumb"
                      />
                      <div className="edu-cert-overlay">
                        <Maximize2 size={16} />
                        <span className="edu-cert-overlay-text">Ver Carta</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Posgrado y Actividad Académica */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '1.25rem', paddingTop: '1.1rem', borderTop: '1px solid var(--border-color)' }}>
                <div className="edu-extra-item">
                  <div className="edu-card-flex" style={{ alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                      <div className="edu-extra-icon purple">
                        <Award size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#a78bfa', fontWeight: 700 }}>
                          Curso de Posgrado
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
                          Meta Marketing: Estrategias Digitales
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          Especialización en conversión, analítica y campañas digitales
                        </div>
                      </div>
                    </div>

                    {/* Vista Previa Interactiva de Certificado Posgrado */}
                    <div
                      className="edu-cert-preview"
                      onClick={() => setSelectedCert({
                        title: 'Certificado de Posgrado: Meta Marketing',
                        subtitle: 'Estrategias Digitales & Rendimiento Digital',
                        url: '/certificados/certificado-meta-marketing.jpg',
                        type: 'image'
                      })}
                      title="Clic para ver Certificado ampliado"
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src="/certificados/certificado-meta-marketing.jpg"
                        alt="Vista previa Certificado Meta Marketing"
                        className="edu-cert-thumb"
                      />
                      <div className="edu-cert-overlay">
                        <Maximize2 size={16} />
                        <span className="edu-cert-overlay-text">Ver</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edu-extra-item">
                  <div className="edu-card-flex" style={{ alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.85rem', flex: 1, minWidth: 0 }}>
                      <div className="edu-extra-icon blue">
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#60a5fa', fontWeight: 700 }}>
                          Investigación Académica
                        </div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.1rem' }}>
                          Coloquio de Investigación
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                          Participación formal en presentación académica (Noviembre 2024)
                        </div>
                      </div>
                    </div>

                    {/* Vista Previa Interactiva de Certificado Coloquio */}
                    <div
                      className="edu-cert-preview"
                      onClick={() => setSelectedCert({
                        title: 'Certificado VI Coloquio de Investigación',
                        subtitle: 'Participación y Presentación en Coloquio Académico',
                        url: '/certificados/preview-certificado-coloquio.jpg',
                        type: 'image'
                      })}
                      title="Clic para ver Certificado del Coloquio ampliado"
                      role="button"
                      tabIndex={0}
                    >
                      <img
                        src="/certificados/preview-certificado-coloquio.jpg"
                        alt="Vista previa Certificado VI Coloquio"
                        className="edu-cert-thumb"
                      />
                      <div className="edu-cert-overlay">
                        <Maximize2 size={16} />
                        <span className="edu-cert-overlay-text">Ver</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* BLOQUE 3: Idiomas */}
            <div className="glass-card languages-card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                  <Languages size={22} className="text-blue-500" /> Idiomas & Movilidad
                </h3>
                <span className="card-header-badge">Visa & Pasaporte</span>
              </div>

              <div className="languages-list" style={{ marginTop: '0.5rem' }}>
                {/* Idioma 1: Español (Bandera de México) */}
                <div className="language-box">
                  <MexicoFlag />
                  <div className="language-content">
                    <div className="language-header">
                      <span className="language-name">
                        Español
                      </span>
                      <span className="language-badge native">Nativo</span>
                    </div>
                    <div className="language-desc">
                      Lengua materna • Comunicación fluida a nivel técnico, ejecutivo y profesional.
                    </div>
                    <div className="lang-bar-bg">
                      <div className="lang-bar-fill blue" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Idioma 2: Inglés (Bandera de USA) */}
                <div className="language-box">
                  <UsaFlag />
                  <div className="language-content">
                    <div className="language-header">
                      <span className="language-name">
                        Inglés
                      </span>
                      <span className="language-badge intermediate">Nivel Intermedio (B2)</span>
                    </div>
                    <div className="language-desc">
                      Lectura e interpretación de documentación técnica, redacción y comunicación laboral.
                    </div>
                    <div className="lang-bar-bg">
                      <div className="lang-bar-fill indigo" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Disponibilidad para Viajar (Pasaporte y Visa Americana) */}
                <div className="travel-mobility-box">
                  <div className="travel-mobility-icon">
                    <PlaneTakeoff size={22} />
                  </div>
                  <div className="travel-mobility-content">
                    <div className="travel-mobility-header">
                      <span className="travel-mobility-title">Disponibilidad para Viajar</span>
                      <span className="travel-mobility-badge">Documentación Vigente</span>
                    </div>
                    <p className="travel-mobility-desc">
                      Cuento con <strong>Pasaporte</strong> y <strong>Visa Americana</strong> vigentes, con plena disposición y facilidad para traslados laborales, comisiones técnicas o reubicación.
                    </p>
                    <div className="travel-docs-tags">
                      <span className="travel-doc-tag">
                        <CheckCircle2 size={13} style={{ color: '#10b981' }} /> Pasaporte Vigente
                      </span>
                      <span className="travel-doc-tag">
                        <CheckCircle2 size={13} style={{ color: '#10b981' }} /> Visa Americana
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================
            Habilidades Técnicas y Herramientas (Split + Tabs + Slider 5s)
            ======================================================== */}
        <div style={{ marginTop: '3.5rem' }}>
          <div className="skills-interactive-layout">
            {/* Columna Izquierda: Título Grande, Descripción y Métricas */}
            <div className="skills-intro-col">
              <div>
                <span className="section-subtitle" style={{ fontSize: '0.8rem', display: 'block', marginBottom: '0.4rem' }}>
                  Stack & Especialidades
                </span>
                <h3 className="skills-main-title">
                  Habilidades<br />
                  <span className="skills-gradient-text">Técnicas</span>
                </h3>
                <p className="skills-intro-desc">
                  Trato de mejorar continuamente mi técnica en estas tecnologías, aplicando buenas prácticas de desarrollo, código limpio y diseño centrado en el usuario para crear soluciones escalables y de alto impacto.
                </p>
              </div>

              {/* Métricas destacadas */}
              <div>
                <div className="skills-metrics-list">
                  <div className="skills-metric-item">
                    <span className="metric-number">16+</span>
                    <span className="metric-label">Tecnologías Clave</span>
                  </div>
                  <div className="skills-metric-item">
                    <span className="metric-number">4</span>
                    <span className="metric-label">Especialidades</span>
                  </div>
                  <div className="skills-metric-item">
                    <span className="metric-number">100%</span>
                    <span className="metric-label">Código Moderno</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Botones de Pestañas + Cards de la Categoría Activa */}
            <div
              className="skills-content-col"
              onMouseEnter={() => setIsSkillsPaused(true)}
              onMouseLeave={() => setIsSkillsPaused(false)}
            >
              {/* Botones de Pestañas Arriba */}
              <div className="skills-tabs-bar" role="tablist">
                {skillCategories.map((cat, idx) => {
                  const IconComp = cat.icon;
                  const isActive = activeSkillTab === idx;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`skill-tab-btn ${cat.colorClass} ${isActive ? 'active' : ''}`}
                      onClick={() => setActiveSkillTab(idx)}
                    >
                      <IconComp size={16} />
                      <span>{cat.label}</span>
                      {isActive && !isSkillsPaused && (
                        <span className="tab-progress-line" key={`progress-${activeSkillTab}`} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Panel de Cards de la Pestaña Activa */}
              <div className="skills-active-panel">
                <div className="skills-active-header">
                  <div className="skills-active-title-group">
                    {(() => {
                      const ActiveIcon = skillCategories[activeSkillTab].icon;
                      return (
                        <div className={`bento-header-icon ${skillCategories[activeSkillTab].colorClass}`}>
                          <ActiveIcon size={18} />
                        </div>
                      );
                    })()}
                    <div>
                      <h4 className="skills-panel-heading">
                        {skillCategories[activeSkillTab].fullName}
                      </h4>
                      <span className="skills-panel-sub">
                        {skillCategories[activeSkillTab].subtitle}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Cuadrícula de tarjetas con iconos oficiales transparentes a la izquierda (apilados si son múltiples) */}
                <div className="skills-cards-grid">
                  {skillCategories[activeSkillTab].skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="bento-skill-item"
                      style={{
                        '--brand-color': skill.color,
                        '--brand-glow': skill.glow,
                      } as React.CSSProperties}
                    >
                      <div className={`bento-icon-wrapper ${skill.techs.length > 1 ? 'stacked' : ''}`}>
                        {skill.techs.map((tech) => (
                          <div
                            key={tech}
                            className="bento-icon-chip"
                            title={techDetailsMap[tech]?.label || tech}
                          >
                            <TechIcon
                              name={tech}
                              size={skill.techs.length > 2 ? 18 : skill.techs.length > 1 ? 20 : 28}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="bento-skill-body">
                        <div className="bento-skill-top">
                          <span className="bento-skill-name">{skill.name}</span>
                          <span className="bento-skill-cat">{skill.category}</span>
                        </div>
                        <p className="bento-skill-desc">{skill.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Visualización de Certificados y Carta de Pasante */}
      {selectedCert &&
        createPortal(
          <div
            className="cert-modal-backdrop"
            onClick={() => setSelectedCert(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Visualización de ${selectedCert.title}`}
          >
            <div
              className="cert-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <div className="cert-modal-header-info">
                  <h4 className="cert-modal-title">{selectedCert.title}</h4>
                  <div className="cert-modal-subtitle">{selectedCert.subtitle}</div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className="cert-close-btn"
                  aria-label="Cerrar modal"
                  title="Cerrar (Esc)"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="cert-modal-body">
                <img
                  src={selectedCert.url}
                  alt={selectedCert.title}
                  className="cert-modal-img"
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  style={{ userSelect: 'none' }}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
};
