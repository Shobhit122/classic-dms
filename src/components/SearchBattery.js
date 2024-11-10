import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { toast, Bounce } from 'react-toastify';
import { useAuth } from '../contexts/authContext';
import { Navigate } from 'react-router-dom';

const SearchBattery = () => {
  const { userLoggedIn } = useAuth()

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Search with...');
  const [searchResults, setSearchResults] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setDropdownOpen(false);
  };

  const searchQuery = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const productsRef = collection(db, 'Products');
      let q;
      if (selectedCategory === 'Phone Number') {
        q = query(productsRef, where('phoneNumber', '==', searchKey));
      } else {
        q = query(productsRef, where('serialNumbers', 'array-contains', searchKey));
      }

      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => doc.data());
      if (results.length === 0) {
        toast.error('No results found!', {
          position: 'top-right',
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce,
        });
      }
      setSearchResults(results);
    } catch (error) {
      toast.error('Error fetching data', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
        transition: Bounce,
      });
      console.error('Error fetching data: ', error);
    }
  };

  return (
    <>
    {!userLoggedIn && (<Navigate to={'/'} replace={true} />)}
      <div className="p-4 max-w-lg mx-auto">
        <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={searchQuery}>
          <div className="flex items-center space-x-2 mb-4">
            <button
              type="button"
              onClick={toggleDropdown}
              className="flex-shrink-0 z-10 inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-gray-200 border border-gray-300 rounded-l-lg hover:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            >
              {selectedCategory}
              <svg
                className="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 absolute mt-12">
                <ul className="py-2 text-sm text-gray-700">
                  {['Serial Number', 'Phone Number'].map((category) => (
                    <li key={category}>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
                        onClick={() => handleCategorySelect(category)}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search Product"
                onChange={(e) => setSearchKey(e.target.value)}
                required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-500 rounded-r-lg border border-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 h-full"
              >
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>

      {searchResults.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {searchResults.map((result, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{result.customerName}</h3>
                <p className="text-sm text-gray-600">{result.phoneNumber}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-gray-700">
                    <strong className="font-medium text-gray-900">Product:</strong> {result.productName}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong className="font-medium text-gray-900">Type:</strong> {result.productType}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong className="font-medium text-gray-900">Battery Type:</strong> {result.batteryType}
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong className="font-medium text-gray-900">Serial Numbers:</strong>
                    <span className="block text-gray-500">
                      {Array.isArray(result.serialNumbers) ? result.serialNumbers.join(', ') : 'No serial numbers available'}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">
                    <strong className="font-medium text-gray-900">Purchase Date:</strong>{' '}
                    {new Date(result.purchaseDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-4 flex justify-end">
                <button className="text-blue-500 hover:text-blue-600 font-medium text-sm">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SearchBattery;
