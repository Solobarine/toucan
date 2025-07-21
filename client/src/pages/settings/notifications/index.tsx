import { useState } from "react";
import { Bell, Mail, MessageSquare, Heart, UserPlus } from "lucide-react";

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    pushNotifications: {
      enabled: true,
      likes: true,
      comments: true,
      mentions: true,
      follows: true,
      messages: true,
      friendRequests: true,
      posts: false,
    },
    emailNotifications: {
      enabled: true,
      weeklyDigest: true,
      securityAlerts: true,
      friendActivity: false,
      recommendations: false,
      marketing: false,
    },
    soundAndVibration: {
      sound: true,
      vibration: true,
      quietHours: true,
      quietStart: "22:00",
      quietEnd: "08:00",
    },
  });

  const handleSettingChange = (category: string, key: string, value: any) => {
    const newSettings = {
      ...settings,
      [category]: {
        ...settings[category as keyof typeof settings],
        [key]: value,
      },
    };
    setSettings(newSettings);
  };

  const ToggleOption = ({
    title,
    description,
    checked,
    onChange,
    icon: Icon,
    disabled = false,
  }: {
    title: string;
    description: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    icon?: any;
    disabled?: boolean;
  }) => (
    <div
      className={`flex items-start justify-between ${
        disabled ? "opacity-50" : ""
      }`}
    >
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
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-purple-600" : "bg-neutral-300 dark:bg-neutral-600"
        } ${disabled ? "cursor-not-allowed" : "cursor-pointer"}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );

  const TimeInput = ({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  }) => (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
        {label}
      </label>
      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-1 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Notification Settings
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Manage how and when you receive notifications
        </p>
      </div>

      {/* Push Notifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
            Push Notifications
          </h4>
        </div>

        <ToggleOption
          title="Enable Push Notifications"
          description="Receive notifications on your device"
          checked={settings.pushNotifications.enabled}
          onChange={(checked) =>
            handleSettingChange("pushNotifications", "enabled", checked)
          }
        />

        <div className="ml-8 space-y-4">
          <ToggleOption
            title="Likes"
            description="When someone likes your posts"
            checked={settings.pushNotifications.likes}
            onChange={(checked) =>
              handleSettingChange("pushNotifications", "likes", checked)
            }
            icon={Heart}
            disabled={!settings.pushNotifications.enabled}
          />

          <ToggleOption
            title="Comments"
            description="When someone comments on your posts"
            checked={settings.pushNotifications.comments}
            onChange={(checked) =>
              handleSettingChange("pushNotifications", "comments", checked)
            }
            icon={MessageSquare}
            disabled={!settings.pushNotifications.enabled}
          />

          <ToggleOption
            title="Mentions"
            description="When someone mentions you in a post or comment"
            checked={settings.pushNotifications.mentions}
            onChange={(checked) =>
              handleSettingChange("pushNotifications", "mentions", checked)
            }
            disabled={!settings.pushNotifications.enabled}
          />

          <ToggleOption
            title="New Followers"
            description="When someone starts following you"
            checked={settings.pushNotifications.follows}
            onChange={(checked) =>
              handleSettingChange("pushNotifications", "follows", checked)
            }
            icon={UserPlus}
            disabled={!settings.pushNotifications.enabled}
          />

          <ToggleOption
            title="Messages"
            description="When you receive a direct message"
            checked={settings.pushNotifications.messages}
            onChange={(checked) =>
              handleSettingChange("pushNotifications", "messages", checked)
            }
            icon={MessageSquare}
            disabled={!settings.pushNotifications.enabled}
          />

          <ToggleOption
            title="Friend Requests"
            description="When someone sends you a friend request"
            checked={settings.pushNotifications.friendRequests}
            onChange={(checked) =>
              handleSettingChange(
                "pushNotifications",
                "friendRequests",
                checked
              )
            }
            disabled={!settings.pushNotifications.enabled}
          />

          <ToggleOption
            title="Friend Posts"
            description="When your friends share new posts"
            checked={settings.pushNotifications.posts}
            onChange={(checked) =>
              handleSettingChange("pushNotifications", "posts", checked)
            }
            disabled={!settings.pushNotifications.enabled}
          />
        </div>
      </div>

      {/* Email Notifications */}
      <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <div className="flex items-center gap-2">
          <Mail className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
            Email Notifications
          </h4>
        </div>

        <ToggleOption
          title="Enable Email Notifications"
          description="Receive notifications via email"
          checked={settings.emailNotifications.enabled}
          onChange={(checked) =>
            handleSettingChange("emailNotifications", "enabled", checked)
          }
        />

        <div className="ml-8 space-y-4">
          <ToggleOption
            title="Weekly Digest"
            description="Weekly summary of your activity and friend updates"
            checked={settings.emailNotifications.weeklyDigest}
            onChange={(checked) =>
              handleSettingChange("emailNotifications", "weeklyDigest", checked)
            }
            disabled={!settings.emailNotifications.enabled}
          />

          <ToggleOption
            title="Security Alerts"
            description="Important security and account notifications"
            checked={settings.emailNotifications.securityAlerts}
            onChange={(checked) =>
              handleSettingChange(
                "emailNotifications",
                "securityAlerts",
                checked
              )
            }
            disabled={!settings.emailNotifications.enabled}
          />

          <ToggleOption
            title="Friend Activity"
            description="Updates about your friends' activity"
            checked={settings.emailNotifications.friendActivity}
            onChange={(checked) =>
              handleSettingChange(
                "emailNotifications",
                "friendActivity",
                checked
              )
            }
            disabled={!settings.emailNotifications.enabled}
          />

          <ToggleOption
            title="Recommendations"
            description="Suggested friends and content recommendations"
            checked={settings.emailNotifications.recommendations}
            onChange={(checked) =>
              handleSettingChange(
                "emailNotifications",
                "recommendations",
                checked
              )
            }
            disabled={!settings.emailNotifications.enabled}
          />

          <ToggleOption
            title="Marketing & Promotions"
            description="Updates about new features and promotions"
            checked={settings.emailNotifications.marketing}
            onChange={(checked) =>
              handleSettingChange("emailNotifications", "marketing", checked)
            }
            disabled={!settings.emailNotifications.enabled}
          />
        </div>
      </div>

      {/* Sound & Vibration */}
      <div className="space-y-4 border-t border-neutral-200 dark:border-neutral-700 pt-6">
        <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
          Sound & Vibration
        </h4>

        <ToggleOption
          title="Notification Sound"
          description="Play sound for notifications"
          checked={settings.soundAndVibration.sound}
          onChange={(checked) =>
            handleSettingChange("soundAndVibration", "sound", checked)
          }
        />

        <ToggleOption
          title="Vibration"
          description="Vibrate for notifications"
          checked={settings.soundAndVibration.vibration}
          onChange={(checked) =>
            handleSettingChange("soundAndVibration", "vibration", checked)
          }
        />

        <ToggleOption
          title="Quiet Hours"
          description="Disable notifications during specified hours"
          checked={settings.soundAndVibration.quietHours}
          onChange={(checked) =>
            handleSettingChange("soundAndVibration", "quietHours", checked)
          }
        />

        {settings.soundAndVibration.quietHours && (
          <div className="ml-8 flex gap-4">
            <TimeInput
              label="From"
              value={settings.soundAndVibration.quietStart}
              onChange={(value) =>
                handleSettingChange("soundAndVibration", "quietStart", value)
              }
            />
            <TimeInput
              label="To"
              value={settings.soundAndVibration.quietEnd}
              onChange={(value) =>
                handleSettingChange("soundAndVibration", "quietEnd", value)
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}
