<script lang="ts">
	/**
	 * Página de error global de SvelteKit.
	 *
	 * SvelteKit muestra automáticamente esta página cuando:
	 * - Se llama a error() en un load function (errores esperados)
	 * - Ocurre un error inesperado durante el renderizado
	 *
	 * El objeto page.error contiene el mensaje y código opcional
	 * definidos en app.d.ts (App.Error).
	 */
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>Error {page.status} — CS2 Weapons</title>
</svelte:head>

<div class="error-page">
	<h1>{page.status}</h1>
	<p>{page.error?.message || 'Algo salió mal.'}</p>
	<a href="/" class="home-link">Volver al inicio</a>
</div>

<style>
	.error-page {
		text-align: center;
		padding: 4rem 1rem;
	}

	.error-page h1 {
		font-size: 4rem;
		font-weight: 800;
		color: var(--accent);
		margin-bottom: 0.5rem;
	}

	.error-page p {
		color: var(--text-secondary);
		margin-bottom: 1.5rem;
		font-size: 1.1rem;
	}

	.home-link {
		display: inline-block;
		padding: 0.6rem 1.5rem;
		background: var(--accent);
		color: #000;
		border-radius: var(--radius);
		font-weight: 700;
		font-size: 0.9rem;
	}

	.home-link:hover {
		background: var(--accent-hover);
		color: #000;
	}
</style>
