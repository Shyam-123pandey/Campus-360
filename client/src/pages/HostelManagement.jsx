import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

const hostelFacilities = [
  {
    title: "Hostel Information",
    description: "General information about hostels and accommodation.",
    link: "https://www.nitm.ac.in/p/hostel-information-1"
  },
  {
    title: "Forms",
    description: "Download all hostel-related forms.",
    link: "https://www.nitm.ac.in/p/forms-5"
  },
  {
    title: "Hostel Patrolling Committee",
    description: "Details about the patrolling committee and its members.",
    link: "https://www.nitm.ac.in/p/hostel-patrolling-committee"
  },
  {
    title: "Hostel Rules and Regulations",
    description: "Read the rules and regulations for hostel residents.",
    link: "https://www.nitm.ac.in/uploads/778829329f6a219d67595dbca2ce9a93.pdf"
  },
  {
    title: "HMC",
    description: "Hostel Management Committee information.",
    link: "https://www.nitm.ac.in/p/hmc"
  }
];

const HostelManagement = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-[#141414] py-12">
    <div className="max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Hostel Management Facilities
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hostelFacilities.map((facility, idx) => (
          <Card key={idx} className="h-full hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <CardTitle>{facility.title}</CardTitle>
              <CardDescription>{facility.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href={facility.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Details
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </div>
);

export default HostelManagement; 