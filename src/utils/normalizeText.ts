/**
 * Metodo para el buscador
 * Permite buscar por palabras sin acento o incluidas dentro del nombre completo
 * @param text seria la query param a buscar
 */

export function normalize(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}
