import { Link } from "react-router-dom";

type QuestionProps = {
    question: {
        id: number;
        title: string;
        description: string;
        tags: string[];
        user: string;
        answers: number;
    };
};

export default function QuestionItem({ question }: QuestionProps) {
    return (
        <div className="bg-gray-800 p-4 rounded-lg">
            <Link
                to={`/question/${question.id}`}
                className="text-lg font-bold text-blue-400 hover:underline"
            >
                {question.title}
            </Link>
            <p className="text-gray-400 text-sm mb-2">{question.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
                {question.tags.map((tag) => (
                    <span
                        key={tag}
                        className="bg-gray-700 px-2 py-1 rounded text-xs"
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <div className="flex justify-between items-center text-sm text-gray-400">
                <span>By {question.user}</span>
                <span>{question.answers} answers</span>
            </div>
        </div>
    );
}
