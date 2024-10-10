import { Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/quizpage" element={<Quiz />} />
        <Route path="/resultspage" element={<Results/>} />
      </Route>
    </Routes>
  );
}

export default App;
