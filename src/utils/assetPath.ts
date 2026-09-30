export const getAssetUrl = (path?: string): string => {
  if (!path) return '';
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';

  // Si ya tiene el prefijo de baseUrl completo (ej. /Mi_Portafolio/...)
  if (baseUrl !== '/' && path.startsWith(baseUrl)) {
    return path;
  }

  const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const cleanBaseWithoutSlash = cleanBase.startsWith('/') ? cleanBase.slice(1) : cleanBase;
  const pathWithoutLeadingSlash = path.startsWith('/') ? path.slice(1) : path;

  // Si ya inicia con el nombre de la carpeta (ej. Mi_Portafolio/...)
  if (cleanBaseWithoutSlash && pathWithoutLeadingSlash.startsWith(cleanBaseWithoutSlash)) {
    return `/${pathWithoutLeadingSlash}`;
  }

  return `${cleanBase}${pathWithoutLeadingSlash}`;
};
