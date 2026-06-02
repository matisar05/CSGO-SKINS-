/**
 * Script para descargar las imágenes default de las 34 armas del CS2.
 * Versión corregida: usa CS2_ITEMS + traducciones en inglés directamente.
 */
import { CS2_ITEMS } from '@ianlucas/cs2-lib';
import { english } from '@ianlucas/cs2-lib/translations';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.resolve(__dirname, '..', 'static', 'weapons');
const CDN_BASE = 'https://cdn.cstrike.app/';

const WEAPON_MAP: Record<string, string> = {
	'p2000': 'P2000',
	'usp-s': 'USP-S',
	'glock-18': 'Glock-18',
	'dual-berettas': 'Dual Berettas',
	'p250': 'P250',
	'five-seven': 'Five-SeveN',
	'tec-9': 'Tec-9',
	'cz75-auto': 'CZ75-Auto',
	'desert-eagle': 'Desert Eagle',
	'r8-revolver': 'R8 Revolver',
	'mp9': 'MP9',
	'mac-10': 'MAC-10',
	'pp-bizon': 'PP-Bizon',
	'ump-45': 'UMP-45',
	'mp5-sd': 'MP5-SD',
	'mp7': 'MP7',
	'p90': 'P90',
	'nova': 'Nova',
	'mag-7': 'MAG-7',
	'sawed-off': 'Sawed-Off',
	'xm1014': 'XM1014',
	'm249': 'M249',
	'negev': 'Negev',
	'famas': 'FAMAS',
	'galil-ar': 'Galil AR',
	'm4a1-s': 'M4A1-S',
	'm4a4': 'M4A4',
	'ak-47': 'AK-47',
	'aug': 'AUG',
	'sg-553': 'SG 553',
	'ssg-08': 'SSG 08',
	'awp': 'AWP',
	'scar-20': 'SCAR-20',
	'g3sg1': 'G3SG1'
};

async function downloadImage(url: string, filePath: string): Promise<void> {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`Error ${response.status} descargando ${url}`);
	const buffer = Buffer.from(await response.arrayBuffer());
	fs.writeFileSync(filePath, buffer);
}

async function main() {
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	// Build a lookup: English name → CS2Item
	const nameToItem = new Map<string, typeof CS2_ITEMS[number]>();
	for (const item of CS2_ITEMS) {
		if (item.type === 'weapon' && item.base === true) {
			const translation = english[item.id];
			if (translation?.name) {
				nameToItem.set(translation.name, item);
			}
		}
	}

	let success = 0;
	let failed = 0;

	for (const [slug, weaponName] of Object.entries(WEAPON_MAP)) {
		const item = nameToItem.get(weaponName);

		if (!item?.image) {
			console.log(`[SKIP] ${weaponName} (${slug}): no encontrado`);
			failed++;
			continue;
		}

		const imageUrl = CDN_BASE + item.image;
		const outputPath = path.join(OUTPUT_DIR, `${slug}.webp`);

		try {
			await downloadImage(imageUrl, outputPath);
			console.log(`[OK] ${weaponName} → ${slug}.webp`);
			success++;
		} catch (err) {
			console.log(`[FAIL] ${weaponName}: ${err}`);
			failed++;
		}
	}

	console.log(`\nDescargadas: ${success}, Fallidas: ${failed}`);
}

main().catch(console.error);
