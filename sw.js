// 인터넷이 없어도 열리게 앱 파일을 폰에 담아 둔다. 파일을 고치면 VER 숫자를 올린다.
const VER = 'supo-8';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icon-180.png', 'icon-192.png', 'icon-512.png', 'app.css', 'calc.js', 'fonts/noto-400.woff2', 'fonts/noto-700.woff2', 'fonts/plex-400.woff2', 'fonts/plex-500.woff2'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VER).then(c => c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate', e => e.waitUntil(
  caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
