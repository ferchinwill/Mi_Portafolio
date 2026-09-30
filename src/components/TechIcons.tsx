import React from 'react';
import {
  SiReact,
  SiFlutter,
  SiTailwindcss,
  SiBootstrap,
  SiJavascript,
  SiHtml5,
  SiNodedotjs,
  SiLaravel,
  SiPostman,
  SiMysql,
  SiXampp,
  SiFigma,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import {
  TbBrandCss3,
  TbBrandAdobeXd,
  TbBrandAdobeIllustrator,
  TbBrandAdobePhotoshop,
  TbBrandAdobePremiere,
  TbBrandVscode,
  TbBrandVisualStudio,
  TbBrandPowershell,
  TbBrandOpenai,
  TbTerminal2,
} from 'react-icons/tb';

export type TechKey =
  | 'react'
  | 'flutter'
  | 'tailwind'
  | 'bootstrap'
  | 'javascript'
  | 'html5'
  | 'css3'
  | 'nodejs'
  | 'laravel'
  | 'postman'
  | 'restapi'
  | 'mysql'
  | 'xampp'
  | 'figma'
  | 'adobexd'
  | 'illustrator'
  | 'photoshop'
  | 'premiere'
  | 'canva'
  | 'git'
  | 'github'
  | 'vscode'
  | 'visualstudio'
  | 'terminal'
  | 'cmd'
  | 'openai'
  | 'gemini';

export interface TechIconProps {
  name: TechKey | string;
  size?: number;
  className?: string;
}

export const techDetailsMap: Record<string, { label: string; color: string }> = {
  react: { label: 'React', color: '#087ea4' },
  flutter: { label: 'Flutter', color: '#02569B' },
  tailwind: { label: 'Tailwind CSS', color: '#06B6D4' },
  bootstrap: { label: 'Bootstrap', color: '#7952B3' },
  javascript: { label: 'JavaScript', color: '#F7DF1E' },
  html5: { label: 'HTML5', color: '#E34F26' },
  css3: { label: 'CSS3', color: '#1572B6' },
  nodejs: { label: 'Node.js', color: '#5FA04E' },
  laravel: { label: 'Laravel', color: '#FF2D20' },
  postman: { label: 'Postman (APIs)', color: '#FF6C37' },
  restapi: { label: 'RESTful API', color: '#FF6C37' },
  mysql: { label: 'MySQL', color: '#4479A1' },
  xampp: { label: 'XAMPP', color: '#FB7A24' },
  figma: { label: 'Figma', color: '#F24E1E' },
  adobexd: { label: 'Adobe XD', color: '#FF61F6' },
  illustrator: { label: 'Adobe Illustrator', color: '#FF9A00' },
  photoshop: { label: 'Adobe Photoshop', color: '#31A8FF' },
  premiere: { label: 'Adobe Premiere Pro', color: '#9999FF' },
  canva: { label: 'Canva', color: '#00C4CC' },
  git: { label: 'Git', color: '#F05032' },
  github: { label: 'GitHub', color: '#181717' },
  vscode: { label: 'VS Code', color: '#007ACC' },
  visualstudio: { label: 'Visual Studio', color: '#5C2D91' },
  terminal: { label: 'Windows Terminal', color: '#4D4D4D' },
  cmd: { label: 'PowerShell / CLI', color: '#5391FE' },
  openai: { label: 'ChatGPT / OpenAI', color: '#10A37F' },
  gemini: { label: 'Google Gemini AI', color: '#4E75FF' },
};

export const TechIcon: React.FC<TechIconProps> = ({ name, size = 20, className = '' }) => {
  switch (name) {
    case 'react':
      return <SiReact size={size} color="#087ea4" className={className} />;

    case 'flutter':
      return <SiFlutter size={size} color="#02569B" className={className} />;

    case 'tailwind':
      return <SiTailwindcss size={size} color="#06B6D4" className={className} />;

    case 'bootstrap':
      return <SiBootstrap size={size} color="#7952B3" className={className} />;

    case 'javascript':
      return <SiJavascript size={size} color="#F7DF1E" className={className} style={{ background: '#000', borderRadius: '3px' }} />;

    case 'html5':
      return <SiHtml5 size={size} color="#E34F26" className={className} />;

    case 'css3':
      return <TbBrandCss3 size={size} color="#1572B6" className={className} />;

    case 'nodejs':
      return <SiNodedotjs size={size} color="#5FA04E" className={className} />;

    case 'laravel':
      return <SiLaravel size={size} color="#FF2D20" className={className} />;

    case 'postman':
    case 'restapi':
      return <SiPostman size={size} color="#FF6C37" className={className} />;

    case 'mysql':
      return <SiMysql size={size} color="#4479A1" className={className} />;

    case 'xampp':
      return <SiXampp size={size} color="#FB7A24" className={className} />;

    case 'figma':
      return <SiFigma size={size} color="#F24E1E" className={className} />;

    case 'adobexd':
      return <TbBrandAdobeXd size={size} color="#FF61F6" className={className} />;

    case 'illustrator':
      return <TbBrandAdobeIllustrator size={size} color="#FF9A00" className={className} />;

    case 'photoshop':
      return <TbBrandAdobePhotoshop size={size} color="#31A8FF" className={className} />;

    case 'premiere':
      return <TbBrandAdobePremiere size={size} color="#9999FF" className={className} />;

    case 'canva':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
          <defs>
            <linearGradient id="canvaGradSkill" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#00C4CC" />
              <stop offset="100%" stopColor="#7D2AE8" />
            </linearGradient>
          </defs>
          <circle cx="12" cy="12" r="11" fill="url(#canvaGradSkill)" />
          <path
            d="M13.2 15.5c-2.1 0-3.3-1.4-3.3-3.5 0-2.3 1.6-3.8 3.7-3.8 1.4 0 2.3.7 2.7 1.5l-1.4.9c-.3-.6-.8-.8-1.3-.8-1.1 0-1.9 1-1.9 2.2 0 1.3.7 2 1.7 2 .7 0 1.2-.3 1.6-.8l1.3.9c-.7.9-1.7 1.4-3.1 1.4z"
            fill="#FFFFFF"
          />
        </svg>
      );

    case 'git':
      return <SiGit size={size} color="#F05032" className={className} />;

    case 'github':
      return <SiGithub size={size} color="#181717" className={className} />;

    case 'vscode':
      return <TbBrandVscode size={size} color="#007ACC" className={className} />;

    case 'visualstudio':
      return <TbBrandVisualStudio size={size} color="#5C2D91" className={className} />;

    case 'terminal':
      return <TbTerminal2 size={size} color="#4D4D4D" className={className} />;

    case 'cmd':
      return <TbBrandPowershell size={size} color="#5391FE" className={className} />;

    case 'openai':
      return <TbBrandOpenai size={size} color="#10A37F" className={className} />;

    case 'gemini':
      return (
        <svg viewBox="0 0 24 24" width={size} height={size} className={className} aria-hidden="true">
          <defs>
            <linearGradient id="geminiGradSkillOfficial" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#4E75FF" />
              <stop offset="50%" stopColor="#9B72CF" />
              <stop offset="100%" stopColor="#E08EE6" />
            </linearGradient>
          </defs>
          <path
            fill="url(#geminiGradSkillOfficial)"
            d="M12 2C12 7.5 7.5 12 2 12c5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z"
          />
        </svg>
      );

    default:
      return null;
  }
};
