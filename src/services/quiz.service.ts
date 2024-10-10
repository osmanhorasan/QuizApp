import { IQuiz, IQuizQuestion } from "../interfaces/quiz.interface";
import { createQuizQuestion, getUniqueRandomItems } from "../utils/quiz";
import createAxiosInstance from "./createAxiosInstance";
import { AxiosError } from "axios"; // Import AxiosError

const path = 'posts';
const baseURL = `${import.meta.env.VITE_API_URL || 'https://jsonplaceholder.typicode.com'}/${path}`;
const axiosInstance = createAxiosInstance(baseURL);

// Quiz listeleme
export const getCtaReadList = async (): Promise<IQuizQuestion[]> => {  // Dönüş tipi IQuizQuestion[] olmalı
    try {
        const response = await axiosInstance.get<IQuiz[]>('');
        if (response.data.length < 10) throw new Error("Veri Eksik");

        // Benzersiz verileri al
        const randomData = await getUniqueRandomItems<IQuiz>(response.data, 3);

        // createQuizQuestion çağrılarını Promise.all ile toplu hale getir
        const createData: IQuizQuestion[] = await Promise.all(
            randomData.map((rd) => createQuizQuestion(rd))
        );

        return createData;  // Oluşturulan quiz sorularını döndür
    } catch (error) {
        const axiosError = error as AxiosError; // Hatayı açıkça AxiosError olarak belirledik
        const message = axiosError.message || 'An error occurred while fetching the cta list';
        console.error(`Fetch Cta List Error: ${message}`);
        throw new Error(message);
    }
};
