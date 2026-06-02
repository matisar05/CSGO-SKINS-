<script lang="ts">
	/**
	 * Shake Detector: detecta cuando el usuario agita el celular y reproduce
	 * primero el sonido de sacar el arma (draw) y al terminar, el disparo (shoot).
	 *
	 * Tecnología: DeviceMotion API (nativa del navegador, no requiere Expo).
	 *
	 * Cómo funciona:
	 * 1. Escucha el evento `devicemotion` que reporta aceleración en 3 ejes (x, y, z)
	 * 2. Calcula la magnitud del vector de aceleración: sqrt(x² + y² + z²)
	 * 3. Si supera el umbral (25 m/s²), inicia la secuencia draw → shoot
	 * 4. Tiene un cooldown de 1.5s para evitar múltiples disparos por un mismo shake
	 *
	 * Web Audio API:
	 * - Precarga ambos archivos como AudioBuffer para baja latencia
	 * - draw se reproduce primero; cuando termina (onended), arranca shoot
	 * - Si draw falla, shoot se reproduce directo como fallback
	 *
	 * Limpieza: $effect() de Svelte 5 registra el listener al montar el componente
	 * y lo remueve automáticamente al desmontar (navegar a otra página).
	 */
	import { onMount } from 'svelte';

	interface Props {
		drawSound?: string;
		shootSound: string;
		weaponName: string;
	}

	let { drawSound, shootSound, weaponName }: Props = $props();

	const SHAKE_THRESHOLD = 25;
	const COOLDOWN_MS = 1500;

	let isSupported = $state(false);
	let lastFired = $state(0);
	let message = $state('');
	let isPlaying = $state(false);

	let audioContext: AudioContext | null = null;
	let drawBuffer: AudioBuffer | null = null;
	let shootBuffer: AudioBuffer | null = null;

	onMount(async () => {
		if (typeof DeviceMotionEvent === 'undefined') return;

		if (typeof (DeviceMotionEvent as any).requestPermission === 'function') {
			try {
				await (DeviceMotionEvent as any).requestPermission();
			} catch {
				return;
			}
		}

		try {
			audioContext = new AudioContext();

			const shootResp = await fetch(shootSound);
			const shootData = await shootResp.arrayBuffer();
			shootBuffer = await audioContext.decodeAudioData(shootData);

			if (drawSound) {
				const drawResp = await fetch(drawSound);
				const drawData = await drawResp.arrayBuffer();
				drawBuffer = await audioContext.decodeAudioData(drawData);
			}

			isSupported = true;
		} catch {
			// Audio no disponible, el shake no hará nada
		}

		function handleMotion(event: DeviceMotionEvent) {
			const acc = event.accelerationIncludingGravity;
			if (!acc || acc.x === null) return;

			const magnitude = Math.sqrt(
				(acc.x ?? 0) ** 2 + (acc.y ?? 0) ** 2 + (acc.z ?? 0) ** 2
			);

			const now = Date.now();
			if (magnitude > SHAKE_THRESHOLD && now - lastFired > COOLDOWN_MS && !isPlaying) {
				lastFired = now;
				playSequence();
			}
		}

		function playSequence() {
			if (!audioContext) return;

			if (audioContext.state === 'suspended') {
				audioContext.resume();
			}

			isPlaying = true;

			// Si no hay draw, disparar directo
			if (!drawBuffer) {
				message = `¡Disparo de ${weaponName}!`;
				const shootSource = audioContext.createBufferSource();
				shootSource.buffer = shootBuffer;
				shootSource.connect(audioContext.destination);
				shootSource.start(0);
				shootSource.onended = () => {
					isPlaying = false;
					message = '';
				};
				return;
			}

			message = `${weaponName}: sacando arma...`;

			const drawSource = audioContext.createBufferSource();
			drawSource.buffer = drawBuffer;
			drawSource.connect(audioContext.destination);

			drawSource.onended = () => {
				if (!audioContext || !shootBuffer) {
					isPlaying = false;
					return;
				}

				message = `¡Disparo de ${weaponName}!`;

				const shootSource = audioContext.createBufferSource();
				shootSource.buffer = shootBuffer;
				shootSource.connect(audioContext.destination);
				shootSource.start(0);

				shootSource.onended = () => {
					isPlaying = false;
					message = '';
				};
			};

			drawSource.start(0);
		}

		window.addEventListener('devicemotion', handleMotion);

		return () => {
			window.removeEventListener('devicemotion', handleMotion);
			audioContext?.close();
		};
	});
</script>

{#if isSupported}
	<div class="shake-hint">
		{#if message}
			<span class="shake-msg">{message}</span>
		{:else}
			<span class="shake-label">Agitá el celular para {drawSound ? 'sacar y ' : ''}disparar el arma</span>
		{/if}
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

	.shake-label {
		font-size: 0.8rem;
		color: var(--text-muted);
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
