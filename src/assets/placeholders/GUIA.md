# Guía de Reemplazo de Imágenes

¡Hola Fernando! Esta carpeta está diseñada para almacenar tus archivos de imágenes y diseños reales cuando los tengas listos.

El sitio web está pre-configurado utilizando componentes dinámicos de marcadores de posición (`ImagePlaceholder.tsx`) que simulan las imágenes de tus proyectos. Para sustituirlas por tus imágenes reales, sigue los siguientes pasos sencillos:

## 1. Preparar las Imágenes

Te recomendamos optimizar tus imágenes antes de subirlas (formato **WebP** es el estándar moderno por su alta compresión sin pérdida de calidad, aunque también puedes usar **JPG** o **PNG**).

*   **Fotografía de perfil**: Proporción recomendada `4:5` (ejemplo: `800x1000px`). Nombre propuesto: `perfil.webp`.
*   **Proyectos (Extintores Orion)**: Proporción recomendada `4:3` o `16:9` para las tarjetas y las vistas detalladas en el modal (ejemplo: `800x600px`).

## 2. Agregar las Imágenes a la Carpeta

Guarda tus archivos en esta ruta:
`src/assets/` o crea subcarpetas organizadas como `src/assets/orion/`.

## 3. Actualizar las Referencias en el Código

### Para la foto de perfil en `src/components/About.tsx`:
Busca la línea donde se invoca el `ImagePlaceholder`:
```tsx
<ImagePlaceholder 
  text="Foto de Fernando Wilches" 
  aspectRatio="aspect-auto h-full"
  theme="tech"
/>
```
Y reemplázala por una etiqueta de imagen estándar importada:
```tsx
import fotoPerfil from '../assets/perfil.webp';
// ...
<img 
  src={fotoPerfil} 
  alt="Fernando Wilches" 
  className="w-full h-full object-cover" 
/>
```

### Para las imágenes de proyectos en `src/components/Portfolio.tsx`:
Actualmente, el objeto `projectsData` contiene la propiedad `placeholderText`. Puedes añadir una propiedad `imageUrl` a cada proyecto y renderizarla si existe, de esta forma:

1. Modifica la interfaz `ProjectItem` en `src/components/ProjectModal.tsx`:
   ```typescript
   export interface ProjectItem {
     // ... propiedades existentes
     imageUrl?: string; // <-- Nueva propiedad opcional
   }
   ```
2. Modifica el renderizado de la imagen en `src/components/ProjectModal.tsx`:
   ```tsx
   {project.imageUrl ? (
     <img src={project.imageUrl} alt={project.title} className="w-full h-auto rounded-xl object-cover" />
   ) : (
     <ImagePlaceholder text={project.placeholderText} aspectRatio="aspect-[4/3]" theme="orion" />
   )}
   ```
3. Haz lo mismo en `src/components/Portfolio.tsx` para las miniaturas en las tarjetas.
