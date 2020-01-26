importScripts("precache-manifest.8663a3690c644f0257e975728b182a2e.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();
self.addEventListener('activate', event => {
    clients.claim();
    console.log('Ready!');
});
let client;
workbox.routing.registerRoute(
  new RegExp('https://thern.wtf'),
  new workbox.strategies.StaleWhileRevalidate()
);
self.addEventListener('message', ( {source, data})=>{
    console.log(data);
    client=source;
})
self.addEventListener('push', ({data}) => {
  
    if(client){
    client.postMessage(data.text())
  }
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);
