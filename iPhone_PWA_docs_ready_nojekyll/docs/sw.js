const CACHE_NAME = 'momonga-pwa-v3';

const CORE = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png",
  "./失敗.txt",
  "./失敗.html",

  "./assets/audio/talk_01.wav",
  "./assets/audio/bgm.wav",
  "./assets/audio/notification.wav",
  "./assets/audio/talk_03.wav",
  "./assets/audio/talk_02.wav",

  "./assets/data/momonga_settings_2026-10-03-08-02-40.json",

  "./assets/stand-by.png",
  "./assets/mouth_close.png",
  "./assets/Jackpot-boosting symbol.png",
  "./assets/hand_l_2.png",
  "./assets/01_まぶた.png",
  "./assets/building.png",
  "./assets/chain.png",
  "./assets/mouth_open.png",
  "./assets/ram.png",
  "./assets/ear_l_2.png",
  "./assets/14_.png",
  "./assets/09_.png",
  "./assets/body_2 - コピー.png",
  "./assets/ribbon_2.png",
  "./assets/08_.png",
  "./assets/hair_2.png",
  "./assets/ear_r_2.png",
  "./assets/01_.png",
  "./assets/character_2.png",
  "./assets/05_.png",
  "./assets/leg_l.png",
  "./assets/Effoct.png",
  "./assets/Fine-grained.png",
  "./assets/background.png",
  "./assets/tail_2.png",
  "./assets/素材.png",
  "./assets/body_no_eye.png",
  "./assets/06_.png",
  "./assets/eye_open.png",
  "./assets/Half-open eyes.png",
  "./assets/hand_r_2.png",
  "./assets/welcome home.png",
  "./assets/04_.png",
  "./assets/10_.png",
  "./assets/headband_2.png",
  "./assets/02_眼球.png",
  "./assets/eye_close.png",
  "./assets/ball.png",
  "./assets/訂.jpg",
  "./assets/Probability Variation.png",
  "./assets/leg_c.png",
  "./assets/Iron ball.png",
  "./assets/nc175512.jpg"
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request)
        .then(response => {
          if (response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, copy);
            });
          }

          return response;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
