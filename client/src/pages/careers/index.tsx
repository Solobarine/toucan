import { useState } from "react";
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  Heart,
  Zap,
  Globe,
  Coffee,
  Laptop,
  GraduationCap,
  DollarSign,
  Calendar,
  ChevronRight,
  ExternalLink,
  LucideIcon,
} from "lucide-react";

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "full-time" | "part-time" | "contract" | "internship";
  experience: "entry" | "mid" | "senior";
  description: string;
  requirements: string[];
  posted: string;
}

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface TeamValue {
  title: string;
  description: string;
  icon: LucideIcon;
}

export default function CareersPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
  const [selectedLocation, setSelectedLocation] = useState<string>("all");

  const jobListings: JobListing[] = [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "full-time",
      experience: "senior",
      description:
        "Join our frontend team to build beautiful, responsive user interfaces that millions of users interact with daily. You'll work with React, TypeScript, and modern web technologies.",
      requirements: [
        "5+ years of frontend development experience",
        "Expert knowledge of React, TypeScript, and modern JavaScript",
        "Experience with state management libraries (Redux, Zustand)",
        "Strong understanding of web performance optimization",
        "Experience with testing frameworks (Jest, Cypress)",
      ],
      posted: "2024-01-15",
    },
    {
      id: "2",
      title: "Product Designer",
      department: "Design",
      location: "Remote",
      type: "full-time",
      experience: "mid",
      description:
        "Shape the future of social interaction by designing intuitive, accessible, and delightful user experiences. You'll work closely with product and engineering teams.",
      requirements: [
        "3+ years of product design experience",
        "Proficiency in Figma and design systems",
        "Strong portfolio showcasing UX/UI design skills",
        "Experience with user research and usability testing",
        "Understanding of accessibility principles",
      ],
      posted: "2024-01-12",
    },
    {
      id: "3",
      title: "Backend Engineer",
      department: "Engineering",
      location: "New York, NY",
      type: "full-time",
      experience: "mid",
      description:
        "Build scalable, reliable backend systems that power our social platform. Work with microservices, databases, and cloud infrastructure.",
      requirements: [
        "3+ years of backend development experience",
        "Strong knowledge of Node.js, Python, or Go",
        "Experience with databases (PostgreSQL, Redis)",
        "Knowledge of cloud platforms (AWS, GCP)",
        "Understanding of microservices architecture",
      ],
      posted: "2024-01-10",
    },
    {
      id: "4",
      title: "Marketing Manager",
      department: "Marketing",
      location: "Los Angeles, CA",
      type: "full-time",
      experience: "mid",
      description:
        "Lead marketing campaigns and strategies to grow our user base and increase engagement. You'll work across digital marketing, content, and partnerships.",
      requirements: [
        "4+ years of digital marketing experience",
        "Experience with social media marketing",
        "Strong analytical skills and data-driven approach",
        "Content creation and campaign management experience",
        "Knowledge of marketing automation tools",
      ],
      posted: "2024-01-08",
    },
    {
      id: "5",
      title: "Data Scientist",
      department: "Data",
      location: "Remote",
      type: "full-time",
      experience: "senior",
      description:
        "Use data to drive product decisions and improve user experience. Build machine learning models and analyze user behavior patterns.",
      requirements: [
        "5+ years of data science experience",
        "Strong knowledge of Python, R, and SQL",
        "Experience with machine learning frameworks",
        "Statistical analysis and A/B testing experience",
        "Experience with big data tools (Spark, Hadoop)",
      ],
      posted: "2024-01-05",
    },
    {
      id: "6",
      title: "Software Engineering Intern",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "internship",
      experience: "entry",
      description:
        "Join our engineering team for a summer internship. Work on real projects, learn from experienced engineers, and contribute to our platform.",
      requirements: [
        "Currently pursuing a degree in Computer Science or related field",
        "Knowledge of at least one programming language",
        "Strong problem-solving skills",
        "Eagerness to learn and grow",
        "Available for 12-week summer internship",
      ],
      posted: "2024-01-03",
    },
  ];

  const benefits: Benefit[] = [
    {
      title: "Competitive Salary",
      description:
        "Industry-leading compensation with equity options for all employees",
      icon: DollarSign,
    },
    {
      title: "Health & Wellness",
      description:
        "Comprehensive health, dental, and vision insurance plus wellness stipend",
      icon: Heart,
    },
    {
      title: "Flexible Work",
      description: "Remote-first culture with flexible hours and unlimited PTO",
      icon: Laptop,
    },
    {
      title: "Learning & Growth",
      description:
        "Annual learning budget and conference attendance opportunities",
      icon: GraduationCap,
    },
    {
      title: "Great Perks",
      description: "Free meals, gym membership, and team events",
      icon: Coffee,
    },
    {
      title: "Time Off",
      description: "Unlimited PTO and company-wide mental health days",
      icon: Calendar,
    },
  ];

  const teamValues: TeamValue[] = [
    {
      title: "Innovation First",
      description:
        "We're always pushing boundaries and exploring new possibilities in social technology.",
      icon: Zap,
    },
    {
      title: "Global Impact",
      description:
        "Our work connects people across the world and makes a meaningful difference in their lives.",
      icon: Globe,
    },
    {
      title: "Collaborative Spirit",
      description:
        "We believe the best ideas come from diverse teams working together towards common goals.",
      icon: Users,
    },
    {
      title: "User-Centric",
      description:
        "Every decision we make is guided by what's best for our users and their experience.",
      icon: Heart,
    },
  ];

  const departments = [
    { id: "all", label: "All Departments" },
    { id: "Engineering", label: "Engineering" },
    { id: "Design", label: "Design" },
    { id: "Marketing", label: "Marketing" },
    { id: "Data", label: "Data Science" },
    { id: "Sales", label: "Sales" },
    { id: "Operations", label: "Operations" },
  ];

  const locations = [
    { id: "all", label: "All Locations" },
    { id: "Remote", label: "Remote" },
    { id: "San Francisco, CA", label: "San Francisco" },
    { id: "New York, NY", label: "New York" },
    { id: "Los Angeles, CA", label: "Los Angeles" },
  ];

  const filteredJobs = jobListings.filter((job) => {
    const departmentMatch =
      selectedDepartment === "all" || job.department === selectedDepartment;
    const locationMatch =
      selectedLocation === "all" || job.location === selectedLocation;
    return departmentMatch && locationMatch;
  });

  const getExperienceColor = (experience: string) => {
    const colors = {
      entry:
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
      mid: "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      senior:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
    };
    return (
      colors[experience as keyof typeof colors] ||
      "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
    );
  };

  const getTypeColor = (type: string) => {
    const colors = {
      "full-time":
        "bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300",
      "part-time":
        "bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300",
      contract:
        "bg-purple-100 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300",
      internship:
        "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300",
    };
    return (
      colors[type as keyof typeof colors] ||
      "bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
    );
  };

  const handleApply = (jobId: string) => {
    console.log(`Applying for job: ${jobId}`);
    alert("Application form would open here");
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-neutral-900 dark:text-white mb-4">
            Join Our Team
          </h1>
          <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto">
            Help us build the future of social connection. We're looking for
            passionate, talented people who want to make a meaningful impact on
            how people connect and share online.
          </p>
        </div>

        {/* Company Values */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 text-center">
            Why Work With Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamValues.map((value, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 text-center"
              >
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                  {value.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-6 text-center">
            Benefits & Perks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                    <benefit.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Job Listings */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white mb-4 sm:mb-0">
              Open Positions
            </h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.label}
                  </option>
                ))}
              </select>

              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="px-3 py-2 border border-neutral-300 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-700 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                          job.type
                        )}`}
                      >
                        {job.type.charAt(0).toUpperCase() +
                          job.type.slice(1).replace("-", " ")}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getExperienceColor(
                          job.experience
                        )}`}
                      >
                        {job.experience.charAt(0).toUpperCase() +
                          job.experience.slice(1)}{" "}
                        Level
                      </span>
                      <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                        <MapPin className="w-4 h-4" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                        <Briefcase className="w-4 h-4" />
                        {job.department}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
                      {job.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 mb-4">
                      {job.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-medium text-neutral-900 dark:text-white mb-2">
                        Key Requirements:
                      </h4>
                      <ul className="space-y-1">
                        {job.requirements.slice(0, 3).map((req, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-400"
                          >
                            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                        {job.requirements.length > 3 && (
                          <li className="text-sm text-neutral-500 dark:text-neutral-500">
                            +{job.requirements.length - 3} more requirements
                          </li>
                        )}
                      </ul>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-neutral-500 dark:text-neutral-400">
                      <Clock className="w-4 h-4" />
                      Posted {new Date(job.posted).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="mt-6 lg:mt-0 lg:ml-6 flex flex-col gap-3">
                    <button
                      onClick={() => handleApply(job.id)}
                      className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium"
                    >
                      Apply Now
                    </button>
                    <button className="px-6 py-3 border border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg transition-colors font-medium flex items-center justify-center gap-2">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <Briefcase className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2">
                No positions found
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Try adjusting your filters or check back later for new
                opportunities.
              </p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/10 dark:to-blue-900/10 rounded-xl border border-purple-200 dark:border-purple-800 p-8 mt-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
              Don't See the Right Role?
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We're always looking for talented people. Send us your resume and
              we'll keep you in mind for future opportunities.
            </p>
            <button className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 mx-auto">
              Send Resume
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
