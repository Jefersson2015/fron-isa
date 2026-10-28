// Obtener la URL base del backend desde las variables de entorno
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';
const BACKEND_URL = API_URL.replace('/api', '');

/**
 * Convierte una ruta de imagen relativa en una URL completa
 * @param {string} imagenPath - Ruta de la imagen (ej: /uploads/foto.jpg)
 * @returns {string} URL completa de la imagen
 */
export const getImagenUrl = (imagenPath) => {
  // Si no hay imagen, retornar string vacío
  if (!imagenPath) return '';
  
  // Si ya es una URL completa (empieza con http), retornarla tal cual
  if (imagenPath.startsWith('http://') || imagenPath.startsWith('https://')) {
    return imagenPath;
  }
  
  // Si es una ruta relativa (empieza con /), anteponer la URL del backend
  return `${BACKEND_URL}${imagenPath}`;
};