/*const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";
// FILES_TO_CACHE in the solved of caching files
const CACHE_FILES = [
    "/",
    "/index.js",
    "/index.html",
    "/styles.css",
    ""
];*/

// Install Event
self.addEventListener("install", (event) => {
    console.log("Service Worker Installed!");
})

// Activate Event
self.addEventListener("activate", (event) => {
    console.log("Service Worker Activated");
})