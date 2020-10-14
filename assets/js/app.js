import HtmlService from './HtmlService.js';
import MarketService from './MarketService.js';

class App {

  
  constructor() {
    this.registerServiceWorker();
    this.start();
  }

  start(){
    const marketService = new MarketService();
    new HtmlService(marketService);
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      const onsuccess = () => console.log('[Service Worker] Registered');
      const onfailure = () => console.log('[Service Worker] Failed');

      navigator.serviceWorker
        .register('sw.js')
        .then(onsuccess)
        .catch(onfailure);
    }
  }
}

new App();
