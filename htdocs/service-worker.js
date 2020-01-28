importScripts("precache-manifest.e1293e0d54e3c041d6ad3cf26dfbcd1c.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

workbox.core.skipWaiting();
self.addEventListener('activate', event => {
  clients.claim().then(()=>{
    clients.matchAll((clients)=>{
      if(clients.length>0){
        clients[0].postMessage(JSON.stringify({title:"LET'S ROCK!", body:"You are now using notifications", show:true}))
      }else{
        registration.showNotification("No Clients Available!")
      }
    })
    
  });
});
workbox.routing.registerRoute(
  new RegExp('https://thern.wtf'),
  new workbox.strategies.StaleWhileRevalidate()
);
self.addEventListener('message', ( {source})=>{
    source.postMessage(JSON.stringify({show: true, title:"READY TO ROCK!", body:"You can now receive notifications on this app. Please allow them, we promise we won't bother you!"}))
})
self.addEventListener('push', ({data}) => {
  self.clients.matchAll().then((clients)=>{
    if(clients.length>0){
      console.log("found a client");
      clients[0].postMessage(data.text());
    }else{
      console.log("claiming clients");
      self.clients.claim().then(()=>{
        clients[0].postMessage(data.text());
      })
    }
  })
});

workbox.precaching.precacheAndRoute(self.__precacheManifest);
