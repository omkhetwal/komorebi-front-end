import Inspx from "inspx"
import { Toaster } from "react-hot-toast"
import { Outlet, ScrollRestoration } from "react-router-dom"
import Footer from "../components/footer"
import Header from "../components/header"

const Root = () => {
  return (
    <Inspx>
      <Header />
      <Outlet />
      <Footer />
      <Toaster />
      <ScrollRestoration />
    </Inspx>
  )
}

export default Root
