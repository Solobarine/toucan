import { useState } from "react";

const NotificationsSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsNotifications, setSmsNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [newsletters, setNewsletters] = useState(true);

  return (
    <div className="min-h-screen py-10 px-5 md:px-20">
      <div className="max-w-3xl mx-auto bg-white dark:bg-stone-700 rounded-lg shadow-md p-8">
        {/* Email Notifications */}
        <div className="border-b pb-4 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Email Notifications</h2>
            <button
              className={`${
                emailNotifications ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              onClick={() => setEmailNotifications(!emailNotifications)}
            >
              <span
                className={`${
                  emailNotifications ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <p className="text-sm mt-2">
            Enable to receive notifications via email for account activity and
            updates.
          </p>
        </div>

        {/* SMS Notifications */}
        <div className="border-b pb-4 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">SMS Notifications</h2>
            <button
              className={`${
                smsNotifications ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              onClick={() => setSmsNotifications(!smsNotifications)}
            >
              <span
                className={`${
                  smsNotifications ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <p className="text-sm mt-2">
            Enable to receive notifications via SMS for important alerts and
            reminders.
          </p>
        </div>

        {/* Push Notifications */}
        <div className="border-b pb-4 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Push Notifications</h2>
            <button
              className={`${
                pushNotifications ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              onClick={() => setPushNotifications(!pushNotifications)}
            >
              <span
                className={`${
                  pushNotifications ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <p className="text-sm mt-2">
            Enable to receive real-time updates and alerts on your device.
          </p>
        </div>

        {/* Newsletters */}
        <div className="border-b pb-4 mb-5">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Newsletters</h2>
            <button
              className={`${
                newsletters ? "bg-green-500" : "bg-gray-300"
              } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
              onClick={() => setNewsletters(!newsletters)}
            >
              <span
                className={`${
                  newsletters ? "translate-x-6" : "translate-x-1"
                } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
              />
            </button>
          </div>
          <p className="text-sm mt-2">
            Enable to receive our monthly newsletters with updates and special
            offers.
          </p>
        </div>

        {/* Save Changes Button */}
        <button
          className="mt-6 bg-primary hover:opacity-80 text-white px-4 py-2 rounded-lg"
          onClick={() => {
            // Add logic to save changes
            alert("Settings saved successfully!");
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default NotificationsSettings;
