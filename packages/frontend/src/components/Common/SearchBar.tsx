import React from "react";
export default function SearchBar() {
    return (
        <div className="flex items-center bg-gray-800 rounded px-2 py-1">
            <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none px-2 text-white w-full"
            />
            <button className="text-gray-400 hover:text-white">🔍</button>
        </div>
    );
}
