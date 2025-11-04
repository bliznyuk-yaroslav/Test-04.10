'use client';
import { Provider } from 'react-redux';
import { store } from '../store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

export default function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#0a0a0b',
              color: '#e4e4e7',
              border: '1px solid #6b21a8',
            },
            success: { iconTheme: { primary: '#a855f7', secondary: '#0a0a0b' } },
            error: { iconTheme: { primary: '#ef4444', secondary: '#0a0a0b' } },
          }}
        />
      </Provider>
    </QueryClientProvider>
  );
}
