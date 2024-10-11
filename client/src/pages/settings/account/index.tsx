import { useState } from "react";
import UpdateEmail from "../../../components/settings/email/updateEmail";
import UpdateAccountDetails from "../../../components/settings/account";

const Account = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <section>
      <div className="px-2 pt-16 pb-4 bg-white dark:bg-stone-700">
        <img
          src="#"
          alt=""
          className="w-16 h-16 rounded-full bg-white dark:bg-gray-800"
        />
        <p className="text-3xl font-semibold">Arthur Morgan</p>
        <p className="text-sm">arthur@gmail.com</p>
      </div>
      <div className="min-h-screen py-10 px-5">
        <div className="bg-white dark:bg-stone-700 rounded-lg shadow-md p-8">
          <UpdateAccountDetails />
          <UpdateEmail />

          <div className="mt-8 border-t pt-5">
            <h2 className="text-lg font-semibold text-red-600">
              Delete Account
            </h2>
            <p className="text-sm mb-2">
              This action is irreversible. Please proceed with caution.
            </p>
            <button
              className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </button>
          </div>

          {/* Account Deletion Modal */}
          {showDeleteModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-8 shadow-md max-w-md w-full relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ✕
                </button>
                <h3 className="text-xl font-semibold text-gray-700 mb-4">
                  Confirm Account Deletion
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <button
                  className="w-full bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg"
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
        </div>
      </div>{" "}
    </section>
  );
};

export default Account;
