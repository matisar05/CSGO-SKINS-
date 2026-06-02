<script lang="ts">
	/**
	 * Tarjeta de skin con imagen, rareza y precio en USD.
	 */
	interface Props {
		skin: {
			name: string;
			image: string;
			rarity: string;
			rarityColor: string;
			price: string | null;
		};
	}

	let { skin }: Props = $props();

	let imageError = $state(false);
</script>

<div class="skin-card">
	<div class="skin-image">
		{#if !imageError}
			<img
				src={skin.image}
				alt={skin.name}
				loading="lazy"
				onerror={() => imageError = true}
			/>
		{:else}
			<div class="image-fallback">{skin.rarity}</div>
		{/if}
	</div>
	<div class="skin-info">
		<h4>{skin.name}</h4>
		<div class="skin-rarity" style="color: {skin.rarityColor}">
			<span class="rarity-dot" style="background: {skin.rarityColor}"></span>
			{skin.rarity}
		</div>
		{#if skin.price}
			<span class="price-value">{skin.price}</span>
		{:else}
			<span class="no-price">Sin precio</span>
		{/if}
	</div>
</div>

<style>
	.skin-card {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
		transition: all 0.2s;
	}

	.skin-card:hover {
		border-color: var(--accent);
	}

	.skin-image {
		aspect-ratio: 1;
		background: var(--bg-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.skin-image img {
		max-height: 100%;
		max-width: 100%;
		object-fit: contain;
	}

	.image-fallback {
		color: var(--text-muted);
		font-size: 0.7rem;
		text-align: center;
		padding: 1rem;
	}

	.skin-info {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.35rem;
	}

	.skin-info h4 {
		font-size: 0.8rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.skin-rarity {
		display: flex;
		align-items: center;
		gap: 0.35rem;
		font-size: 0.7rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.05em;
	}

	.rarity-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		flex-shrink: 0;
	}

	.price-value {
		font-size: 1.05rem;
		font-weight: 800;
		color: var(--green);
		font-family: var(--font-mono);
	}

	.no-price {
		font-size: 0.65rem;
		color: var(--text-muted);
		font-style: italic;
	}
</style>
