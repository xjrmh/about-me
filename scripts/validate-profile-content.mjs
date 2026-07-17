import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const includedRoots = ['app', 'components', 'lib', 'public', 'README.md', '.env.example'];
const textExtensions = new Set(['.ts', '.tsx', '.js', '.mjs', '.md', '.json', '.txt', '.example']);

async function collectFiles(target) {
  const absolute = path.join(root, target);
  const entries = await readdir(absolute, { withFileTypes: true }).catch(() => null);
  if (!entries) return [absolute];

  const nested = await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? collectFiles(path.join(target, entry.name))
        : Promise.resolve([path.join(absolute, entry.name)]),
    ),
  );
  return nested.flat();
}

const files = (await Promise.all(includedRoots.map(collectFiles)))
  .flat()
  .filter((file) => textExtensions.has(path.extname(file)) || file.endsWith('.env.example'));

const corpus = (
  await Promise.all(files.map(async (file) => `${file}\n${await readFile(file, 'utf8')}`))
).join('\n');

const required = [
  'Founder, Flatre.ai | AI Product & Data Leader | ex-Meta',
  "role: text('Founder', '创始人')",
  "startDate: '2025-10'",
  'https://www.flatre.ai',
  'Listing Photo Ranker',
  'NorthStar',
  'Experiment Designer',
  'Alpha Terminal',
  'Gomoku',
  'Work Focus Timer',
  'FAA Private Pilot',
  'Greatly Exceeds Expectations (Meta, 2022–2024)',
  '1HIRGguTe5fRtfkaszFQq2KSxCqCu5JAo',
];

const forbidden = [
  ['Flat', 'Strategy'].join(' '),
  ['Co', 'Founder'].join('-'),
  ['Mar', '2025'].join(' '),
  ['Senior', 'Data', 'Scientist'].join(' '),
  ['Seni', 'ot'].join(''),
  ['capacity', 'plannin', '.'].join(' '),
  ['Close', 'with', 'Flat'].join(' '),
  ['GOOGLE', 'DOC', 'URL'].join('_'),
  ['387', '7290'].join(''),
];

const failures = [];
for (const value of required) {
  if (!corpus.includes(value)) failures.push(`Missing required content: ${value}`);
}
for (const value of forbidden) {
  if (corpus.includes(value)) failures.push(`Found stale content: ${value}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Profile content assertions passed across ${files.length} files.`);
