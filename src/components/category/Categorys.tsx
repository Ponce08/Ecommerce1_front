export const Categorys = () => {
  return (
    <div className="flex bg-gray-50">
      {/* Sidebar - Categories */}
      <div className="md:w-64 bg-white shadow-lg p-6 flex-shrink-0">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        <ul className="space-y-2">
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Women's Clothing</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Men's Clothing</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Accessories</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Shoes</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Bags</li>
        </ul>

        <h2 className="text-lg font-semibold mt-8 mb-4">Brands</h2>
        <ul className="space-y-2">
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Nike</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Adidas</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Zara</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">H&M</li>
        </ul>
        <h2 className="text-lg font-semibold mt-8 mb-4">Brands</h2>
        <ul className="space-y-2">
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Nike</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Adidas</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">Zara</li>
          <li className="text-gray-600 hover:text-blue-600 cursor-pointer">H&M</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Card 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 sm:h-64 bg-gray-200 flex items-center justify-center">
              <svg className="w-16 sm:w-24 lg:w-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Women's Tops Collection</h3>
              <p className="text-gray-600 mt-2">Starting from $29.99</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Shop Now</button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="h-48 sm:h-64 bg-gray-200 flex items-center justify-center">
              <svg className="w-16 sm:w-24 lg:w-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">Basic T-Shirts</h3>
              <p className="text-gray-600 mt-2">Starting from $19.99</p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Shop Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
