import React from 'react'
import ReactDOM from 'react-dom/client'
import "./styles/css/main.css";
import initializeServiceWorkers from './pwa/initialiseServiceWorker';
import App from './reactStuff/app';
import MainCarousel from './reactStuff/screens/mainCarousel';

//initialise service workers
initializeServiceWorkers();

// initialise react stuff
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MainCarousel></MainCarousel>
  </React.StrictMode>,
)
