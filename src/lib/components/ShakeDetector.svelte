<script lang="ts">
	/**
	 * Escucha mensajes de Expo (shake detectado via DeviceMotion nativo)
	 * y reproduce draw -> shoot con Web Audio API.
	 */
	import { onMount } from 'svelte';

	interface Props {
		drawSound?: string;
		shootSound: string;
		weaponName: string;
	}

	let { drawSound, shootSound, weaponName }: Props = $props();

	const COOLDOWN_MS = 1500;

	let message = $state('');
	let lastFired = 0;
	let isPlaying = false;

	let audioContext: AudioContext | null = null;
	let drawBuffer: AudioBuffer | null = null;
	let shootBuffer: AudioBuffer | null = null;

	function triggerShake() {
		const now = Date.now();
		if (now - lastFired < COOLDOWN_MS || isPlaying) return;
		lastFired = now;
		playSequence();
	}

	function playSequence() {
		if (!audioContext) return;

		isPlaying = true;
		audioContext.resume().then(() => {
			if (!shootBuffer) {
				isPlaying = false;
				return;
			}

			if (!drawBuffer) {
				message = `Disparo de ${weaponName}!`;
				const src = audioContext!.createBufferSource();
				src.buffer = shootBuffer!;
				src.connect(audioContext!.destination);
				src.start(0);
				src.onended = () => { isPlaying = false; message = ''; };
				return;
			}

			message = `${weaponName}: sacando arma...`;
			const drawSrc = audioContext!.createBufferSource();
			drawSrc.buffer = drawBuffer;
			drawSrc.connect(audioContext!.destination);
			drawSrc.onended = () => {
				if (!shootBuffer) { isPlaying = false; return; }
				message = `Disparo de ${weaponName}!`;
				const shootSrc = audioContext!.createBufferSource();
				shootSrc.buffer = shootBuffer;
				shootSrc.connect(audioContext!.destination);
				shootSrc.start(0);
				shootSrc.onended = () => { isPlaying = false; message = ''; };
			};
			drawSrc.start(0);
		});
	}

	function onWebViewMessage(e: MessageEvent) {
		try {
			const data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data;
			if (data?.shake === true) triggerShake();
		} catch {}
	}

	onMount(async () => {
		try {
			audioContext = new AudioContext();

			const [drawResp, shootResp] = await Promise.all([
				drawSound ? fetch(drawSound) : null,
				fetch(shootSound)
			]);

			if (shootResp?.ok) {
				shootBuffer = await audioContext.decodeAudioData(await shootResp.arrayBuffer());
			}

			if (drawResp?.ok) {
				drawBuffer = await audioContext.decodeAudioData(await drawResp.arrayBuffer());
			}

			window.addEventListener('message', onWebViewMessage);
			document.addEventListener('message', onWebViewMessage);
		} catch {}

		return () => {
			window.removeEventListener('message', onWebViewMessage);
			document.removeEventListener('message', onWebViewMessage);
			audioContext?.close();
		};
	});
</script>

{#if message}
	<div class="shake-hint">
		<span class="shake-msg">{message}</span>
	</div>
{/if}

<style>
	.shake-hint {
		text-align: center;
		padding: 1rem;
		background: var(--bg-card);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		margin-top: 0.5rem;
	}
	.shake-msg {
		font-size: 1rem;
		font-weight: 700;
		color: var(--accent);
		animation: pulse 0.3s ease-out;
	}
	@keyframes pulse {
		0% { transform: scale(1.2); opacity: 0.5; }
		100% { transform: scale(1); opacity: 1; }
	}
</style>
