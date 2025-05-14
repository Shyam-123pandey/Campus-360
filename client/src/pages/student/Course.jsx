import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import PropTypes from 'prop-types';

const Course = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`} className="block mb-6">
      <CardContainer className="w-full">
        <CardBody className={cn(
          "relative group/card",
          "bg-white dark:bg-gray-900",
          "hover:shadow-2xl dark:hover:shadow-2xl",
          "dark:hover:shadow-emerald-500/[0.1]",
          "border border-gray-200 dark:border-gray-800",
          "w-full sm:w-[30rem] h-auto rounded-xl p-6",
          "transition-all duration-300 ease-in-out"
        )}>
          <CardItem
            translateZ="50"
            className="text-xl font-bold"
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={course.courseThumbnail}
                alt="course"
                className="w-full h-48 object-cover transition-transform duration-300 group-hover/card:scale-105"
              />
            </div>
          </CardItem>
          <CardItem
            translateZ="60"
            className="mt-6 text-neutral-600 dark:text-neutral-200"
          >
            <h1 className="font-bold text-xl hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
              {course.courseTitle}
            </h1>
          </CardItem>
          <CardItem
            translateZ="40"
            className="flex items-center justify-between mt-4"
          >
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800">
                <AvatarImage src={course.creator?.photoUrl || "https://github.com/shadcn.png"} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <h1 className="font-medium text-sm text-gray-600 dark:text-gray-300">
                {course.creator?.name}
              </h1>
            </div>
            <Badge className={cn(
              "px-3 py-1 text-xs rounded-full",
              "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
              "border border-blue-200 dark:border-blue-800"
            )}>
              {course.courseLevel}
            </Badge>
          </CardItem>
          <CardItem
            translateZ="30"
            className="mt-6 text-lg font-bold text-blue-600 dark:text-blue-400"
          >
            <span>₹{course.coursePrice}</span>
          </CardItem>
        </CardBody>
      </CardContainer>
    </Link>
  );
};

Course.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    courseThumbnail: PropTypes.string.isRequired,
    courseTitle: PropTypes.string.isRequired,
    courseLevel: PropTypes.string.isRequired,
    coursePrice: PropTypes.number.isRequired,
    creator: PropTypes.shape({
      name: PropTypes.string,
      photoUrl: PropTypes.string
    })
  }).isRequired
};

export default Course;
