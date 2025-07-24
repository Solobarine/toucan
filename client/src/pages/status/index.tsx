import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Clock,
  Activity,
  Server,
  Database,
  Globe,
  Smartphone,
  MessageSquare,
  ImageIcon,
  Search,
  Bell,
  LucideIcon,
} from "lucide-react";

interface ServiceStatus {
  id: string;
  name: string;
  status: "operational" | "degraded" | "partial" | "major" | "maintenance";
  description: string;
  icon: LucideIcon;
  uptime: number;
  responseTime: number;
}

interface Incident {
  id: string;
  title: string;
  status: "investigating" | "identified" | "monitoring" | "resolved";
  severity: "minor" | "major" | "critical";
  description: string;
  updates: IncidentUpdate[];
  startTime: string;
  resolvedTime?: string;
  affectedServices: string[];
}

interface IncidentUpdate {
  id: string;
  timestamp: string;
  status: string;
  message: string;
}

interface MaintenanceWindow {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  affectedServices: string[];
  status: "scheduled" | "in-progress" | "completed";
}

export default function PlatformStatus() {
  const services: ServiceStatus[] = [
    {
      id: "api",
      name: "API",
      status: "operational",
      description: "Core API services",
      icon: Server,
      uptime: 99.98,
      responseTime: 145,
    },
    {
      id: "web-app",
      name: "Web Application",
      status: "operational",
      description: "Main web platform",
      icon: Globe,
      uptime: 99.95,
      responseTime: 230,
    },
    {
      id: "mobile-app",
      name: "Mobile Apps",
      status: "operational",
      description: "iOS and Android applications",
      icon: Smartphone,
      uptime: 99.92,
      responseTime: 180,
    },
    {
      id: "database",
      name: "Database",
      status: "operational",
      description: "Primary database cluster",
      icon: Database,
      uptime: 99.99,
      responseTime: 12,
    },
    {
      id: "messaging",
      name: "Messaging",
      status: "degraded",
      description: "Direct messages and chat",
      icon: MessageSquare,
      uptime: 98.5,
      responseTime: 450,
    },
    {
      id: "notifications",
      name: "Notifications",
      status: "operational",
      description: "Push and email notifications",
      icon: Bell,
      uptime: 99.87,
      responseTime: 95,
    },
    {
      id: "media",
      name: "Media Upload",
      status: "operational",
      description: "Image and video processing",
      icon: ImageIcon,
      uptime: 99.91,
      responseTime: 320,
    },
    {
      id: "search",
      name: "Search",
      status: "operational",
      description: "Content search and discovery",
      icon: Search,
      uptime: 99.94,
      responseTime: 180,
    },
  ];

  const incidents: Incident[] = [
    {
      id: "1",
      title: "Increased Response Times for Messaging Service",
      status: "monitoring",
      severity: "minor",
      description:
        "We are experiencing increased response times for our messaging service affecting message delivery.",
      startTime: "2024-01-15T14:30:00Z",
      affectedServices: ["messaging"],
      updates: [
        {
          id: "1",
          timestamp: "2024-01-15T15:45:00Z",
          status: "monitoring",
          message:
            "We have implemented a fix and are monitoring the service. Response times are improving.",
        },
        {
          id: "2",
          timestamp: "2024-01-15T14:45:00Z",
          status: "identified",
          message:
            "We have identified the root cause as increased database load and are working on a solution.",
        },
        {
          id: "3",
          timestamp: "2024-01-15T14:30:00Z",
          status: "investigating",
          message:
            "We are investigating reports of slow message delivery times.",
        },
      ],
    },
    {
      id: "2",
      title: "Brief API Outage",
      status: "resolved",
      severity: "major",
      description:
        "Our API experienced a brief outage affecting all services for approximately 15 minutes.",
      startTime: "2024-01-14T09:15:00Z",
      resolvedTime: "2024-01-14T09:30:00Z",
      affectedServices: ["api", "web-app", "mobile-app"],
      updates: [
        {
          id: "1",
          timestamp: "2024-01-14T09:30:00Z",
          status: "resolved",
          message:
            "All services have been restored and are operating normally.",
        },
        {
          id: "2",
          timestamp: "2024-01-14T09:20:00Z",
          status: "identified",
          message:
            "Issue identified as a configuration error. Rolling back changes now.",
        },
        {
          id: "3",
          timestamp: "2024-01-14T09:15:00Z",
          status: "investigating",
          message: "We are investigating reports of API connectivity issues.",
        },
      ],
    },
  ];

  const maintenanceWindows: MaintenanceWindow[] = [
    {
      id: "1",
      title: "Database Performance Optimization",
      description:
        "Scheduled maintenance to optimize database performance and apply security updates.",
      startTime: "2024-01-20T02:00:00Z",
      endTime: "2024-01-20T04:00:00Z",
      affectedServices: ["database", "api"],
      status: "scheduled",
    },
    {
      id: "2",
      title: "CDN Infrastructure Upgrade",
      description:
        "Upgrading our content delivery network for improved global performance.",
      startTime: "2024-01-18T01:00:00Z",
      endTime: "2024-01-18T03:00:00Z",
      affectedServices: ["web-app", "media"],
      status: "completed",
    },
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      operational:
        "text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/20",
      degraded:
        "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20",
      partial:
        "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20",
      major: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20",
      maintenance:
        "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/20",
    };
    return colors[status as keyof typeof colors] || colors.operational;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return CheckCircle;
      case "degraded":
      case "partial":
        return AlertTriangle;
      case "major":
        return XCircle;
      case "maintenance":
        return Clock;
      default:
        return CheckCircle;
    }
  };

  const getIncidentSeverityColor = (severity: string) => {
    const colors = {
      minor:
        "text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/20",
      major:
        "text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/20",
      critical: "text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/20",
    };
    return colors[severity as keyof typeof colors] || colors.minor;
  };

  const overallStatus = services.every(
    (service) => service.status === "operational"
  )
    ? "operational"
    : services.some((service) => service.status === "major")
    ? "major"
    : "degraded";

  const averageUptime =
    services.reduce((acc, service) => acc + service.uptime, 0) /
    services.length;

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Platform Status
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400">
            Real-time status and performance metrics for all our services
          </p>
        </div>

        {/* Overall Status */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {(() => {
                const StatusIcon = getStatusIcon(overallStatus);
                return (
                  <div
                    className={`p-3 rounded-lg ${getStatusColor(
                      overallStatus
                    )}`}
                  >
                    <StatusIcon className="w-8 h-8" />
                  </div>
                );
              })()}
              <div>
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                  {overallStatus === "operational"
                    ? "All Systems Operational"
                    : "Some Systems Affected"}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400">
                  {overallStatus === "operational"
                    ? "All services are running smoothly"
                    : "Some services are experiencing issues"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-neutral-900 dark:text-white">
                {averageUptime.toFixed(2)}%
              </div>
              <div className="text-sm text-neutral-500 dark:text-neutral-400">
                Average Uptime
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Activity className="w-5 h-5 text-green-500" />
                <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {services.filter((s) => s.status === "operational").length}
                </span>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Services Operational
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                  {incidents.filter((i) => i.status !== "resolved").length}
                </span>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Active Incidents
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-5 h-5 text-blue-500" />
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {
                    maintenanceWindows.filter((m) => m.status === "scheduled")
                      .length
                  }
                </span>
              </div>
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                Scheduled Maintenance
              </div>
            </div>
          </div>
        </div>

        {/* Services Status */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Service Status
          </h2>
          <div className="space-y-4">
            {services.map((service) => {
              const StatusIcon = getStatusIcon(service.status);
              return (
                <div
                  key={service.id}
                  className="flex items-center justify-between p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-neutral-100 dark:bg-neutral-700 rounded-lg">
                      <service.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-white">
                        {service.name}
                      </h3>
                      <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        {service.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-medium text-neutral-900 dark:text-white">
                        {service.uptime}% uptime
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {service.responseTime}ms avg response
                      </div>
                    </div>
                    <div
                      className={`flex items-center gap-2 px-3 py-1 rounded-full ${getStatusColor(
                        service.status
                      )}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-medium capitalize">
                        {service.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Incidents */}
        {incidents.filter((i) => i.status !== "resolved").length > 0 && (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
              Active Incidents
            </h2>
            <div className="space-y-6">
              {incidents
                .filter((incident) => incident.status !== "resolved")
                .map((incident) => (
                  <div
                    key={incident.id}
                    className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getIncidentSeverityColor(
                              incident.severity
                            )}`}
                          >
                            {incident.severity.toUpperCase()}
                          </span>
                          <span className="text-sm text-neutral-500 dark:text-neutral-400">
                            {new Date(incident.startTime).toLocaleString()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                          {incident.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400">
                          {incident.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {incident.updates.map((update) => (
                        <div key={update.id} className="flex gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium text-neutral-900 dark:text-white capitalize">
                                {update.status}
                              </span>
                              <span className="text-xs text-neutral-500 dark:text-neutral-400">
                                {new Date(update.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                              {update.message}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Scheduled Maintenance */}
        {maintenanceWindows.filter((m) => m.status !== "completed").length >
          0 && (
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
              Scheduled Maintenance
            </h2>
            <div className="space-y-4">
              {maintenanceWindows
                .filter((maintenance) => maintenance.status !== "completed")
                .map((maintenance) => (
                  <div
                    key={maintenance.id}
                    className="border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/10 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              maintenance.status === "scheduled"
                                ? "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300"
                                : "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300"
                            }`}
                          >
                            {maintenance.status.toUpperCase()}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                          {maintenance.title}
                        </h3>
                        <p className="text-neutral-600 dark:text-neutral-400 mb-3">
                          {maintenance.description}
                        </p>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">
                          <div className="flex items-center gap-4">
                            <span>
                              Start:{" "}
                              {new Date(maintenance.startTime).toLocaleString()}
                            </span>
                            <span>
                              End:{" "}
                              {new Date(maintenance.endTime).toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Recent Incidents */}
        <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-8 mb-8">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
            Recent Incidents
          </h2>
          <div className="space-y-4">
            {incidents.map((incident) => (
              <div
                key={incident.id}
                className="border border-neutral-200 dark:border-neutral-700 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getIncidentSeverityColor(
                          incident.severity
                        )}`}
                      >
                        {incident.severity.toUpperCase()}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          incident.status === "resolved"
                            ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300"
                            : "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300"
                        }`}
                      >
                        {incident.status.toUpperCase()}
                      </span>
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {new Date(incident.startTime).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-medium text-neutral-900 dark:text-white">
                      {incident.title}
                    </h3>
                  </div>
                  {incident.status === "resolved" && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribe to Updates */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl border border-purple-200 dark:border-purple-800 p-8">
          <div className="text-center">
            <Bell className="w-12 h-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              Subscribe to status updates and get notified about incidents and
              maintenance windows.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
