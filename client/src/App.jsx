import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Courses from "./pages/student/Courses";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/lecture/CreateLecture";
import EditLecture from "./pages/admin/lecture/EditLecture";
import CourseDetail from "./pages/student/CourseDetail";
import CourseProgress from "./pages/student/CourseProgress";
import SearchPage from "./pages/student/SearchPage";
import Service from "./pages/Service";
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseCourseProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import Certification from "./pages/Certification";
import TestQuiz from './pages/TestQuiz';
import Certificate from './pages/Certificate';
import PageNotFound from "./components/PageNotFound";
import CourseraCategory from "./pages/CourseraCategory";
import HostelManagement from "./pages/HostelManagement";
import Mentorship from "./pages/Mentorship";
import MentorshipPrograms from "./pages/admin/MentorshipPrograms";
import MentorshipContent from "./pages/student/MentorshipContent";
import CampusContentHub from "./components/CampusContentHub";
import GroupDiscussion from "./components/Group-Discussion";
import TrustedHelpers from "./components/TrustedHelpers";
import HelpCategories from "./pages/HelpCategories";
import Directory from "./pages/Directory";
import Feedback from "./pages/Feedback";
import Chat from "./pages/Chat";
import HomeHelper from "./components/HomeHelper";
import Register from "./pages/Register";
import LostItems from './pages/LostFound/LostItems';
import FoundItems from './pages/LostFound/FoundItems';
import ReportLostItem from './pages/LostFound/ReportLostItem';
import Emergency from "./pages/Emergency";
import AllNotifications from "./pages/AllNotifications";

// Import CampusConnect components
import CampusConnectHome from "./features/campus-connect/pages/CampusConnectHome";
import CampusConnectRegister from "./features/campus-connect/pages/CampusConnectRegister";
import CampusConnectSearch from "./features/campus-connect/pages/CampusConnectSearch";
import CampusConnectChat from "./features/campus-connect/pages/CampusConnectChat";
import CampusConnectFeedback from "./features/campus-connect/pages/CampusConnectFeedback";
import CampusConnectSuccess from "./features/campus-connect/pages/CampusConnectSuccess";

// Import Library Management System components
import LibraryHome from "./features/library/pages/LibraryHome";
import LibrarySearch from "./features/library/pages/LibrarySearch";
import LibraryMap from "./features/library/pages/LibraryMap";
import AIBookLocator from "./features/library/pages/AIBookLocator";
import SOSAdmin from "./pages/admin/SOSAdmin"
import HomePage from "./features/campus-connect/CampusConnectHome1";
import HeroSectionWithServices from "./pages/student/HeroSection";
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <>
            <HeroSectionWithServices/>
            <Courses />
          </>
        ),
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "my-learning",
        element: (
          <ProtectedRoute>
            <MyLearning />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/group-discussion",
        element: <GroupDiscussion/>
      },
      {
        path: "/directory",
        element: <TrustedHelpers/>
      },
      {
        path: "/help",
        element: <HelpCategories/>
      },
      {
        path: "/home-service",
        element: <HomeHelper/>
      },
      {
        path: "/directory",
        element: <Directory/>
      },
      {
        path: "/feedback",
        element: <Feedback/>
      },
      {
        path: "/chat",
        element: <Chat/>
      },
      {
        path: "/register",
        element: <Register/>
      },
      {
        path: "/certification",
        element: <Certification />
      },
      {
        path: "/test-quiz/:subject",
        element: <TestQuiz />
      },
      {
        path: "/services/hostel-management",
        element: <HostelManagement/>
      },
      {
        path: "/emergency",
        element: <Emergency/>
      },
      {
        path: "/certificate/:subject",
        element: <Certificate/>
      },
      {
        path: "/coursera-courses/:category",
        element: <CourseraCategory />
      },
      {
        path: "/pages/FooterPages.jsx/Service.jsx",
        element: <Service />,
      },
      {
        path: "course/search",
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-detail/:courseId",
        element: (
          <ProtectedRoute>
            <CourseDetail />
          </ProtectedRoute>
        ),
      },
      {
        path: "course-progress/:courseId",
        element: (
          <ProtectedRoute>
            <PurchaseCourseProtectedRoute>
            <CourseProgress />
            </PurchaseCourseProtectedRoute>
          </ProtectedRoute>
        ),
      },
      {
        path: "/services/mentorship",
        element: <Mentorship />
      },
      {
        path: "mentorship-content",
        element: (
          <ProtectedRoute>
            <MentorshipContent />
          </ProtectedRoute>
        ),
      },
      {
        path: "/services/campus-content-hub",
        element: (
          <ProtectedRoute>
            <CampusContentHub />
          </ProtectedRoute>
        ),
      },
      {
        path: "lost-items",
        element: <LostItems />,
      },
      {
        path: "lost-items/report",
        element: <ReportLostItem />,
      },
      {
        path: "found-items",
        element: <FoundItems />,
      },
      {
        path: "/notifications",
        element: <AllNotifications />,
      },

      // admin routes start from here
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Sidebar />
          </AdminRoute>
        ),
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "SOSAdmin",
            element: <SOSAdmin />,
          },
          {
            path: "mentorship",
            element: <MentorshipPrograms />,
          },
          {
            path: "course",
            element: <CourseTable />,
          },
          {
            path: "course/create",
            element: <AddCourse />,
          },
          {
            path: "course/:courseId",
            element: <EditCourse />,
          },
          {
            path: "course/:courseId/lecture",
            element: <CreateLecture />,
          },
          {
            path: "course/:courseId/lecture/:lectureId",
            element: <EditLecture />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound/>
      },

      // CampusConnect Routes
      {
        path: "/campus-connect",
        element: <CampusConnectHome />,
      },
      {
        path: "/campus-connect/register",
        element: <CampusConnectRegister />,
      },
      {
        path: "/campus-connect-start",
        element: <HomePage/>,
      },
      {
        path: "/campus-connect/search",
        element: <CampusConnectSearch />,
      },
      {
        path: "/campus-connect/chat",
        element: <CampusConnectChat />,
      },
      {
        path: "/campus-connect/feedback",
        element: <CampusConnectFeedback />,
      },
      {
        path: "/campus-connect/success",
        element: <CampusConnectSuccess />,
      },

      // Library Management System Routes
      {
        path: "/library",
        element: <LibraryHome />,
      },
      {
        path: "/library/search",
        element: <LibrarySearch />,
      },
      {
        path: "/library/map",
        element: <LibraryMap />,
      },
      {
        path: "/library/ai-locator",
        element: <AIBookLocator />,
      },
      {
        path: "/library/section/:sectionId",
        element: <LibrarySearch />,
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <ThemeProvider>
      <RouterProvider router={appRouter} />
      </ThemeProvider>
    </main>
  );
}

export default App;
