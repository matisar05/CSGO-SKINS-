<script lang="ts">
	/**
	 * Home page: muestra un grid con las 5 categorías principales de armas.
	 *
	 * Usa server load (+page.server.ts) para obtener las categorías,
	 * pero como categories.ts no tiene secretos, se importa directo.
	 *
	 * Cada CategoryCard linkea a /categoria/[slug] donde se ve el listado
	 * paginado con filtros de subcategoría.
	 */
	import { categories } from '$lib/data/categories';
	import { weapons } from '$lib/data/weapons';
	import CategoryCard from '$lib/components/CategoryCard.svelte';
</script>

<svelte:head>
	<title>CS2 Weapons Catalog</title>
</svelte:head>

<section class="hero">
	<h1>Catálogo de Armas del CS2</h1>
	<p>Explorá las estadísticas completas de cada arma, sus skins más caras y escuchá el sonido de disparo agitando el celular.</p>
</section>

<section class="categories">
	{#each categories as category}
		{@const count = weapons.filter((w) => w.categories.includes(category.slug)).length}
		<CategoryCard {category} {count} />
	{/each}
</section>

<style>
	.hero {
		text-align: center;
		padding: 2.5rem 1rem 2rem;
	}

	.hero h1 {
		font-size: 2rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
		background: linear-gradient(135deg, var(--accent), var(--blue));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.hero p {
		color: var(--text-secondary);
		max-width: 560px;
		margin: 0 auto;
		font-size: 0.95rem;
	}

	.categories {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
		gap: 1rem;
		margin-top: 1rem;
	}
</style>
