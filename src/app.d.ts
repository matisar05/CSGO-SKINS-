import type { App } from '@sveltejs/kit';

declare global {
	namespace App {
		interface Error {
			message: string;
			code?: string;
		}
	}
}

export {};
