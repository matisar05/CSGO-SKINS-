/**
 * Cliente para ByMykel CSGO-API + ByMykel price-tracker.
 *
 * Skins: https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json
 * Precios: https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/main/static/latest.json
 *
 * Ambas APIs gratuitas, sin key, archivos JSON estáticos en GitHub raw.
 *
 * Para obtener las 5 skins de rareza mas alta de un arma:
 * 1. Filtramos skins agrupadas cuyo weapon.name coincida
 * 2. Deducimos duplicados por pattern.id (evita mismo skin en distinto wear)
 * 3. Ordenamos por rareza descendente, tomamos las primeras 5
 * 4. Buscamos precio en USD del price-tracker (clave: "Nombre Skin (Factory New)")
 *
 * Ranking de rareza (CS2):
 *   7 = Gold / Contraband (#e4ae39)
 *   6 = Covert / Red (#eb4b4b)
 *   5 = Classified / Pink (#d32ce6)
 *   4 = Restricted / Purple (#8847ff)
 *   3 = Mil-Spec / Blue (#4b69ff)
 *   2 = Industrial / Light Blue (#5e98d9)
 *   1 = Consumer / White (#b0c3d9)
 */

import { getCached, setCache } from './cache';

const SKINS_URL = 'https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json';
const PRICES_URL = 'https://raw.githubusercontent.com/ByMykel/counter-strike-price-tracker/main/static/latest.json';

const SKINS_CACHE_KEY = 'bymykel_skins';
const PRICES_CACHE_KEY = 'bymykel_prices';

const RARITY_RANK: Record<string, number> = {
	'#e4ae39': 7,
	'#eb4b4b': 6,
	'#d32ce6': 5,
	'#8847ff': 4,
	'#4b69ff': 3,
	'#5e98d9': 2,
	'#b0c3d9': 1,
	'#ded6cc': 1,
};

interface ByMykelSkin {
	id: string;
	name: string;
	weapon: { name: string };
	rarity: { name: string; color: string };
	pattern: { id: string; name: string };
	image: string;
}

interface PriceData {
	metadata: { updated_at: string; currency: string };
	prices: Record<string, number>;
}

export interface Skin {
	name: string;
	image: string;
	rarity: string;
	rarityColor: string;
	price: string | null;
}

function rarityRank(color: string): number {
	return RARITY_RANK[color.toLowerCase()] ?? 0;
}

async function fetchSkins(): Promise<ByMykelSkin[]> {
	const cached = getCached<ByMykelSkin[]>(SKINS_CACHE_KEY);
	if (cached) return cached;

	const response = await fetch(SKINS_URL);
	if (!response.ok) throw new Error(`ByMykel API error: ${response.status}`);
	const data = await response.json();
	if (!Array.isArray(data)) throw new Error('Formato inesperado');

	setCache(SKINS_CACHE_KEY, data);
	return data;
}

async function fetchPrices(): Promise<PriceData | null> {
	const cached = getCached<PriceData>(PRICES_CACHE_KEY);
	if (cached) return cached;

	try {
		const response = await fetch(PRICES_URL);
		if (!response.ok) return null;
		const data: PriceData = await response.json();
		setCache(PRICES_CACHE_KEY, data);
		return data;
	} catch {
		return null;
	}
}

function centsToUSD(cents: number): string {
	return `$${(cents / 100).toFixed(2)}`;
}

/**
 * Obtiene las 5 skins de rareza mas alta de un arma, con precios en USD.
 */
export async function getTopSkins(weaponName: string): Promise<Skin[]> {
	const [allSkins, priceData] = await Promise.all([fetchSkins(), fetchPrices()]);

	const weaponSkins = allSkins.filter((s) => s.weapon?.name === weaponName);
	if (weaponSkins.length === 0) return [];

	// Deduplicar por pattern.id
	const seen = new Set<string>();
	const unique: ByMykelSkin[] = [];
	for (const skin of weaponSkins) {
		const key = skin.pattern?.id ?? skin.id;
		if (!seen.has(key)) {
			seen.add(key);
			unique.push(skin);
		}
	}

	// Mapear skins con precio, ordenar por precio descendente, tomar 5
	const withPrices = unique.map((skin) => {
		const priceKey = `${skin.name} (Factory New)`;
		const cents = priceData?.prices?.[priceKey] ?? 0;
		return {
			name: skin.pattern?.name ?? skin.name,
			image: skin.image,
			rarity: skin.rarity?.name ?? 'Common',
			rarityColor: skin.rarity?.color ?? '#b0c3d9',
			price: cents,
		};
	});

	const selected = withPrices
		.sort((a, b) => b.price - a.price)
		.slice(0, 5);

	return selected.map((skin) => ({
		...skin,
		price: skin.price > 0 ? centsToUSD(skin.price) : null,
	}));
}
