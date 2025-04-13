import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './lib/queryClient';
import App from './App';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Router } from 'wouter'; // ✅ Use wouter instead of BrowserRouter

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="861266718408-ul2ug4hl17khefhi17nv0spqfn8oe3kt.apps.googleusercontent.com">
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <App />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  </GoogleOAuthProvider>
);