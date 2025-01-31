"use client";

import { useState, useEffect } from "react";
import { fetchQuizData } from "@/utils/fetchQuiz";
import { Question } from "@/types/quiz";
import QuizCard from "@/components/QuizCard";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      const data = await fetchQuizData();
      setQuizData(data);
    };
    loadQuiz();
  }, []);

  const handleAnswer = (index: number) => {
    if (selected === null) {
      setSelected(index);
      if (quizData[currentQ].options[index].is_correct) setScore(score + 1);

      setTimeout(() => {
        if (currentQ < quizData.length - 1) {
          setCurrentQ(currentQ + 1);
        } else {
          setShowResult(true);
        }
        setSelected(null);
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      {!quizStarted ? (
        <button
          className="px-6 py-3 bg-blue-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
          onClick={() => setQuizStarted(true)}
        >
          Start Quiz
        </button>
      ) : showResult ? (
        <ResultCard
          score={score}
          total={quizData.length}
          restart={() => {
            setCurrentQ(0);
            setScore(0);
            setShowResult(false);
            setQuizStarted(false);
          }}
        />
      ) : (
        quizData.length > 0 && (
          <QuizCard
            question={quizData[currentQ]}
            currentQ={currentQ}
            totalQ={quizData.length}
            selected={selected}
            handleAnswer={handleAnswer}
          />
        )
      )}
    </div>
  );
}