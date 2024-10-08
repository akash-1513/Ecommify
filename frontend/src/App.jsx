import Header from "./components/Header"
import Footer from "./components/Footer"
import {Outlet} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { login } from "./store/authSlice"
import {Toaster} from 'sonner'
import { useQuery } from "@tanstack/react-query"
import { setCartItems } from "./store/cartSlice"
import { setUserOrders } from "./store/orderSlice"

function App() {
  const server = "https://ecommify-aka9.onrender.com"
  const dispatch = useDispatch()
  const getCurrentUser = async () => {
    try {
      const {data} = await axios.get(`${server}/api/v1/user/profile`, {
        withCredentials: true
      });
      dispatch(login({userData: data.user}))
      console.log("USer: ", data.user)
      return data
    } catch(error) {
      console.log("API Error: ", error.message)
      throw error
    }
  }

  const getCartDetails = async () => {
    const {data} = await axios.get(`${server}/api/v1/cart`, {
      withCredentials: true
    });
    dispatch(setCartItems(data?.cartItems))
    return data.cartItems
  }

  const getAllUserOrders = async () => {
    try {
      const {data: {orders}} = await axios.get(`${server}/api/v1/order/`, {
        withCredentials: true
      })
      console.log("Orders: ", orders)
      dispatch(setUserOrders({orders}))
      return orders
    } catch(error) {
      throw error
    }
  }
  

  useQuery({
    queryKey: ["orders"],
    queryFn: getAllUserOrders
  })

  useQuery({
    queryKey: ["userInfo"],
    queryFn: getCurrentUser
  })

  useQuery({
    queryKey: ["cartItems"],
    queryFn: getCartDetails
  })



  return (
    <>
      <Header />
      <Toaster position="top-center" richColors/>
      <Outlet />
      <Footer />
    </>
  )
}

export default App
