'use client';
import '../Styles.css';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import img2 from '../../../src/imagenes/img2.png';
import img8 from '../../../src/imagenes/img8.jpg';
import { Link, useLocation } from 'react-router-dom';
import { Fragment, useState, useContext } from 'react';
import { GlobalContext } from '../../globalState/GlobalContext.tsx';
import { ShoppingCarts } from '../shoppingCart/ShoppingCarts.tsx';
import useStore from '../../zustand/store.tsx';
import FunctionsGlobalHeader from '../../utils/FunctionsGlobalHeader.tsx';
import { Bars3Icon, ShoppingBagIcon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react';

export const Header = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const location = useLocation();
  const { shoppingCart } = useStore();
  const [open, setOpen] = useState(false);
  const { navigation, LoadPage, signOut } = FunctionsGlobalHeader();
  const token = localStorage.getItem('token');

  return (
    <div className="bg-colorBackgroundMain">
      {/* Mobile menu */}
      <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 z-40 flex">
          <DialogPanel
            transition
            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-colorBackgroundMain pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:text-black"
              >
                <span className="absolute -inset-0.5" />
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>

            {/* Links */}
            <TabGroup className="mt-2">
              <div className="border-b border-gray-200">
                <TabList className="-mb-px flex space-x-8 px-4">
                  {navigation.categories.map((category) => (
                    <Tab
                      key={category.name}
                      className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900 data-[selected]:border-purple-600 data-[selected]:text-purple-600"
                    >
                      {category.name}
                    </Tab>
                  ))}
                </TabList>
              </div>
              <TabPanels as={Fragment}>
                {navigation.categories.map((category) => (
                  <TabPanel key={category.name} className="space-y-10 px-4 pb-8 pt-10">
                    <div className="grid grid-cols-2 gap-x-4">
                      {category.featured.map((item) => (
                        <Link
                          to={`/products/${item.category}/`}
                          className="mt-6 block text-gray-900"
                          onClick={() => LoadPage(`/products/${item.category}`)}
                          key={item.name}
                        >
                          <div className="group relative text-sm">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                            />
                            <span aria-hidden="true" className="absolute inset-0 z-10" />
                            {item.name}
                            <p aria-hidden="true" className="mt-1 font-bold">
                              Shop now
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    {category.sections.map((section) => (
                      <div key={section.name}>
                        <p id={`${category.id}-${section.id}-heading-mobile`} className="font-bold text-gray-900">
                          {section.name}
                        </p>
                        <ul
                          role="list"
                          aria-labelledby={`${category.id}-${section.id}-heading-mobile`}
                          className="mt-6 flex flex-col space-y-6"
                        >
                          {section.items.map((item) => (
                            <li key={item.name} className="flow-root">
                              <Link
                                to={item.category === '' ? '/products' : `/products/${item.category}`}
                                onClick={() => LoadPage(`/products/${item.category}`)}
                                className="-m-2 block p-2 text-gray-500 hover:text-purple-600 hover:font-semibold"
                              >
                                <span>{item.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {navigation.pages.map((page) => (
                <div key={page.name} className="flow-root">
                  <Link to={`${page.href}`} className="-m-2 block p-2 font-bold text-bold hover:text-purple-600">
                    <span>{page.name}</span>
                  </Link>
                </div>
              ))}
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              {token || state.user ? (
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200"
                  id="favorites_responsive"
                  data-tooltip-content="Your Favorites"
                >
                  <Link to={'/favorites'}>
                    <HeartIcon className="h-6 w-6 text-purple-700" />
                    <Tooltip anchorId="favorites_responsive" />
                  </Link>
                </div>
              ) : (
                <div className="flow-root">
                  <Link to={'/login'} className="-m-2 block p-2 font-bold text-bold hover:text-purple-600">
                    <span>Sign in</span>
                  </Link>
                </div>
              )}
              {token || state.user ? (
                <Menu as="div" className="relative ml-1">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img alt="" src={state.user ? state.user.avatar_url : img8} className="size-8 rounded-full" />
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Your Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Your purchases
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        onClick={() => signOut(state, dispatch)}
                        className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                      >
                        Sign out
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="flow-root">
                  <Link to={'/register'} className="-m-2 block p-2 font-bold text-bold hover:text-purple-600">
                    <span>Create account</span>
                  </Link>
                </div>
              )}
            </div>

            <div className="border-t border-gray-200 px-4 py-6"></div>
          </DialogPanel>
        </div>
      </Dialog>

      <header className="fixed top-0 left-0 w-full bg-colorBackgroundMain z-40">
        <p className="flex h-10 items-center justify-center overflow-hidden bg-purple-500 px-4 text-md font-medium text-white sm:px-6 lg:px-8">
          <span className="animate-slide w-full">🎁 Get free delivery on orders over $100</span>
        </p>

        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="relative rounded-md bg-colorBackgroundMain p-2 text-gray-400 lg:hidden hover:text-black"
              >
                <span className="absolute -inset-0.5" />
                <span className="sr-only">Open menu</span>
                <Bars3Icon aria-hidden="true" className="size-6" />
              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'}>
                  <span className="sr-only">Home</span>
                  <img alt="" src={img2} className="h-9 w-auto" />
                </Link>
              </div>

              {/* Flyout menus */}
              <PopoverGroup className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {navigation.categories.map((category, index) => (
                    <Popover className="flex" key={`${category.name}-${index}`}>
                      <div className="relative flex">
                        <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:font-semibold data-[open]:border-purple-600 data-[open]:text-purple-600 data-[open]:font-semibold focus:outline-none">
                          {category.name}
                        </PopoverButton>
                      </div>

                      <PopoverPanel
                        transition
                        className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                        <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow" />

                        <div className="relative bg-colorBackgroundMain">
                          <div className="mx-auto max-w-7xl px-8">
                            <div className="grid grid-cols-2 gap-x-8 gap-y-10 py-16">
                              <div className="col-start-2 grid grid-cols-2 gap-x-8">
                                {category.featured.map((item, index) => (
                                  <Link
                                    to={`/products/${item.category}`}
                                    onClick={() => LoadPage(`/products/${item.category}`)}
                                    className="mt-6 block font-medium text-gray-900"
                                    key={`${item.name}-${index}`}
                                  >
                                    <div className="group relative text-base sm:text-sm">
                                      <img
                                        alt={item.imageAlt}
                                        src={item.imageSrc}
                                        className="aspect-square w-full rounded-lg bg-gray-100 object-cover group-hover:opacity-75"
                                      />
                                      <span aria-hidden="true" className="absolute inset-0 z-10" />
                                      {item.name}
                                      <p aria-hidden="true" className="mt-1 font-bold">
                                        Shop now
                                      </p>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                              <div className="row-start-1 grid grid-cols-3 gap-x-8 gap-y-10 text-sm">
                                {category.sections.map((section, index) => (
                                  <div key={`${section.name}-${index}`}>
                                    <p id={`${section.name}-heading`} className="font-bold text-gray-900">
                                      {section.name}
                                    </p>
                                    <ul
                                      role="list"
                                      aria-labelledby={`${section.name}-heading`}
                                      className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                    >
                                      {section.items.map((item, index) => (
                                        <li key={`${item.name}-${index}`} className="flex">
                                          <Link
                                            to={item.category === '' ? '/products' : `/products/${item.category}`}
                                            onClick={() => LoadPage(`/products/${item.category}`)}
                                            className="hover:text-purple-600 hover:font-semibold"
                                          >
                                            <span>{item.name}</span>
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </PopoverPanel>
                    </Popover>
                  ))}

                  {navigation.pages.map((page, index) => (
                    <Link
                      to={`${page.href}`}
                      className="flex items-center text-sm font-medium text-gray-700 hover:hover:font-semibold"
                      key={`${page.name}-${index}`}
                    >
                      <span>{page.name}</span>
                    </Link>
                  ))}
                </div>
              </PopoverGroup>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {token || state.user ? (
                    <div
                      className="flex items-center justify-center w-10 h-10 rounded-full cursor-pointer hover:bg-gray-200"
                      id="favorites"
                      data-tooltip-content="Your Favorites"
                    >
                      <Link to={'/favorites'}>
                        <HeartIcon className="h-6 w-6 text-purple-700" />
                        <Tooltip anchorId="favorites" />
                      </Link>
                    </div>
                  ) : (
                    <Link to={'/login'} className="text-sm font-medium text-gray-700 hover:font-semibold">
                      <span>Sign in</span>
                    </Link>
                  )}
                  <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                  {token || state.user ? (
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img alt="" src={state.user ? state.user.avatar_url : img8} className="size-8 rounded-full" />
                        </MenuButton>
                      </div>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            Your Profile
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            Your purchases
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <a
                            onClick={() => signOut(state, dispatch)}
                            className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                          >
                            Sign out
                          </a>
                        </MenuItem>
                      </MenuItems>
                    </Menu>
                  ) : (
                    <Link to={'/register'} className="text-sm font-medium text-gray-700 hover:font-semibold">
                      <span>Create account</span>
                    </Link>
                  )}
                </div>

                <div className="hidden lg:ml-8 lg:flex"></div>

                {/* Search */}
                <div className="flex lg:ml-6"></div>

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  {state.isTrue && <ShoppingCarts />}

                  {!(location.pathname === '/finishshopping') && (
                    <a className="group -m-2 flex items-center p-2 cursor-pointer" onClick={() => dispatch({ type: 'SET_TRUE' })}>
                      <ShoppingBagIcon aria-hidden="true" className="size-6 shrink-0 text-gray-400 group-hover:text-purple-600" />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        {shoppingCart.length}
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};
