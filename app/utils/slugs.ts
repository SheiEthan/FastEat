/**
 * Transforme une chaîne en slug URL-friendly
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Crée un slug de restaurant au format "uuid-nom"
 */
export function createRestaurantSlug(restaurant: { id: string; name: string }): string {
  return `${restaurant.id}-${createSlug(restaurant.name)}`;
}

/**
 * Crée un slug de plat au format "uuid-nom"
 */
export function createDishSlug(dish: { id: string; name: string }): string {
  return `${dish.id}-${createSlug(dish.name)}`;
}

/**
 * Extrait l'UUID depuis un slug au format "uuid-nom"
 * Un UUID fait toujours 36 caractères (8-4-4-4-12 avec tirets)
 */
export function extractIdFromSlug(slug: string): string {
  const uuidMatch = slug.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  if (uuidMatch) return uuidMatch[0];
  throw new Error(`Invalid slug format: ${slug}`);
}
