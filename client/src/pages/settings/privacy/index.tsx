import BannedUsers from "../../../components/settings/bannedUsers";

export default function PrivacyPage() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
          Privacy Settings
        </h3>
        <p className="text-neutral-600 dark:text-neutral-400">
          Control who can see your content and interact with you
        </p>
      </div>
      <BannedUsers />
    </div>
  );
}
