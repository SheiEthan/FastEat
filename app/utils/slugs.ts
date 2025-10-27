/**
 * Transforme une chaîne en slug URL-friendly
 */
export function createSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Décompose les caractères accentués
    .replace(/[\u0300-\u036f]/g, '') // Supprime les accents
    .replace(/[^a-z0-9\s-]/g, '') // Garde seulement lettres, chiffres, espaces et tirets
    .trim()
    .replace(/\s+/g, '-') // Remplace les espaces par des tirets
    .replace(/-+/g, '-'); // Évite les tirets multiples
}

/**
 * Crée un slug de restaurant au format "id-nom"
 */
export function createRestaurantSlug(restaurant: { id: number; name: string }): string {
  const nameSlug = createSlug(restaurant.name);
  return `${restaurant.id}-${nameSlug}`;
}

/**
 * Crée un slug de plat au format "id-nom"
 */
export function createDishSlug(dish: { id: number; name: string }): string {
  const nameSlug = createSlug(dish.name);
  return `${dish.id}-${nameSlug}`;
}

/**
 * Extrait l'ID depuis un slug au format "id-nom"
 */
export function extractIdFromSlug(slug: string): number {
  const id = slug.split('-')[0];
  if (!id) {
    throw new Error(`Invalid slug format: ${slug}`);
  }
  return parseInt(id, 10);
}