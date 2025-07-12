import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

type Answer = {
    id: number;
    content: string;
    votes: number;
    accepted: boolean;
    userVote: "up" | "down" | null;
};

export default function QuestionDetailPage() {
    const { id } = useParams<{ id: string }>();

    // Fake data for now
    const question = {
        id,
        title: "How to join 2 columns in a data set to make a separate column in SQL",
        description:
            "I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name. I want a column to combine...",
        tags: ["SQL", "Beginner"],
    };

    const [answers, setAnswers] = useState<Answer[]>([
        {
            id: 1,
            content: "The || Operator.\nThe + Operator.\nThe CONCAT Function.",
            votes: 1,
            accepted: true,
            userVote: null,
        },
        {
            id: 2,
            content: "You can also use CONCAT_WS for separator.",
            votes: 0,
            accepted: false,
            userVote: null,
        },
    ]);

    const [newAnswer, setNewAnswer] = useState("");

    // Voting logic
    const handleVote = (answerId: number, direction: "up" | "down") => {
        setAnswers((prev) =>
            prev.map((a) => {
                if (a.id !== answerId) return a;

                if (a.userVote === direction) {
                    // Remove vote
                    return {
                        ...a,
                        votes: direction === "up" ? a.votes - 1 : a.votes + 1,
                        userVote: null,
                    };
                }

                if (a.userVote === null) {
                    // First time voting
                    return {
                        ...a,
                        votes: direction === "up" ? a.votes + 1 : a.votes - 1,
                        userVote: direction,
                    };
                }

                // Switching vote
                return {
                    ...a,
                    votes: direction === "up" ? a.votes + 2 : a.votes - 2,
                    userVote: direction,
                };
            }),
        );
    };

    // Answer submission
    const handleSubmitAnswer = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAnswer.trim()) return;

        setAnswers([
            ...answers,
            {
                id: Date.now(),
                content: newAnswer,
                votes: 0,
                accepted: false,
                userVote: null,
            },
        ]);
        setNewAnswer("");
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            {/* Header */}
            <header className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
                <h1 className="text-3xl font-bold">StackIt</h1>
                <div className="flex items-center gap-4">
                    <Link to="/" className="hover:underline">
                        Home
                    </Link>
                    <button className="bg-gray-800 rounded-full p-1">
                        <img
                            src="https://i.pravatar.cc/32"
                            alt="User Avatar"
                            className="rounded-full w-8 h-8"
                        />
                    </button>
                </div>
            </header>

            {/* Breadcrumb */}
            <div className="mb-2 text-sm text-gray-400">
                <Link to="/" className="hover:underline">
                    Questions
                </Link>{" "}
                &gt; {question.title.slice(0, 30)}...
            </div>

            {/* Question */}
            <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <h2 className="text-xl font-bold mb-2">{question.title}</h2>
                <div className="flex gap-2 mb-2">
                    {question.tags.map((tag) => (
                        <span
                            key={tag}
                            className="bg-gray-700 px-2 py-1 rounded text-xs"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-300">{question.description}</p>
            </div>

            {/* Answers */}
            <div className="mb-6">
                <h3 className="text-lg font-bold mb-4">Answers</h3>
                <div className="space-y-4">
                    {answers.map((answer) => (
                        <div
                            key={answer.id}
                            className="bg-gray-800 p-4 rounded-lg"
                        >
                            <div className="flex items-center mb-2">
                                <button
                                    onClick={() => handleVote(answer.id, "up")}
                                    className={`${
                                        answer.userVote === "up"
                                            ? "text-green-400"
                                            : "text-gray-400"
                                    } hover:text-white`}
                                >
                                    ▲
                                </button>
                                <span className="mx-2">{answer.votes}</span>
                                <button
                                    onClick={() =>
                                        handleVote(answer.id, "down")
                                    }
                                    className={`${
                                        answer.userVote === "down"
                                            ? "text-red-400"
                                            : "text-gray-400"
                                    } hover:text-white`}
                                >
                                    ▼
                                </button>
                                {answer.accepted && (
                                    <span className="ml-4 text-green-400">
                                        ✔️ Accepted
                                    </span>
                                )}
                            </div>
                            <p className="whitespace-pre-line text-gray-300">
                                {answer.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Submit Answer */}
            <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h4 className="text-lg font-bold mb-2">Submit Your Answer</h4>
                <form onSubmit={handleSubmitAnswer} className="space-y-4">
                    <textarea
                        className="w-full bg-gray-700 p-2 rounded min-h-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        placeholder="Write your answer..."
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
