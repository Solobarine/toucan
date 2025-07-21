import { useState } from "react";
import { Shield, Smartphone, Clock, MapPin } from "lucide-react";

interface LoginSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  current: boolean;
}

export default function SecuritySettings() {
  const [settings, setSettings] = useState({
    loginAlerts: true,
    suspiciousActivityAlerts: true,
    passwordChangeAlerts: true,
    newDeviceAlerts: true,
  });

  const [loginSessions] = useState<LoginSession[]>([
    {
      id: "1",
      device: "iPhone 14 Pro • Safari",
      location: "San Francisco, CA",
      lastActive: "Active now",
      current: true,
    },
    {
      id: "2",
      device: "MacBook Pro • Chrome",
      location: "San Francisco, CA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: "3",
      device: "Windows PC • Edge",
      location: "New York, NY",
      lastActive: "3 days ago",
      current: false,
    },
  ]);

  const handleSettingChange = (key: string, value: boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  };

  const handleLogoutSession = async (sessionId: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert("Session logged out successfully");
  };

  const ToggleOption = ({
    title,
    description,
    checked,
    onChange,
    icon: Icon,
  }: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon?: any;
  }) => (
    <div className="flex items-start justify-between">
      <div className="flex items-start gap-3 flex-1">
        {Icon && (
          <Icon className="w-5 h-5 text-neutral-500 dark:text-neutral-400 mt-0.5" />
        )}
        <div className="flex-1">
          <h4 className="font-medium text-neutral-900 dark:text-white">
            {title}
          </h4>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            {description}
          </p>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-purple-600" : "bg-neutral-300 dark:bg-neutral-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Security Settings
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage your account security and connected devices
        </p>
      </div>

      {/* Security Alerts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
            Security Alerts
          </h4>
        </div>

        <ToggleOption
          title="Login Alerts"
          description="Get notified when someone logs into your account"
          checked={settings.loginAlerts}
          onChange={(checked) => handleSettingChange("loginAlerts", checked)}
        />

        <ToggleOption
          title="Suspicious Activity Alerts"
          description="Get notified about unusual account activity"
          checked={settings.suspiciousActivityAlerts}
          onChange={(checked) =>
            handleSettingChange("suspiciousActivityAlerts", checked)
          }
        />

        <ToggleOption
          title="Password Change Alerts"
          description="Get notified when your password is changed"
          checked={settings.passwordChangeAlerts}
          onChange={(checked) =>
            handleSettingChange("passwordChangeAlerts", checked)
          }
        />

        <ToggleOption
          title="New Device Alerts"
          description="Get notified when your account is accessed from a new device"
          checked={settings.newDeviceAlerts}
          onChange={(checked) =>
            handleSettingChange("newDeviceAlerts", checked)
          }
        />
      </div>

      {/* Active Sessions */}
      <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <div className="flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
            Active Sessions
          </h4>
        </div>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          These are the devices currently logged into your account
        </p>

        <div className="space-y-3">
          {loginSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                  <Smartphone className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                </div>
                <div>
                  <h5 className="font-medium text-neutral-900 dark:text-white">
                    {session.device}
                    {session.current && (
                      <span className="ml-2 px-2 py-0.5 text-xs bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full">
                        Current
                      </span>
                    )}
                  </h5>
                  <div className="flex items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400 mt-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {session.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.lastActive}
                    </div>
                  </div>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleLogoutSession(session.id)}
                  className="px-3 py-1.5 text-sm text-red-600 border border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  Log Out
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
