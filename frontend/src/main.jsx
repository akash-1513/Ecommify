import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'
import Loading from './components/Loading.jsx'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const Home = lazy(() => import('./components/Home.jsx'))
const Contact = lazy(() => import('./components/Contact.jsx'))
const Login = lazy(() => import('./components/Login.jsx'))
const Signup = lazy(() => import('./components/Signup.jsx'))
const ProductDetail = lazy(() => import('./components/ProductDetail.jsx'))
const Profile = lazy(() => import('./components/Profile.jsx'))
const UpdateProfile = lazy(() => import('./components/UpdateProfile.jsx'))
const ChangePassword = lazy(() => import('./components/ChangePassword.jsx'))
const ShopingCart = lazy(() => import('./components/ShopingCart.jsx'))
const ProductPage = lazy(() => import('./components/ProductPage.jsx'))
const SuccessPage = lazy(() => import('./components/SuccessPage.jsx'))

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path: "/products/:productId",
        element: <ProductDetail />
      },
      {
        path: "/profile",
        element: <Profile />
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />
      },
      {
        path: "/change-password",
        element: <ChangePassword />
      },
      {
        path: "/cart",
        element: <ShopingCart />
      },
      {
        path: "/products",
        element: <ProductPage />
      },
      {
        path: "/success",
        element: <SuccessPage />
      }
    ]
  }
])

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {store}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback = {<Loading />}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen = {false} />
        </Suspense>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
