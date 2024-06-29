import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import routes from './routes'
import { Auth0Provider } from '@auth0/auth0-react'
import { SidebarProvider } from './components/SidebarContext'

const router = createBrowserRouter(routes)
const queryClient = new QueryClient()

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('layout') as HTMLElement).render(
    <Auth0Provider
      domain="piwakawaka-2024-isaac.au.auth0.com"
      clientId="eJw3cfuzST9Lba04S6CV1d6PiCuJVROd"
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: 'https://currency/api',
      }}
    >
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools />
        </SidebarProvider>
      </QueryClientProvider>
    </Auth0Provider>,
  )
})
