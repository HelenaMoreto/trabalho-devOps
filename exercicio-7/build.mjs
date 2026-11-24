import { readFile, mkdir, writeFile } from 'node:fs/promises';
const html = await readFile(new URL('./index.html', import.meta.url), 'utf8');
const warnings = html.split('\n').flatMap((line, i) => /[ \t]+$/.test(line) ? [`Linha ${i+1}: espaços no final da linha`] : []);
for (const warning of warnings) console.warn('WARNING: ' + warning);
const strict = Boolean(process.env.CI) && process.env.CI.toLowerCase() !== 'false';
if (strict && warnings.length) { console.error('Build interrompido: avisos em modo CI rígido.'); process.exit(1); }
await mkdir(new URL('./dist/', import.meta.url), {recursive:true});
await writeFile(new URL('./dist/index.html', import.meta.url), html.replace(/[ \t]+$/gm, ''));
console.log('Build concluído: dist/index.html');
