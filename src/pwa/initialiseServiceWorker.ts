export default function initializeServiceWorkers(){
    self.addEventListener('install', (event:any)=>{
    console.log('sw installed');
    event.waitUntil(
        caches.open('static').then((cache)=>{
        cache.addAll([
            '/',
            '/index.html',
            // '/sw.js'
        ]);
        })
    )
    })

    self.addEventListener('activate', ()=>{
    console.log('sw activated');
    })

    self.addEventListener('fetch', (event:any)=>{
    console.log('fetching');
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
}
