// Brand kit download helpers (ported from prototype)
// Pure, no deps. Used in client components for logo DL and full kit zip.

import { celestiaSVG } from "@/data/brand/logos";

export function triggerDownload(href: string, filename: string, revoke = false): void {
	const a = document.createElement("a");
	a.href = href;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	if (revoke) setTimeout(() => URL.revokeObjectURL(href), 1500);
}

export function svgToPngBytes(svgText: string, scale = 4): Promise<Uint8Array> {
	return new Promise((resolve, reject) => {
		const blob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const img = new Image();
		img.onload = () => {
			const w = img.naturalWidth || 252,
				h = img.naturalHeight || 252,
				s = scale || 4;
			const c = document.createElement("canvas");
			c.width = Math.round(w * s);
			c.height = Math.round(h * s);
			c.getContext("2d")!.drawImage(img, 0, 0, c.width, c.height);
			URL.revokeObjectURL(url);
			c.toBlob((b) => {
				if (!b) return reject(new Error("png blob failed"));
				b.arrayBuffer().then((ab) => resolve(new Uint8Array(ab)));
			}, "image/png");
		};
		img.onerror = reject;
		img.src = url;
	});
}

// Minimal ZIP writer (store, no compression) — exact port
const crcTable: number[] = (() => {
	const t: number[] = [];
	for (let n = 0; n < 256; n++) {
		let c = n;
		for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
		t[n] = c >>> 0;
	}
	return t;
})();

function crc32(bytes: Uint8Array): number {
	let crc = 0xffffffff;
	for (let i = 0; i < bytes.length; i++) crc = (crc >>> 8) ^ crcTable[(crc ^ bytes[i]) & 0xff];
	return (crc ^ 0xffffffff) >>> 0;
}

export interface ZipFile {
	name: string;
	data: Uint8Array;
}

export function makeZip(files: ZipFile[]): Blob {
	const enc = new TextEncoder();
	const u16 = (n: number): number[] => [n & 0xff, (n >> 8) & 0xff];
	const u32 = (n: number): number[] => [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff];
	const chunks: Uint8Array[] = [],
		central: Uint8Array[] = [];
	let offset = 0;
	for (const f of files) {
		const nameBytes = enc.encode(f.name),
			data = f.data,
			crc = crc32(data);
		const local = new Uint8Array(
			[].concat(
				u32(0x04034b50),
				u16(20),
				u16(0),
				u16(0),
				u16(0),
				u16(0),
				u32(crc),
				u32(data.length),
				u32(data.length),
				u16(nameBytes.length),
				u16(0)
			)
		);
		chunks.push(local, nameBytes, data);
		central.push(
			new Uint8Array(
				[].concat(
					u32(0x02014b50),
					u16(20),
					u16(20),
					u16(0),
					u16(0),
					u16(0),
					u16(0),
					u32(crc),
					u32(data.length),
					u32(data.length),
					u16(nameBytes.length),
					u16(0),
					u16(0),
					u16(0),
					u16(0),
					u32(0),
					u32(offset)
				)
			)
		);
		central.push(nameBytes);
		offset += local.length + nameBytes.length + data.length;
	}
	const cdStart = offset;
	let cdSize = 0;
	for (const c of central) {
		chunks.push(c);
		cdSize += c.length;
	}
	chunks.push(
		new Uint8Array(
			[].concat(
				u32(0x06054b50),
				u16(0),
				u16(0),
				u16(files.length),
				u16(files.length),
				u32(cdSize),
				u32(cdStart),
				u16(0)
			)
		)
	);
	let total = 0;
	chunks.forEach((c) => (total += c.length));
	const out = new Uint8Array(total);
	let p = 0;
	chunks.forEach((c) => {
		out.set(c, p);
		p += c.length;
	});
	return new Blob([out], { type: "application/zip" });
}

// Brand kit constants
export const BRAND_KIT_VARIANTS = [
	{ which: "symbol", color: "#0E1014", name: "celestia-symbol-black" },
	{ which: "symbol", color: "#FFFFFF", name: "celestia-symbol-white" },
	{ which: "symbol", color: "#5640D1", name: "celestia-symbol-indigo" },
	{ which: "logotype", color: "#0E1014", name: "celestia-logotype-black" },
	{ which: "logotype", color: "#FFFFFF", name: "celestia-logotype-white" },
	{ which: "logotype", color: "#5640D1", name: "celestia-logotype-indigo" },
] as const;

export const BRAND_KIT_README = [
	"CELESTIA BRAND KIT",
	"",
	"Logos",
	"  /svg  — vector source, editable in any design tool",
	"  /png  — 4x raster, transparent background",
	"",
	"Each mark ships in three colors:",
	"  black   #0E1014   (Void)",
	"  white   #FFFFFF",
	"  indigo  #5640D1",
	"",
	"symbol    = the standalone mark",
	"logotype  = the full Celestia wordmark",
	"",
	"Core palette",
	"  Frost     #FDFCFF",
	"  Void      #0E1014",
	"  Indigo    #5640D1",
	"  Amethyst  #7C68F2",
	"",
	"© 2026 Celestia Labs",
].join("\n");

// Convenience: generate svg text (reexport)
export { celestiaSVG };
