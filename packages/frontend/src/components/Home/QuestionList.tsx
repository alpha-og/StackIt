import QuestionItem from "./QuestionItem";

const mockQuestions = [
    {
        id: 1,
        title: "How to join 2 columns in a data set to make a separate column in SQL",
        description:
            "I do not know the code for this as I am a beginner. I want a column to combine first and last name...",
        tags: ["SQL", "Beginner"],
        user: "Adnan Arodiya",
        answers: 5,
    },
    {
        id: 2,
        title: "How to use useState in React",
        description: "I am new to React. How does useState work?",
        tags: ["React", "TypeScript"],
        user: "Responsible Dolphin",
        answers: 3,
    },
    {
        id: 3,
        title: "How to read CSV in Python",
        description: "I want to load a CSV file into pandas dataframe.",
        tags: ["Python", "Data"],
        user: "Enchanting Viper",
        answers: 2,
    },
];

export default function QuestionList() {
    return (
        <div className="space-y-4">
            {mockQuestions.map((q) => (
                <QuestionItem key={q.id} question={q} />
            ))}
        </div>
    );
}
