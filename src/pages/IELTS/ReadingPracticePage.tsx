import { useMemo } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { type IELTSReadingPracticeDTO, EXAM_ATTEMPT_MODULE_STATUS, EXAM_ATTEMPT_MODULE_STATUS_LABEL } from "../../types/IELTSTypes";

type LocationState = {
    item?: IELTSReadingPracticeDTO;
    examNo: number;
};

export default function ReadingPracticePage() {
    const navigate = useNavigate();
    const { examId } = useParams();
    const location = useLocation();

    const state = location.state as LocationState | null;
    const item = useMemo(() => state?.item, [state]);
    const examNo = state?.examNo;

    if (!item) {
        return (
            <div className="p-4 space-y-3">
                <button
                    className="text-sm text-slate-600 hover:underline"
                    onClick={() => navigate("/IELTS/Reading")}
                >
                    ← Back to list
                </button>

                <div className="border rounded-md p-4">
                    <div className="font-semibold">Data not available</div>
                    <div className="text-slate-600 text-sm mt-1">
                        This page was opened directly (examId: {examId}). Please open it from the list so the data can be passed without a new request.
                    </div>
                </div>
            </div>
        );
    }

    const handleStart = () => {
        console.log("Start clicked for examID:", item.examID);
    };

    return (
        <div className="p-4 space-y-4">
            <Link
                className="text-sm text-slate-600 hover:underline"
                to="/IELTS/Reading"
            >
                ← Back to the Reading Practice List
            </Link>

            <div className="border rounded-md p-4 space-y-2">
                <div className="text-lg font-semibold">Reading Practice {examNo}</div>

                {item.status === 0 && (
                    <div className="text-slate-700">
                        This reading practice consists of 60 minutes.
                    </div>

                )}

                <div className="text-sm text-slate-600 space-y-1">
                    <div>
                        <span className="font-medium">Status:</span> {EXAM_ATTEMPT_MODULE_STATUS_LABEL[item.status]}
                    </div>

                    {item.status === 1 && (
                        <div>
                            <span className="font-medium">Remaining Time:</span>{" "}
                            {String(item.remainingTime)}
                        </div>
                    )}
                </div>

                {item.status === EXAM_ATTEMPT_MODULE_STATUS.NotStarted ?
                    <div className="pt-2">
                        <button
                            onClick={handleStart}
                            className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                        >
                            Start
                        </button>
                    </div>
                    : item.status === EXAM_ATTEMPT_MODULE_STATUS.InProgress ?
                        <button
                            onClick={handleStart}
                            className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-800 transition-colors"
                        >
                            Continue
                        </button>
                        :
                        <span> Completed Exp.</span>
                }
            </div>
        </div>
    );
}
