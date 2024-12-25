import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './main.css';
import { AppRouter } from './router';
import { AuthProvider } from './context/AuthProvider';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

// Configuración de FontAwesome
library.add(fas, fab);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </StrictMode>,
);
