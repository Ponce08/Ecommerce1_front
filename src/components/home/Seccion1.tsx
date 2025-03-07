import { Link } from 'react-router-dom';

export const Seccion1 = () => {
  return (
    <div className="relative overflow-hidden bg-colorBackground mt-[100px]">
      <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
          <div className="sm:max-w-lg">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here</h1>
            <p className="mt-4 text-xl text-gray-500">
              This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you
              live or die.
            </p>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}

              <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                  <div className="flex items-center space-x-6 lg:space-x-8 ">
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dm7llqul3/image/upload/v1738686443/Ecommerce_FyT/ewai2tf4jvcvmnca7izr.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dm7llqul3/image/upload/v1738686407/Ecommerce_FyT/ywlfxcps9geyjoyejhhs.webp"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dm7llqul3/image/upload/v1738686344/Ecommerce_FyT/nviwh0r0hdijokachdlq.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dm7llqul3/image/upload/v1738686321/Ecommerce_FyT/loowhjan6jptkyvmx0lo.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dm7llqul3/image/upload/v1738686265/Ecommerce_FyT/fnveur0rgg8d024hgivu.webp"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dm7llqul3/image/upload/v1738686177/Ecommerce_FyT/pc6f1ux9ww3jnf2fyfmr.webp"
                          className="size-full object-cover"
                        />
                      </div>
                      <div className="h-64 w-44 overflow-hidden rounded-lg">
                        <img
                          alt=""
                          src="https://res.cloudinary.com/dm7llqul3/image/upload/v1738686151/Ecommerce_FyT/jbgl1e41vavxxnypz0ga.webp"
                          className="size-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <Link
                to={'/products'}
                className="inline-block rounded-md border border-transparent bg-purple-500 px-8 py-3 text-center font-medium text-white hover:bg-purple-600"
              >
                <span>Shop Collection</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// export const Seccion1 = () => {
//   return (
//     <div className="relative overflow-hidden bg-colorBackground">
//       <div className="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
//         <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
//           <div className="sm:max-w-lg">
//             <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Summer styles are finally here</h1>
//             <p className="mt-4 text-xl text-gray-500">
//               This year, our new summer collection will shelter you from the harsh elements of a world that doesn't care if you
//               live or die.
//             </p>
//           </div>
//           <div>
//             <div className="mt-10">
//               {/* Decorative image grid */}
//               <div aria-hidden="true" className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
//                 <div className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
//                   <div className="flex items-center space-x-6 lg:space-x-8">
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100 group">
//                         <img
//                           alt=""
//                           src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
//                           className="size-full object-cover"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg group">
//                         <img
//                           alt=""
//                           src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
//                           className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg group">
//                         <img
//                           alt=""
//                           src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
//                           className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg group">
//                         <img
//                           alt=""
//                           src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
//                           className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg group">
//                         <img
//                           alt=""
//                           src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
//                           className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
//                         />
//                       </div>
//                     </div>
//                     <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
//                       <div className="h-64 w-44 overflow-hidden rounded-lg group">
//                         <img
//                           alt=""
//                           src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
//                           className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
//                         />
//                       </div>
//                       <div className="h-64 w-44 overflow-hidden rounded-lg group">
//                         <img
//                           alt=""
//                           src="https://tailwindui.com/plus/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
//                           className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <a
//                 href="#"
//                 className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
//               >
//                 Shop Collection
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
