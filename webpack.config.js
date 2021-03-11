const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");

const config = {
    entry: "./public/index.js",
    output: {
        path: __dirname + "/public/dist",
        filename: "bundle.js"
    },
    plugins: [
        new WebpackPwaManifest({
            filename: "manifest.json",
            name: "Finance Tracker",
            short_name: "Finance Trckr",
            description: "Progressive Web App that helps track finances.",
            background_color: "#ffffff",
            theme_color: "#ffffff",
            display: "standalone",
            start_url: "/",
            icons: [
                {
                    src: path.resolve(__dirname, "public/icons/icon-192x192.png"),
                    size: "192x192"
                },
                {
                    src: path.resolve(__dirname, "public/icons/icon-512x512.png"),
                    size: "512x512"
                }
            ],
            inject: false,
            fingerprints: false
        })
    ],
    mode: "development"
}

module.exports = config;