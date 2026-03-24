"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AcademicCapIcon, CheckCircleIcon, XCircleIcon, TrophyIcon } from "@heroicons/react/24/solid";
import type { FuelQuizData } from "@/lib/types";

interface MobileFuelQuizProps {
  quiz: FuelQuizData;
}

type QuizState = "answering" | "result" | "final";

export default function MobileFuelQuiz({ quiz }: MobileFuelQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [state, setState] = useState<QuizState>("answering");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctIndex;
  const isLastQuestion = currentIndex === quiz.questions.length - 1;

  function handleAnswer(optionIndex: number) {
    if (state !== "answering") return;
    setSelectedAnswer(optionIndex);
    if (optionIndex === currentQuestion.correctIndex) {
      setScore((s) => s + 1);
    }
    setState("result");
  }

  function handleNext() {
    if (isLastQuestion) {
      setState("final");
    } else {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswer(null);
      setState("answering");
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setState("answering");
  }

  return (
    <motion.div
      className="mx-4 mt-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AcademicCapIcon className="w-5 h-5 text-yellow-300" />
            <span className="font-heading font-bold text-white text-sm">
              {quiz.title}
            </span>
          </div>
          {state !== "final" && (
            <span className="text-blue-200 text-xs font-medium">
              {currentIndex + 1}/{quiz.questions.length}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="bg-white p-4">
          <AnimatePresence mode="wait">
            {state === "final" ? (
              <motion.div
                key="final"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                >
                  <TrophyIcon className="w-16 h-16 text-yellow-500 mx-auto mb-3" />
                </motion.div>
                <p className="font-heading font-bold text-2xl text-gray-900 mb-1">
                  {score}/{quiz.questions.length}
                </p>
                <p className="text-sm text-gray-500 mb-4">
                  {score === quiz.questions.length
                    ? "Ang galing mo! Perfect score!"
                    : score >= 2
                    ? "Magaling! Marami kang alam sa fuel."
                    : "Nice try! Marami pang dapat matutunan."}
                </p>
                <button
                  type="button"
                  onClick={handleRestart}
                  className="px-6 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full shadow-md shadow-blue-600/25"
                >
                  I-try Ulit
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.3 }}
              >
                {/* Question */}
                <p className="font-heading font-bold text-base text-gray-900 mb-4 leading-snug">
                  {currentQuestion.question}
                </p>

                {/* Options */}
                <div className="space-y-2">
                  {currentQuestion.options.map((option, idx) => {
                    let optionStyle = "bg-gray-50 border-gray-200 text-gray-700";
                    if (state === "result") {
                      if (idx === currentQuestion.correctIndex) {
                        optionStyle = "bg-emerald-50 border-emerald-500 text-emerald-800";
                      } else if (idx === selectedAnswer && !isCorrect) {
                        optionStyle = "bg-red-50 border-red-500 text-red-800";
                      } else {
                        optionStyle = "bg-gray-50 border-gray-200 text-gray-400";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleAnswer(idx)}
                        disabled={state === "result"}
                        className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all flex items-center gap-3 ${optionStyle} ${
                          state === "answering" ? "hover:bg-blue-50 hover:border-blue-300 active:scale-[0.98]" : ""
                        }`}
                      >
                        <span className="w-6 h-6 rounded-full border-2 border-current flex items-center justify-center text-xs font-bold flex-shrink-0">
                          {state === "result" && idx === currentQuestion.correctIndex ? (
                            <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                          ) : state === "result" && idx === selectedAnswer && !isCorrect ? (
                            <XCircleIcon className="w-5 h-5 text-red-500" />
                          ) : (
                            String.fromCharCode(65 + idx)
                          )}
                        </span>
                        {option}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {state === "result" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className={`p-3 rounded-xl text-sm leading-relaxed ${
                        isCorrect ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
                      }`}>
                        <p className="font-bold mb-1">
                          {isCorrect ? "Tama!" : "Mali!"}
                        </p>
                        <p>{currentQuestion.explanation}</p>
                      </div>
                      <button
                        type="button"
                        onClick={handleNext}
                        className="mt-3 w-full py-2.5 bg-blue-600 text-white text-sm font-bold rounded-full shadow-md shadow-blue-600/25"
                      >
                        {isLastQuestion ? "Tingnan ang Score" : "Susunod na Tanong"}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
