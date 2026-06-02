<script lang="ts">
	/**
	 * Filtro de subcategorías para la página de categoría.
	 *
	 * Muestra botones/pills para filtrar por subcategoría.
	 * El filtro activo se resalta con color acento.
	 * Al hacer clic, recarga la página con el parámetro ?sub= en la URL
	 * (o lo quita si se clickea "Todas" o el filtro activo).
	 *
	 * La navegación con searchParams fuerza un server load nuevo
	 * que aplica el filtro del lado del servidor.
	 */
	import type { Subcategory } from '$lib/data/categories';

	interface Props {
		subcategories: Subcategory[];
		current: string;
		categorySlug: string;
	}

	let { subcategories, current, categorySlug }: Props = $props();
</script>

<div class="filter-bar">
	<a
		href="/categoria/{categorySlug}"
		class="pill"
		class:active={!current}
	>
		Todas
	</a>
	{#each subcategories as sub}
		<a
			href="/categoria/{categorySlug}?sub={sub.slug}"
			class="pill"
			class:active={current === sub.slug}
		>
			{sub.name}
		</a>
	{/each}
</div>

<style>
	.filter-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
		margin-bottom: 1.25rem;
	}

	.pill {
		font-size: 0.8rem;
		padding: 0.35rem 0.9rem;
		border-radius: 100px;
		background: var(--bg-secondary);
		color: var(--text-secondary);
		transition: all 0.15s;
		font-weight: 500;
	}

	.pill:hover {
		background: var(--bg-card);
		color: var(--text-primary);
	}

	.pill.active {
		background: var(--accent);
		color: #000;
		font-weight: 700;
	}
</style>
