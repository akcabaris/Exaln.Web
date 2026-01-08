export type StartReadingPractice = {
    examID: number,
    isTimed: boolean
}

export type SaveReadingQuestionsAnswer = {
    examAttemptModuleID: string,
    questionID: number,
    usersAnswer?: string,
}