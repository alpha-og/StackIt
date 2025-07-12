import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import LoginPage from "./components/Auth/LoginPage";
import AskPage from "./components/Questions/AskPage";
import QuestionDetailPage from "./components/Questions/QuestionDetailPage";

function App() {
    return (
        <Router>
            <div className="font-sans">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/ask" element={<AskPage />} />
                    <Route
                        path="/question/:id"
                        element={<QuestionDetailPage />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
