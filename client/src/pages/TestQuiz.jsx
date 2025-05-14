import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';

const TestQuiz = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Questions database for different subjects
  const questionsDatabase = {
    javascript: [
      {
        question: "What is the correct way to declare a variable in JavaScript?",
        options: [
          "var x = 5;",
          "let x = 5;",
          "const x = 5;",
          "All of the above"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the output of console.log(typeof null)?",
        options: [
          "null",
          "undefined",
          "object",
          "string"
        ],
        correctAnswer: 2
      },
      {
        question: "Which method is used to add an element to the end of an array?",
        options: [
          "push()",
          "pop()",
          "shift()",
          "unshift()"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        options: [
          "Refers to the current function",
          "Refers to the current object",
          "Refers to the global object",
          "All of the above"
        ],
        correctAnswer: 1
      },
      {
        question: "What is a closure in JavaScript?",
        options: [
          "A function that returns another function",
          "A function that has access to its outer function's scope",
          "A way to hide variables",
          "A type of loop"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the difference between == and === in JavaScript?",
        options: [
          "No difference",
          "== checks value, === checks value and type",
          "== checks type, === checks value",
          "Both check value and type"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of the 'use strict' directive?",
        options: [
          "Makes JavaScript run faster",
          "Enables strict mode for better error checking",
          "Allows use of newer JavaScript features",
          "Prevents variable hoisting"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the output of console.log(1 + '1')?",
        options: [
          "2",
          "11",
          "Error",
          "undefined"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the purpose of the async/await keywords?",
        options: [
          "To make code run faster",
          "To handle asynchronous operations",
          "To create new threads",
          "To prevent callback hell"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the difference between let and const?",
        options: [
          "No difference",
          "let can be reassigned, const cannot",
          "const can be reassigned, let cannot",
          "let is block-scoped, const is function-scoped"
        ],
        correctAnswer: 1
      }
    ],
    python: [
      {
        question: "What is the correct way to create a list in Python?",
        options: [
          "list = []",
          "list = list()",
          "list = {}",
          "Both A and B"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the output of print(type([])) in Python?",
        options: [
          "list",
          "array",
          "tuple",
          "dict"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a valid Python data type?",
        options: [
          "int",
          "float",
          "string",
          "char"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the correct way to create a dictionary in Python?",
        options: [
          "dict = {}",
          "dict = dict()",
          "dict = []",
          "Both A and B"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the output of print(2 ** 3) in Python?",
        options: [
          "6",
          "8",
          "5",
          "Error"
        ],
        correctAnswer: 1
      },
      {
        question: "Which method is used to add an element to a list in Python?",
        options: [
          "append()",
          "add()",
          "insert()",
          "push()"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of the 'self' keyword in Python?",
        options: [
          "Refers to the current function",
          "Refers to the current object",
          "Refers to the parent class",
          "Refers to the global scope"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the output of print('Hello' * 3) in Python?",
        options: [
          "HelloHelloHello",
          "Hello 3",
          "Error",
          "HelloHello"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a valid Python loop?",
        options: [
          "for",
          "while",
          "do-while",
          "for-else"
        ],
        correctAnswer: 2
      },
      {
        question: "What is the purpose of the __init__ method in Python?",
        options: [
          "To initialize a class",
          "To create a new object",
          "To destroy an object",
          "To import modules"
        ],
        correctAnswer: 0
      }
    ],
    java: [
      {
        question: "What is the correct way to declare a variable in Java?",
        options: [
          "int x = 5;",
          "var x = 5;",
          "let x = 5;",
          "const x = 5;"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a primitive data type in Java?",
        options: [
          "int",
          "String",
          "boolean",
          "char"
        ],
        correctAnswer: 1
      },
      {
        question: "What is the output of System.out.println(5 + '5') in Java?",
        options: [
          "10",
          "55",
          "Error",
          "5"
        ],
        correctAnswer: 1
      },
      {
        question: "Which keyword is used to create an object in Java?",
        options: [
          "new",
          "create",
          "object",
          "instance"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of the 'this' keyword in Java?",
        options: [
          "Refers to the current object",
          "Refers to the parent class",
          "Refers to the child class",
          "Refers to the static context"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a valid access modifier in Java?",
        options: [
          "public",
          "private",
          "protected",
          "internal"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the output of System.out.println(10 % 3) in Java?",
        options: [
          "3",
          "1",
          "0",
          "Error"
        ],
        correctAnswer: 1
      },
      {
        question: "Which method is used to compare strings in Java?",
        options: [
          "equals()",
          "compare()",
          "==",
          "match()"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of the 'static' keyword in Java?",
        options: [
          "To create class-level variables and methods",
          "To create instance variables",
          "To create local variables",
          "To create global variables"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a valid loop in Java?",
        options: [
          "for",
          "while",
          "do-while",
          "for-each"
        ],
        correctAnswer: 3
      }
    ],
    cpp: [
      {
        question: "What is the correct way to declare a variable in C++?",
        options: [
          "int x = 5;",
          "var x = 5;",
          "let x = 5;",
          "const x = 5;"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a valid data type in C++?",
        options: [
          "int",
          "float",
          "string",
          "boolean"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the output of cout << 5 + '5' in C++?",
        options: [
          "10",
          "55",
          "Error",
          "5"
        ],
        correctAnswer: 1
      },
      {
        question: "Which keyword is used to create an object in C++?",
        options: [
          "new",
          "create",
          "object",
          "instance"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of the 'this' pointer in C++?",
        options: [
          "Refers to the current object",
          "Refers to the parent class",
          "Refers to the child class",
          "Refers to the static context"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a valid access modifier in C++?",
        options: [
          "public",
          "private",
          "protected",
          "internal"
        ],
        correctAnswer: 3
      },
      {
        question: "What is the output of cout << 10 % 3 in C++?",
        options: [
          "3",
          "1",
          "0",
          "Error"
        ],
        correctAnswer: 1
      },
      {
        question: "Which method is used to compare strings in C++?",
        options: [
          "compare()",
          "equals()",
          "==",
          "match()"
        ],
        correctAnswer: 0
      },
      {
        question: "What is the purpose of the 'static' keyword in C++?",
        options: [
          "To create class-level variables and methods",
          "To create instance variables",
          "To create local variables",
          "To create global variables"
        ],
        correctAnswer: 0
      },
      {
        question: "Which of these is not a valid loop in C++?",
        options: [
          "for",
          "while",
          "do-while",
          "for-each"
        ],
        correctAnswer: 3
      }
    ]
  };

  const questions = questionsDatabase[subject] || questionsDatabase.javascript;

  useEffect(() => {
    if (timeLeft > 0 && !showScore) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleSubmit();
    }
  }, [timeLeft, showScore]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswerClick = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const isCorrectAnswer = answerIndex === questions[currentQuestion].correctAnswer;
    
    // Update the answer for the current question
    setAnswers(prev => {
      const newAnswers = [...prev];
      newAnswers[currentQuestion] = {
        questionIndex: currentQuestion,
        selectedAnswer: answerIndex,
        isCorrect: isCorrectAnswer
      };
      return newAnswers;
    });

    // Update score if correct
    if (isCorrectAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      alert("Please select an answer before proceeding");
      return;
    }
    
    setSelectedAnswer(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    // Ensure all questions are answered
    if (answers.length !== questions.length) {
      alert("Please answer all questions before submitting");
      return;
    }
    setShowScore(true);
    setShowModal(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswers([]);
    setTimeLeft(600);
    setShowModal(false);
  };

  const handleGetCertified = () => {
    const finalScore = calculateScore();
    navigate(`/certificate/${subject}`, { 
      state: { 
        score: finalScore,
        answers: answers,
        totalQuestions: questions.length
      } 
    });
  };

  const calculateScore = () => {
    const correctAnswers = answers.filter(answer => answer?.isCorrect).length;
    return (correctAnswers / questions.length) * 100;
  };

  if (showScore) {
    const finalScore = (score / questions.length) * 100;
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className={cn(
            "w-full max-w-md p-8 rounded-xl",
            theme === 'dark' ? 'bg-[#020817]' : 'bg-white',
            'border',
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
            'text-center'
          )}
        >
          <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
          <p className="text-lg mb-4">Your Score: {finalScore.toFixed(1)}%</p>
          {finalScore >= 90 ? (
            <>
              <p className="text-green-500 mb-4">Congratulations! You've qualified for certification!</p>
              <p className="text-sm text-muted-foreground mb-4">
                You will be redirected to the certification page shortly...
                <Link to={`/certificate/${subject}`}>Get Certified</Link>
              </p>
            </>
          ) : (
            <>
              <p className="text-red-500 mb-4">You need 90% to qualify for certification.</p>
              <button
                onClick={handleRetry}
                className={cn(
                  "px-6 py-2 rounded-lg",
                  "bg-blue-500 text-white",
                  "hover:bg-blue-600",
                  "transition-colors duration-300",
                  "font-medium"
                )}
              >
                Try Again
              </button>
            </>
          )}

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Question Review:</h3>
            <div className="space-y-2 text-left">
              {answers.map((answer, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className={answer.isCorrect ? "text-green-500" : "text-red-500"}>
                    {answer.isCorrect ? "✓" : "✗"}
                  </span>
                  <span className="text-sm">
                    Question {index + 1}: {questions[index].question}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            {subject.charAt(0).toUpperCase() + subject.slice(1)} Certification Test
          </h1>
          <div className="text-lg font-semibold">
            Time Remaining: {formatTime(timeLeft)}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={cn(
            "p-6 rounded-xl",
            theme === 'dark' ? 'bg-[#020817]' : 'bg-white',
            'border',
            theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
          )}
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} of {questions.length}
            </h2>
            <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
          </div>

          <div className="space-y-4">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={cn(
                  "w-full p-4 rounded-lg text-left",
                  "transition-colors duration-200",
                  selectedAnswer === index
                    ? theme === 'dark'
                      ? 'bg-blue-900 text-white'
                      : 'bg-blue-100 text-blue-900'
                    : theme === 'dark'
                    ? 'hover:bg-gray-800'
                    : 'hover:bg-gray-100'
                )}
              >
                {option}
              </button>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={handleNext}
              disabled={selectedAnswer === null}
              className={cn(
                "px-6 py-2 rounded-lg",
                "bg-blue-500 text-white",
                "hover:bg-blue-600",
                "transition-colors duration-300",
                "font-medium",
                selectedAnswer === null && "opacity-50 cursor-not-allowed"
              )}
            >
              {currentQuestion + 1 === questions.length ? "Submit" : "Next"}
            </button>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className={cn(
                "w-full max-w-md p-6 rounded-xl",
                theme === 'dark' ? 'bg-[#020817]' : 'bg-white',
                'border',
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
                'relative'
              )}
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
                <div className="mb-6">
                  <div className="text-4xl font-bold mb-2">
                    {calculateScore().toFixed(1)}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {answers.filter(answer => answer?.isCorrect).length} out of {questions.length} questions correct
                  </div>
                </div>

                {calculateScore() >= 90 ? (
                  <div className="space-y-4">
                    <p className="text-green-500 font-medium">
                      Congratulations! You&apos;ve qualified for certification!
                    </p>
                    <div className="space-y-2">
                      <Link
                        to={`/certificate/${subject}`}
                        state={{
                          score: calculateScore(),
                          answers: answers,
                          totalQuestions: questions.length
                        }}
                        className={cn(
                          "w-full px-6 py-3 rounded-lg block",
                          "bg-blue-500 text-white",
                          "hover:bg-blue-600",
                          "transition-colors duration-300",
                          "font-medium"
                        )}
                      >
                        Download Certificate
                      </Link>
                      <button
                        onClick={() => setShowModal(false)}
                        className={cn(
                          "w-full px-6 py-3 rounded-lg",
                          "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                          "hover:bg-gray-300 dark:hover:bg-gray-700",
                          "transition-colors duration-300",
                          "font-medium"
                        )}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <p className="text-red-500 font-medium">
                      You need 90% to qualify for certification.
                    </p>
                    <div className="space-y-2">
                      <button
                        onClick={handleRetry}
                        className={cn(
                          "w-full px-6 py-3 rounded-lg",
                          "bg-blue-500 text-white",
                          "hover:bg-blue-600",
                          "transition-colors duration-300",
                          "font-medium"
                        )}
                      >
                        Try Again
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className={cn(
                          "w-full px-6 py-3 rounded-lg",
                          "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200",
                          "hover:bg-gray-300 dark:hover:bg-gray-700",
                          "transition-colors duration-300",
                          "font-medium"
                        )}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-6">
                  <h3 className="font-semibold mb-2">Question Review:</h3>
                  <div className="space-y-2 text-left max-h-40 overflow-y-auto">
                    {answers.map((answer, index) => {
                      if (!answer) return null;
                      const question = questions[answer.questionIndex];
                      return (
                        <div key={index} className="flex items-center gap-2">
                          <span className={answer.isCorrect ? "text-green-500" : "text-red-500"}>
                            {answer.isCorrect ? "✓" : "✗"}
                          </span>
                          <span className="text-sm">
                            Question {answer.questionIndex + 1}: {question?.question || "Question not found"}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestQuiz; 