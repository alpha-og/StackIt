import React, { useState } from "react";
import Button from "../Common/Button";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        const url = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
        const body = isLogin
            ? JSON.stringify({ email, password })
            : JSON.stringify({ username, email, password });

        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body,
            });

            let data;
            try {
                data = await response.json();
            } catch (jsonError) {
                console.error("Failed to parse JSON response:", jsonError);
                const textResponse = await response.text();
                console.error("Raw response:", textResponse);
                setError("An unexpected error occurred. Please try again.");
                return;
            }

            if (response.ok) {
                console.log(data.message, data.user);
                navigate("/"); // Redirect to home page on success
            } else {
                setError(data.error || "An unexpected error occurred.");
            }
        } catch (err) {
            console.error("Auth error:", err);
            setError("Failed to connect to the server.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
            <form
                onSubmit={handleSubmit}
                className="bg-gray-800 p-8 rounded shadow-md w-full max-w-sm space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center">
                    {isLogin ? "Login to StackIt" : "Register for StackIt"}
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {!isLogin && (
                    <input
                        type="text"
                        className="w-full px-3 py-2 bg-gray-700 rounded outline-none"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                )}
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
                <Button label={isLogin ? "Login" : "Register"} />
                <p className="text-center text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        className="text-blue-400 cursor-pointer"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </form>
        </div>
    );
}
