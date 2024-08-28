import Header from "./components/Header"
import Footer from "./components/Footer"
import {Outlet} from "react-router-dom"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import axios from "axios"
import { login } from "./store/authSlice"
import {Toaster} from 'sonner'
import { useQuery } from "@tanstack/react-query"

function App() {
  const dispatch = useDispatch()
  const getCurrentUser = async () => {
    try {
      const {data} = await axios.get("/api/v1/user/profile");
      dispatch(login({userData: data.user}))
      return data
    } catch(error) {
      console.log(error.message)
      throw error
    }
  }

  // useEffect(() => {
  //   getCurrentUser()
  // }, [])

  useQuery({
    queryKey: ["userInfo"],
    queryFn: getCurrentUser
  })

  return (
    <>
      <Header />
      <Toaster position="top-center" richColors/>
      <Outlet />
      {/* <Footer /> */}
    </>
  )
}

export default App
