"use client";

import {
  Button,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";
import Link from "next/link";
import { Fragment } from "react";
import { CiCircleRemove, CiUser } from "react-icons/ci";
import { HiOutlineBars3 } from "react-icons/hi2";

export default function Navigation() {
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

              {/* profile icons */}
              <div className="flex items-center space-x-4">
                <Button className="text-white hover:text-purple-200">
                  <CiUser className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile menu button */}
              <div className="-mr-2 flex md:hidden">
                <DisclosureButton className="text-white hover:text-purple-200">
                  {open ? (
                    <CiCircleRemove className="h-6 w-6" />
                  ) : (
                    <HiOutlineBars3 className="h-6 w-6" />
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
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
