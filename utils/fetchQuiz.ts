import axios from "axios";
import { Question } from "@/types/quiz";

export const fetchQuizData = async (): Promise<Question[]> => {
    try {
        const res = await axios.get("/api/quiz");
        return res.data.questions || []; // Extract only the questions array
    } catch (error) {
        console.error("Error fetching quiz data", error);
        return [];
    }
};
