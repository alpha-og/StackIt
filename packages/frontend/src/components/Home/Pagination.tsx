import React from "react";
export default function Pagination() {
    return (
        <div className="flex justify-center gap-2 mt-6">
            {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                <button
                    key={n}
                    className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700"
                >
                    {n}
                </button>
            ))}
            <button className="px-3 py-1 rounded border border-gray-600 hover:bg-gray-700">
                &gt;
            </button>
        </div>
    );
}
