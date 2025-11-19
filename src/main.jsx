import { createRoot } from 'react-dom/client'
import App from './App'
import './style/index.css';
import { ToastContainer } from 'react-toastify';

import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()


createRoot(document.getElementById("root")).render(
    <QueryClientProvider client={queryClient}>
        <App />
        <ToastContainer />
    </QueryClientProvider>
)