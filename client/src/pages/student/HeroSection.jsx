import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div
      className="relative h-[70vh] w-full flex items-center justify-between bg-[#0a1020] overflow-hidden px-4 sm:px-10 lg:px-24"
      style={{
        background:
          'linear-gradient(90deg, #0a1020 60%, rgba(10,16,32,0.7) 100%)',
      }}
    >
      {/* Left: Text Content */}
      <div className="z-10 max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-left"
        >
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight drop-shadow-xl">
            Everything You Need, <br /> All in One Place
          </h1>
          <p className="text-gray-300 text-lg mb-8 max-w-md">
            Explore courses, connect with peers, get help, and thrive with Campus 360 — your complete campus companion.
          </p>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={searchHandler}
            className="flex items-center bg-white/90 rounded-full shadow-lg overflow-hidden max-w-xl mb-6 border border-gray-200"
          >
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Courses"
              className="flex-grow border-none focus-visible:ring-0 px-6 py-3 text-gray-900 placeholder-gray-500 bg-transparent"
            />
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-r-full"
            >
              Search Courses
            </Button>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex gap-4"
          >
            <Button
              onClick={() => navigate(`/pages/FooterPages.jsx/Service.jsx`)}
              className="bg-white text-blue-600 rounded-full px-8 py-3 border border-blue-600 hover:bg-blue-50"
            >
              Explore All Services
            </Button>
            <Button
              variant="outline"
              className="bg-pink-600 text-white rounded-full px-8 py-3 border-0 hover:bg-pink-700"
            >
              Learn More
            </Button>
          </motion.div>
        </motion.div>
      </div>
      {/* Right: Background Image */}
      <div className="absolute right-0 top-0 h-full w-2/3 pointer-events-none select-none flex items-center justify-end">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=900&q=80"
          alt="Campus 360 Hero"
          className="object-cover h-full w-full opacity-90 rounded-l-3xl shadow-2xl"
          style={{ maxWidth: '700px', minWidth: '320px' }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a1020] via-transparent to-transparent" />
      </div>
      
    </div>
  );
};

const mainServices = [
  {
    title: "Bus Service",
    icon: "🚌",
    link: "https://6820ba5f94ae5eb61eef6016--heartfelt-genie-b1cc19.netlify.app/",
  },
  {
    title: "Library Services",
    icon: "📚",
    link: "/library",
  },
  {
    title: "Hostel Management",
    icon: "🏠",
    link: "/services/hostel-management",
  },
  {
    title: "Mentorship",
    icon: "🧭",
    link: "/services/mentorship",
  },
  {
    title: "Group Discussion",
    icon: "👥",
    link: "/group-discussion",
  },
  {
    title: "Campus Connect",
    icon: "🛟",
    link: "/campus-connect-start",
  },
  {
    title: "Content Hub",
    icon: "📁",
    link: "/services/campus-content-hub",
  },
  {
    title: "Lost & Found",
    icon: "🔍",
    link: "/lost-items",
  },
  {
    title: "Emergency SOS",
    icon: "🚨",
    link: "/emergency",
  },
];

function ServicesScroller() {
  return (
    <div className="w-full bg-white dark:bg-gray-900 py-6 overflow-x-hidden">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">Campus 360 Services</h2>
      <div className="relative w-full">
        <div className="flex gap-6 animate-scroll-x whitespace-nowrap will-change-transform">
          {mainServices.map((service, _) => (
            <a
              key={service.title}
              href={service.link}
              target={service.link.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl shadow-md px-6 py-4 min-w-[160px] max-w-[180px] mx-2 hover:scale-105 transition-transform border border-gray-100 dark:border-gray-700"
            >
              <span className="text-4xl mb-2">{service.icon}</span>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center">
                {service.title}
              </span>
            </a>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-x {
          animation: scroll-x 10s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default function HeroSectionWithServices() {
  return (
    <>
      <HeroSection />
      <ServicesScroller />
    </>
  );
}
