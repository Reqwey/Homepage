var CACHE_NAME = 'hi-reqwey-cache-v1';  
var urlsToCache = [  
    '/',
    '/assets/images/avatar.png',
    '/assets/images/favicon.ico',
    '/assets/images/background.webp',
    '/assets/css/reqwey.min.css',
    '/assets/css/semantic.min.css',
    '/assets/webfonts/fwzcN.OTF'
];  
  
self.addEventListener('install', function (event) {  
    event.waitUntil(  
        caches.open(CACHE_NAME).then(function (cache) {  
            console.log('Open cache');  
            return cache.addAll(urlsToCache);  
        }).then(function () {  
            self.skipWaiting();  
        })  
    );  
}); 

self.addEventListener('fetch', function(event){  
    if(event.request.method !== 'GET') return;  
    event.respondWith(  
        caches.match(event.request).then(function(response){  
            if(response){  
                console.log('return caches');  
                return response;  
            }else{  
                return fetch(event.request).catch(function(){  
                    if(/\.html$/.test(event.request.url))  
                        return caches.match('/offline.html');  
                });  
            }  
        })  
    )  
});
