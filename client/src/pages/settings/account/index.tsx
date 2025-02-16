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
    <section>
      <Helmet>
        <title>Toucan - Acount Setting</title>
        <meta name="description" content="User Account Setting" />
      </Helmet>
      <div className="px-2 pt-16 pb-4 bg-white dark:bg-stone-700">
        <img
          src="#"
          alt=""
          className="w-16 h-16 rounded-full bg-white dark:bg-gray-800"
        />
        <p className="text-3xl font-semibold">
          {capitalizeText(user?.first_name)} {capitalizeText(user?.last_name)}
        </p>
        <p className="text-sm">{user?.email}</p>
      </div>
      <div className="min-h-screen py-10 px-5 max-w-3xl mx-auto">
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
            <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center">
              <div className="bg-white dark:bg-dark rounded-lg p-8 shadow-md max-w-md w-full relative">
                <button
                  className="absolute top-2 right-2 hover:text-gray-700"
                  onClick={() => setShowDeleteModal(false)}
                >
                  ✕
                </button>
                <h3 className="text-xl font-semibold mb-4">
                  Confirm Account Deletion
                </h3>
                <p className="text-sm mb-4">
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
