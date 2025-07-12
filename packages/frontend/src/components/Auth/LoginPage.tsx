import React from "react";
import { useState } from "react";
import Button from "../Common/Button";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Replace with real login logic
        console.log("Logging in with", { email, password });
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">
                    Login to StackIt
                </h2>
                <input
                    type="email"
                    className="w-full px-3 py-2 bg-gray-700 rounded outline-none"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    className="w-full px-3 py-2 bg-gray-700 rounded outline-none"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button label="Login" />
            </form>
        </div>
    );
}
