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
import { getAllCartItems } from "../../backend/controllers/cart.controller"

function App() {
  const server = "https://ecommify-backend.onrender.com"
  const dispatch = useDispatch()
  const getCurrentUser = async () => {
    try {
      const {data} = await axios.get(`/api/v1/user/profile`);
      dispatch(login({userData: data.user}))
      console.log("USer: ", data.user)
      return data
    } catch(error) {
      console.log("API Error: ", error.message)
      throw error
    }
  }

  const getCartDetails = async () => {
    const {data} = await axios.get(`/api/v1/cart`);
    dispatch(setCartItems(data?.cartItems))
    return data.cartItems
  }

  const getAllUserOrders = async () => {
    try {
      const {data: {orders}} = await axios.get(`/api/v1/order/`)
      console.log("Orders: ", orders)
      dispatch(setUserOrders({orders}))
      return orders
    } catch(error) {
      throw error
    }
  }
  useEffect(() => {
    getCurrentUser()
  }, [])

  // useQuery({
  //   queryKey: ["orders"],
  //   queryFn: getAllUserOrders
  // })

  useEffect(() => {
    getAllCartItems()
  }, [])

  useEffect(() => {
    getAllUserOrders()
  }, [])

  // useQuery({
  //   queryKey: ["userInfo"],
  //   queryFn: getCurrentUser
  // })

  // useQuery({
  //   queryKey: ["cartItems"],
  //   queryFn: getCartDetails
  // })



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
