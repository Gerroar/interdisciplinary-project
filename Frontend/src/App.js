import { Routes, Route } from "react-router-dom";
import HandleInfoPage from "./pages/HandleInfoPage";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HandleInfoPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </main>
  );
}
