import React from "react";
type Props = {
    label: string;
    onClick?: () => void;
};

export default function Button({ label, onClick }: Props) {
    return (
        <button
            onClick={onClick}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
        >
            {label}
        </button>
    );
}
