import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThumbsUp, BadgeCheck } from "lucide-react";

// Sample mentor profiles
const mentors = [
  {
    name: "Amit Sharma",
    branch: "cse",
    program: "btech",
    company: "Google",
    expertise: ["aiml", "ds"],
    level: ["beginner", "intermediate"],
    badges: ["Google", "Placed"],
    upvotes: 12,
    profile: "https://www.linkedin.com/in/amitsharma/",
    photo: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Ex-Google SDE, passionate about AI/ML and mentoring students.",
    advice: "Focus on fundamentals and build real-world projects!",
    mentorshipProgram: {
      title: "Shyam's AI/ML Mentorship Program",
      description: "A comprehensive, week-by-week roadmap for mastering Data Science & Machine Learning.",
      link: "https://dataanalysisroadmap.blogspot.com/2025/05/data-analysis-roadmap-by-dr-satyendra.html"
    },
    otherResources: [
      { label: "Sample AI/ML Video", link: "https://www.youtube.com/watch?v=aircAruvnKk" },
      { label: "Coursera Free Courses", link: "https://www.guru99.com/coursera-free-courses.html#Coursera-Bestseller-Courses" },
      { label: "GATE ECE Roadmap by Satyendra Singh Yadav", link: "https://gateeceroadmap.blogspot.com/2025/05/gate-ece-roadmap-by-satyendra-singh.html" }
    ],
    guidedPath: {
      title: "AI/ML Beginner Roadmap",
      description: "Start your AI/ML journey with Python, Numpy, Pandas, and basic ML algorithms.",
      resources: [
        { label: "Python for Everybody", link: "https://www.coursera.org/specializations/python" },
        { label: "Intro to ML", link: "https://www.coursera.org/learn/machine-learning" }
      ],
      likedByMentors: ["Amit Sharma"]
    }
  },
  {
    name: "Priya Singh",
    branch: "ece",
    program: "btech",
    company: "Qualcomm",
    expertise: ["cyber", "webdev"],
    level: ["intermediate", "advanced"],
    badges: ["Placed", "Researcher"],
    upvotes: 8,
    profile: "https://www.linkedin.com/in/priyasingh/",
    photo: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "VLSI and Embedded Systems specialist, loves helping juniors.",
    advice: "Practice coding and participate in hackathons.",
    guidedPath: {
      title: "Cybersecurity & Web Dev Roadmap",
      description: "Learn the basics of cybersecurity and web development, including hands-on labs and projects.",
      resources: [
        { label: "Web Security Fundamentals", link: "https://www.coursera.org/learn/web-security" },
        { label: "GATE ECE Roadmap by Satyendra Singh Yadav", link: "https://gateeceroadmap.blogspot.com/2025/05/gate-ece-roadmap-by-satyendra-singh.html" },
        { label: "Coursera Free Courses", link: "https://www.guru99.com/coursera-free-courses.html#Coursera-Bestseller-Courses" },
        { label: "Sample Cybersecurity Video", link: "https://www.youtube.com/watch?v=inWWhr5tnEA" }
      ],
      likedByMentors: ["Priya Singh"]
    }
  }
];

const programs = [
  { key: "btech", label: "🎓 B.Tech" },
  { key: "mtech", label: "🎓 M.Tech" },
  { key: "msc", label: "🎓 M.Sc" },
  { key: "phd", label: "🎓 Ph.D" }
];

const branches = [
  { key: "cse", label: "💻 Computer Science" },
  { key: "ece", label: "📡 Electronics & Communication" },
  { key: "mech", label: "⚙️ Mechanical Engineering" },
  { key: "civil", label: "🏗️ Civil Engineering" },
  { key: "ee", label: "🔌 Electrical Engineering" }
];

const categories = [
  { key: "aiml", label: "🤖 AI/ML" },
  { key: "webdev", label: "🌐 Web Development" },
  { key: "cp", label: "🧮 Competitive Programming" },
  { key: "appdev", label: "📱 App Development" },
  { key: "cyber", label: "🔐 Cybersecurity" },
  { key: "ds", label: "📊 Data Science" }
];

const levels = [
  { key: "beginner", label: "🟢 Fresher / Beginner" },
  { key: "intermediate", label: "🟡 Intermediate" },
  { key: "advanced", label: "🔴 Advanced" }
];

const Mentorship = () => {
  const [step, setStep] = useState(1);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [mentorUpvotes, setMentorUpvotes] = useState({});
  const [mentorUpvoted, setMentorUpvoted] = useState({});

  // Step 1: Program selection
  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setStep(2);
  };

  // Step 2: Branch selection
  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setStep(3);
  };

  // Step 3: Category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setStep(4);
  };

  // Step 4: Level selection
  const handleLevelSelect = (level) => {
    setSelectedLevel(level);
    setStep(5);
  };

  // Upvote handler (one-time per mentor per session)
  const handleUpvote = (mentorName) => {
    if (mentorUpvoted[mentorName]) return; // Already upvoted
    setMentorUpvotes((prev) => ({
      ...prev,
      [mentorName]: (prev[mentorName] || mentors.find(m => m.name === mentorName)?.upvotes || 0) + 1
    }));
    setMentorUpvoted((prev) => ({ ...prev, [mentorName]: true }));
  };

  // Filter mentors based on selections
  const filteredMentors = mentors.filter(m =>
    (!selectedProgram || m.program === selectedProgram) &&
    (!selectedBranch || m.branch === selectedBranch) &&
    (!selectedCategory || m.expertise.includes(selectedCategory)) &&
    (!selectedLevel || m.level.includes(selectedLevel))
  );

  // Suggested mentor: first match
  const suggestedMentor = filteredMentors[0];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#141414] py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-blue-500">
          Mentorship & Branch-Oriented Learning
        </h1>
        {/* Stepper UI */}
        <div className="flex items-center justify-center mb-8">
          <div className={`flex items-center gap-2 ${step >= 1 ? 'font-bold text-blue-600' : ''}`}>1. Program</div>
          <div className="w-6 h-0.5 bg-gray-300 mx-2" />
          <div className={`flex items-center gap-2 ${step >= 2 ? 'font-bold text-blue-600' : ''}`}>2. Branch</div>
          <div className="w-6 h-0.5 bg-gray-300 mx-2" />
          <div className={`flex items-center gap-2 ${step >= 3 ? 'font-bold text-blue-600' : ''}`}>3. Category</div>
          <div className="w-6 h-0.5 bg-gray-300 mx-2" />
          <div className={`flex items-center gap-2 ${step >= 4 ? 'font-bold text-blue-600' : ''}`}>4. Level</div>
        </div>

        {/* Step 1: Program Selection */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Step 1: Choose Your Program</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {programs.map((program) => (
                <Button
                  key={program.key}
                  className={`w-full py-6 text-lg ${selectedProgram === program.key ? 'bg-blue-500 text-white' : ''}`}
                  variant={selectedProgram === program.key ? 'default' : 'outline'}
                  onClick={() => handleProgramSelect(program.key)}
                >
                  {program.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Branch Selection */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Step 2: Select Your Branch</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {branches.map((branch) => (
                <Button
                  key={branch.key}
                  className={`w-full py-6 text-lg ${selectedBranch === branch.key ? 'bg-blue-500 text-white' : ''}`}
                  variant={selectedBranch === branch.key ? 'default' : 'outline'}
                  onClick={() => handleBranchSelect(branch.key)}
                >
                  {branch.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Category Selection */}
        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Step 3: Pick Your Category / Interest</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <Button
                  key={cat.key}
                  className={`w-full py-6 text-lg ${selectedCategory === cat.key ? 'bg-blue-500 text-white' : ''}`}
                  variant={selectedCategory === cat.key ? 'default' : 'outline'}
                  onClick={() => handleCategorySelect(cat.key)}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Level Selection */}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4 text-center">Step 4: Select Your Skill Level</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {levels.map((lvl) => (
                <Button
                  key={lvl.key}
                  className={`w-full py-6 text-lg ${selectedLevel === lvl.key ? 'bg-blue-500 text-white' : ''}`}
                  variant={selectedLevel === lvl.key ? 'default' : 'outline'}
                  onClick={() => handleLevelSelect(lvl.key)}
                >
                  {lvl.label}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {step === 5 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-center">📈 Results</h2>
            <div className="flex flex-col items-center gap-2 mb-8">
              <div className="text-base">Program: <span className="font-semibold">{programs.find(p => p.key === selectedProgram)?.label}</span></div>
              <div className="text-base">Branch: <span className="font-semibold">{branches.find(b => b.key === selectedBranch)?.label}</span></div>
              <div className="text-base">Category: <span className="font-semibold">{categories.find(c => c.key === selectedCategory)?.label}</span></div>
              <div className="text-base">Level: <span className="font-semibold">{levels.find(l => l.key === selectedLevel)?.label}</span></div>
            </div>

            {/* Suggested Mentor for You (one card, includes guided path) */}
            {suggestedMentor ? (
              <Card className="w-full max-w-lg mb-8">
                <CardHeader className="flex flex-row items-center gap-4">
                  <img src={suggestedMentor.photo} alt={suggestedMentor.name} className="w-16 h-16 rounded-full object-cover border-2 border-blue-400" />
                  <div>
                    <CardTitle className="flex items-center gap-2">{suggestedMentor.name} {suggestedMentor.badges.map((badge, i) => <span key={i} className="ml-1 px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs flex items-center gap-1"><BadgeCheck className="inline h-4 w-4 text-green-500" />{badge}</span>)}</CardTitle>
                    <CardDescription>{branches.find(b => b.key === suggestedMentor.branch)?.label} | {suggestedMentor.company}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-2 text-sm text-muted-foreground">{suggestedMentor.bio}</div>
                  <div className="mb-2"><span className="font-semibold">Expertise:</span> {suggestedMentor.expertise.map(e => categories.find(c => c.key === e)?.label).join(", ")}</div>
                  <div className="mb-2"><span className="font-semibold">Advice:</span> {suggestedMentor.advice}</div>
                  <div className="flex items-center gap-4 mt-2">
                    <Button size="sm" variant="outline" onClick={() => handleUpvote(suggestedMentor.name)} disabled={mentorUpvoted[suggestedMentor.name]}>
                      <ThumbsUp className="mr-1 h-4 w-4" /> Upvote ({mentorUpvotes[suggestedMentor.name] || suggestedMentor.upvotes})
                    </Button>
                    <a href={suggestedMentor.profile} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="default">View Profile</Button>
                    </a>
                  </div>
                  {selectedCategory === 'aiml' && suggestedMentor.mentorshipProgram && (
                    <div className="mt-6 mb-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900">
                      <h4 className="text-lg font-bold mb-1">{suggestedMentor.mentorshipProgram.title}</h4>
                      <div className="mb-2 text-muted-foreground">{suggestedMentor.mentorshipProgram.description}</div>
                      <a href={suggestedMentor.mentorshipProgram.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                        <ExternalLink className="mr-1 h-4 w-4" /> View Full Roadmap
                      </a>
                    </div>
                  )}
                  {selectedCategory === 'aiml' && suggestedMentor.otherResources && suggestedMentor.otherResources.length > 0 && (
                    <div className="mb-4 p-4 rounded-lg bg-green-50 dark:bg-green-900">
                      <h4 className="text-lg font-semibold mb-1">Other Resources</h4>
                      <ul className="list-disc pl-5">
                        {suggestedMentor.otherResources.map((res, i) => (
                          <li key={i} className="mb-1">
                            <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                              <ExternalLink className="mr-1 h-4 w-4" /> {res.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="mt-6">
                    <h4 className="text-lg font-semibold mb-2">📘 Guided Path</h4>
                    <div className="mb-1 text-muted-foreground">{suggestedMentor.guidedPath.description}</div>
                    <ul className="list-disc pl-5 mb-2">
                      {suggestedMentor.guidedPath.resources.map((res, i) => (
                        <li key={i} className="mb-1">
                          <a href={res.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline inline-flex items-center">
                            <ExternalLink className="mr-1 h-4 w-4" /> {res.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 text-xs text-green-700">⭐ Liked by: {suggestedMentor.guidedPath.likedByMentors.join(", ")}</div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="text-muted-foreground text-center">No mentors found for your selection.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mentorship; 