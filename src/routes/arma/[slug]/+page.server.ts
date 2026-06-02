/**
 * Server load para la ficha de un arma.
 *
 * Carga stats locales y 5 skins de rareza mas alta con precios USD.
 */
import { error } from '@sveltejs/kit';
import { weapons } from '$lib/data/weapons';
import { getTopSkins } from '$lib/server/csgo-api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const weapon = weapons.find((w) => w.slug === params.slug);

	if (!weapon) {
		error(404, { message: 'Arma no encontrada', code: 'WEAPON_NOT_FOUND' });
	}

	let skins = [] as Array<{
		name: string;
		image: string;
		rarity: string;
		rarityColor: string;
		price: string | null;
	}>;

	try {
		skins = await getTopSkins(weapon.name);
	} catch (err) {
		console.error(`Error fetching skins for ${weapon.name}:`, err);
	}

	return { weapon, skins };
};
