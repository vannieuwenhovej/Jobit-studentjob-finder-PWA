"use strict";

const CACHE_NAME = "pwa-jobit-cache-v1";
const urlsToCache = ['/',
    'index.html',
'assets/script.js',
'assets/css/style.css',
'assets/bootstrap/css/bootstrap.min.css',
'assets/bootstrap/js/bootstrap.js',
'assets/img/300x300.png',
    'assets/manifest.json',
    'assets/img/icons/icon-192x192.png',
    'assets/jquery/jquery-3.4.1.min.js'
];

self.addEventListener("install", function(e){
        console.log("Performing service worker install... v-1.2");
        e.waitUntil(
            caches.open(CACHE_NAME).then(function(cache){
                return cache.addAll(urlsToCache);
            })
        )
});



self.addEventListener("fetch", function (e) {
    e.respondWith(
        caches.match(e.request).then(function(res)
        {
            if (res){
                return res;
            }
            else {
                return fetch(e.request);
            }
        })
    );
});
