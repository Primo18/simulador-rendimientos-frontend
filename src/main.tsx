import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { AppRouter } from './router';
import { AuthProvider } from './context/AuthProvider'; // Importa el AuthProvider
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'; // Solid icons
import { fab } from '@fortawesome/free-brands-svg-icons'; // Brand icons

// Configuración de FontAwesome
library.add(fas, fab);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envolver la aplicación en el AuthProvider */}
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
