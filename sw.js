const CACHE = 'kids-play-v25';

const ASSETS = [
  './index.html',
  './number-guess.html',
  './memory-game.html',
  './country-capital.html',
  './frog-catch.html',
  './dodge.html',
  './color-memory.html',
  './stopwatch.html',
  './snake.html',
  './rhythm.html',
  './bomb-finder.html',
  './manifest.json',
  './manifest.json?v=25',
  './data/countries.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(cached => cached || fetch(e.request)));
});
