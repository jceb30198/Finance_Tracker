const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const CACHE_FILES = [
    "/",
    "/index.js",
    "/index.html",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "dist/bundle.js",
    "dist/manifest.json",
    "dis/auto/icon-192x192.png",
    "dis/auto/icon-512x512.png"
];

// Install Event
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed!");

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Service Working Caching Files.");
            cache.addAll(CACHE_FILES);
        })
        .then(() => {
            self.skipWaiting()
        })
    )
});

// Activate Event
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated!");
    
    event.waitUntil(
        caches.keys().then((cacheList) => {
            return Promise.all(
                cacheList.map((cache) => {
                    if(cache !== CACHE_NAME && cache !== DATA_CACHE_NAME) {
                        console.log("Service Worker Clearing Previous Cache.");
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
    self.clients.claim();
});

// Fetch Event
self.addEventListener("fetch", (event) => {
    console.log("Service Worker Fetching!");

    if (event.request.url.includes("/api/")) {
        event.respondWith(
            caches.open(DATA_CACHE_NAME)
            .then((cache) => {
                return fetch(event.request).then((res) => {
                    let resClone = res.clone();
                    if(res.status === 200) {
                        cache.put(event.request, resClone);
                    }
                    return res;
                })
                .catch((err) => {
                    cache.match(event.request);
                })
            }).catch((err) => {
                console.log(err);
            })
        );
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME)
        .then(async (cache) => {
            const res = await cache.match(event.request);
            return res || fetch(event.request);
        })
    )

});