export const EXAM_ATTEMPT_MODULE_STATUS = {
    NotStarted: 0,
    InProgress: 1,
    Completed: 2,
} as const;

export type ExamAttemptModuleStatus =
    (typeof EXAM_ATTEMPT_MODULE_STATUS)[keyof typeof EXAM_ATTEMPT_MODULE_STATUS];


export type IELTSReadingPracticeDTO = {
    examID: number;
    status: ExamAttemptModuleStatus;
    remainingTime: string;
};

export const EXAM_ATTEMPT_MODULE_STATUS_LABEL: Record<ExamAttemptModuleStatus, string> = {
    0: "Not Started",
    1: "In Progress",
    2: "Completed"
};

export type IELTSReadingQuestionDTO = {
    readingQuestionID: number,
    questionNo: number,
    questionText: string,
    usersAnswer: string,
    examAttemptReadingAnswerID: bigint
};

export type IELTSReadingSectionPartDTO = {
    readingSectionPartID: number,
    questionTypeEnumID: number,
    partNo: number,
    sectionPartExplanation: number,
    questionList: IELTSReadingQuestionDTO[],
}

export type IELTSReadingSectionDTO = {
    readingSectionID: number,
    examID: number,
    sectionNo: number,
    passageHeader: string,
    passageText: string,
    sectionExplanation: string,
    sectionParts: IELTSReadingSectionPartDTO[]
}