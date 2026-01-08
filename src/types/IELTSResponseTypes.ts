export const EXAM_ATTEMPT_MODULE_STATUS = {
    NotStarted: 0,
    InProgress: 1,
    Completed: 2,
} as const;

export type ExamAttemptModuleStatus =
    (typeof EXAM_ATTEMPT_MODULE_STATUS)[keyof typeof EXAM_ATTEMPT_MODULE_STATUS];


export type ReadingPractice = {
    examID: number;
    status: ExamAttemptModuleStatus;
    remainingTime: string;
};

export const EXAM_ATTEMPT_MODULE_STATUS_LABEL: Record<ExamAttemptModuleStatus, string> = {
    0: "Not Started",
    1: "In Progress",
    2: "Completed"
};

export type ReadingQuestion = {
    readingQuestionID: number,
    questionNo: number,
    questionText: string,
    usersAnswer: string,
    examAttemptReadingAnswerID: bigint
};

export type ReadingSectionPart = {
    readingSectionPartID: number,
    questionTypeEnumID: ReadingQuestionType,
    partNo: number,
    sectionPartExplanation: number,
    questionList: ReadingQuestion[],
}

export type ReadingSection = {
    readingSectionID: number,
    examID: number,
    sectionNo: number,
    passageHeader: string,
    passageText: string,
    sectionExplanation: string,
    sectionParts: ReadingSectionPart[]
}

export const READING_QUESTION_TYPE = {
    MultipleChoice: 1,
    TrueFalseNotGiven: 2,
    YesNoNotGiven: 3,
    MatchingHeadings: 4,
    MatchingInformation: 5,
    MatchingFeatures: 6,
    MatchingSentenceEndings: 7,
    SentenceCompletion: 8,
    SummaryCompletion: 9,
    NoteCompletion: 10,
    TableCompletion: 11,
    FlowChartCompletion: 12,
    DiagramLabelCompletion: 13,
    ShortAnswerQuestions: 14
} as const;

export type ReadingQuestionType =
    (typeof READING_QUESTION_TYPE)[keyof typeof READING_QUESTION_TYPE];

export type StartReadingExamResponse = {
    examAttemptModuleID: string;
    sections: ReadingSection[];
};