import { useState, useRef } from "react";
import JoditEditor from "jodit-react";

export default function AskPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");

    // Optional editor ref
    const editor = useRef(null);

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

                <div className="bg-gray-800 rounded p-2">
                    <label className="block mb-1 text-sm text-gray-400">
                        Description
                    </label>
                    <JoditEditor
                        ref={editor}
                        value={description}
                        onChange={(newContent) => setDescription(newContent)}
                        config={{
                            theme: "dark",
                        }}
                    />
                </div>

                <input
                    className="w-full bg-gray-800 p-2 rounded"
                    placeholder="Tags (comma separated)"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
