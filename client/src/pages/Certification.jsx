import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Certification = () => {
  const { theme } = useTheme();
  
  const certifications = [
    {
      id: 1,
      title: "Web Development",
      description: "Master HTML, CSS, JavaScript, and modern frameworks to build responsive websites.",
      level: "Beginner to Advanced",
      duration: "3-6 months",
      icon: "🌐",
      quizLink: "/test-quiz/javascript",
      passingScore: 90
    },
    {
      id: 2,
      title: "Data Science",
      description: "Learn Python, statistics, machine learning, and data visualization techniques.",
      level: "Intermediate",
      duration: "4-8 months",
      icon: "📊",
      quizLink: "/test-quiz/python",
      passingScore: 90
    },
    {
      id: 3,
      title: "Cloud Computing",
      description: "Gain expertise in AWS, Azure, and Google Cloud platforms and services.",
      level: "Intermediate",
      duration: "3-6 months",
      icon: "☁️",
      quizLink: "/test-quiz/cloud",
      passingScore: 90
    },
    {
      id: 4,
      title: "Mobile App Development",
      description: "Build native and cross-platform mobile applications using React Native and Flutter.",
      level: "Intermediate",
      duration: "4-7 months",
      icon: "📱",
      quizLink: "/test-quiz/react-native",
      passingScore: 90
    },
    {
      id: 5,
      title: "Cybersecurity",
      description: "Learn ethical hacking, network security, and threat detection techniques.",
      level: "Advanced",
      duration: "6-12 months",
      icon: "🔒",
      quizLink: "/test-quiz/cybersecurity",
      passingScore: 90
    },
    {
      id: 6,
      title: "UI/UX Design",
      description: "Master design principles, prototyping, and user experience research.",
      level: "Beginner to Advanced",
      duration: "3-6 months",
      icon: "🎨",
      quizLink: "/test-quiz/ui-ux",
      passingScore: 90
    },
    {
      id: 7,
      title: "DevOps",
      description: "Learn CI/CD, containerization, and infrastructure as code practices.",
      level: "Intermediate",
      duration: "4-8 months",
      icon: "🔄",
      quizLink: "/test-quiz/devops",
      passingScore: 90
    },
    {
      id: 8,
      title: "Blockchain Development",
      description: "Understand smart contracts, DApps, and blockchain architecture.",
      level: "Advanced",
      duration: "5-9 months",
      icon: "⛓️",
      quizLink: "/test-quiz/blockchain",
      passingScore: 90
    },
    {
      id: 9,
      title: "Artificial Intelligence",
      description: "Deep dive into machine learning, neural networks, and AI applications.",
      level: "Advanced",
      duration: "6-12 months",
      icon: "🤖",
      quizLink: "/test-quiz/ai",
      passingScore: 90
    },
    {
      id: 10,
      title: "Database Management",
      description: "Master SQL, NoSQL, and database optimization techniques.",
      level: "Intermediate",
      duration: "3-6 months",
      icon: "🗄️",
      quizLink: "/test-quiz/sql",
      passingScore: 90
    },
    {
      id: 11,
      title: "Game Development",
      description: "Learn Unity, Unreal Engine, and game design principles.",
      level: "Intermediate",
      duration: "4-8 months",
      icon: "🎮",
      quizLink: "/test-quiz/game-dev",
      passingScore: 90
    },
    {
      id: 12,
      title: "Digital Marketing",
      description: "Master SEO, social media marketing, and content strategy.",
      level: "Beginner to Advanced",
      duration: "3-6 months",
      icon: "📈",
      quizLink: "/test-quiz/digital-marketing",
      passingScore: 90
    }
  ];

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            Professional Certifications
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose from our wide range of industry-recognized certifications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: cert.id * 0.1 }}
              className={cn(
                "relative overflow-hidden rounded-xl p-6",
                theme === 'dark' ? 'bg-[#020817]' : 'bg-white',
                'border',
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
                'transition-all duration-300',
                'hover:shadow-lg',
                theme === 'dark' ? 'hover:shadow-blue-500/10' : 'hover:shadow-gray-200'
              )}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{cert.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{cert.title}</h3>
                    <p className="text-muted-foreground mb-4">{cert.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {cert.level}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {cert.duration}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-auto">
                  <Link
                    to={cert.quizLink}
                    className={cn(
                      "w-full inline-flex items-center justify-center",
                      "px-6 py-2 rounded-lg",
                      "bg-blue-500 text-white",
                      "hover:bg-blue-600",
                      "transition-colors duration-300",
                      "font-medium"
                    )}
                  >
                    Take Certification Test
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2 text-center">
                    Passing Score: {cert.passingScore}%
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certification; 