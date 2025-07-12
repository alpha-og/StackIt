import React from "react";
export default function Tag({ label }: { label: string }) {
    return (
        <span className="bg-gray-700 px-2 py-0.5 rounded text-sm">{label}</span>
    );
}
