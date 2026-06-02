/**
 * Categorías de armas del CS2.
 *
 * Las categorías principales agrupan armas por su rol en el juego.
 * Cada arma puede pertenecer a múltiples categorías (relación MxN),
 * permitiendo filtros combinados como "Rifles + Exclusivo CT".
 */
export interface Subcategory {
	slug: string;
	name: string;
}

export interface Category {
	slug: string;
	name: string;
	image: string;
	description: string;
	subcategories: Subcategory[];
}

export const categories: Category[] = [
	{
		slug: 'pistolas',
		name: 'Pistolas',
		image: '/weapons/glock-18.webp',
		description: 'Armas ligeras y económicas, vitales en la ronda de pistolas inicial.',
		subcategories: [
			{ slug: 'comunes', name: 'Comunes' },
			{ slug: 'otras', name: 'Otras' }
		]
	},
	{
		slug: 'mid-tier',
		name: 'Mid-Tier',
		image: '/weapons/mp9.webp',
		description: 'Combinan subfusiles, escopetas y ametralladoras ligeras. Ideales para distancias cortas o rondas económicas.',
		subcategories: [
			{ slug: 'smg', name: 'Subfusiles' },
			{ slug: 'escopeta', name: 'Escopetas' },
			{ slug: 'mg', name: 'Ametralladoras Ligeras' }
		]
	},
	{
		slug: 'rifles',
		name: 'Rifles',
		image: '/weapons/ak-47.webp',
		description: 'Las armas principales y más letales del juego. Alto poder de fuego y precisión.',
		subcategories: [
			{ slug: 'asalto', name: 'Asalto' },
			{ slug: 'sniper', name: 'Francotirador' }
		]
	},
	{
		slug: 'ct',
		name: 'Exclusivo CT',
		image: '/weapons/m4a4.webp',
		description: 'Armas disponibles únicamente para el equipo Contraterrorista.',
		subcategories: []
	},
	{
		slug: 't',
		name: 'Exclusivo T',
		image: '/weapons/galil-ar.webp',
		description: 'Armas disponibles únicamente para el equipo Terrorista.',
		subcategories: []
	}
];
