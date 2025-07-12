import React, { useState } from "react";

export default function Filters() {
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState<boolean>(false);

    const allFilters = [
        "Newest",
        "Unanswered",
        "Most Voted",
        "My Questions",
        "Tagged",
        "Active",
    ];

    const toggleFilter = (filter: string) => {
        setSelectedFilters((prev) =>
            prev.includes(filter)
                ? prev.filter((f) => f !== filter)
                : [...prev, filter],
        );
    };

    const removeFilter = (filter: string) => {
        setSelectedFilters((prev) => prev.filter((f) => f !== filter));
    };

    return (
        <div className="relative max-w-sm">
            {/* Main dropdown button */}
            <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center"
            >
                Filters ▾
            </button>

            {/* Dropdown */}
            {showDropdown && (
                <div className="absolute z-10 mt-1 bg-gray-800 border border-gray-700 rounded shadow-lg w-48">
                    {allFilters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`w-full text-left px-4 py-2 hover:bg-gray-700 ${
                                selectedFilters.includes(filter)
                                    ? "bg-gray-700 text-blue-400"
                                    : ""
                            }`}
                        >
                            {selectedFilters.includes(filter) ? "✓ " : ""}
                            {filter}
                        </button>
                    ))}
                </div>
            )}

            {/* Selected Filter Badges */}
            {selectedFilters.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {selectedFilters.map((filter) => (
                        <span
                            key={filter}
                            className="bg-gray-700 text-sm px-2 py-1 rounded-full flex items-center gap-1"
                        >
                            {filter}
                            <button
                                onClick={() => removeFilter(filter)}
                                className="text-gray-400 hover:text-white ml-1"
                            >
                                ❌
                            </button>
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
