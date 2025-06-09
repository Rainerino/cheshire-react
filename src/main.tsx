import ReactDOM from 'react-dom/client';
import './index.css'
import LandingPage from './pages/Landing.js'
import './i18n.ts';
import React from 'react';
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <LandingPage />
    </React.StrictMode>
   );