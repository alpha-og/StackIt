import { useState } from "react";

export default function AskPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submit", { title, description, tags });
        // TODO: Call your api.askQuestion()
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-4">Ask a New Question</h1>
            <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-xl mx-auto"
            >
                <input
                    className="w-full bg-gray-800 p-2 rounded"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full bg-gray-800 p-2 rounded"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className="w-full bg-gray-800 p-2 rounded"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
                <button className="bg-blue-600 px-4 py-2 rounded">
                    Submit
                </button>
            </form>
        </div>
    );
}
