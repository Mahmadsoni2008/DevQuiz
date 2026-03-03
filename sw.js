const cacheName = 'pwa-conf-v1';
const staticAssets = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './icon.png',
  './questions.js',
  './python.js',
  './html5.js',
  './css.js',
  './js.js'
];

// Насби Service Worker ва сабти файлҳо дар кэш
self.addEventListener('install', async event => {
  const cache = await caches.open(cacheName);
  await cache.addAll(staticAssets);
});

// Гирифтани маълумот аз кэш ҳангоми набудани интернет
self.addEventListener('fetch', event => {
  const req = event.request;
  event.respondWith(cacheFirst(req));
});

async function cacheFirst(req) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(req);
  return cachedResponse || fetch(req);
}
