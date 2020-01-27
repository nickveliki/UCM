importScripts("precache-manifest.dade13e7b6910901101f9cb778277464.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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
