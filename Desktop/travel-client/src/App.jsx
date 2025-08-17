import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import Home from './components/home'
import Error from './components/404'
import Register from './components/backoffice/register'
import Login from './components/backoffice/login'
import Viewoffer from './components/backoffice/viewoffer'
import { ErrorBoundary } from 'react-error-boundary'
import Protectedroute from './components/Protectedroute'
import Createoffer from './components/backoffice/createoffer'
import About from './components/otherPages/about'
import Contact from './components/otherPages/contact'
import Offers from './components/otherPages/offers'
import Dashboard from './components/backoffice/dashboard'
import Editoffer from './components/backoffice/editoffer'
import Heroimage from './components/backoffice/heroimage'
import Editaboutus from './components/backoffice/editaboutus'
import Customerreview from './components/backoffice/customerreview'
import Inquiry from './components/backoffice/inquiry'
import Offerdetails from './components/otherPages/offerdetails'
library.add(fab, fas, far);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/contact',
    element: <Contact />
  },
  {
    path: '/ouroffers',
    element: <Offers />
  },
  {
    path: '/offerdetails',
    element: <Offerdetails />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Protectedroute><Dashboard /></Protectedroute>
  },
  {
    path: '/createoffer',
    element: <Protectedroute><Createoffer /></Protectedroute>
  },
  {
    path: '/editoffer',
    element: <Protectedroute><Editoffer /></Protectedroute>
  },
  {
    path: '/offers',
    element: <Viewoffer />
  },
  {
    path: '/addheroimage',
    element: <Protectedroute><Heroimage /></Protectedroute>
  },
  {
    path: '/addaboutus',
    element: <Protectedroute><Editaboutus /></Protectedroute>
  },
  {
    path: '/customerreview',
    element: <Protectedroute><Customerreview /></Protectedroute>
  },
  {
    path: '/inquiries',
    element: <Protectedroute><Inquiry /></Protectedroute>
  },
  {
    path: '/404',
    element: <Error />
  }
])

function ErrorFallback( error, resetErrorBoundary ) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}

function App() {

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <RouterProvider router ={router}></RouterProvider>
      </ErrorBoundary>
    </>
  )
}

export default App
