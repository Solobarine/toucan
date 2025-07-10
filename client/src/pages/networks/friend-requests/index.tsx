import { useState } from "react";
import { UserPlus, Check, X, Clock, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface FriendRequest {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  mutualFriends: number;
  requestDate: string;
  verified?: boolean;
  location?: string;
}

const FriendRequestsPage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const type = searchParams.get("type");
  const navigate = useNavigate();

  const [requests, setRequests] = useState<FriendRequest[]>([
    {
      id: "1",
      name: "Jessica Martinez",
      username: "jessicam",
      avatar:
        "https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Product designer passionate about user experience and accessibility",
      mutualFriends: 12,
      requestDate: "2 days ago",
      location: "San Francisco, CA",
    },
    {
      id: "2",
      name: "David Kim",
      username: "davidk_dev",
      avatar:
        "https://images.pexels.com/photos/3778876/pexels-photo-3778876.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Backend developer specializing in microservices and cloud architecture",
      mutualFriends: 8,
      requestDate: "1 week ago",
      verified: true,
      location: "Seattle, WA",
    },
    {
      id: "3",
      name: "Rachel Thompson",
      username: "rachelt",
      avatar:
        "https://images.pexels.com/photos/3763152/pexels-photo-3763152.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Content strategist and digital marketing expert",
      mutualFriends: 25,
      requestDate: "3 days ago",
      location: "Austin, TX",
    },
    {
      id: "4",
      name: "Tom Wilson",
      username: "tomw_photo",
      avatar:
        "https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Photographer and visual storyteller capturing life's moments",
      mutualFriends: 5,
      requestDate: "5 days ago",
      location: "Portland, OR",
    },
  ]);

  const [sentRequests] = useState([
    {
      id: "1",
      name: "Lisa Chen",
      username: "lisac",
      avatar:
        "https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Frontend developer and React enthusiast",
      sentDate: "3 days ago",
      status: "pending",
    },
    {
      id: "2",
      name: "Mark Johnson",
      username: "markj",
      avatar:
        "https://images.pexels.com/photos/3779448/pexels-photo-3779448.jpeg?auto=compress&cs=tinysrgb&w=400",
      bio: "Data scientist and machine learning engineer",
      sentDate: "1 week ago",
      status: "pending",
    },
  ]);

  const acceptRequest = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
    // Here you would typically make an API call to accept the request
  };

  const declineRequest = (id: string) => {
    setRequests(requests.filter((req) => req.id !== id));
    // Here you would typically make an API call to decline the request
  };

  const RequestCard = ({ request }: { request: FriendRequest }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <img
          src={request.avatar}
          alt={request.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate">
              {request.name}
            </h3>
            {request.verified && (
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{request.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {request.bio}
          </p>

          <div className="flex items-center gap-4 text-stone-500 dark:text-stone-400 text-sm mb-4">
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {request.mutualFriends} mutual friends
            </span>
            {request.location && <span>{request.location}</span>}
          </div>

          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm mb-4">
            <Clock className="w-4 h-4" />
            <span>Sent {request.requestDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => acceptRequest(request.id)}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
            >
              <Check className="w-4 h-4" />
              Accept
            </button>
            <button
              onClick={() => declineRequest(request.id)}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
            >
              <X className="w-4 h-4" />
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const SentRequestCard = ({ request }: { request: any }) => (
    <div className="bg-white dark:bg-stone-800 rounded-xl p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
      <div className="flex items-start gap-4">
        <img
          src={request.avatar}
          alt={request.name}
          className="w-16 h-16 rounded-full object-cover"
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-bold text-stone-900 dark:text-stone-100 truncate">
              {request.name}
            </h3>
          </div>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            @{request.username}
          </p>
          <p className="text-stone-700 dark:text-stone-300 text-sm leading-relaxed mb-3">
            {request.bio}
          </p>

          <div className="flex items-center gap-2 text-stone-500 dark:text-stone-400 text-sm mb-4">
            <Clock className="w-4 h-4" />
            <span>Sent {request.sentDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 rounded-lg">
              <Clock className="w-4 h-4" />
              Pending
            </div>
            <button className="px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors duration-200">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Friend Requests
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Manage your pending friend requests
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center gap-2 bg-white dark:bg-stone-800 rounded-xl p-1 border border-stone-200 dark:border-stone-700 mb-6">
            <button
              onClick={() => navigate(`/network/friend-requests?type=received`)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                type === "received" || type !== "sent"
                  ? "bg-primary text-white shadow-lg"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              }`}
            >
              <span className="font-medium">Received</span>
              <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                {requests.length}
              </span>
            </button>
            <button
              onClick={() => navigate(`/network/friend-requests?type=sent`)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                type === "sent"
                  ? "bg-primary text-white shadow-lg"
                  : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700"
              }`}
            >
              <span className="font-medium">Sent</span>
              <span className="px-2 py-1 bg-white/20 text-xs rounded-full">
                {sentRequests.length}
              </span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <UserPlus className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {requests.length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Received
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {sentRequests.length}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Sent
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white dark:bg-stone-800 rounded-xl p-4 border border-stone-200 dark:border-stone-700">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {Math.round(
                      requests.reduce(
                        (sum, req) => sum + req.mutualFriends,
                        0
                      ) / requests.length
                    ) || 0}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400 text-sm">
                    Avg. Mutual
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {type === "received" ? (
            requests.length > 0 ? (
              requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="w-8 h-8 text-stone-400 dark:text-stone-500" />
                </div>
                <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  No friend requests
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  You're all caught up!
                </p>
              </div>
            )
          ) : sentRequests.length > 0 ? (
            sentRequests.map((request) => (
              <SentRequestCard key={request.id} request={request} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-stone-400 dark:text-stone-500" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
                No sent requests
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                Start connecting by sending friend requests!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FriendRequestsPage;
