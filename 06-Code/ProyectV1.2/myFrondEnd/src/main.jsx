import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // Aquí puedes importar estilos globales (puede incluir parte de styles.css)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
