import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, Search, Shield, UserMinus2, UserX } from "lucide-react";
import { AppDispatch, RootState } from "../../features/store";
import { getBannedUsers, unbanUser } from "../../features/thunks/user.ts";
import LargeAvatar from "../../components/avatar/large/index.tsx";
import { User } from "../../types/auth.ts";

const BannedUsers = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { blockedUsers } = useSelector((state: RootState) => state.users);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUnblocking, setIsUnblocking] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const filteredUsers = blockedUsers.data.filter(
    (user) =>
      `${user.first_name} ${user.last_name}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUnblockUser = async (user: User) => {
    setIsUnblocking(true);
    dispatch(unbanUser(user.id));
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSelectedUser(null);
    setShowConfirmDialog(false);
    setIsUnblocking(false);
  };

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getBannedUsers());
  }, [dispatch, user]);

  console.log(blockedUsers);

  return (
    <div className="rounded-xl">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-2">
          <UserMinus2 className="w-5 h-5 text-purple-600" />
          <h4 className="text-lg font-medium text-neutral-900 dark:text-white">
            Manage Blocked Users
          </h4>
        </div>

        {/* Search */}
        <div className="mb-6 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search blocked users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-200 dark:border-neutral-700 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
            />
          </div>
        </div>

        {/* Blocked Users List */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 overflow-hidden">
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-neutral-700 dark:text-neutral-300" />
              <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                Blocked Users ({filteredUsers.length})
              </h2>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">
              These users cannot see your profile, send you messages, or
              interact with your content.
            </p>
          </div>
          <div className="p-4">
            {filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <UserX className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                  {searchQuery ? "No users found" : "No blocked users"}
                </h3>
                <p className="text-neutral-500 dark:text-neutral-400">
                  {searchQuery
                    ? "Try adjusting your search terms"
                    : "You haven't blocked any users yet"}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <LargeAvatar
                        avatar={user.avatar}
                        first_name={user.first_name}
                        last_name={user.last_name}
                      />
                      <div>
                        <h3 className="font-medium text-neutral-900 dark:text-white">
                          {user.first_name} {user.last_name}
                        </h3>
                        <p className="text-sm text-neutral-500 dark:text-neutral-400">
                          @{user.username}
                        </p>
                        <p className="text-xs text-neutral-400 dark:text-neutral-500">
                          {/**Blocked on {new Date(user.blockedAt).toLocaleDateString()**/}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedUser(user);
                        setShowConfirmDialog(true);
                      }}
                      className="px-4 py-1.5 text-sm text-purple-600 border border-purple-600 hover:bg-purple-50 dark:text-purple-400 dark:border-purple-400 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Unblock Confirmation Dialog */}
        {showConfirmDialog && selectedUser && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-xl max-w-md w-full animate-in fade-in zoom-in duration-200">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    Unblock User
                  </h3>
                </div>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  Are you sure you want to unblock{" "}
                  <span className="font-medium">
                    {selectedUser.first_name} {selectedUser.last_name}
                  </span>
                  ? They will be able to see your profile and interact with your
                  content again.
                </p>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    disabled={isUnblocking}
                    className="px-4 py-2 text-neutral-700 dark:text-neutral-300 border border-neutral-300 dark:border-neutral-600 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleUnblockUser(selectedUser)}
                    disabled={isUnblocking}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
                  >
                    {isUnblocking ? "Unblocking..." : "Unblock User"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BannedUsers;
