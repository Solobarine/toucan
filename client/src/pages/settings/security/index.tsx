import { useFormik } from "formik";
import { useState } from "react";
import TextInput from "../../../components/form/inputs";
import { Helmet } from "react-helmet";

const SecuritySettings = () => {
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [securityNotifications, setSecurityNotifications] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const { values, errors, touched, handleChange } = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: (values) => console.log(values),
  });

  return (
    <div className="min-h-screen py-10 px-5 md:px-20">
      <Helmet>
        <title>Toucan - Security Setting</title>
        <meta name="description" content="User Security Setting" />
      </Helmet>
      <div className="max-w-3xl mx-auto bg-white dark:bg-stone-700 rounded-lg shadow-md p-8">
        {/* Two-Factor Authentication */}
        <div className="border-b pb-4 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">
              Two-Factor Authentication (2FA)
            </h2>
            <button
              className={`${
                twoFactorAuth ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              onClick={() => setTwoFactorAuth(!twoFactorAuth)}
            >
              <span
                className={`${
                  twoFactorAuth ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <p className="text-sm mt-2">
            Add an extra layer of security to your account by enabling 2FA.
          </p>
        </div>

        {/* Security Notifications */}
        <div className="border-b pb-4 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Security Notifications</h2>
            <button
              className={`${
                securityNotifications ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              onClick={() => setSecurityNotifications(!securityNotifications)}
            >
              <span
                className={`${
                  securityNotifications ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <p className="text-sm mt-2">
            Get notified when unusual activity is detected in your account.
          </p>
        </div>

        {/* Change Password */}
        <div className="border-b pb-4 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Change Password</h2>
            <button
              className="bg-primary hover:opacity-75 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </button>
          </div>
          <p className="text-sm mt-2">
            Update your password regularly to keep your account secure.
          </p>
        </div>

        {/* Password Change Modal */}
        {showPasswordModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white dark:bg-stone-700 rounded-lg p-8 shadow-md max-w-md w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover"
                onClick={() => setShowPasswordModal(false)}
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold mb-4">Change Password</h3>
              <form className="space-y-4">
                <div className="grid gap-2">
                  <label className="block text-sm font-medium">
                    Current Password
                  </label>
                  <TextInput
                    name="currentPassword"
                    type="text"
                    placeholder="Password..."
                    error={errors.currentPassword}
                    touched={touched.currentPassword}
                    handleChange={handleChange}
                    value={values.currentPassword}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="block text-sm font-medium">
                    New Password
                  </label>
                  <TextInput
                    name="newPassword"
                    type="text"
                    placeholder="Password..."
                    error={errors.newPassword}
                    touched={touched.newPassword}
                    handleChange={handleChange}
                    value={values.newPassword}
                  />
                </div>
                <div className="grid gap-2">
                  <label className="block text-sm font-medium">
                    Confirm New Password
                  </label>
                  <TextInput
                    name="confirmNewPassword"
                    type="text"
                    placeholder="Password..."
                    error={errors.confirmNewPassword}
                    touched={touched.confirmNewPassword}
                    handleChange={handleChange}
                    value={values.confirmNewPassword}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-primary hover:opacity-75 text-white py-2 rounded-lg mt-4"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecuritySettings;
