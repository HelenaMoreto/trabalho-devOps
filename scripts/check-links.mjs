import { readFile, stat } from 'node:fs/promises';
import { resolve, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const htmlPath = resolve(root, 'index.html');
const html = await readFile(htmlPath, 'utf8');
const errors = [];
const refs = [];
const ids = new Set([...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map(match => match[1]));
const tags = html.match(/<(?:a|img)\b[^>]*>/gi) ?? [];
for (const tag of tags) {
  const isLink = /^<a\b/i.test(tag);
  const attribute = isLink ? 'href' : 'src';
  const match = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*["']([^"']*)["']`, 'i'));
  if (!match || !match[1].trim()) { errors.push(`Tag sem ${attribute} válido: ${tag}`); continue; }
  const value = match[1].trim();
  if (value.startsWith('#')) {
    if (!ids.has(decodeURIComponent(value.slice(1)))) errors.push(`Âncora inexistente: ${value}`);
  } else if (/^https?:\/\//i.test(value)) {
    refs.push(value);
  } else if (/^(?:mailto:|tel:)/i.test(value)) {
    continue;
  } else if (/^[a-z][\w+.-]*:/i.test(value) || value.startsWith('//')) {
    errors.push(`Protocolo não permitido: ${value}`);
  } else {
    const clean = decodeURIComponent(value.split(/[?#]/)[0]);
    const file = resolve(root, clean);
    const relativePath = relative(root, file);
    if (relativePath === '..' || relativePath.startsWith('..' + sep)) {
      errors.push(`Caminho fora do projeto: ${value}`);
      continue;
    }
    try { if (!(await stat(file)).isFile()) errors.push(`Não é um arquivo: ${value}`); }
    catch { errors.push(`Arquivo não encontrado: ${value}`); }
  }
}
for (const url of new Set(refs)) {
  let ok = false;
  for (const method of ['HEAD', 'GET']) {
    try {
      const response = await fetch(url, {method, signal: AbortSignal.timeout(12000), headers: {'user-agent': 'Mozilla/5.0 (compatible; Portfolio-Link-Checker/1.0)'}});
      if (response.ok) { ok = true; break; }
    } catch { /* tenta o próximo método */ }
  }
  if (!ok) errors.push(`URL externa inacessível: ${url}`);
}
if (errors.length) { console.error('Falhas de links e imagens:\n' + errors.join('\n')); process.exitCode = 1; }
else console.log(`Links e imagens válidos. ${tags.length} tags verificadas.`);
