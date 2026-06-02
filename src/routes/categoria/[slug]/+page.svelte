<script lang="ts">
	/**
	 * Página de categoría: lista de armas con filtros de subcategoría.
	 *
	 * Usa data.weapons, data.category y data.sub directamente desde $props()
	 * en lugar de copias locales, para que se actualicen al navegar.
	 */
	import WeaponCard from '$lib/components/WeaponCard.svelte';
	import SubcategoryFilter from '$lib/components/SubcategoryFilter.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.category.name} — CS2 Weapons</title>
</svelte:head>

<a href="/" class="back-link">&larr; Todas las categorías</a>

<div class="page-header">
	<div>
		<h1><img src={data.category.image} alt="" class="cat-img" /> {data.category.name}</h1>
		<p>{data.category.description}</p>
	</div>
	<span class="total-count">{data.weapons.length} armas</span>
</div>

{#if data.category.subcategories.length > 0}
	<SubcategoryFilter
		subcategories={data.category.subcategories}
		current={data.sub}
		categorySlug={data.category.slug}
	/>
{/if}

{#if data.weapons.length === 0}
	<div class="empty">
		<p>No se encontraron armas en esta categoría{data.sub ? ` con el filtro "${data.sub}"` : ''}.</p>
	</div>
{:else}
	<div class="weapon-grid">
		{#each data.weapons as weapon}
			<WeaponCard {weapon} />
		{/each}
	</div>
{/if}

<style>
	.back-link {
		display: inline-block;
		font-size: 0.85rem;
		color: var(--text-muted);
		margin-bottom: 1rem;
	}

	.back-link:hover {
		color: var(--text-primary);
	}

	.page-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		margin-bottom: 1.25rem;
		gap: 1rem;
	}

	.page-header h1 {
		font-size: 1.6rem;
		font-weight: 800;
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.cat-img {
		height: 32px;
		width: auto;
	}

	.page-header p {
		color: var(--text-secondary);
		font-size: 0.85rem;
		margin-top: 0.25rem;
	}

	.total-count {
		font-size: 0.8rem;
		color: var(--text-muted);
		white-space: nowrap;
		padding: 0.3rem 0.75rem;
		background: var(--bg-secondary);
		border-radius: var(--radius-sm);
	}

	.weapon-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 0.75rem;
	}

	.empty {
		text-align: center;
		padding: 3rem 1rem;
		color: var(--text-muted);
	}
</style>
