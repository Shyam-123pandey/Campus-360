import { useParams, useLocation, Link, useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { useState } from 'react';

const Certificate = () => {
  const { subject } = useParams();
  const location = useLocation();
  const { theme } = useTheme();
  const score = location.state?.score || 0;
  const [showDownloadPage, setShowDownloadPage] = useState(false);
  const navigate = useNavigate()
  const formatDate = () => {
    const date = new Date();
    return date.toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const certificateId = Math.random().toString(36).substr(2, 9).toUpperCase();
  const handleBack = () => {
    if (showDownloadPage) {
      setShowDownloadPage(false);
    } else {
      navigate('/certification');
    }
  };
  if (!showDownloadPage) {
    return (
      <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn(
              "p-8 rounded-xl",
              theme === 'dark' ? 'bg-[#020817]' : 'bg-white',
              'border',
              theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
              'shadow-lg'
            )}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                Certificate of Achievement
              </h1>
              <p className="text-lg text-muted-foreground">
                This is to certify that
              </p>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2">
                {subject.charAt(0).toUpperCase() + subject.slice(1)} Certification
              </h2>
              <p className="text-lg text-muted-foreground">
                has been successfully completed with a score of {score.toFixed(1)}%
              </p>
            </div>

            <div className="flex justify-between items-center mb-8">
              <div>
                <p className="text-sm text-muted-foreground">Date Issued</p>
                <p className="font-medium">{formatDate()}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certificate ID</p>
                <p className="font-medium">{certificateId}</p>
              </div>
            </div>

            <div className="text-center mb-8">
              <p className="text-sm text-muted-foreground">
                This certificate is awarded in recognition of successful completion of the certification test.
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDownloadPage(true)}
                className={cn(
                  "px-6 py-2 rounded-lg",
                  "bg-blue-500 text-white",
                  "hover:bg-blue-600",
                  "transition-colors duration-300",
                  "font-medium"
                )}
              >
                Download Certificate
              </button>
              <button
                onClick={() => navigate('/certification')}
                className={cn(
                  "px-6 py-2 rounded-lg",
                  "bg-purple-500 text-white",
                  "hover:bg-purple-600",
                  "transition-colors duration-300",
                  "font-medium"
                )}
              >
                View Other Certifications
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Downloadable Certificate Design
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center bg-[#020817]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-4xl"
      >
        <div className={cn(
          "relative p-8 rounded-xl overflow-hidden",
          "bg-gradient-to-br from-[#0a0f2c] to-[#141e4d]",
          "border border-blue-500/20"
        )}>
          {/* Background Network Effect */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
            <div className="w-full h-full bg-[url('/network-bg.png')] bg-cover bg-center" />
          </div>

          {/* Certificate Content */}
          <div className="relative z-10">
            {/* Logo and ISO Badge */}
            <div className="flex justify-between items-start mb-8">
              <div className="flex items-center bg-white/10 rounded-lg px-4 py-2">
                <img src="/logo.png" alt="Logo" className="h-8" />
                <span className="ml-2 text-white font-bold">FREEDOM WITH AI</span>
              </div>
              <img src="/iso-badge.png" alt="ISO Certificate" className="h-16" />
            </div>

            {/* Certificate Content */}
            <div className="text-center space-y-6">
              <h1 className="text-5xl font-bold text-white mb-2">CERTIFICATE</h1>
              <p className="text-blue-400 text-xl tracking-wide">OF COMPLETION</p>

              <div className="mt-8 space-y-4">
                <p className="text-emerald-400 text-lg">Proudly presented to</p>
                <h2 className="text-3xl font-bold text-white border-b-2 border-emerald-500 inline-block px-12 py-2">
                  {location.state?.userName || "Student Name"}
                </h2>
              </div>

              <div className="mt-8 space-y-2">
                <p className="text-gray-300">For Successfully Completing</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {subject.charAt(0).toUpperCase() + subject.slice(1)} Certification
                </p>
                <p className="text-gray-300">with a score of {score.toFixed(1)}%</p>
              </div>

              {/* Signature and Date Section */}
              <div className="mt-12 flex justify-between items-end px-12">
                <div className="text-left">
                  <img src="/signature.png" alt="Signature" className="h-12 mb-2" />
                  <div className="border-t border-gray-500 pt-2">
                    <p className="text-white font-semibold">Course Instructor</p>
                    <p className="text-gray-400">Freedom with AI</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-white text-xl border-b border-gray-500 pb-2">{formatDate()}</p>
                  <p className="text-gray-400 mt-2">Date</p>
                </div>
              </div>

              {/* Certificate ID */}
              <div className="mt-8 text-gray-400 text-sm">
                Certificate ID: {certificateId}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-center gap-4 relative z-20">
              <button
                onClick={() => window.print()}
                className={cn(
                  "px-6 py-3 rounded-lg",
                  "bg-gradient-to-r from-emerald-500 to-blue-500",
                  "text-white font-medium",
                  "hover:from-emerald-600 hover:to-blue-600",
                  "transition-all duration-300",
                  "print:hidden"
                )}
              >
                Download Certificate
              </button>
              <button
                onClick={() => setShowDownloadPage(false)}
                className={cn(
                  "px-6 py-3 rounded-lg cursor-pointer",
                  "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                  "hover:bg-gray-300 dark:hover:bg-gray-700",
                  "transition-all duration-300",
                  "print:hidden"
                )}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Print Styles */}
      <style>{`
        @media print {
          body {
            background: white;
          }
          .print\\:hidden {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Certificate; 