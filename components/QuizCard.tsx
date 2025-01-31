"use client";

import { Question } from "@/types/quiz";
import { motion } from "framer-motion";

interface QuizCardProps {
    question: Question;
    currentQ: number;
    totalQ: number;
    selected: number | null;
    handleAnswer: (index: number) => void;
}

const QuizCard: React.FC<QuizCardProps> = ({ question, currentQ, totalQ, selected, handleAnswer }) => {
    return (
        <motion.div
            className="bg-gray-800 p-6 rounded-lg shadow-xl w-full max-w-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h2 className="text-xl font-semibold">{question.description}</h2>
            <div className="mt-4">
                {question.options.map((opt, i) => (
                    <motion.button
                        key={opt.id}
                        className={`block w-full text-left px-4 py-2 mt-2 rounded-lg transition-all ${selected !== null
                                ? opt.is_correct
                                    ? "bg-green-500"
                                    : selected === i
                                        ? "bg-red-500"
                                        : "bg-gray-700"
                                : "bg-gray-700 hover:bg-gray-600"
                            }`}
                        onClick={() => handleAnswer(i)}
                        whileTap={{ scale: 0.9 }}
                    >
                        {opt.description}
                    </motion.button>
                ))}
            </div>
            <p className="text-sm text-gray-400 mt-4">
                Question {currentQ + 1} of {totalQ}
            </p>
        </motion.div>
    );
};

export default QuizCard;