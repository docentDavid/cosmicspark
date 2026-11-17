/*
 * Cosmic Spark — service worker (PWA).
 *
 * - Pagina's: eerst het netwerk (altijd de nieuwste versie), offline uit de cache.
 * - CSS, JS, afbeeldingen en iconen: eerst de cache, op de achtergrond bijgewerkt.
 * - Alleen GET-verzoeken binnen deze site; het contactformulier (Web3Forms) gaat er nooit doorheen.
 *
 * Verhoog CACHE_VERSION wanneer je de lijst hieronder wijzigt of een oude cache wilt opruimen.
 */
const CACHE_VERSION = 'cosmic-spark-v3';

const PRECACHE = [
  './',
  'index.html',
  'aanbod.html',
  'aanbod/natuurcoaching.html',
  'aanbod/individuele-coaching.html',
  'aanbod/lichaamsgericht-werk.html',
  'aanbod/energetisch-werk.html',
  'aanbod/workshops-en-groepen.html',
  'aanbod/retraites-en-evenementen.html',
  'aanbod/voor-organisaties.html',
  'over-kim.html',
  'contact.html',
  'bedankt.html',
  'design-tokens.css',
  'style.css',
  'script.js',
  'favicon.svg',
  'favicon.ico',
  'manifest.webmanifest',
  'assets/icon.svg',
  'assets/icon-192.png',
  'assets/icon-512.png',
  'assets/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(PRECACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

const OFFLINE_PAGE = `<!doctype html>
<html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Geen verbinding | Cosmic Spark</title>
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;padding:24px;box-sizing:border-box;background:#f5f2e9;color:#203b30;font:1rem/1.65 system-ui,sans-serif;text-align:center}h1{font:400 1.8rem Georgia,serif}a{color:inherit}</style>
</head><body><main><h1>Geen internetverbinding</h1><p>Deze pagina is nog niet offline beschikbaar. Controleer je verbinding en probeer het opnieuw.</p><p><a href="./">Naar de homepage</a></p></main></body></html>`;

const putInCache = (request, response) => {
  if (response && response.ok && response.type === 'basic') {
    const copy = response.clone();
    caches.open(CACHE_VERSION).then(cache => cache.put(request, copy));
  }
  return response;
};

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Pagina's: netwerk eerst.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then(response => putInCache(request, response))
        .catch(async () =>
          (await caches.match(request, { ignoreSearch: true })) ||
          new Response(OFFLINE_PAGE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } })
        )
    );
    return;
  }

  // Overige bestanden: cache eerst, op de achtergrond verversen.
  // Versienummers (?v=…) maken een nieuwe versie een nieuw verzoek; offline valt
  // het terug op een eerder bewaarde versie van hetzelfde bestand.
  event.respondWith(
    caches.match(request).then(cached => {
      const network = fetch(request)
        .then(response => putInCache(request, response))
        .catch(() => caches.match(request, { ignoreSearch: true }));
      if (cached) {
        event.waitUntil(network.catch(() => {}));
        return cached;
      }
      return network.then(response => response || Response.error());
    })
  );
});
