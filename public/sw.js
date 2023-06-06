self.addEventListener('install', (event)=>{
console.log('sw installed');
event.waitUntil(
    caches.open('static').then((cache)=>{
    cache.addAll([
        '/',
        // '/PennyPincher/index.html',
        // '/sw.js'
    ]);
    })
)
})

self.addEventListener('activate', ()=>{
console.log('sw activated');
})

self.addEventListener('fetch', (event)=>{
// console.log('fetching');
event.respondWith(
    caches.match(event.request).then((res)=>{
    if(res){
        return res
    }else{
        return fetch(event.request);
    }

    })
)
})