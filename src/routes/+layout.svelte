<script lang="ts">
	import '../app.css';

	/**
	 * Layout raíz de la aplicación.
	 *
	 * SvelteKit usa layouts anidados: este +layout.svelte envuelve todas las páginas.
	 * El header y la navegación persisten entre navegaciones (no se re-renderizan).
	 * El slot {@render children()} inyecta el contenido de cada ruta.
	 *
	 * Las rutas anidadas pueden tener su propio +layout.svelte que hereda de este.
	 */
	let { children } = $props();
</script>

<svelte:head>
	<title>CS2 Weapons Catalog</title>
</svelte:head>

<header>
	<nav class="container">
		<a href="/" class="logo">
			<img src="/weapons/ak-47.webp" alt="CS2" class="logo-img" />
			<span>CS2 Weapons</span>
		</a>
		<div class="nav-links">
			<a href="/categoria/pistolas">Pistolas</a>
			<a href="/categoria/mid-tier">Mid-Tier</a>
			<a href="/categoria/rifles">Rifles</a>
		</div>
	</nav>
</header>

<main class="container">
	{@render children()}
</main>

<footer>
	<div class="container">
		<p>CS2 Weapons Catalog &mdash; Demo con SvelteKit + SteamAnalyst API</p>
	</div>
</footer>

<style>
	header {
		background: var(--bg-secondary);
		border-bottom: 1px solid var(--border);
		position: sticky;
		top: 0;
		z-index: 100;
		backdrop-filter: blur(12px);
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 56px;
	}

	.logo {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 1.2rem;
		font-weight: 700;
		color: var(--text-primary);
		letter-spacing: -0.02em;
	}

	.logo:hover {
		color: var(--accent);
	}

	.logo-img {
		height: 28px;
		width: auto;
	}

	.nav-links {
		display: flex;
		gap: 0.25rem;
	}

	.nav-links a {
		padding: 0.35rem 0.75rem;
		border-radius: var(--radius);
		font-size: 0.85rem;
		color: var(--text-secondary);
		transition: all 0.15s;
	}

	.nav-links a:hover {
		color: var(--text-primary);
		background: var(--bg-card);
	}

	main {
		padding-top: 1.5rem;
		padding-bottom: 3rem;
		min-height: calc(100vh - 56px - 60px);
	}

	footer {
		border-top: 1px solid var(--border);
		padding: 1.25rem 0;
		text-align: center;
	}

	footer p {
		color: var(--text-muted);
		font-size: 0.8rem;
	}
</style>
