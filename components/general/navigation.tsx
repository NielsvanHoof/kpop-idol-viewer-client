"use client";

import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Input,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  UserIcon,
  XCircleIcon,
} from "@heroicons/react/16/solid";
import { motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useState } from "react";

export default function Navigation() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);

  const toggleSearch = () => {
    setIsSearchOpen((prev) => !prev);
  };

  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-purple-600 to-pink-600 sticky top-0 z-50 shadow-lg"
    >
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-white text-2xl font-bold">
                  K-Pop Tracker
                </Link>
                <div className="hidden md:flex ml-10 space-x-4">
                  <Link
                    href="/idols"
                    className="text-white hover:text-purple-200"
                  >
                    Idols
                  </Link>
                  <Link
                    href="/groups"
                    className="text-white hover:text-purple-200"
                  >
                    Groups
                  </Link>
                  <Link
                    href="/events"
                    className="text-white hover:text-purple-200"
                  >
                    Events
                  </Link>

                  {/* Popover for "More" section */}
                  <Popover className="relative">
                    <PopoverButton className="text-white hover:text-purple-200">
                      More
                    </PopoverButton>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <PopoverPanel className="absolute z-10 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                        <div className="py-1">
                          <Link
                            href="/news"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            News
                          </Link>
                          <Link
                            href="/about"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            About Us
                          </Link>
                        </div>
                      </PopoverPanel>
                    </Transition>
                  </Popover>
                </div>
              </div>

              {/* Search and profile icons */}
              <div className="flex items-center space-x-4">
                {/* Expandable search bar */}
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{
                    width: isSearchOpen ? "200px" : 0,
                    opacity: isSearchOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className={`relative ${
                    isSearchOpen ? "inline-block" : "hidden"
                  } md:inline-block overflow-hidden`}
                >
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="p-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <MagnifyingGlassCircleIcon className="absolute left-2 top-2.5 h-5 w-5 text-gray-500" />
                  <Button
                    onClick={toggleSearch}
                    className="absolute right-2 top-2.5"
                  >
                    <XCircleIcon className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                  </Button>
                </motion.div>
                <Button
                  onClick={toggleSearch}
                  className={`text-white hover:text-purple-200 ${
                    isSearchOpen ? "hidden" : "block"
                  } md:block`}
                >
                  <MagnifyingGlassCircleIcon className="h-6 w-6" />
                </Button>
                <Button className="text-white hover:text-purple-200">
                  <UserIcon className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="text-white hover:text-purple-200">
                  {open ? (
                    <XCircleIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <DisclosurePanel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/idols"
                className="block text-white hover:bg-purple-700 rounded-md px-3 py-2 text-base font-medium"
              >
                Idols
              </Link>
              <Link
                href="/groups"
                className="block text-white hover:bg-purple-700 rounded-md px-3 py-2 text-base font-medium"
              >
                Groups
              </Link>
              <Link
                href="/events"
                className="block text-white hover:bg-purple-700 rounded-md px-3 py-2 text-base font-medium"
              >
                Events
              </Link>
              <Link
                href="/news"
                className="block text-white hover:bg-purple-700 rounded-md px-3 py-2 text-base font-medium"
              >
                News
              </Link>
              <Link
                href="/about"
                className="block text-white hover:bg-purple-700 rounded-md px-3 py-2 text-base font-medium"
              >
                About Us
              </Link>

              {/* Mobile search input */}
              <div className="mt-3">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
