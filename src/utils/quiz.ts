import { IOption, IQuiz, IQuizQuestion } from "../interfaces/quiz.interface";

// Metni parçalama ve seçenek oluşturma
const createQuizQuestion = async (quizItem: IQuiz): Promise<IQuizQuestion> => {

    // Cümleleri ayır
    const sentences = quizItem.body.split('\n').map(sentence => sentence.trim()).filter(Boolean);


    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chars = ['A', 'B', 'C', 'D']
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const options: IQuizQuestion['options'] = []

    // Seçenekleri oluştur (sadece cümleleri kullanarak)
    for (let index = 0; index < sentences.length; index++) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const option: IOption = {
            key: chars[index],
            value: sentences[index]
        }
        options.push(option)
    }



    const question: IQuizQuestion = {
        id: quizItem.id,
        title: quizItem.title,
        options: options,
    }

    return question
};

// Fonksiyon: Benzersiz rastgele verileri alma
const getUniqueRandomItems = async <T>(array: T[], count: number): Promise<T[]> => {
    const uniqueItems = Array.from(new Set(array.map(item => JSON.stringify(item)))); // Benzersiz öğeleri al

    if (uniqueItems.length < count) {
        throw new Error("Yeterli benzersiz veri yok!");
    }

    // Rastgele seçim
    const selectedItems: T[] = [];
    const selectedIndices: Set<number> = new Set(); // Seçilen indeksleri takip et

    while (selectedItems.length < count) {
        const randomIndex = Math.floor(Math.random() * uniqueItems.length);
        if (!selectedIndices.has(randomIndex)) {
            selectedItems.push(JSON.parse(uniqueItems[randomIndex]));
            selectedIndices.add(randomIndex); // Bu indeksi seçilmişler listesine ekle
        }
    }

    return selectedItems;
};


export { createQuizQuestion, getUniqueRandomItems }