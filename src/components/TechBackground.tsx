import React, { useEffect, useRef } from 'react';

// Símbolos, palabras clave y sintaxis de programación para el fondo animado
const CODE_TOKENS = [
  '{ }',
  '</>',
  '=>',
  '( )',
  '[ ]',
  ';',
  '===',
  '!==',
  '&&',
  '||',
  '++',
  '--',
  'const',
  'let',
  'return;',
  'async',
  'await',
  'if()',
  'else',
  'function',
  'class',
  'import',
  'export',
  'try { }',
  'catch',
  'fn()',
  'void',
  '<div />',
  '<code />',
  'true',
  'false',
  'null',
  'state',
  'props',
  'console.log()',
  'git push',
  'npm run',
  '$ { }',
  '/* code */',
  '0101',
  'API',
  'Promise',
  'JSON',
];

interface Particle {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  colorDark: string;
  colorLight: string;
  wobbleSpeed: number;
  wobbleOffset: number;
  wobbleAmp: number;
  rotation: number;
  vRot: number;
}

export const TechBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    // Detectar tema actual
    let isDark = document.documentElement.getAttribute('data-theme') === 'dark';

    const themeObserver = new MutationObserver(() => {
      isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    // Paleta de colores tecnológicos
    const darkPalette = [
      '#60a5fa', // Azul eléctrico
      '#38bdf8', // Cian cielo
      '#a78bfa', // Violeta brillante
      '#34d399', // Esmeralda neón
      '#f472b6', // Rosa suave
      '#818cf8', // Índigo
    ];

    const lightPalette = [
      '#2563eb', // Azul fuerte
      '#0284c7', // Azul cian
      '#7c3aed', // Púrpura
      '#059669', // Verde esmeralda
      '#d97706', // Ámbar
      '#4f46e5', // Índigo
    ];

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Ajustar dimensiones del canvas considerando devicePixelRatio
    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Cantidad de partículas según el ancho de pantalla
    const count = Math.max(30, Math.min(55, Math.floor(width / 32)));

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const colorIndex = i % darkPalette.length;
      particles.push({
        text: CODE_TOKENS[i % CODE_TOKENS.length],
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: -0.2 - Math.random() * 0.35, // Flota suavemente hacia arriba
        size: 13 + Math.random() * 9, // Entre 13px y 22px
        baseOpacity: 0.1 + Math.random() * 0.16, // Entre 0.10 y 0.26
        opacity: 0.1 + Math.random() * 0.16,
        colorDark: darkPalette[colorIndex],
        colorLight: lightPalette[colorIndex],
        wobbleSpeed: 0.0015 + Math.random() * 0.002,
        wobbleOffset: Math.random() * Math.PI * 2,
        wobbleAmp: 15 + Math.random() * 25,
        rotation: (Math.random() - 0.5) * 0.2,
        vRot: (Math.random() - 0.5) * 0.003,
      });
    }

    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = Math.min(time - lastTime, 100);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Movimiento base hacia arriba
        p.y += p.vy * (dt / 16);
        p.rotation += p.vRot * (dt / 16);

        // Oscilación horizontal orgánica en onda seno
        const currentX = p.x + Math.sin(time * p.wobbleSpeed + p.wobbleOffset) * p.wobbleAmp;

        // Repulsión sutil con el cursor del mouse
        const dx = currentX - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 130;

        let renderX = currentX;
        let renderY = p.y;
        let currentOpacity = p.baseOpacity;

        if (dist < maxDist && dist > 0) {
          const force = (1 - dist / maxDist) * 35;
          renderX += (dx / dist) * force;
          renderY += (dy / dist) * force;
          currentOpacity = Math.min(p.baseOpacity * 1.8, 0.45);
        }

        // Si se sale por arriba, reaparece suavemente por abajo
        if (p.y < -30) {
          p.y = height + 20;
          p.x = Math.random() * width;
        } else if (p.y > height + 30) {
          p.y = -20;
        }

        // Color según tema
        const baseColor = isDark ? p.colorDark : p.colorLight;

        ctx.save();
        ctx.translate(renderX, renderY);
        ctx.rotate(p.rotation);

        ctx.font = `600 ${p.size}px "JetBrains Mono", "Fira Code", monospace, system-ui`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Dibujar resplandor sutil
        ctx.globalAlpha = currentOpacity;
        ctx.fillStyle = baseColor;
        ctx.fillText(p.text, 0, 0);

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      themeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="global-tech-background" aria-hidden="true">
      {/* Luces y orbes ambientales globales unificados para toda la página */}
      <div className="global-ambient-orbs">
        <div className="ambient-orb orb-top-left" />
        <div className="ambient-orb orb-top-right" />
        <div className="ambient-orb orb-center" />
        <div className="ambient-orb orb-mid-left" />
        <div className="ambient-orb orb-bottom-right" />
      </div>

      {/* Malla tecnológica continua en toda la pantalla */}
      <div className="global-ambient-grid" />

      {/* Canvas con los caracteres de programación y sintaxis flotando */}
      <canvas ref={canvasRef} className="global-code-canvas" />
    </div>
  );
};
