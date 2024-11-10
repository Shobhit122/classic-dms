import React from 'react'
import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from '../firebase/config';
import { toast, Bounce } from 'react-toastify';
import { useAuth } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

const RegisterBattery = () => {
  const { userLoggedIn } = useAuth()


  const [customerName, setCustomerName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [batteryType, setBatteryType] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
    setBatteryType(''); // Clear battery type on product type change
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();


    try {

      var serialNumbers = serialNumber.split(",")

      const docRef = await addDoc(collection(db, "Products"), {
        customerName,
        phoneNumber,
        productName,
        productType,
        batteryType,
        serialNumbers: serialNumbers,
        purchaseDate,
        timestamp : Math.floor(Date.now() / 1000)
      });

      toast.success('Done!!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setCustomerName('');
      setPhoneNumber('');
      setProductName('');
      setProductType('');
      setBatteryType('');
      setSerialNumber('');
      setPurchaseDate('');

    } catch (error) {
      console.log("Error adding document:" + error)

      toast.error('Error adding Data', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

    }

    // Reset form after submission (optional)
  };

  const isBatteryTypeVisible = productType === 'Battery';

  return (
    <>
    {!userLoggedIn && (<Navigate to={'/'} replace={true} />)}
      <div className="flex h-screen justify-center items-center bg-gray-100 pt-16">
        <form className="w-full max-w-lg bg-white p-6 rounded shadow-md" onSubmit={handleFormSubmit}>
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Customer Information</h2>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="customerName">
                Name of Customer
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="customerName"
                type="text"
                placeholder="John Doe"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                required
              />
            </div>

            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="phoneNumber">
                Phone Number
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="phoneNumber"
                type="tel"
                placeholder="123-456-7890"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Product Information</h2>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productName">
                Product Name
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="productName"
                type="text"
                placeholder="Exide, Studds"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                required
              />
            </div>

            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="productType">
                Type of Product
              </label>
              <select
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="productType"
                value={productType}
                onChange={handleProductTypeChange}
                required
              >
                <option value="">Select Product Type</option>
                <option value="Helmet">Helmet</option>
                <option value="Battery">Battery</option>
                <option value="Inverter">Inverter</option>
                <option value="UPS">UPS</option>
                <option value="Helmet Accessory">Helmet Accessory</option>
                <option value="Jacket">Jacket</option>
                <option value="Riding Gloves">Riding Gloves</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {isBatteryTypeVisible && (
              <div className="w-full px-3 mb-6">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="batteryType">
                  Type of Battery
                </label>
                <select
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="batteryType"
                  value={batteryType}
                  onChange={(e) => setBatteryType(e.target.value)}
                >
                  <option value="">Select Battery Type</option>
                  <option value="2W">2W</option>
                  <option value="4W">4W</option>
                  <option value="SMF">SMF</option>
                </select>
              </div>
            )}

            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="serialNumber">
                Serial Number (Optional)
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="serialNumber"
                type="text"
                placeholder="Serial Number"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </div>

            <div className="w-full px-3 mb-6">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="purchaseDate">
                Date of Purchase
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="purchaseDate"
                type="date"
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </>

  );
}

export default RegisterBattery