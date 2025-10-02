import ReactDom from "react-dom/client"
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './context/AuthContext'


const queryClient = new QueryClient()

ReactDom.createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
            <AuthProvider>
                <App />
            </AuthProvider>
        </BrowserRouter>
    </QueryClientProvider>

)
