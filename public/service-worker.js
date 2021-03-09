const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";

const CACHE_FILES = [
    "/",
    "/index.js",
    "/index.html",
    "/styles.css",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png"
];

// Install Event
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed!");

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then((cache) => {
            console.log("Service Working Caching Files");
            cache.addAll(CACHE_FILES);
        })
        .then(() => {
            self.skipWaiting()
        })
    )
});

// Activate Event
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
})