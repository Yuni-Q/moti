/* eslint-disable no-restricted-globals */
// This is the "Offline page" service worker

// Install stage sets up the offline page in the cache and opens a new cache


const CACHE_NAME = "MOTI-v0.0.0";


const FILES_TO_CACHE = [
    "/static/favicon.png"
];

self.addEventListener('install', (event) => {
	const offlinePage = new Request('/');
	event.waitUntil(
		fetch(offlinePage).then((response) => {
			return caches
				.open(CACHE_NAME)
				.then((cache) => {
					console.log(`Page cached ${response.url}`);
					return cache.put(offlinePage, response);
				})
				.catch((error) => console.log('실패', error));
		}),
	);
	event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
	event.respondWith(
		fetch(event.request).catch((error) => {
			console.error(`Serving Offline ${error}`);
			return caches
				.open(CACHE_NAME)
				.then((cache) => {
					return cache.match('/');
				})
				.catch((error2) => console.log('실패', error2));
		}),
	);
});

/* eslint-disable */
self.addEventListener('activate', (event) => {
	event.waitUntil(self.clients.claim());
	event.waitUntil(
        caches.keys().then((keyList) =>
            Promise.all(
                keyList.map((key) => {
                    if (CACHE_NAME !== key) return caches.delete(key);
                })
            )
        )
    );
});
/* eslint-enable */
