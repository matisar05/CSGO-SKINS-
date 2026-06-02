/**
 * Sistema de caché en memoria con TTL (Time-To-Live).
 *
 * Al ser un proyecto con un solo servidor (sin clúster), un Map en memoria
 * es suficiente para cachear respuestas de la API de SteamAnalyst.
 *
 * Ventajas:
 * - Sin dependencias externas (Redis, archivos, etc.)
 * - Rápido (acceso O(1))
 * - Simple de implementar y entender
 *
 * El TTL de 1 hora evita exceder los rate limits de la API y mantiene
 * los precios razonablemente actualizados durante la demo.
 */

const TTL = 60 * 60 * 1000; // 1 hora en milisegundos

interface CacheEntry<T> {
	data: T;
	expiry: number;
}

const store = new Map<string, CacheEntry<unknown>>();

/**
 * Obtiene un valor del caché. Retorna null si no existe o expiró.
 */
export function getCached<T>(key: string): T | null {
	const entry = store.get(key);
	if (!entry) return null;
	if (Date.now() > entry.expiry) {
		store.delete(key);
		return null;
	}
	return entry.data as T;
}

/**
 * Guarda un valor en el caché con TTL de 1 hora.
 */
export function setCache<T>(key: string, data: T): void {
	store.set(key, {
		data,
		expiry: Date.now() + TTL
	});
}

/**
 * Limpia todo el caché (útil para desarrollo/testing).
 */
export function clearCache(): void {
	store.clear();
}
