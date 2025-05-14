import { Skeleton } from "@/components/ui/skeleton";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";
import Course from "./Course";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const courseCategories = [
  {
    id: 1,
    title: "Machine Learning",
    description: "Learn AI, deep learning, and neural networks",
    icon: "🤖",
    link: "/coursera-courses/machine-learning"
  },
  {
    id: 2,
    title: "Web Development",
    description: "Master frontend and backend development",
    icon: "🌐",
    link: "/coursera-courses/web-development"
  },
  {
    id: 3,
    title: "Data Science",
    description: "Data analysis, visualization, and statistics",
    icon: "📊",
    link: "/coursera-courses/data-science"
  },
  {
    id: 4,
    title: "Business & Management",
    description: "Business strategy and leadership skills",
    icon: "💼",
    link: "/coursera-courses/business"
  },
  {
    id: 5,
    title: "Cybersecurity",
    description: "Network security and ethical hacking",
    icon: "🔒",
    link: "/coursera-courses/cybersecurity"
  },
  {
    id: 6,
    title: "Cloud Computing",
    description: "AWS, Azure, and Google Cloud platforms",
    icon: "☁️",
    link: "/coursera-courses/cloud-computing"
  },
  {
    id: 7,
    title: "Digital Marketing",
    description: "SEO, social media, and content strategy",
    icon: "📈",
    link: "/coursera-courses/digital-marketing"
  },
  {
    id: 8,
    title: "Finance",
    description: "Financial markets and investment strategies",
    icon: "💰",
    link: "/coursera-courses/finance"
  },
  {
    id: 9,
    title: "Programming",
    description: "Python, Java, and other programming languages",
    icon: "💻",
    link: "/coursera-courses/programming"
  },
  {
    id: 10,
    title: "Personal Development",
    description: "Leadership, communication, and soft skills",
    icon: "🎯",
    link: "/coursera-courses/personal-development"
  }
];

const Courses = () => {
  const {data, isLoading, isError} = useGetPublishedCourseQuery();
 
  if(isError) return <h1>Some error occurred while fetching courses.</h1>

  return (
    <div className="bg-gray-50 dark:bg-[#141414]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Free Coursera Courses Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-bold text-3xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
              199 Best FREE  Courses with Certificates (2025)
            </h2>
            <p className="text-lg text-muted-foreground">
              Access high-quality courses from top universities and companies
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {courseCategories.map((category) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: category.id * 0.1 }}
              >
                <Link to={category.link}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{category.icon}</span>
                        <div>
                          <CardTitle>{category.title}</CardTitle>
                          <CardDescription>{category.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Button variant="outline" className="w-full">
                        Explore Courses
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Paid Courses Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="font-bold text-3xl mb-4">Our Premium Courses</h2>
          <p className="text-lg text-muted-foreground">
            Explore our exclusive course offerings
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <CourseSkeleton key={index} />
            ))
          ) : (
           data?.courses && data.courses.map((course, index) => <Course key={index} course={course}/>) 
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;

const CourseSkeleton = () => {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg overflow-hidden">
      <Skeleton className="w-full h-36" />
      <div className="px-5 py-4 space-y-3">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-4 w-1/4" />
      </div>
    </div>
  );
};
