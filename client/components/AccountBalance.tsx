import React from 'react'

const AccountBalance = () => {
  return (
    <div className="flex flex-col">
      <h3 className="mb-4 pt-4 text-2xl font-bold dark:text-white">
        Account Balance
      </h3>
      <div className="flex flex-col space-x-0 space-y-4 md:flex-row md:space-x-4 md:space-y-0">
        <div className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-600 dark:bg-gray-800">
          <div className="flex w-full items-center justify-center text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                $12,345
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Available funds
              </p>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-between rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-600 dark:bg-gray-800">
          <div className="flex w-full items-center justify-between">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                $1,234
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Value of current trades
              </p>
            </div>
            <div className="flex items-center gap-0.5 font-bold text-red-500">
              <span className="">-2</span>
              <svg
                className="h-3 w-3 rotate-180 text-red-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v13m0-13 4 4m-4-4-4 4"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-600 dark:bg-gray-800">
          <div className="flex w-full items-center justify-center text-center">
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">
                $5,000
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Max allowed trade value
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AccountBalance
