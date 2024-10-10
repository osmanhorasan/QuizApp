export interface IQuiz {
    userId: number
    id: number
    title: string
    body: string
}

export interface IChar {
    char: 'A' | 'B' | 'C' | 'D'
}

export interface IOption {
    key: IChar['char'] | string,
    value: string
}

export interface IQuizQuestion {
    id: string | number;
    title: string;
    options: IOption[];
}
export interface IQuizQuestionAnswer {
    id: string | number;
    title: string;
    option: IOption;
}