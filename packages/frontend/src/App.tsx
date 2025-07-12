import { useState } from "react";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <h1>Hello world!</h1>
            <p>You clicked {count} times.</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
        </>
    );
}

export default App;
