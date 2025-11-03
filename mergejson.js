const fs = require('fs').promises;
const path = require('path');



const DEFAULT_OUT = 'merged.json';
const ID_KEYS = ['id', 'isbn', 'sku', 'productId', 'asin', 'upc', 'ean'];
const TITLE_KEYS = ['title', 'name', 'bookTitle', 'productName'];

function normalizeString(s) {
    if (!s && s !== 0) return '';
    return String(s).trim().replace(/\s+/g, ' ').toLowerCase();
}

function findCommonKey(arrA, arrB, candidates) {
    if (!Array.isArray(arrA) || !Array.isArray(arrB)) return null;
    const aKeys = new Set(arrA.flatMap(o => (o && typeof o === 'object') ? Object.keys(o) : []));
    const bKeys = new Set(arrB.flatMap(o => (o && typeof o === 'object') ? Object.keys(o) : []));
    for (const k of candidates) {
        if (aKeys.has(k) && bKeys.has(k)) return k;
    }
    return null;
}

async function readJson(filePath) {
    const content = await fs.readFile(filePath, 'utf8');
    return JSON.parse(content);
}

async function writeJson(filePath, data) {
    const dir = path.dirname(filePath);
    if (dir && dir !== '.') {
        await fs.mkdir(dir, { recursive: true });
    }
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
}

function mergeObjects(a = {}, b = {}) {
    // b overwrites a on conflicts (products take precedence)
    return { ...a, ...b };
}

function mergeArraysByKey(arrA, arrB, key) {
    const map = new Map();
    for (const item of arrA) {
        const k = item && item[key] != null ? String(item[key]) : null;
        if (k) map.set(k, { ...item });
        else map.set(Symbol(), { ...item }); // preserve items without key
    }
    for (const item of arrB) {
        const k = item && item[key] != null ? String(item[key]) : null;
        if (k && map.has(k)) {
            map.set(k, mergeObjects(map.get(k), item));
        } else if (k) {
            map.set(k, { ...item });
        } else {
            map.set(Symbol(), { ...item });
        }
    }
    return Array.from(map.values());
}

function mergeArraysByTitle(arrA, arrB, titleKey) {
    const map = new Map();
    for (const item of arrA) {
        const key = normalizeString(item && item[titleKey]);
        if (key) map.set(key, { ...item });
        else map.set(Symbol(), { ...item });
    }
    for (const item of arrB) {
        const key = normalizeString(item && item[titleKey]);
        if (key && map.has(key)) {
            map.set(key, mergeObjects(map.get(key), item));
        } else if (key) {
            map.set(key, { ...item });
        } else {
            map.set(Symbol(), { ...item });
        }
    }
    return Array.from(map.values());
}

function concatAndDedupe(arrA, arrB) {
    const seen = new Set();
    const out = [];
    for (const item of [...(arrA || []), ...(arrB || [])]) {
        const sig = JSON.stringify(item);
        if (!seen.has(sig)) {
            seen.add(sig);
            out.push(item);
        }
    }
    return out;
}

async function main() {
    const [, , booksPath = 'books.json', productsPath = 'products.json', outPath = DEFAULT_OUT] = process.argv;

    try {
        const [books, products] = await Promise.all([
            readJson(booksPath),
            readJson(productsPath),
        ]);

        let merged;
        if (Array.isArray(books) && Array.isArray(products)) {
            // try ID-based merge
            const idKey = findCommonKey(books, products, ID_KEYS);
            if (idKey) {
                merged = mergeArraysByKey(books, products, idKey);
            } else {
                // try title/name based merge
                const titleKey = findCommonKey(books, products, TITLE_KEYS) || TITLE_KEYS.find(k =>
                    books.some(it => it && it[k]) && products.some(it => it && it[k])
                );
                if (titleKey) {
                    merged = mergeArraysByTitle(books, products, titleKey);
                } else {
                    // fallback: concat and dedupe
                    merged = concatAndDedupe(books, products);
                }
            }
        } else if (books && typeof books === 'object' && products && typeof products === 'object') {
            // both are objects: shallow merge
            merged = mergeObjects(books, products);
        } else {
            // different shapes: try to combine into an object { books: ..., products: ... }
            merged = { books, products };
        }

        await writeJson(outPath, merged);
        console.log(`Merged data written to ${outPath}`);
    } catch (err) {
        console.error('Error merging JSON files:', err.message || err);
        process.exit(1);
    }
}

if (require.main === module) main();