import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import AccountBalance from './AccountBalance'

const user = {
  name: 'neonTactical',
  accountBalance: 20000,
}

const Header = () => {
  // const { user } = useAuth0()

  if (!user) {
    return <div className="header">Loading...</div>
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-4 py-2.5 dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center justify-start">
          <button
            id="toggleSidebar"
            aria-expanded="true"
            aria-controls="sidebar"
            className="mr-3 hidden cursor-pointer rounded p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 lg:inline dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 16 12"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h14M1 6h14M1 11h7"
              />
            </svg>
          </button>
          <button
            aria-expanded="true"
            aria-controls="sidebar"
            className="mr-2 cursor-pointer rounded-lg p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:ring-2 focus:ring-gray-100 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:ring-gray-700"
          >
            <svg
              className="h-[18px] w-[18px]"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
            <span className="sr-only">Toggle sidebar</span>
          </button>
          <a className="mr-4 flex cursor-pointer">
            <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
              neonTrading
            </span>
          </a>

          <form
            action="#"
            method="GET"
            className="mb-0 hidden lg:block lg:pl-2 "
          >
            <label htmlFor="topbar-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1 lg:w-96">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
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
              </div>
              <input
                type="text"
                name="email"
                id="topbar-search"
                className="focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-500 dark:focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-9 text-gray-900 sm:text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                placeholder="Search"
              />
            </div>
          </form>
        </div>

        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse dark:border-gray-700">
            <li>
              <a
                className="bg-primary-700 block cursor-pointer rounded px-3 py-2 text-white md:bg-transparent md:p-0 md:text-gray-900 dark:text-white md:dark:text-white"
                aria-current="page"
              >
                Dashboard
              </a>
            </li>
            <li>
              <a
                className="bg-primary-700 block cursor-pointer rounded px-3 py-2 text-white md:bg-transparent md:p-0 md:text-gray-900 dark:text-white md:dark:text-white"
                aria-current="page"
              >
                Trade Management
              </a>
            </li>
            <li>
              <a
                className="bg-primary-700 block cursor-pointer rounded px-3 py-2 text-white md:bg-transparent md:p-0 md:text-gray-900 dark:text-white md:dark:text-white"
                aria-current="page"
              >
                Strategy Builder
              </a>
            </li>
            <li>
              <a
                className="bg-primary-700 block cursor-pointer rounded px-3 py-2 text-white md:bg-transparent md:p-0 md:text-gray-900 dark:text-white md:dark:text-white"
                aria-current="page"
              >
                Settings
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center lg:order-2">
          <button
            id="toggleSidebarMobileSearch"
            type="button"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Search</span>
            <svg
              className="h-4 w-4"
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

          <button
            type="button"
            data-dropdown-toggle="notification-dropdown"
            className="mr-1 rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:ring-4 focus:ring-gray-300 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-600"
          >
            <span className="sr-only">View notifications</span>
            <svg
              className="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 14 20"
            >
              <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
            </svg>
          </button>

          <button
            type="button"
            className="mx-3 flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:mr-0 dark:focus:ring-gray-600"
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            data-dropdown-placement="bottom"
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="h-8 w-8 rounded-full"
              src="https://avatars.githubusercontent.com/u/70549539?s=40&v=4"
              alt="user photo"
            />
          </button>

          <div
            className="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
            id="notification-dropdown"
          >
            <div className="block rounded-t-lg bg-gray-50 px-4 py-2 text-center font-medium text-gray-700 dark:bg-gray-600 dark:text-gray-300">
              Notifications
            </div>
            <div>
              <a
                href="#"
                className="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-11 w-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Bonnie Green"
                  />
                  <div className="bg-primary-700 absolute -bottom-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white dark:border-gray-700">
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 5 3.434 3.434L11 1.867"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full pl-3">
                  <div className="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                    New message from Bonnie Green: "Hey, what's up? All set for
                    the presentation?"
                  </div>
                  <div className="text-primary-600 dark:text-primary-500 text-xs">
                    a few moments ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="flex border-b px-4 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-600"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-11 w-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                    alt="Jese Leos"
                  />
                  <div className="bg-primary-700 absolute -bottom-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white dark:border-gray-700">
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 5 3.434 3.434L11 1.867"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full pl-3">
                  <div className="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                    New message from Jese Leos: "Are you coming to the meeting
                    tonight?"
                  </div>
                  <div className="text-primary-600 dark:text-primary-500 text-xs">
                    a few moments ago
                  </div>
                </div>
              </a>
              <a
                href="#"
                className="flex px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-11 w-11 rounded-full"
                    src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/bonnie-green.png"
                    alt="Joseph Mcfall"
                  />
                  <div className="bg-primary-700 absolute -bottom-0 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-white dark:border-gray-700">
                    <svg
                      className="h-3 w-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 12 12"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 5 3.434 3.434L11 1.867"
                      />
                    </svg>
                  </div>
                </div>
                <div className="w-full pl-3">
                  <div className="mb-1.5 text-sm text-gray-500 dark:text-gray-400">
                    New message from Joseph Mcfall: "Hope you are doing well!"
                  </div>
                  <div className="text-primary-600 dark:text-primary-500 text-xs">
                    a few moments ago
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div
            className="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
            id="dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm font-semibold text-gray-900 dark:text-white">
                {user.name}
              </span>
              <span className="block truncate text-sm font-light text-gray-500 dark:text-gray-400">
                {user.email}
              </span>
            </div>
            <ul className="py-1">
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
