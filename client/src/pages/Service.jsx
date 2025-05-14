import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BadgeCheck } from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";
import { Link } from "react-router-dom";

const learningServices = [
    {
    id: 1,
      title: "Interactive Courses",
    description: "Explore our comprehensive collection of courses designed to enhance your skills. Learn at your own pace with expert-led instruction and hands-on projects.",
    icon: "📚",
    link: "/course/search?query",
    category: "learning"
  },
  {
    id: 2,
      title: "Skill Assessment Quizzes",
    description: "Test your knowledge and track your progress with our adaptive quizzes. Get instant feedback and personalized recommendations for improvement.",
    icon: "📝",
    link: "https://quiz-app-v2-shyam.netlify.app/",
    category: "assessment"
  },
  {
    id: 3,
      title: "Professional Certification",
    description: "Earn industry-recognized certifications to validate your expertise. Stand out in your field with credentials that matter to employers.",
    icon: "🏆",
      link: "/certification",
    category: "certification"
    },
    {
    id: 4,
      title: "Industry Insights Blog",
    description: "Stay updated with the latest trends, best practices, and expert insights through our curated blog posts and articles.",
    icon: "📰",
    link: "https://atomic-blog-shyam-pandey.netlify.app/",
    category: "blog"
  },
  {
    id: 5,
      title: "Prepare and Review for Daily Tasks",
    description: "Stay updated with the latest trends, best practices, and expert insights through your curated To Do List and articles.",
    icon: "✅",
    link: "https://study-journey-trip.netlify.app/",
    category: "tasks"
  }
];

const collegeServices = [
  {
    id: 6,
    title: "Student E-Notice Board",
    description: "Access all important college notices, circulars, and announcements in one place",
    icon: "📢",
    link: "https://www.nitm.ac.in/students_notice",
    category: "notices"
  },
  {
    id: 7,
    title: "Academic Calendar",
    description: "View important dates, holidays, and academic schedules",
    icon: "📅",
    link: "https://www.nitm.ac.in/p/academic-calendar",
    category: "academics"
  },
  {
    id: 8,
    title: "Student Portal",
    description: "Access your academic records, attendance, and course materials",
    icon: "🎓",
    link: "https://www.nitm.ac.in/student-portal",
    category: "academics"
  },
  {
    id: 9,
    title: "Hostel Management",
    description: "View hostel rules, forms, and important notices",
    icon: "🏠",
    link: "/services/hostel-management",
    category: "facilities"
  },
  {
    id: 10,
    title: "Scholarships",
    description: "Information about various scholarships and financial aid",
    icon: "💰",
    link: "https://www.nitm.ac.in/p/scholarships",
    category: "financial"
  },
  {
    id: 11,
    title: "Placement Cell",
    description: "Career opportunities, training programs, and placement updates",
    icon: "💼",
    link: "https://nitm.ac.in/Career/",
    category: "career"
  },
  {
    id: 12,
    title: "Library Resources",
    description: "Access digital library, e-books, and research materials",
    icon: "📚",
    link: "https://www.nitm.ac.in/central-library",
    category: "academics"
  },
  {
    id: 13,
    title: "Student Activity Center",
    description: "Information about clubs, events, and extracurricular activities",
    icon: "🎭",
    link: "https://www.nitm.ac.in/students-activity-center",
    category: "activities"
  }
];

const mentorshipService = {
  id: 100,
  title: "Mentorship & Branch-Oriented Learning",
  description: "Get mentored by seniors & alumni. Explore branch-wise learning paths, placement kits, and direct guidance.",
  icon: "🧭",
  link: "/services/mentorship",
  highlight: true
};

const groupDiscussionService = {
  id: 14,
  title: "Group Discussion",
  description: "Go and join the group discussion to improve your education and communication skills",
  icon: "👥",
  link: "/group-discussion",
  category: "activities"
};
const trustedHelperService = {
  id: 100,
  title: "Campus Connect",
  description: "Connect with verified seniors, faculty, and security staff based on your state or country. Get help with room issues, transport, shopping, and more.",
  icon: "🛟",
  link: "/campus-connect-start",
  highlight: true
};

const campusContentHubService = {
  id: 101,
  title: "Campus Content Hub",
  description: "Share and access study materials, notes, and resources across campus. A modern DC++-like platform for academic collaboration.",
  icon: "📁",
  link: "/services/campus-content-hub",
  highlight: true
};

const libraryService = {
  id: 101,
  title: "Library Services",
  description: "Explore our library services, including book recommendations, borrowing, and research assistance.",
  icon: "📁",
  link: "/library",
  highlight: true
};

const industryandinstituteCollaboration = {
  id: 101,
  title: "Industry and Institute Collaboration",
  description: "Collaborate with industry experts and institutes to enhance your skills and knowledge.",
  icon: "🤝",
  link: "https://681f596f9490e10439bf1b22--heartfelt-kleicha-ddf319.netlify.app/",
  highlight: true
};

const lostFoundService = {
  id: 102,
  title: "Lost & Found Portal",
  description: "Report lost items or found belongings on campus. Connect with the community to recover your items or help others.",
  icon: "🔍",
  link: "/lost-items",
  highlight: true
};

const busService = {
  id: 103,
  title: "Bus Service",
  description: "Get information about the bus service on campus.",
  icon: "🚌",
  link: "https://6820ba5f94ae5eb61eef6016--heartfelt-genie-b1cc19.netlify.app/",
  highlight: true
};
const sosService = {
  id: 103,
  title: "Emergency SOS",
  description: "Get immediate help in emergency situations. Send distress signals with your location to emergency responders.",
  icon: "🚨",
  link: "/emergency",
  highlight: true
};

const Service = () => {
  const { theme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141414] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Our Services
          </h1>
          <p className="text-lg text-muted-foreground">
            Access all learning resources and college services in one place
          </p>
        </motion.div>

        {/* Highlighted Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* SOS Card */}
          <Link to={sosService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{sosService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{sosService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-red-400 to-pink-500 text-white text-xs px-2 py-1 rounded-full ml-2">Emergency</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {sosService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Lost & Found Card */}
          <Link to={lostFoundService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{lostFoundService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{lostFoundService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">New</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {lostFoundService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Bus Service Card */}
          <Link to={busService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{busService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{busService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">New</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {busService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Mentorship Card */}
          <Link to={mentorshipService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{mentorshipService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{mentorshipService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs px-2 py-1 rounded-full ml-2">New</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {mentorshipService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Campus Content Hub Card */}
          <Link to={campusContentHubService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{campusContentHubService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{campusContentHubService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs px-2 py-1 rounded-full ml-2">Featured</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {campusContentHubService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Trusted Helper Directory Card */}
          <Link to={trustedHelperService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{trustedHelperService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{trustedHelperService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs px-2 py-1 rounded-full ml-2">Featured</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {trustedHelperService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Library Services Card */}
          <Link to={libraryService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{libraryService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{libraryService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs px-2 py-1 rounded-full ml-2">Featured</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {libraryService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Industry and Institute Collaboration Card */}
          <Link to={industryandinstituteCollaboration.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{industryandinstituteCollaboration.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{industryandinstituteCollaboration.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs px-2 py-1 rounded-full ml-2">Featured</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {industryandinstituteCollaboration.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>

          {/* Group Discussion Card */}
          <Link to={groupDiscussionService.link}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="h-full"
            >
              <Card className="relative h-full border-2 border-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-1 rounded-2xl shadow-xl hover:scale-[1.02] transition-transform">
                <div className="bg-white dark:bg-[#141414] rounded-xl p-6 flex flex-col h-full">
                  <div className="flex items-center gap-6 mb-4">
                    <span className="text-5xl">{groupDiscussionService.icon}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle className="text-2xl">{groupDiscussionService.title}</CardTitle>
                        <BadgeCheck className="text-green-500" />
                        <span className="bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-xs px-2 py-1 rounded-full ml-2">Featured</span>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="text-base text-muted-foreground flex-grow">
                    {groupDiscussionService.description}
                  </CardDescription>
                </div>
              </Card>
            </motion.div>
          </Link>
        </div>

        {/* Learning Resources Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
              Learning Resources
            </h2>
            <p className="text-muted-foreground">
              Enhance your skills with our comprehensive learning tools
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: service.id * 0.1 }}
              >
                <Card className={`h-full hover:shadow-lg transition-all duration-300 ${
                  theme === "dark" ? "bg-[#020817] border-gray-800" : "bg-white border-gray-200"
                }`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{service.icon}</span>
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {service.link.startsWith('http') ? (
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(service.link, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Access Service
                      </Button>
                    ) : (
                      <Link to={service.link}>
                        <Button
                          variant="outline"
                          className="w-full"
                        >
                          Access Service
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* College Services Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h2 className="text-3xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              College Services
                  </h2>
            <p className="text-muted-foreground">
              Access important college resources and information
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collegeServices.map((service) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: service.id * 0.1 }}
              >
                <Card className={`h-full hover:shadow-lg transition-all duration-300 ${
                  theme === "dark" ? "bg-[#020817] border-gray-800" : "bg-white border-gray-200"
                }`}>
                  <CardHeader>
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{service.icon}</span>
                      <div>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription>{service.description}</CardDescription>
                </div>
              </div>
                  </CardHeader>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.open(service.link, '_blank')}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Access Service
                    </Button>
                  </CardContent>
                </Card>
            </motion.div>
          ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
