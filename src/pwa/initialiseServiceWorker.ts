export default function initializeServiceWorkers(){
    if('serviceWorker' in navigator){
      navigator.serviceWorker.register('/PennyPincher/sw.js', {scope:'.'})
      .then(()=>{
         console.log('service worker registered');
      });
    }
}