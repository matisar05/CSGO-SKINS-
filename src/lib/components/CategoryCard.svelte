<script lang="ts">
	/**
	 * Tarjeta de categoría para la página principal.
	 *
	 * Usa la runa $props() de Svelte 5 en lugar del legacy export let.
	 * Las props se tipan con una interfaz TypeScript.
	 *
	 * Muestra el ícono, nombre, descripción, subcategorías y cantidad de armas.
	 * Al hacer clic, navega a /categoria/[slug] donde se listan las armas filtradas.
	 */
	import type { Category } from '$lib/data/categories';

	interface Props {
		category: Category;
		count: number;
	}

	let { category, count }: Props = $props();
</script>

<a href="/categoria/{category.slug}" class="card">
	<div class="card-icon">
		<img src={category.image} alt={category.name} />
	</div>
	<div class="card-body">
		<h2>{category.name}</h2>
		<p>{category.description}</p>
		{#if category.subcategories.length > 0}
			<div class="subs">
				{#each category.subcategories as sub}
					<span class="sub-tag">{sub.name}</span>
				{/each}
			</div>
		{/if}
		<span class="count">{count} armas</span>
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: 1.25rem;
		transition: all 0.2s;
	}

	.card:hover {
		background: var(--bg-card-hover);
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.card-icon {
		width: 64px;
		height: 64px;
		background: var(--bg-primary);
		border-radius: var(--radius);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.35rem;
	}

	.card-icon img {
		max-width: 100%;
		max-height: 100%;
		object-fit: contain;
	}

	.card-body h2 {
		font-size: 1.1rem;
		font-weight: 700;
		margin-bottom: 0.3rem;
	}

	.card-body p {
		font-size: 0.8rem;
		color: var(--text-secondary);
		margin-bottom: 0.5rem;
		line-height: 1.5;
	}

	.subs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
		margin-bottom: 0.5rem;
	}

	.sub-tag {
		font-size: 0.7rem;
		padding: 0.15rem 0.5rem;
		background: var(--bg-primary);
		border-radius: var(--radius-sm);
		color: var(--text-muted);
	}

	.count {
		font-size: 0.75rem;
		color: var(--accent);
		font-weight: 600;
	}
</style>
