import Filters from "./Filters";
import QuestionList from "./QuestionList";
import Pagination from "./Pagination";
import SearchBar from "../Common/SearchBar";
import { Link } from "react-router-dom";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-gray-900 text-white p-4">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">StackIt</h1>
                <Link
                    to="/login"
                    className="border px-4 py-2 rounded hover:bg-gray-700"
                >
                    Login
                </Link>
            </header>
            <div className="flex flex-wrap gap-4 mb-4">
                <Link
                    to="/ask"
                    className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded"
                >
                    Ask New Question
                </Link>
                <Filters />
                <SearchBar />
            </div>
            <QuestionList />
            <Pagination />
        </div>
    );
}
