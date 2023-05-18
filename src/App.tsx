import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Cart from "./pages/cart"
import Home from "./pages/home"
import Payment from "./pages/payment"
import ProductDetails from "./pages/product-details"
import ShippingAddress from "./pages/shipping-address"
import Shop from "./pages/shop"
import Success from "./pages/success"
import Root from "./routes/root"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id",
        element: <ProductDetails />,
      },
      {
        path: "/checkout/shipping",
        element: <ShippingAddress />,
      },
      {
        path: "/checkout/payment",
        element: <Payment />,
      },
      {
        path: "/success",
        element: <Success />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
