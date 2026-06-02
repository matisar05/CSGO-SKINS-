<script lang="ts">
	/**
	 * Tarjeta de arma para el listado de la categoría.
	 *
	 * Muestra imagen default, nombre, tipo, precio y daño del arma.
	 * Al hacer hover precarga los datos de la ficha (data-sveltekit-preload-data).
	 */
	import type { Weapon } from '$lib/data/weapons';

	interface Props {
		weapon: Weapon;
	}

	let { weapon }: Props = $props();
</script>

<a
	href="/arma/{weapon.slug}"
	class="card"
	data-sveltekit-preload-data="hover"
>
	<div class="image-wrap">
		<img src={weapon.image} alt={weapon.name} loading="lazy" />
		<span class="price">${weapon.price}</span>
	</div>
	<div class="info">
		<h3>{weapon.name}</h3>
		<div class="meta">
			<span class="type-badge">{weapon.type}</span>
			<span class="team-badge">{weapon.team}</span>
		</div>
		<div class="quick-stats">
			<span title="Daño base">{weapon.damage} dmg</span>
			<span title="Cadencia">{weapon.fireRate} RPM</span>
		</div>
	</div>
</a>

<style>
	.card {
		display: flex;
		flex-direction: column;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		overflow: hidden;
		transition: all 0.2s;
	}

	.card:hover {
		border-color: var(--accent);
		transform: translateY(-2px);
	}

	.image-wrap {
		position: relative;
		aspect-ratio: 16 / 9;
		background: var(--bg-primary);
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem;
	}

	.image-wrap img {
		max-height: 100%;
		object-fit: contain;
	}

	.price {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: rgba(0, 0, 0, 0.75);
		color: var(--green);
		font-size: 0.75rem;
		font-weight: 700;
		padding: 0.15rem 0.5rem;
		border-radius: var(--radius-sm);
	}

	.info {
		padding: 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	.info h3 {
		font-size: 0.95rem;
		font-weight: 700;
	}

	.meta {
		display: flex;
		gap: 0.4rem;
	}

	.type-badge,
	.team-badge {
		font-size: 0.65rem;
		text-transform: uppercase;
		padding: 0.1rem 0.45rem;
		border-radius: var(--radius-sm);
		font-weight: 600;
		letter-spacing: 0.05em;
	}

	.type-badge {
		background: var(--bg-secondary);
		color: var(--blue);
	}

	.team-badge {
		background: var(--bg-secondary);
		color: var(--accent);
	}

	.quick-stats {
		display: flex;
		gap: 0.75rem;
		font-size: 0.72rem;
		color: var(--text-muted);
		font-family: var(--font-mono);
	}
</style>
