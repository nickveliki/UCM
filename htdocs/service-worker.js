importScripts("precache-manifest.3012ee4f0a218867998dd44b163ea498.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();
self.addEventListener('activate', event => {
    clients.claim();
    console.log('Ready!');
});
let client;
workbox.routing.registerRoute(
  new RegExp('https://localhost'),
  new workbox.strategies.StaleWhileRevalidate()
);
self.addEventListener('message', ( {source})=>{
    client=source;
    source.postMessage(JSON.stringify({show: true, title:"READY TO ROCK!", body:"You can now receive notifications on this app. Please allow them, we promise we won't bother you!"}))
})
self.addEventListener('push', ({data}) => {
  
    if(client){
    client.postMessage(data.text())
  }
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);
