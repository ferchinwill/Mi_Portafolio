import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Code,
  Palette,
  Image as ImageIcon,
  Award,
  Sparkles,
  Maximize2,
  X,
  Layers,
  CheckCircle2,
  Film,
  Volume2,
  VolumeX,
  Eye,
} from 'lucide-react';
import { TechIcon, type TechKey } from './TechIcons';
import { ProjectDemoModal, type ShowcaseProject } from './ProjectDemoModal';

interface ReelItem {
  id: number | string;
  title: string;
  client: string;
  category: string;
  badge: string;
  duration: string;
  description: string;
  tools: TechKey[];
  videoUrl?: string;
  thumbnailUrl?: string;
}

interface DesignImage {
  id?: string;
  title: string;
  subtitle: string;
  badge?: string;
  src?: string;
}

interface DesignItem {
  id: number;
  title: string;
  category: string;
  badge: string;
  description: string;
  tools: TechKey[];
  layoutType: 'split-multi' | 'wide' | 'triple-gallery' | 'auto-slider';
  wrapperBg: string;
  isCertificate?: boolean;
  images: DesignImage[];
}

// Icono de GitHub para el botón de Código
const GithubIcon: React.FC<{ size?: number }> = ({ size = 17 }) => (
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

// Componentes SVG para las tecnologías de código con colores auténticos
const TechLogo: React.FC<{ type: ShowcaseProject['techs'][0]['iconKey'] }> = ({ type }) => {
  switch (type) {
    case 'angular':
      return (
        <svg width="22" height="22" viewBox="0 0 250 250" fill="none">
          <polygon points="125,30 125,30 125,30 31.9,63.2 46.1,186.3 125,230 125,230 125,230 203.9,186.3 218.1,63.2" fill="#DD0031" />
          <polygon points="125,30 125,52.2 125,52.1 125,153.4 125,153.4 125,230 203.9,186.3 218.1,63.2" fill="#C3002F" />
          <path d="M125,52.1L66.8,182.6H88.5L100.2,153.4H125H149.8L161.5,182.6H183.2L125,52.1ZM125,93.4L141.5,134.7H108.5L125,93.4Z" fill="#FFFFFF" />
        </svg>
      );
    case 'node':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#68A063">
          <path d="M12 2L3.5 6.9v9.8L12 21.6l8.5-4.9V6.9L12 2zm6.7 13.7L12 19.6l-6.7-3.9V7.9L12 4.1l6.7 3.8v7.8z" />
          <path d="M12 7.5L7.7 9.9v4.8L12 17.1l4.3-2.4V9.9L12 7.5z" />
        </svg>
      );
    case 'leaf':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#47A248">
          <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
        </svg>
      );
    case 'docker':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#2496ED">
          <path d="M13 10.5h-1.5V9H13v1.5zm-2 0H9.5V9H11v1.5zm-2 0H7.5V9H9v1.5zm-2 0H5.5V9H7v1.5zm6-2h-1.5V7H13v1.5zm-2 0H9.5V7H11v1.5zm-2 0H7.5V7H9v1.5zm6-2h-1.5V5H13v1.5zm-2 0H9.5V5H11v1.5zm10.9 6.2c-.3-.2-1.2-.5-2.2-.1-.2-.8-.8-1.5-1.5-1.9-.3-.2-.7-.3-1.1-.3H14v4.5h7.2c.4 0 .7-.1 1-.3.8-.5 1.1-1.3 1.1-1.9H23.3zM21 16.5c-.7 1.8-2.6 3-4.6 3H7.6c-2 0-3.9-1.2-4.6-3-.2-.5-.3-1-.3-1.5h18.6c0 .5-.1 1-.3 1.5z" />
        </svg>
      );
    case 'react':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.8">
          <ellipse cx="12" cy="12" rx="4" ry="11" />
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="4" ry="11" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        </svg>
      );
    case 'flutter':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#02569B">
          <path d="M14.314 0L2.3 12 6 15.7 21.686 0h-7.372zm.057 11.086l-7.057 7.057 3.686 3.686 7.057-7.057-3.686-3.686zm7.315 0L14.4 18.371l3.686 3.686 7.286-7.286h-3.686z" fill="#0175C2" />
        </svg>
      );
    case 'ts':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#3178C6">
          <rect width="24" height="24" rx="4" />
          <path d="M6 8h6v2.2H9.6V18H7.4v-7.8H6V8zm7.5 5.8c.6.5 1.4.8 2.2.8.8 0 1.2-.3 1.2-.7 0-.4-.4-.6-1.3-.9-1.5-.4-2.5-.9-2.5-2.2 0-1.5 1.2-2.3 2.7-2.3 1.1 0 1.9.3 2.5.8l-.6 1.7c-.5-.4-1.1-.6-1.9-.6-.7 0-1.1.3-1.1.7 0 .4.4.6 1.4.9 1.6.5 2.4 1.1 2.4 2.2 0 1.6-1.2 2.4-2.9 2.4-1.2 0-2.2-.4-2.8-1l.7-1.7z" fill="#FFFFFF" />
        </svg>
      );
    case 'tailwind':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#38BDF8">
          <path d="M12 6c-4 0-6 2-7.5 6 1.5-2 3-2.5 4.5-1.5.8.5 1.5 1.3 2.5 2.3 1.6 1.6 3.7 3.7 8 3.7 4 0 6-2 7.5-6-1.5 2-3 2.5-4.5 1.5-.8-.5-1.5-1.3-2.5-2.3C18.4 8.1 16.3 6 12 6zm-7.5 6C.5 12-1.5 14-3 18c1.5-2 3-2.5 4.5-1.5.8.5 1.5 1.3 2.5 2.3 1.6 1.6 3.7 3.7 8 3.7 4 0 6-2 7.5-6-1.5 2-3 2.5-4.5 1.5-.8-.5-1.5-1.3-2.5-2.3C7.4 14.1 5.3 12 .5 12z" />
        </svg>
      );
    case 'mysql':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#00758F">
          <path d="M12 3C7.58 3 4 4.79 4 7v10c0 2.21 3.58 4 8 4s8-1.79 8-4V7c0-2.21-3.58-4-8-4zm6 14c0 .88-2.69 2-6 2s-6-1.12-6-2v-2.35c1.61.85 3.71 1.35 6 1.35s4.39-.5 6-1.35V17zm0-4.5c0 .88-2.69 2-6 2s-6-1.12-6-2V10.15c1.61.85 3.71 1.35 6 1.35s4.39-.5 6-1.35V12.5zm0-5.5c0 .88-2.69 2-6 2s-6-1.12-6-2 2.69-2 6-2 6 1.12 6 2z" />
        </svg>
      );
    case 'supabase':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#3ECF8E">
          <path d="M12.923 1.004L2.83 13.064c-.452.54-.047 1.348.657 1.348h8.49l-1.077 8.584c-.11.88.995 1.36 1.543.668l10.093-12.06c.452-.54.047-1.348-.657-1.348h-8.49l1.077-8.584c.11-.88-.995-1.36-1.543-.668z" />
        </svg>
      );
    case 'php':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#777BB4">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-4.5 13.5H6.2l1.6-7h2.2c1.4 0 2.2.7 2.2 1.8 0 1.6-1.3 2.7-2.7 2.7H8.5l-.8 3.5zm2.1-4.7c.6 0 1.1-.5 1.1-1.1 0-.5-.3-.9-.9-.9h-.9l-.4 2h1.1zm8.7 1.2h-1.3l.8-3.5h1.3c.7 0 1.2.4 1.2 1 0 .9-.7 1.5-1.6 1.5h-.4l-.6 2.5zm-3.2 3.5h-1.3l1.6-7h2.2c1.4 0 2.2.7 2.2 1.8 0 1.6-1.3 2.7-2.7 2.7h-1.1l-.8 3.5z" />
        </svg>
      );
    case 'bootstrap':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="#7952B3">
          <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm4.5 4v12h4.5c2.5 0 4.2-1.3 4.2-3.3 0-1.4-.8-2.4-2-2.8 1-.5 1.6-1.4 1.6-2.5 0-1.8-1.5-3.4-3.8-3.4H8.5zm2.3 2h2c1.1 0 1.9.6 1.9 1.6s-.8 1.6-1.9 1.6h-2V8zm0 5.2h2.3c1.3 0 2.2.7 2.2 1.8s-.9 1.8-2.2 1.8h-2.3v-3.6z" />
        </svg>
      );
    default:
      return null;
  }
};

export const Portfolio: React.FC = () => {
  // Estado para alternar entre "Proyectos", "Diseños & Marketing" y "Reels"
  const [activeTab, setActiveTab] = useState<'software' | 'design' | 'reels'>('software');

  // Estado para el modal de visualización de imagen/diseño en grande
  const [selectedImage, setSelectedImage] = useState<DesignImage | null>(null);

  // Bloquear el scroll del fondo cuando la vista previa esté activa
  useEffect(() => {
    if (!selectedImage) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [selectedImage]);

  // Estado para el modal de demo interactivo de proyectos
  const [selectedDemoProject, setSelectedDemoProject] = useState<ShowcaseProject | null>(null);

  // Control de imágenes que aún no se han subido a la carpeta /public/proyectos/
  const [failedImages, setFailedImages] = useState<{ [key: number]: boolean }>({});

  // Estado para el reel con audio activado (solo 1 video a la vez)
  const [unmutedReelId, setUnmutedReelId] = useState<number | string | null>(null);
  const videoRefs = React.useRef<{ [key: string | number]: HTMLVideoElement | null }>({});

  // Alternar el sonido de un reel: si se activa uno, todos los demás se silencian
  const toggleSound = (reelId: number | string) => {
    if (unmutedReelId === reelId) {
      if (videoRefs.current[reelId]) {
        videoRefs.current[reelId]!.muted = true;
      }
      setUnmutedReelId(null);
    } else {
      Object.entries(videoRefs.current).forEach(([id, vid]) => {
        if (vid) {
          if (id === String(reelId)) {
            vid.muted = false;
            vid.volume = 1;
            vid.play().catch(() => {});
          } else {
            vid.muted = true;
          }
        }
      });
      setUnmutedReelId(reelId);
    }
  };

  // Al cambiar de pestaña, silenciar cualquier audio activo
  const handleTabChange = (tab: 'software' | 'design' | 'reels') => {
    if (tab !== 'reels') {
      Object.values(videoRefs.current).forEach((vid) => {
        if (vid) vid.muted = true;
      });
      setUnmutedReelId(null);
    }
    setActiveTab(tab);
  };

  // Proyectos reales de GitHub (Fernando Wilches - @ferchinwill)
  const projects: ShowcaseProject[] = [
    {
      id: 1,
      title: 'CRM Colegio',
      image: '/proyectos/crm-colegio.png',
      description:
        'Sistema CRM integral desarrollado para la gestión escolar y cobranza. Permite el control digital de matrículas, registro de alumnos y padres de familia, control de colegiaturas con Supabase en la nube.',
      detailedDescription:
        'Plataforma administrativa diseñada para colegios e instituciones educativas. Automatiza el control de inscripciones, seguimiento financiero de pagos mensuales, estados de cuenta por alumno y panel analítico en tiempo real.',
      features: [
        'Registro y expediente digital de alumnado y tutores',
        'Control y balance de pagos de colegiaturas con estados de cuenta',
        'Base de datos PostgreSQL en tiempo real alojada en Supabase',
        'Interfaz moderna, rápida y responsiva con React y Tailwind CSS',
      ],
      screenshots: [
        {
          id: 'dashboard',
          name: 'Dashboard General',
          badge: 'Módulo Principal',
          src: '/proyectos/crm-colegio-dashboard.png',
          description: 'Panel de métricas y estadísticas del ciclo escolar, balance de ingresos y resumen general.',
        },
        {
          id: 'alumnos',
          name: 'Control de Alumnos',
          badge: 'Matrícula',
          src: '/proyectos/crm-colegio-alumnos.png',
          description: 'Registro de estudiantes, datos personales, grado escolar y expediente académico.',
        },
        {
          id: 'colegiaturas',
          name: 'Cobranza y Colegiaturas',
          badge: 'Finanzas',
          src: '/proyectos/crm-colegio-colegiaturas.png',
          description: 'Control de mensualidades, registro de comprobantes de pago y estados de cuenta.',
        },
        {
          id: 'cotizador',
          name: 'Cotizador de Inscripción',
          badge: 'Admisiones',
          src: '/proyectos/crm-colegio-cotizador.png',
          description: 'Cálculo dinámico de costos por colegiaturas, paquetes escolares y descuentos.',
        },
        {
          id: 'asistencias',
          name: 'Control de Asistencias',
          badge: 'Operación',
          src: '/proyectos/crm-colegio-asistencias.png',
          description: 'Pase de lista diario por grupo, retardos, justificaciones y faltas del alumnado.',
        },
        {
          id: 'tutores',
          name: 'Directorio de Tutores',
          badge: 'Contactos',
          src: '/proyectos/crm-colegio-tutores.png',
          description: 'Directorio de padres de familia y tutores legales asociados a cada alumno.',
        },
        {
          id: 'documentos',
          name: 'Gestión Documental',
          badge: 'Expediente',
          src: '/proyectos/crm-colegio-documentos.png',
          description: 'Control de actas de nacimiento, certificados médicos y documentos oficiales entregados.',
        },
        {
          id: 'generaciones',
          name: 'Generaciones y Grados',
          badge: 'Académico',
          src: '/proyectos/crm-colegio-generaciones.png',
          description: 'Organización por ciclos escolares, niveles de grado y grupos activos.',
        },
        {
          id: 'bitacora',
          name: 'Bitácora Escolar',
          badge: 'Seguimiento',
          src: '/proyectos/crm-colegio-bitacora.png',
          description: 'Registro histórico de notas disciplinarias, reportes y observaciones conductuales.',
        },
        {
          id: 'landing',
          name: 'Landing Page Oficial',
          badge: 'Portal Web',
          src: '/proyectos/crm-colegio-landing.png',
          description: 'Página web pública del colegio con información institucional y oferta educativa.',
        },
      ],
      techs: [
        { name: 'React', iconKey: 'react' },
        { name: 'Supabase', iconKey: 'supabase' },
        { name: 'Tailwind CSS', iconKey: 'tailwind' },
        { name: 'Node.js', iconKey: 'node' },
      ],
      codeUrl: 'https://github.com/ferchinwill/Crm_Colegio',
      demoUrl: 'https://stackblitz.com/github/ferchinwill/Crm_Colegio?embed=1&view=preview',
      statusBadge: 'Proyecto en Producción / GitHub',
      wrapperBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.45) 0%, rgba(14, 165, 233, 0.28) 100%)',
    },
    {
      id: 3,
      title: 'CRM Cotizaciones',
      image: '/proyectos/crm-cotizaciones.png',
      description:
        'Herramienta web para generación ágil de cotizaciones comerciales, catálogo de servicios corporativos, cálculo automático de costos e impuestos y seguimiento de clientes.',
      detailedDescription:
        'Software de ventas orientado a acelerar el ciclo comercial. Permite armar presupuestos personalizados, gestionar precios dinámicos, órdenes de trabajo, inventarios de viniles y organizar los requerimientos de cada cliente de forma intuitiva.',
      features: [
        'Generador dinámico de presupuestos con cálculo de impuestos y descuentos',
        'Módulo de órdenes de trabajo, logística y catálogo de viniles/materiales',
        'Directorio centralizado de clientes con geolocalización y mapa de entregas',
        'Panel administrativo con control de inventario y configuración de precios',
      ],
      screenshots: [
        {
          id: 'dashboard',
          name: 'Dashboard Operativo',
          badge: 'Panel Principal',
          src: '/proyectos/crm-cotizaciones-dashboard.png',
          description: 'Resumen en tiempo real de cotizaciones activas, ventas acumuladas y métricas del mes.',
        },
        {
          id: 'cotizador',
          name: 'Generador de Cotizaciones',
          badge: 'Cotizador',
          src: '/proyectos/crm-cotizaciones-cotizador.png',
          description: 'Formulario dinámico de cotización con desglose de medidas, insumos y cálculo automático.',
        },
        {
          id: 'clientes',
          name: 'Directorio de Clientes',
          badge: 'Contactos',
          src: '/proyectos/crm-cotizaciones-clientes.png',
          description: 'Gestión y seguimiento de cartera de clientes, historial de presupuestos y contacto.',
        },
        {
          id: 'ordenes',
          name: 'Órdenes de Trabajo',
          badge: 'Operación',
          src: '/proyectos/crm-cotizaciones-ordenes.png',
          description: 'Seguimiento del estado de fabricación e instalación de pedidos aprobados.',
        },
        {
          id: 'inventario',
          name: 'Control de Inventario',
          badge: 'Almacén',
          src: '/proyectos/crm-cotizaciones-inventario.png',
          description: 'Gestión de existencias, materiales disponibles y costo unitario por insumo.',
        },
        {
          id: 'viniles',
          name: 'Catálogo de Viniles',
          badge: 'Materiales',
          src: '/proyectos/crm-cotizaciones-viniles.png',
          description: 'Muestrario de acabados, colores, viniles adhesivos y especificaciones técnicas.',
        },
        {
          id: 'mapa',
          name: 'Mapa y Rutas',
          badge: 'Logística',
          src: '/proyectos/crm-cotizaciones-mapa.png',
          description: 'Geolocalización de proyectos e instalaciones en curso sobre mapa interactivo.',
        },
        {
          id: 'configuracion',
          name: 'Configuración del Sistema',
          badge: 'Ajustes',
          src: '/proyectos/crm-cotizaciones-configuracion.png',
          description: 'Ajuste de tasas de impuestos, porcentajes de utilidad y parámetros globales.',
        },
        {
          id: 'admin',
          name: 'Panel Administrativo',
          badge: 'Administración',
          src: '/proyectos/crm-cotizaciones-admin.png',
          description: 'Control de roles, permisos de colaboradores y reportes consolidados.',
        },
        {
          id: 'login',
          name: 'Inicio de Sesión',
          badge: 'Seguridad',
          src: '/proyectos/crm-cotizaciones-login.png',
          description: 'Acceso seguro con autenticación de usuarios y protección de rutas.',
        },
        {
          id: 'splash',
          name: 'Identidad y Bienvenida',
          badge: 'Branding',
          src: '/proyectos/crm-cotizaciones-splash.png',
          description: 'Pantalla de bienvenida y presencia de marca de la plataforma.',
        },
        {
          id: 'social',
          name: 'Estrategia Digital',
          badge: 'Marketing',
          src: '/proyectos/crm-cotizaciones-social.png',
          description: 'Integración y presencia de marca comercial en medios digitales.',
        },
      ],
      techs: [
        { name: 'React', iconKey: 'react' },
        { name: 'Node.js', iconKey: 'node' },
        { name: 'Tailwind CSS', iconKey: 'tailwind' },
        { name: 'MySQL', iconKey: 'mysql' },
      ],
      codeUrl: 'https://github.com/ferchinwill/Crm_coti',
      statusBadge: 'Herramienta Comercial',
      wrapperBg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.45) 0%, rgba(5, 150, 105, 0.28) 100%)',
    },
    {
      id: 4,
      title: 'PcTechDreams Platform',
      image: '/proyectos/pctech-platform.png',
      description:
        'Plataforma web con arquitectura MVC para soporte técnico, catálogo de hardware y ensamble de computadoras con base de datos relacional y gestión de órdenes de servicio.',
      detailedDescription:
        'Sistema web completo para taller y tienda de informática. Permite gestionar diagnósticos de equipos, control de garantías, inventario de componentes y base de datos relacional.',
      features: [
        'Arquitectura MVC backend con Laravel y base de datos MySQL',
        'Módulo de órdenes de servicio técnico y diagnóstico de hardware',
        'Inventario y catálogo de componentes tecnológicos',
      ],
      screenshots: [
        {
          id: 'hero',
          name: 'Hero & Servicios',
          badge: 'Inicio',
          src: '/proyectos/pctech-hero.png',
          description: 'Pantalla principal destacando servicios informáticos, soporte técnico y ofertas.',
        },
        {
          id: 'catalogo',
          name: 'Catálogo de Hardware',
          badge: 'Productos',
          src: '/proyectos/pctech-catalogo.png',
          description: 'Catálogo de componentes informáticos, tarjetas gráficas, procesadores y periféricos.',
        },
        {
          id: 'ensambles',
          name: 'Ensambles Personalizados',
          badge: 'Configurador',
          src: '/proyectos/pctech-ensambles.png',
          description: 'Módulo de asesoría y armado a medida de computadoras gamer y workstations.',
        },
        {
          id: 'marcas',
          name: 'Marcas y Partners',
          badge: 'Alianzas',
          src: '/proyectos/pctech-marcas.png',
          description: 'Directorio de marcas oficiales de tecnología compatibles y garantizadas.',
        },
        {
          id: 'testimonios',
          name: 'Opiniones y Reseñas',
          badge: 'Social Proof',
          src: '/proyectos/pctech-testimonios.png',
          description: 'Testimonios y valoraciones de clientes satisfechos con el soporte técnico.',
        },
        {
          id: 'metodos-pago',
          name: 'Métodos de Pago',
          badge: 'Pasarelas',
          src: '/proyectos/pctech-metodos-pago.png',
          description: 'Opciones de pago seguro, transferencias y facturación electrónica.',
        },
        {
          id: 'faq',
          name: 'Preguntas Frecuentes',
          badge: 'Soporte',
          src: '/proyectos/pctech-faq.png',
          description: 'Centro de ayuda y resolución inmediata de dudas comunes sobre garantías.',
        },
        {
          id: 'fullpage',
          name: 'Vista Completa',
          badge: 'Full Page',
          src: '/proyectos/pctech-fullpage.png',
          description: 'Recorrido completo por la interfaz integral del portal web.',
        },
      ],
      techs: [
        { name: 'Laravel / PHP', iconKey: 'php' },
        { name: 'MySQL', iconKey: 'mysql' },
        { name: 'Bootstrap', iconKey: 'bootstrap' },
        { name: 'Node.js', iconKey: 'node' },
      ],
      codeUrl: 'https://github.com/ferchinwill/laravel_pctechDb',
      statusBadge: 'Backend & DB Relacional',
      wrapperBg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.4) 0%, rgba(245, 158, 11, 0.25) 100%)',
    },
    {
      id: 5,
      title: 'SafetyScraper - Automatización Web',
      image: '/proyectos/web-scraping.png',
      description:
        'Software de extracción y análisis de datos web automatizado. Extrae catálogos completos de señalética y productos industriales con procesamiento por lotes y exportación estructurada.',
      detailedDescription:
        'Herramienta de web scraping de alto rendimiento desarrollada en Node.js y JavaScript. Automatiza la recolección, normalización y almacenamiento de datos desde fuentes remotas con monitorización en tiempo real, histórico de ejecuciones y soporte multi-formato.',
      features: [
        'Extracción concurrente por lotes de catálogos y listas de precios',
        'Normalización y parseo de señalética industrial con validación de datos',
        'Exportación automatizada a formatos Excel, CSV y JSON limpios',
        'Dashboard interactivo con métricas de rendimiento y logs en tiempo real',
      ],
      screenshots: [
        {
          id: 'dashboard',
          name: 'Dashboard de Extracción',
          badge: 'Panel de Control',
          src: '/proyectos/web-scraping-dashboard.png',
          description: 'Métricas de páginas analizadas, porcentaje de éxito y tasa de extracción por minuto.',
        },
        {
          id: 'producto',
          name: 'Detalle de Productos',
          badge: 'Data Parser',
          src: '/proyectos/web-scraping-producto-detalle.png',
          description: 'Vista detallada de atributos extraídos: medidas, materiales, códigos y precios.',
        },
        {
          id: 'export',
          name: 'Exportación de Datos',
          badge: 'Reportes',
          src: '/proyectos/web-scraping-export.png',
          description: 'Generación y descarga de archivos estructurados listos para importación en bases de datos.',
        },
        {
          id: 'historial',
          name: 'Historial de Ejecución',
          badge: 'Logs & Auditoría',
          src: '/proyectos/web-scraping-historial.png',
          description: 'Bitácora detallada de ejecuciones pasadas, tiempos de respuesta y errores detectados.',
        },
        {
          id: 'lightmode',
          name: 'Modo Claro',
          badge: 'Tema Visual',
          src: '/proyectos/web-scraping-lightmode.png',
          description: 'Diseño accesible y adaptado para entornos de trabajo diurnos.',
        },
        {
          id: 'fullpage',
          name: 'Vista Panorámica',
          badge: 'Arquitectura',
          src: '/proyectos/web-scraping-fullpage.png',
          description: 'Estructura integral del sistema de scraping y automatización.',
        },
      ],
      techs: [
        { name: 'Node.js', iconKey: 'node' },
        { name: 'TypeScript', iconKey: 'ts' },
        { name: 'Tailwind CSS', iconKey: 'tailwind' },
        { name: 'Docker', iconKey: 'docker' },
      ],
      codeUrl: 'https://github.com/ferchinwill',
      statusBadge: 'Automatización & Data',
      wrapperBg: 'linear-gradient(135deg, rgba(6, 182, 212, 0.45) 0%, rgba(59, 130, 246, 0.28) 100%)',
    },
  ];

  // Proyectos y Piezas de Diseños & Marketing (Identidad, UI/UX, Banners y Certificados)
  const designItems: DesignItem[] = [
    {
      id: 1,
      title: 'Branding & Social Media Kit Para Extintores Orion',
      category: 'Identidad Visual & Redes Sociales',
      badge: 'Campaña Oficial de Marca (18 Diseños)',
      description:
        'Desarrollo integral de línea gráfica y campaña informativa para redes sociales de Extintores Orion. Incluye 18 piezas publicitarias con infografías de seguridad, tipos de extintores (CO2, PQS), prevención de incendios y plantillas corporativas con alto impacto visual.',
      tools: ['photoshop', 'illustrator', 'canva'],
      layoutType: 'auto-slider',
      wrapperBg: 'linear-gradient(135deg, rgba(239, 68, 68, 0.35) 0%, rgba(245, 158, 11, 0.22) 100%)',
      images: Array.from({ length: 18 }, (_, index) => {
        const num = index + 1;
        return {
          id: `extintores-orion-${num}`,
          title: `Extintores Orion ${num}`,
          subtitle: `Pieza publicitaria #${num} - Infografía de Seguridad y Manejo de Extintores`,
          badge: `Diseño ${num} de 18`,
          src: `/disenos/orion/extintores Orion ${num}.png`,
        };
      }),
    },
    {
      id: 2,
      title: 'Branding & Social Media Kit Para Colegio Henry Wallon',
      category: 'Identidad Visual & Redes Sociales',
      badge: 'Campaña Oficial Escolar (8 Diseños)',
      description:
        'Desarrollo integral de identidad visual, publicaciones para redes sociales, infografías de requisitos de inscripción, difusión de eventos escolares y material publicitario para el Colegio Henry Wallon.',
      tools: ['photoshop', 'illustrator', 'canva'],
      layoutType: 'auto-slider',
      wrapperBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.35) 0%, rgba(99, 102, 241, 0.22) 100%)',
      images: [
        {
          id: 'hw-1',
          title: 'Colegio Henry Wallon 1',
          subtitle: 'Diseño publicitario para redes sociales y oferta académica',
          badge: 'Diseño 1 de 8',
          src: '/disenos/colegio/colegio_marketing_1.png',
        },
        {
          id: 'hw-2',
          title: 'Colegio Henry Wallon 2',
          subtitle: 'Campaña informativa institucional para padres y alumnos',
          badge: 'Diseño 2 de 8',
          src: '/disenos/colegio/colegio_marketing_2.png',
        },
        {
          id: 'hw-3',
          title: 'Colegio Henry Wallon 3',
          subtitle: 'Publicidad formativa y valores de la institución',
          badge: 'Diseño 3 de 8',
          src: '/disenos/colegio/colegio_marketing_3.png',
        },
        {
          id: 'hw-4',
          title: 'Colegio Henry Wallon 4',
          subtitle: 'Afiche promocional de inscripciones y ciclo escolar',
          badge: 'Diseño 4 de 8',
          src: '/disenos/colegio/colegio_marketing_4.png',
        },
        {
          id: 'hw-5',
          title: 'Colegio Henry Wallon 5',
          subtitle: 'Post cuadrado institucional para Instagram y Facebook',
          badge: 'Diseño 5 de 8',
          src: '/disenos/colegio/colegio_marketing_5.png',
        },
        {
          id: 'hw-6',
          title: 'Colegio Henry Wallon 6',
          subtitle: 'Creativo publicitario de alto impacto visual',
          badge: 'Diseño 6 de 8',
          src: '/disenos/colegio/colegio_marketing_6.png',
        },
        {
          id: 'hw-7',
          title: 'Colegio Henry Wallon 7',
          subtitle: 'Campaña digital y difusión en redes sociales',
          badge: 'Diseño 7 de 8',
          src: '/disenos/colegio/colegio_marketing_7.png',
        },
        {
          id: 'hw-8',
          title: 'Colegio Henry Wallon 8',
          subtitle: 'Diseño de identidad y presencia de marca escolar',
          badge: 'Diseño 8 de 8',
          src: '/disenos/colegio/colegio_marketing_8.png',
        },
      ],
    },


  ];

  // Contenido Audiovisual / Reels en Formato Vertical 9:16
  const reels: ReelItem[] = [
    {
      id: 1,
      title: 'Extintores Orión - Reel 1',
      client: 'Extintores Orión',
      category: 'Publicidad & Redes Sociales',
      badge: 'Reel Vertical 9:16',
      duration: '0:30',
      description:
        'Campaña audiovisual de alto impacto para Instagram Reels y TikTok. Destaca la prevención contra incendios, certificación y servicios de recarga rápida para negocios y empresas.',
      tools: ['premiere', 'photoshop'],
      videoUrl: '/reels/Reel extintores 1.mp4',
    },
    {
      id: 2,
      title: 'Extintores Orión - Reel 2',
      client: 'Extintores Orión',
      category: 'Seguridad & Protección Comercial',
      badge: 'Reel Vertical 9:16',
      duration: '0:30',
      description:
        'Spot promocional dinámico sobre equipos de seguridad, mantenimiento preventivo y certificación oficial para empresas y comercios.',
      tools: ['premiere', 'photoshop'],
      videoUrl: '/reels/Reel extintores 2.mp4',
    },
    {
      id: 3,
      title: 'Colegio Henry Wallon - Reel 1',
      client: 'Colegio Henry Wallon',
      category: 'Institucional & Admisiones',
      badge: 'Reel Vertical 9:16',
      duration: '0:45',
      description:
        'Reel escolar enfocado en la captación de nuevos estudiantes para ciclo escolar, mostrando talleres, ambiente educativo e infraestructura de primer nivel.',
      tools: ['premiere', 'canva'],
      videoUrl: '/reels/Reel Colegio 1.mp4',
    },
    {
      id: 4,
      title: 'Colegio Henry Wallon - Reel 2',
      client: 'Colegio Henry Wallon',
      category: 'Comunidad Escolar & Actividades',
      badge: 'Reel Vertical 9:16',
      duration: '0:35',
      description:
        'Contenido dinámico para redes sociales destacando eventos escolares, actividades extracurriculares y la excelencia académica de la institución.',
      tools: ['premiere', 'canva'],
      videoUrl: '/reels/Reel Colegio 2.mp4',
    },
  ];

  return (
    <section id="portafolio" style={{ padding: '6rem 0 7rem', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1160px' }}>

        {/* ========================================================
            Fila de Encabezado: Título + Botón Selector (Proyectos <-> Diseños)
            ======================================================== */}
        <div className="projects-header-nav">
          {/* Lado Izquierdo: Icono + Título según la vista activa */}
          <div className="projects-title-cluster">
            <div className="projects-title-icon-badge">
              {activeTab === 'software' ? (
                <Code size={30} strokeWidth={2.75} />
              ) : activeTab === 'design' ? (
                <Palette size={30} strokeWidth={2.5} />
              ) : (
                <Film size={30} strokeWidth={2.5} />
              )}
            </div>
            <div>
              <span className="projects-header-subtitle">
                {activeTab === 'software'
                  ? 'Desarrollo de Software & Web'
                  : activeTab === 'design'
                    ? 'Creatividad, UI/UX & Publicidad'
                    : 'Contenido Audiovisual & Edición'}
              </span>
              <h2 className="projects-main-title">
                {activeTab === 'software'
                  ? 'Proyectos'
                  : activeTab === 'design'
                    ? 'Diseños & Marketing'
                    : 'Reels'}
              </h2>
            </div>
          </div>

          {/* Lado Derecho: Botón conmutador (Pills Switcher) */}
          <div className="portfolio-view-switcher" role="tablist" aria-label="Cambiar vista de portafolio">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'software'}
              className={`portfolio-switch-btn ${activeTab === 'software' ? 'active' : ''}`}
              onClick={() => handleTabChange('software')}
            >
              <Code size={17} />
              <span>Proyectos</span>
              {activeTab === 'software' && <span className="switch-active-glow" />}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'design'}
              className={`portfolio-switch-btn ${activeTab === 'design' ? 'active' : ''}`}
              onClick={() => handleTabChange('design')}
            >
              <Palette size={17} />
              <span>Diseños & Marketing</span>
              {activeTab === 'design' && <span className="switch-active-glow" />}
            </button>

            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'reels'}
              className={`portfolio-switch-btn ${activeTab === 'reels' ? 'active' : ''}`}
              onClick={() => handleTabChange('reels')}
            >
              <Film size={17} />
              <span>Reels</span>
              {activeTab === 'reels' && <span className="switch-active-glow" />}
            </button>
          </div>
        </div>

        {/* ========================================================
            VISTA 1: Proyectos de Software / Desarrollo Web
            ======================================================== */}
        {activeTab === 'software' && (
          <div className="projects-showcase-list animate-fade-in">
            {projects.map((project) => (
              <article key={project.id} className="project-showcase-card">

                {/* Lado Izquierdo: Captura del proyecto */}
                <div
                  className="project-mockup-wrapper"
                  onClick={() => setSelectedDemoProject(project)}
                  title="Click para ver capturas y detalles"
                >
                  {project.image && !failedImages[project.id] ? (
                    <div className="project-card-image-box">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="project-card-real-img"
                        loading="lazy"
                        onError={() => setFailedImages((prev) => ({ ...prev, [project.id]: true }))}
                      />
                      <div className="project-card-overlay-hint">
                        <span className="overlay-hint-pill">
                          <Eye size={14} /> Ver Capturas
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="project-blank-canvas">
                      {/* Barra superior de ventana */}
                      <div className="blank-canvas-header">
                        <span className="blank-canvas-dot red"></span>
                        <span className="blank-canvas-dot yellow"></span>
                        <span className="blank-canvas-dot green"></span>
                        <span className="design-canvas-header-tag">{project.statusBadge || 'Proyecto'}</span>
                      </div>

                      {/* Espacio en blanco reservado para la imagen con icono de código */}
                      <div className="blank-canvas-content">
                        <div className="blank-canvas-icon-box">
                          <Code size={26} strokeWidth={1.5} className="text-blue-500" />
                        </div>
                        <span className="blank-canvas-text-main">
                          {project.title}
                        </span>
                        <span className="blank-canvas-text-sub">
                          Click para abrir las capturas y detalles
                        </span>
                        <div className="blank-canvas-zoom-hint">
                          <Eye size={13} /> Ver Proyecto
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Lado Derecho: Título, Descripción, Tecnologías y Botones Código/Ver Proyecto */}
                <div className="project-showcase-info">
                  <h3 className="project-showcase-title">
                    {project.title}
                  </h3>

                  <p className="project-showcase-desc">
                    {project.description}
                  </p>

                  {/* Fila de logos/iconos de tecnologías */}
                  <div className="project-tech-icons">
                    {project.techs.map((tech) => (
                      <div
                        key={tech.name}
                        className="tech-icon-badge"
                        title={tech.name}
                      >
                        <TechLogo type={tech.iconKey} />
                      </div>
                    ))}
                  </div>

                  {/* Botones de acción: Código y Ver Proyecto */}
                  <div className="project-actions-row">
                    <a
                      href={project.codeUrl}
                      className="btn-project-action"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Código</span>
                      <GithubIcon size={17} />
                    </a>

                    <button
                      type="button"
                      className="btn-project-action"
                      onClick={() => setSelectedDemoProject(project)}
                      title="Ver capturas y detalles del proyecto"
                    >
                      <span>Ver Proyecto</span>
                      <Eye size={16} />
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

        {/* ========================================================
            VISTA 2: Diseños & Marketing (Identidad, UI/UX, Banners y Certificados)
            ======================================================== */}
        {activeTab === 'design' && (
          <div className="design-showcase-list animate-fade-in">
            {designItems.map((item) => (
              <article key={item.id} className="design-showcase-card">

                {/* Lado Izquierdo o Superior: Mockups / Visuales (1, 2 o 3 imágenes según el boceto, o Slider Automático) */}
                {item.layoutType === 'auto-slider' ? (
                  <div
                    className="design-mockups-container auto-slider-wrapper"
                    style={{ background: item.wrapperBg }}
                  >
                    {/* Viewport del Slider Infinito hacia la derecha */}
                    <div className="orion-marquee-viewport">
                      <div
                        className="orion-marquee-track"
                        style={{
                          animationDuration: `${((item.images.length * 55) / 18).toFixed(1)}s`
                        }}
                      >
                        {[...item.images, ...item.images].map((img, idx) => (
                          <div
                            key={`${img.id}-${idx}`}
                            className="orion-slider-card"
                            onClick={() => setSelectedImage(img)}
                            title="Click para ver en alta resolución"
                          >
                            <div className="blank-canvas-header">
                              <span className="blank-canvas-dot red"></span>
                              <span className="blank-canvas-dot yellow"></span>
                              <span className="blank-canvas-dot green"></span>
                            </div>

                            <div className="orion-slider-img-container">
                              <img
                                src={img.src}
                                alt={img.title}
                                className="orion-slider-img"
                                loading="lazy"
                              />
                              <div className="orion-slider-hover-overlay">
                                <Maximize2 size={16} />
                                <span>Ver en Grande</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`design-mockups-container ${item.layoutType}`}
                    style={{ background: item.wrapperBg }}
                  >
                    <div className="design-images-grid">
                      {item.images.map((img) => (
                        <div
                          key={img.id}
                          className="design-canvas-item"
                          onClick={() => setSelectedImage(img)}
                          title="Click para ver en alta resolución"
                        >
                          {/* Cabecera de la ventana */}
                          <div className="blank-canvas-header">
                            <span className="blank-canvas-dot red"></span>
                            <span className="blank-canvas-dot yellow"></span>
                            <span className="blank-canvas-dot green"></span>
                            <span className="design-canvas-header-tag">{img.badge || 'Diseño'}</span>
                          </div>

                          {/* Espacio reservado para la pieza gráfica */}
                          <div className="blank-canvas-content">
                            <div className="blank-canvas-icon-box design">
                              {item.isCertificate ? (
                                <Award size={26} strokeWidth={1.5} className="text-amber-500" />
                              ) : (
                                <ImageIcon size={26} strokeWidth={1.5} className="text-pink-500" />
                              )}
                            </div>
                            <span className="blank-canvas-text-main">
                              {img.title}
                            </span>
                            <span className="blank-canvas-text-sub">
                              {img.subtitle}
                            </span>
                            <div className="blank-canvas-zoom-hint">
                              <Maximize2 size={13} /> Click para ampliar
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Lado Derecho o Inferior: Información, Categoría, Herramientas y Detalles */}
                <div className="design-showcase-info">
                  <div className="design-badges-row">
                    <span className="design-category-badge">
                      <Sparkles size={12} /> {item.category}
                    </span>
                  </div>

                  <h3 className="project-showcase-title">
                    {item.title}
                  </h3>

                  <p className="project-showcase-desc">
                    {item.description}
                  </p>

                  {/* Herramientas de Diseño utilizadas con iconos auténticos de fondo blanco */}
                  <div>
                    <span className="design-tools-label">Herramientas Creativas:</span>
                    <div className="design-tools-chips">
                      {item.tools.map((tool) => (
                        <div key={tool} className="design-tool-chip" title={tool}>
                          <TechIcon name={tool} size={20} />
                          <span className="design-tool-name">
                            {tool === 'photoshop'
                              ? 'Photoshop'
                              : tool === 'illustrator'
                                ? 'Illustrator'
                                : tool === 'premiere'
                                  ? 'Premiere Pro'
                                  : tool === 'adobexd'
                                    ? 'Adobe XD'
                                    : tool.charAt(0).toUpperCase() + tool.slice(1)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Botón de acción para ver galería o certificado */}
                  <div className="design-actions-row">
                    <button
                      type="button"
                      className="btn-design-view"
                      onClick={() => setSelectedImage(item.images[0])}
                    >
                      {item.isCertificate ? (
                        <>
                          <Award size={16} />
                          <span>Ver Certificados Ampliados</span>
                        </>
                      ) : (
                        <>
                          <Layers size={16} />
                          <span>Explorar Piezas Gráficas</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </article>
            ))}
          </div>
        )}

        {/* ========================================================
            VISTA 3: Reels & Contenido Audiovisual (Videos Verticales 9:16)
            ======================================================== */}
        {activeTab === 'reels' && (
          <div className="reels-showcase-container animate-fade-in">
            <div className="reels-grid">
              {reels.map((reel) => (
                <article key={reel.id} className="reel-card-item">
                  {/* Marco Móvil / Smartphone Ultra-Realista */}
                  <div
                    className={`reel-phone-frame ${unmutedReelId === reel.id ? 'is-audio-active' : ''}`}
                    onClick={() => toggleSound(reel.id)}
                    title={unmutedReelId === reel.id ? 'Click para silenciar audio' : 'Click para activar sonido'}
                  >
                    {/* Pantalla del Teléfono */}
                    <div className="reel-phone-screen">
                      {/* Dynamic Island */}
                      <div className="reel-dynamic-island">
                        <div className="reel-island-camera"></div>
                        <div className="reel-island-sensor"></div>
                      </div>

                      {/* Brillo / Reflejo de Cristal */}
                      <div className="reel-glass-reflection"></div>

                      {/* Video en bucle */}
                      {reel.videoUrl ? (
                        <video
                          src={reel.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          preload="auto"
                          className="reel-preview-media"
                          ref={(el) => {
                            videoRefs.current[reel.id] = el;
                            if (el) {
                              el.muted = unmutedReelId !== reel.id;
                              el.play().catch(() => {});
                            }
                          }}
                        />
                      ) : reel.thumbnailUrl ? (
                        <img
                          src={reel.thumbnailUrl}
                          alt={reel.title}
                          className="reel-preview-media"
                        />
                      ) : (
                        <div className="reel-preview-fallback">
                          <Film size={44} className="reel-fallback-icon" />
                          <span className="reel-fallback-text">Reel 9:16</span>
                        </div>
                      )}

                      {/* Botón flotante para activar / silenciar sonido */}
                      <button
                        type="button"
                        className={`reel-sound-toggle-btn ${unmutedReelId === reel.id ? 'sound-on' : 'sound-off'}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSound(reel.id);
                        }}
                        aria-label={unmutedReelId === reel.id ? 'Silenciar sonido' : 'Activar sonido'}
                        title={unmutedReelId === reel.id ? 'Click para silenciar' : 'Click para activar sonido'}
                      >
                        {unmutedReelId === reel.id ? (
                          <>
                            <Volume2 size={16} className="sound-icon-animated" />
                            <span className="sound-status-text">Audio ON</span>
                          </>
                        ) : (
                          <>
                            <VolumeX size={16} />
                            <span className="sound-status-text">Activar Audio</span>
                          </>
                        )}
                      </button>

                      {/* Barra de inicio inferior (Home Indicator) */}
                      <div className="reel-home-indicator"></div>
                    </div>
                  </div>

                  {/* Información y detalles debajo del reel */}
                  <div className="reel-card-info">
                    <div className="reel-card-category-row">
                      <span className="reel-card-category">{reel.category}</span>
                    </div>

                    <h3 className="reel-card-title">{reel.title}</h3>
                    <p className="reel-card-description">{reel.description}</p>

                    {/* Herramientas de edición utilizadas */}
                    <div className="reel-tools-cluster">
                      {reel.tools.map((tool) => (
                        <div key={tool} className="design-tool-chip" title={tool}>
                          <TechIcon name={tool} size={16} />
                          <span className="design-tool-name">
                            {tool === 'premiere'
                              ? 'Premiere Pro'
                              : tool === 'photoshop'
                                ? 'Photoshop'
                                : tool === 'illustrator'
                                  ? 'Illustrator'
                                  : tool === 'canva'
                                    ? 'Canva'
                                    : tool}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ========================================================
          Modal / Lightbox para ver Imagen o Certificado en Pantalla Completa
          ======================================================== */}
      {selectedImage &&
        createPortal(
          <div
            className="design-lightbox-backdrop"
            onClick={() => setSelectedImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="design-lightbox-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="design-lightbox-header">
                <div>
                  <span className="design-lightbox-badge">
                    {selectedImage.badge || 'Vista Previa en Alta Definición'}
                  </span>
                  <h4 className="design-lightbox-title">{selectedImage.title}</h4>
                  <p className="design-lightbox-sub">{selectedImage.subtitle}</p>
                </div>

                <button
                  type="button"
                  className="design-lightbox-close"
                  onClick={() => setSelectedImage(null)}
                  aria-label="Cerrar vista previa"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="design-lightbox-body">
                <div className="design-lightbox-preview-card">
                  <div className="design-lightbox-mockup-frame">
                    <div className="blank-canvas-header">
                      <span className="blank-canvas-dot red"></span>
                      <span className="blank-canvas-dot yellow"></span>
                      <span className="blank-canvas-dot green"></span>
                      <span className="design-canvas-header-tag">Alta Resolución</span>
                    </div>
                    {selectedImage.src ? (
                      <div className="design-lightbox-real-img-container">
                        <img
                          src={selectedImage.src}
                          alt={selectedImage.title}
                          className="design-lightbox-real-img"
                        />
                      </div>
                    ) : (
                      <div className="design-lightbox-canvas">
                        <div className="blank-canvas-icon-box large">
                          <ImageIcon size={44} strokeWidth={1.5} className="text-blue-500" />
                        </div>
                        <span className="design-lightbox-canvas-title">
                          Espacio reservado para tu imagen real
                        </span>
                        <span className="design-lightbox-canvas-sub">
                          Puedes vincular cualquier imagen (JPG, PNG o SVG) de tus diseños, mockups de Figma o certificados en esta sección.
                        </span>
                        <div className="design-lightbox-features">
                          <span><CheckCircle2 size={14} className="text-emerald-500" /> Resolución Optimizada</span>
                          <span><CheckCircle2 size={14} className="text-emerald-500" /> Diseño Responsivo</span>
                          <span><CheckCircle2 size={14} className="text-emerald-500" /> Listo para Producción</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* ========================================================
          Modal Interactivo de Demo para Proyectos de Software
          ======================================================== */}
      <ProjectDemoModal
        project={selectedDemoProject}
        onClose={() => setSelectedDemoProject(null)}
      />

    </section>
  );
};
