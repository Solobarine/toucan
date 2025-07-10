import {
  MessageCircle,
  MoreHorizontal,
  TriangleAlert,
  UserCheck,
  UserPlus,
  Users,
} from "lucide-react";
import { User } from "../../types/auth";
import { capitalizeText } from "../../utils";
import { NetworkCardLoader } from "./loaders";

interface Group {
  id: string;
  name: string;
  description: string;
  image: string;
  members: number;
  category: string;
  isJoined: boolean;
  privacy: "public" | "private";
  recentActivity: string;
}

const GroupCard = ({ group }: { group: Group }) => (
  <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200">
    <div className="flex items-start gap-4">
      <img
        src={group.image || "/placeholder.svg"}
        alt={group.name}
        className="w-16 h-16 rounded-xl object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-stone-900 dark:text-stone-100">
            {group.name}
          </h3>
          <span className="px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 text-xs rounded-full">
            {group.privacy}
          </span>
        </div>
        <p className="text-stone-600 dark:text-stone-400 text-sm mb-2">
          {group.category}
        </p>
        <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
          {group.description}
        </p>

        <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-4">
          <span>{group.members.toLocaleString()} members</span>
          <span>Active {group.recentActivity}</span>
        </div>

        <div className="flex items-center gap-2">
          {group.isJoined ? (
            <>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200">
                Joined
              </button>
              <button className="px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200">
                View Group
              </button>
            </>
          ) : (
            <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200">
              Join Group
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

const UserCard = ({ user, category }: { user: User; category: string }) => (
  <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-200">
    <div className="flex items-start gap-4">
      <img
        src={"/placeholder.svg"}
        alt={user.first_name + " " + user?.last_name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate">
            {user?.first_name + " " + capitalizeText(user?.last_name)}
          </h3>
          {user.first_name && (
            <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">✓</span>
            </div>
          )}
        </div>
        <p className="text-stone-600 dark:text-stone-400 mb-2">
          @{user.username}
        </p>
        <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
          {user.bio}
        </p>

        <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-4">
          <span>200 followers</span>
          <span>7 following</span>
          <span>15 mutual friends</span>
        </div>

        <div className="flex items-center gap-2">
          {category === "friends" ? (
            <>
              <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200">
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
              <button className="p-2 rounded-lg text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors duration-200">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </>
          ) : category === "following" ? (
            <button className="flex items-center gap-2 px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200">
              <UserCheck className="w-4 h-4" />
              Following
            </button>
          ) : (
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-200">
              <UserPlus className="w-4 h-4" />
              Follow Back
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
);

function Content({
  category,
  data,
  loading,
  error,
  searchQuery,
}: {
  category: string;
  data: any[];
  loading: boolean;
  error: string;
  searchQuery: string;
}) {
  if (loading) {
    return <NetworkCardLoader />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-red-100 dark:bg-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <TriangleAlert className="w-8 h-8 text-red-500 dark:text-red-300" />
        </div>
        <h3 className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">
          Error loading {category}
        </h3>
        <p className="text-stone-600 dark:text-stone-400">
          {error || "Something went wrong. Please try again later."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.length > 0 ? (
        data.map((item) =>
          category === "groups" ? (
            <GroupCard key={item.id} group={item} />
          ) : (
            <UserCard key={item.id} user={item} category={category} />
          )
        )
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Users className="w-8 h-8 text-stone-400 dark:text-stone-500" />
          </div>
          <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            No {category} found
          </h3>
          <p className="text-stone-600 dark:text-stone-400">
            {searchQuery
              ? "Try adjusting your search terms."
              : `You don't have any ${category} yet.`}
          </p>
        </div>
      )}
    </div>
  );
}

export default Content;
