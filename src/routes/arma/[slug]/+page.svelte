<script lang="ts">
	/**
	 * Ficha completa del arma.
	 *
	 * Usa data.weapon y data.skins directamente (no copias locales)
	 * para que la reactividad funcione al navegar entre armas.
	 */
	import WeaponStats from '$lib/components/WeaponStats.svelte';
	import SkinCard from '$lib/components/SkinCard.svelte';
	import ShakeDetector from '$lib/components/ShakeDetector.svelte';

	let { data } = $props();

	let teamLabel = $derived(
		data.weapon.team === 'ct' ? 'Contraterrorista' :
		data.weapon.team === 't' ? 'Terrorista' : 'Ambos'
	);
</script>

<svelte:head>
	<title>{data.weapon.name} — CS2 Weapons</title>
</svelte:head>

<a href="/categoria/{data.weapon.categories[0]}" class="back-link">&larr; Volver</a>

<div class="weapon-detail">
	<div class="weapon-hero">
		<div class="weapon-image">
			<img src={data.weapon.image} alt={data.weapon.name} />
		</div>
		<div class="weapon-header">
			<h1>{data.weapon.name}</h1>
			<p class="desc">{data.weapon.description}</p>
			<div class="tags">
				<span class="tag price-tag">${data.weapon.price}</span>
				<span class="tag team-tag">{teamLabel}</span>
				<span class="tag type-tag">{data.weapon.type}</span>
				<span class="tag sub-tag">{data.weapon.subcategory}</span>
			</div>
		</div>
	</div>

	<WeaponStats weapon={data.weapon} />

	{#if data.skins.length > 0}
		<section class="skins-section">
			<h2>Top 5 skins mas caras</h2>
			<p class="subtitle">Precios en USD del Steam Market via ByMykel price-tracker</p>
			<div class="skins-grid">
				{#each data.skins as skin}
					<SkinCard {skin} />
				{/each}
			</div>
		</section>
	{:else}
		<section class="skins-section">
			<h2>Skins</h2>
			<div class="empty">
				<p>No se encontraron skins para esta arma. La API de SteamAnalyst puede estar momentáneamente no disponible.</p>
			</div>
		</section>
	{/if}

	<ShakeDetector drawSound={data.weapon.drawSound} shootSound={data.weapon.shootSound} weaponName={data.weapon.name} />
</div>

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

	.weapon-detail {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	.weapon-hero {
		display: flex;
		gap: 1.5rem;
		align-items: flex-start;
	}

	.weapon-image {
		flex-shrink: 0;
		width: 280px;
		aspect-ratio: 16 / 9;
		background: var(--bg-secondary);
		border-radius: var(--radius);
		border: 1px solid var(--border);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.75rem;
	}

	.weapon-image img {
		max-height: 100%;
		object-fit: contain;
	}

	.weapon-header h1 {
		font-size: 2rem;
		font-weight: 800;
		margin-bottom: 0.5rem;
	}

	.desc {
		color: var(--text-secondary);
		font-size: 0.9rem;
		margin-bottom: 0.75rem;
		line-height: 1.6;
		max-width: 600px;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.tag {
		font-size: 0.7rem;
		text-transform: uppercase;
		padding: 0.2rem 0.6rem;
		border-radius: var(--radius-sm);
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.price-tag {
		background: var(--green);
		color: #000;
	}

	.team-tag {
		background: var(--blue);
		color: #000;
	}

	.type-tag {
		background: var(--bg-secondary);
		color: var(--text-secondary);
	}

	.sub-tag {
		background: var(--accent);
		color: #000;
	}

	.skins-section h2 {
		font-size: 1.3rem;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	.subtitle {
		font-size: 0.8rem;
		color: var(--text-muted);
		margin-bottom: 1rem;
	}

	.skins-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		gap: 0.75rem;
	}

	.empty {
		text-align: center;
		padding: 2rem;
		color: var(--text-muted);
		background: var(--bg-card);
		border-radius: var(--radius);
	}

	@media (max-width: 640px) {
		.weapon-hero {
			flex-direction: column;
			align-items: center;
		}

		.weapon-image {
			width: 100%;
			max-width: 280px;
		}

		.weapon-header {
			text-align: center;
		}

		.weapon-header h1 {
			font-size: 1.5rem;
		}
	}
</style>
