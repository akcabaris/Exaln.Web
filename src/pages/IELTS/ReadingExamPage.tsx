import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { startReadingPractices, saveReadingQuestionsAnswer } from "../../services/IELTSServices";
import { READING_QUESTION_TYPE, type ReadingSection, type ReadingSectionPart, type ReadingQuestion } from "../../types/IELTSResponseTypes";
import { type SaveReadingQuestionsAnswer } from "../../types/IELTSRequestTypes";

import { IoChevronBackOutline } from "react-icons/io5";
import Spinner from "../../components/Spinner";

type LocationState = {
    isTimed?: boolean;
}

export default function ReadingExamPage() {
    const { examID } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const { isTimed = true } = (location.state as LocationState) || {};

    const [sections, setSections] = useState<ReadingSection[]>([]);
    const [examAttemptModuleID, setExamAttemptModuleID] = useState<string>("");
    const [activeSectionIndex, setActiveSectionIndex] = useState(0);
    const [activeSectionPartIndex, setActiveSectionPartIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [answers, setAnswers] = useState<Record<number, string>>(({}));

    useEffect(() => {
        if (!examID) {
            navigate("/IELTS/Reading");
            return
        }

        const fetchSession = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await startReadingPractices({
                    examID: Number(examID),
                    isTimed: isTimed,
                })

                console.log("data:", data);

                setSections(data.sections);
                setExamAttemptModuleID(data.examAttemptModuleID);

                const initialAnswers: Record<number, string> = {};

                data.sections.forEach((section) => {
                    section.sectionParts.forEach((part) => {
                        part.questionList.forEach((q) => {
                            if (q.usersAnswer) {
                                initialAnswers[q.readingQuestionID] = q.usersAnswer;
                            }
                        })
                    })
                });

                setAnswers(initialAnswers);
            } catch (err: any) {
                console.log(err);
                setError(err?.mes || "Something went wrong.");
            } finally {
                setLoading(false);
            }
        }

        fetchSession();
    }, [examID]);

    const handleAnswerChange = (questionId: number, value: string) => {
        if (answers[questionId] == value) {
            return;
        }

        setAnswers(prev => ({
            ...prev,
            [questionId]: value,
        }))

        const payload: SaveReadingQuestionsAnswer = {
            examAttemptModuleID: examAttemptModuleID,
            questionID: questionId,
            usersAnswer: value,
        };

        saveReadingQuestionsAnswer(payload);

    }

    const handleBackToList = () => {
        navigate("/IELTS/Reading");
    }

    const parseQuestionText = (questionText: string) => {
        const lines = questionText.split('\n').map(l => l.trim()).filter(Boolean);

        const question = lines[0];

        const options = lines.slice(1).map(line => {
            const [key, ...rest] = line.split('.');
            return {
                key: key.trim(),
                text: rest.join('.').trim()
            };
        });

        return { question, options };

    }

    if (loading) {
        return (
            <div className="p-4">
                <Link
                    className="flex items-center text-sm text-slate-600 hover:underline"
                    to="/IELTS/Reading"
                >
                    <IoChevronBackOutline /> Back to the Reading Practice List
                </Link>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-4 space-y-3">
                <Link
                    className="flex items-center text-sm text-slate-600 hover:underline"
                    to="/IELTS/Reading"
                >
                    <IoChevronBackOutline /> Back to the Reading Practice List
                </Link>
                <div className="text-red-500">{error}</div>
            </div>
        );
    }

    if (sections.length === 0) {
        return (
            <div className="p-4 space-y-3">
                <Link
                    className="flex items-center text-sm text-slate-600 hover:underline"
                    to="/IELTS/Reading"
                >
                    <IoChevronBackOutline /> Back to the Reading Practice List
                </Link>
                <div></div>
            </div>
        );
    }

    const activeSection = sections[activeSectionIndex];
    const activeSectionPart = sections[activeSectionIndex].sectionParts[activeSectionPartIndex];

    return (
        <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
                <Link
                    className="flex items-center text-sm text-slate-600 hover:underline"
                    to="/IELTS/Reading"
                >
                    <IoChevronBackOutline /> Back to the Reading Practice List
                </Link>
            </div>

            {/* Passages */}
            <div className="flex gap-2 border-b pb-2">
                {sections.map((section, index) => {
                    const isActive = index === activeSectionIndex;
                    return (
                        <button
                            key={section.readingSectionID}
                            onClick={() => setActiveSectionIndex(index)}
                            className={[
                                "px-3 py-1 rounded-md text-sm border transition-colors",
                                isActive
                                    ? "bg-slate-900 text-white border-slate-900"
                                    : "bg-white text-slate-700 hover:bg-slate-100",
                            ].join(" ")}
                        >
                            Passage-{section.sectionNo}
                        </button>
                    );
                })}
            </div>

            <div className="space-y-4">
                <div>
                    <h1 className="text-xl font-semibold mb-1">
                        {activeSection.passageHeader}
                    </h1>
                    {activeSection.sectionExplanation && (
                        <p className="text-sm text-slate-600">
                            {activeSection.sectionExplanation}
                        </p>
                    )}
                </div>
                <div className="border rounded-md p-4 max-h-[320px] overflow-y-auto bg-slate-50">
                    {activeSection.passageText
                        .split("\n\n")
                        .map((paragraph, idx) => (
                            <p key={idx} className="mb-3 text-sm leading-relaxed">
                                {paragraph}
                            </p>
                        ))}
                </div>
                {

                    <div className="flex gap-2 border-b pb-2">
                        {activeSection.sectionParts.map((sectionPart, index) => {
                            const isActive = index === activeSectionPartIndex
                            return <div
                                key={sectionPart.readingSectionPartID}
                                onClick={() => setActiveSectionPartIndex(index)}
                                className={[
                                    "px-3 py-1 rounded-md text-sm border transition-colors",
                                    isActive
                                        ? "bg-slate-900 text-white border-slate-900"
                                        : "bg-white text-slate-700 hover:bg-slate-100",
                                ].join(" ")}
                            >
                                <div>
                                    <div className="">
                                        Part {sectionPart.partNo}
                                    </div>
                                    <div className="flex text-xs font-small">
                                        {sectionPart.questionList[0].questionNo} -{sectionPart.questionList[sectionPart.questionList.length - 1].questionNo} Questions
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                }
            </div>
            {
                <div className="flexx">
                    {activeSectionPart.questionList.map((questionItem) => {
                        if (activeSectionPart.questionTypeEnumID !== READING_QUESTION_TYPE.MultipleChoice)
                            return null;

                        const { question, options } = parseQuestionText(questionItem.questionText);
                        const selected = answers[questionItem.readingQuestionID];

                        return (
                            <div key={questionItem.readingQuestionID} className="mb-6">
                                <p className="font-semibold mb-3">
                                    {questionItem.questionNo} - {question}
                                </p>
                                <div className="space-y-2">
                                    {options.map(opt => (
                                        <button
                                            key={opt.key}
                                            onClick={() =>
                                                handleAnswerChange(questionItem.readingQuestionID, opt.key)
                                            }
                                            className={` w-full text-left border px-3 py-2 rounded
                                                ${selected === opt.key
                                                    ? 'bg-blue-200 border-blue-500'
                                                    : 'hover:bg-gray-100'}
                                                    `}>
                                            <strong>{opt.key}.</strong> {opt.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            }
        </div>
    );
}