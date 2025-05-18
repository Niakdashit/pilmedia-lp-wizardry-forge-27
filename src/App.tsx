
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/AuthProvider';
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </StrictMode>
  );
}
