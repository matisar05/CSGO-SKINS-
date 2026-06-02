import { error } from '@sveltejs/kit';
import { categories } from '$lib/data/categories';
import { weapons } from '$lib/data/weapons';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, url }) => {
	const category = categories.find((c) => c.slug === params.slug);

	if (!category) {
		error(404, { message: 'Categoría no encontrada', code: 'CATEGORY_NOT_FOUND' });
	}

	const subFilter = url.searchParams.get('sub') || '';

	let filtered = weapons.filter((w) => w.categories.includes(category.slug));

	if (subFilter) {
		filtered = filtered.filter((w) => w.subcategory === subFilter);
	}

	return {
		category,
		weapons: filtered,
		sub: subFilter
	};
};
