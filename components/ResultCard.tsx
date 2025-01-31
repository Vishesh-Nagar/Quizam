"use client";

import { motion } from "framer-motion";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

interface ResultCardProps {
    score: number;
    total: number;
    restart: () => void;
}

const ResultCard: React.FC<ResultCardProps> = ({ score, total, restart }) => {
    const incorrect = total - score;
    const data = [
        { name: "Correct", value: score, color: "#10B981" }, // Green
        { name: "Incorrect", value: incorrect, color: "#6B7280" }, // Gray
    ];

    return (
        <motion.div
            className="bg-gray-800 p-8 rounded-xl text-center shadow-lg flex flex-col items-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
            <p className="text-lg mt-2">Your Score: {score} / {total}</p>

            <PieChart width={200} height={200}>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>

            <button
                className="mt-4 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-600"
                onClick={restart}
            >
                Restart Quiz
            </button>
        </motion.div>
    );
};

export default ResultCard;