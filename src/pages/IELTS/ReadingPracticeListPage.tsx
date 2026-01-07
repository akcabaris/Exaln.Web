import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReadingPractices } from "../../services/IELTSServices";
import { type IELTSReadingPracticeDTO, EXAM_ATTEMPT_MODULE_STATUS_LABEL } from "../../types/IELTSResponseTypes";
import Spinner from "../../components/Spinner";

export default function ReadingPracticeListPage() {
    const navigate = useNavigate();

    const [items, setItems] = useState<IELTSReadingPracticeDTO[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const data = await getReadingPractices();
                setItems(data);
            } catch (err: any) {
                setError(err.message ?? "Something went wrong.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        console.log('i fire once');
    }, []);

    const openPractice = (item: IELTSReadingPracticeDTO, examNo: number) => {
        navigate(`/IELTS/Reading/Practice/${item.examID}`, { state: { item, examNo } });
    };

    return (
        <div className="p-4 space-y-3">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="text-lg font-semibold">Reading Practices</h1>

                    {error && (
                        <div className="p-3 rounded-md border border-red-200 bg-red-50 text-red-700">
                            {error}
                        </div>
                    )}

                    {items.length === 0 && !error && (
                        <div className="text-slate-500">No reading practices found.</div>
                    )}

                    {items.map((item, index) => (
                        <div
                            key={item.examID}
                            onClick={() => openPractice(item, index + 1)}
                            className="border rounded-md p-3 flex justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                            role="button"
                            tabIndex={0}
                        >
                            <div>
                                <div className="font-medium">Practice {index + 1}</div>
                                <div className="text-sm text-slate-600">Status: {EXAM_ATTEMPT_MODULE_STATUS_LABEL[item.status]}</div>
                            </div>

                            {item.status === 1 && (
                                <div className="text-sm text-slate-700">
                                    Remaining Time: {String(item.remainingTime)}
                                </div>
                            )}
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}
