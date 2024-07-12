import {createHashRouter, RouterProvider } from 'react-router-dom'
import { CustomersLayout } from './Components'
import CustomersContextProvider from './Context/CustomersContext'
import { Chart, Home, NotFound } from './Pages'


function App() {

  const routes = createHashRouter([
    {
      path: "/", element: <CustomersLayout />, children: [
        { index: true, element: <Home /> },
        { path: "user/:id", element: <Chart /> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ])

  return (
    <>
      <CustomersContextProvider>
        <RouterProvider router={routes} />
      </CustomersContextProvider>
    </>
  )
}

export default App
