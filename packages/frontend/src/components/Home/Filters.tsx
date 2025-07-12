import React from "react";
export default function Filters() {
    return (
        <div className="flex gap-2">
            <button className="bg-gray-700 px-3 py-1 rounded">Newest</button>
            <button className="bg-gray-700 px-3 py-1 rounded">
                Unanswered
            </button>
            <button className="bg-gray-700 px-3 py-1 rounded">More ▾</button>
        </div>
    );
}
