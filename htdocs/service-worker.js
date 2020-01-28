importScripts("precache-manifest.a752689030148ab929b671fbc87f0cec.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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
/*self.addEventListener('message', ( {source})=>{
    client=source;
    source.postMessage(JSON.stringify({show: true, title:"READY TO ROCK!", body:"You can now receive notifications on this app. Please allow them, we promise we won't bother you!"}))
})*/
self.addEventListener('push', ({data}) => {
  self.clients.matchAll().then((clients)=>{
    if(clients.length>0){
      clients[0].postMessage(data.text());
    }else{
      self.clients.claim().then(()=>{
        clients[0].postMessage(data.text());
      })
    }
  })
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);
