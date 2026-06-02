<script lang="ts">
	/**
	 * Tabla de estadísticas del arma.
	 *
	 * Usa weapon.xxx directamente (no copias precomputadas)
	 * para que se actualicen correctamente al navegar entre armas.
	 */
	import type { Weapon, HitboxDamage } from '$lib/data/weapons';

	interface Props {
		weapon: Weapon;
	}

	let { weapon }: Props = $props();

	function damageClass(value: number): string {
		if (value >= 140) return 'lethal';
		if (value >= 80) return 'high';
		if (value >= 40) return 'med';
		return 'low';
	}
</script>

<div class="stats-container">
	<div class="stats-grid">
		<div class="stat-item">
			<span class="stat-label">Precio</span>
			<span class="stat-value">${weapon.price}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Recompensa por kill</span>
			<span class="stat-value">${weapon.killAward}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Daño base</span>
			<span class="stat-value">{weapon.damage}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Penetración de blindaje</span>
			<span class="stat-value">{weapon.armorPenetration}%</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Poder de penetración</span>
			<span class="stat-value">{weapon.penetrationPower}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Cadencia de fuego</span>
			<span class="stat-value">{weapon.fireRate} RPM</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Alcance preciso</span>
			<span class="stat-value">{weapon.accurateRange}m</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Tiempo de recarga</span>
			<span class="stat-value">{weapon.reloadTime}s</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Velocidad de movimiento</span>
			<span class="stat-value">{weapon.runningSpeed}</span>
		</div>
		<div class="stat-item">
			<span class="stat-label">Cargador</span>
			<span class="stat-value">{weapon.magazine} / {weapon.reserve}</span>
		</div>
	</div>

	<div class="damage-table-wrap">
		<h3>Daño por Hitbox</h3>
		<table class="damage-table">
			<thead>
				<tr>
					<th>Hitbox</th>
					<th>Sin Armadura</th>
					<th>Con Armadura</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="hitbox-label">Cabeza</td>
					<td class="dmg {damageClass(weapon.damageUnarmored.head)}">{weapon.damageUnarmored.head}</td>
					<td class="dmg {damageClass(weapon.damageArmored.head)}">{weapon.damageArmored.head}</td>
				</tr>
				<tr>
					<td class="hitbox-label">Pecho y Brazo</td>
					<td class="dmg {damageClass(weapon.damageUnarmored.chest)}">{weapon.damageUnarmored.chest}</td>
					<td class="dmg {damageClass(weapon.damageArmored.chest)}">{weapon.damageArmored.chest}</td>
				</tr>
				<tr>
					<td class="hitbox-label">Abdomen y Pelvis</td>
					<td class="dmg {damageClass(weapon.damageUnarmored.abdomen)}">{weapon.damageUnarmored.abdomen}</td>
					<td class="dmg {damageClass(weapon.damageArmored.abdomen)}">{weapon.damageArmored.abdomen}</td>
				</tr>
				<tr>
					<td class="hitbox-label">Piernas</td>
					<td class="dmg {damageClass(weapon.damageUnarmored.legs)}">{weapon.damageUnarmored.legs}</td>
					<td class="dmg {damageClass(weapon.damageArmored.legs)}">{weapon.damageArmored.legs}</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<style>
	.stats-container {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
	}

	.stats-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.stat-item {
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: 0.6rem 0.75rem;
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
	}

	.stat-label {
		font-size: 0.65rem;
		text-transform: uppercase;
		color: var(--text-muted);
		letter-spacing: 0.05em;
	}

	.stat-value {
		font-size: 1rem;
		font-weight: 700;
		font-family: var(--font-mono);
	}

	.damage-table-wrap h3 {
		font-size: 0.9rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--text-secondary);
	}

	.damage-table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.85rem;
	}

	.damage-table th {
		text-align: left;
		padding: 0.5rem 0.75rem;
		font-size: 0.7rem;
		text-transform: uppercase;
		color: var(--text-muted);
		letter-spacing: 0.05em;
		border-bottom: 1px solid var(--border);
	}

	.damage-table td {
		padding: 0.5rem 0.75rem;
		border-bottom: 1px solid var(--border);
		font-family: var(--font-mono);
		font-weight: 600;
	}

	.hitbox-label {
		color: var(--text-secondary);
	}

	.dmg.lethal {
		color: var(--red);
	}

	.dmg.high {
		color: var(--accent);
	}

	.dmg.med {
		color: var(--green);
	}

	.dmg.low {
		color: var(--text-muted);
	}

	@media (max-width: 640px) {
		.stats-container {
			grid-template-columns: 1fr;
		}
	}
</style>
