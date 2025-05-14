import { useLoadUserQuery } from "@/features/api/authApi";
import { useEffect, useState } from "react";
import Course from "./Course";
import axios from "axios";
import { toast } from "sonner";

const URL = "https://campus-360-server.onrender.com"
// const URL = "http://localhost:8080"

const MyLearning = () => { 
  const { data, isLoading, refetch } = useLoadUserQuery();
  const [verifying, setVerifying] = useState(true);

  useEffect(() => {
    const verifyEnrollments = async () => {
      try {
        if (data?.user?.enrolledCourses) {
          setVerifying(true);
          const verificationPromises = data.user.enrolledCourses.map(course => 
            axios.get(`${URL}/api/v1/purchase/verify/${course._id}`, {
              withCredentials: true
            })
          );

          const results = await Promise.all(verificationPromises);
          const anyFixed = results.some(result => 
            result.data.enrollmentDetails.purchaseExists && 
            (!result.data.enrollmentDetails.inUserCourses || !result.data.enrollmentDetails.inCourseStudents)
          );

          if (anyFixed) {
            console.log("Some enrollments were fixed, refreshing data...");
            await refetch();
          }
        }
      } catch (error) {
        console.error("Error verifying enrollments:", error);
        toast.error("Error verifying course enrollments");
      } finally {
        setVerifying(false);
      }
    };

    verifyEnrollments();
  }, [data?.user?.enrolledCourses, refetch]);

  const myLearning = data?.user?.enrolledCourses || [];

  if (isLoading || verifying) {
    return <MyLearningSkeleton />;
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
      <h1 className="font-bold text-2xl">MY LEARNING</h1>
      <div className="my-5">
        {myLearning.length === 0 ? (
          <p>You are not enrolled in any course.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {myLearning.map((course) => (
              <Course key={course._id} course={course}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="max-w-4xl mx-auto my-10 px-4 md:px-0">
    <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded animate-pulse mb-5"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {[...Array(3)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-300 dark:bg-gray-700 rounded-lg h-40 animate-pulse"
        ></div>
      ))}
    </div>
  </div>
);
