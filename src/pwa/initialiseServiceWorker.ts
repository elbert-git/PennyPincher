export default function initializeServiceWorkers(){
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/PennyPincher/sw.js?version=1', {scope:'.'})
      .then(()=>{
         console.log('service worker registered');
      });
    }
}