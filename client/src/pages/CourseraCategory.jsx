import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const categoryCourses = {
  "machine-learning": [
    {
      title: "Machine Learning",
      provider: "Stanford University",
      link: "https://www.coursera.org/learn/machine-learning",
      description: "Learn about machine learning algorithms and applications",
      rating: 4.9,
      students: "4.5M+"
    },
    {
      title: "Deep Learning Specialization",
      provider: "DeepLearning.AI",
      link: "https://www.coursera.org/specializations/deep-learning",
      description: "Master deep learning and neural networks",
      rating: 4.8,
      students: "500K+"
    },
    {
      title: "AI For Everyone",
      provider: "DeepLearning.AI",
      link: "https://www.coursera.org/learn/ai-for-everyone",
      description: "Understand AI concepts and applications",
      rating: 4.8,
      students: "1M+"
    }
  ],
  "web-development": [
    {
      title: "HTML, CSS, and Javascript",
      provider: "Johns Hopkins University",
      link: "https://www.coursera.org/learn/html-css-javascript-for-web-developers",
      description: "Learn web development fundamentals",
      rating: 4.7,
      students: "1.2M+"
    },
    {
      title: "Full Stack Web Development",
      provider: "The Hong Kong University of Science and Technology",
      link: "https://www.coursera.org/professional-certificates/ibm-full-stack-cloud-developer?irclickid=TCsQ7Q2j7xycULNR4t0YR03uUksRPQRRbSn7y80&irgwc=1&utm_medium=partners&utm_source=impact&utm_campaign=1359419&utm_content=b2c&utm_campaignid=guru99&utm_term=14726_CR_1164545_",
      description: "Master full stack development with React",
      rating: 4.6,
      students: "300K+"
    },
    {
      title: "Responsive Web Design",
      provider: "University of London",
      link: "https://www.coursera.org/learn/responsive-web-design",
      description: "Learn to create responsive websites",
      rating: 4.7,
      students: "800K+"
    }
  ],
  "data-science": [
    {
      title: "Data Science Specialization",
      provider: "Johns Hopkins University",
      link: "https://www.coursera.org/specializations/jhu-data-science",
      description: "Comprehensive data science training",
      rating: 4.5,
      students: "2M+"
    },
    {
      title: "Google Data Analytics",
      provider: "Google",
      link: "https://www.coursera.org/professional-certificates/google-data-analytics",
      description: "Learn data analysis and visualization",
      rating: 4.8,
      students: "1.5M+"
    },
    {
      title: "IBM Data Science",
      provider: "IBM",
      link: "https://www.coursera.org/professional-certificates/ibm-data-science",
      description: "Master data science with Python",
      rating: 4.6,
      students: "900K+"
    }
  ]
  // Add more categories and courses as needed
};

const CourseraCategory = () => {
  const { category } = useParams();
  const courses = categoryCourses[category] || [];

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
            {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Courses
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore free courses from top universities and companies
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription className="text-blue-600 dark:text-blue-400">
                    {course.provider}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-500">★</span>
                      <span className="text-sm">{course.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {course.students} students
                    </span>
                  </div>
                  <Button
                    className="w-full"
                    onClick={() => window.open(course.link, '_blank')}
                  >
                    Enroll Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseraCategory; 