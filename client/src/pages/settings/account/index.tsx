import { useState } from "react";
import UpdateEmail from "../../../components/settings/email/updateEmail";
import UpdateAccountDetails from "../../../components/settings/account";
import { useSelector } from "react-redux";
import { RootState } from "../../../features/store";
import { capitalizeText } from "../../../utils";
import { Helmet } from "react-helmet";

const Account = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <section className="min-h-screen">
      <Helmet>
        <title>Toucan - Account Settings</title>
        <meta
          name="description"
          content="Manage your Toucan account settings"
        />
      </Helmet>
      <div className="bg-white dark:bg-stone-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center space-x-5">
            <img
              src="/placeholder.svg"
              alt=""
              className="w-20 h-20 rounded-full bg-gray-200 dark:bg-gray-700"
            />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {capitalizeText(user?.first_name)}{" "}
                {capitalizeText(user?.last_name)}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-stone-700 shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8 space-y-8">
            <UpdateAccountDetails />
            <div className="border-t border-gray-200 dark:border-stone-700 pt-8">
              <UpdateEmail />
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <h2 className="text-lg font-semibold text-red-600 dark:text-red-500 mb-4">
                Delete Account
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                This action is irreversible. Please proceed with caution.
              </p>
              <button
                className="bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-white px-4 py-2 rounded-md transition duration-150 ease-in-out"
                onClick={() => setShowDeleteModal(true)}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Account Deletion Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8 shadow-xl max-w-md w-full relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full p-1"
              onClick={() => setShowDeleteModal(false)}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Confirm Account Deletion
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete your account? This action cannot
              be undone.
            </p>
            <button
              className="w-full bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 text-white py-2 px-4 rounded-md transition duration-150 ease-in-out"
              onClick={() => {
                // Add logic to handle account deletion
                setShowDeleteModal(false);
              }}
            >
              Yes, Delete My Account
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Account;
