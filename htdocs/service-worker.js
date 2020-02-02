importScripts("precache-manifest.81cdbe83650b1e4e437e50ec6bcb8001.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

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
    source.postMessage(JSON.stringify({show: true, title:"READY TO ROCK!", body:"You can now receive notifications on this app. These will help you. A LOT!"}))
})
self.addEventListener('push', ({data}) => {
  self.clients.matchAll().then((clients)=>{
    if(clients.length>0){
      console.log("found a client");
      clients[0].postMessage(data.text());
    }else{
      console.log("claiming clients");
      self.clients.claim().then(()=>{
        self.clients.matchAll().then((clients)=>{
          clients[0].postMessage(data.text());
        })
      })
    }
  })
});
self.onnotificationclick=(event)=>{
  event.notification.close()
    self.clients.matchAll().then((clientList) =>{
      if(clientList[0]){
        clientList[0].focus();
      }
    })

}
workbox.precaching.precacheAndRoute(self.__precacheManifest);
