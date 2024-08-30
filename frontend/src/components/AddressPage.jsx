import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setAddressInfo } from '../store/addressSlice'
import { useNavigate } from 'react-router-dom'

function AddressPage() {

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("India")
    const [phone, setPhone] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        console.log("Hello")
        e.preventDefault()
        dispatch(setAddressInfo({shippingInfo: {address, city, state, country, phone}}));
        navigate("/payment")
    }

    return (
    <div className='h-screen flex justify-center mt-16'>
        <div class="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Shipping Information</h2>

            <form class="space-y-4" onSubmit={handleSubmit}>
                <div>
                    <label for="address" class="block text-sm font-medium text-gray-700">Address</label>
                    <input value = {address} onChange = {(e) => setAddress(e.target.value)} type="text" id="address" name="address" placeholder="123 Main St"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required/> 
                </div>

                <div>
                    <label for="city" class="block text-sm font-medium text-gray-700">City</label>
                    <input value = {city} onChange={(e) => setCity(e.target.value)} type="text" id="city" name="city" placeholder="City Name"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required/> 
                </div>

                <div>
                    <label for="state" class="block text-sm font-medium text-gray-700">State</label>
                    <input value = {state} onChange={(e) => setState(e.target.value)} type="text" id="state" name="state" placeholder="State Name"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required/> 
                </div>

                <div>
                    <label for="country" class="block text-sm font-medium text-gray-700">Country</label>
                    <input value = {country} onChange={(e) => setCountry(e.target.value)} type="text" id="country" name="country" placeholder="Country Name"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required/>
                </div>

                <div>
                    <label for="phone" class="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input value = {phone} onChange={(e) => setPhone(e.target.value)} type="tel" id="phone" name="phone" placeholder="(123) 456-7890"
                    class="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required />
                </div>

                <div class="flex justify-center mt-6">
                    <button type="submit" class="bg-blue-600 text-white px-6 py-2 rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    Submit
                    </button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default AddressPage