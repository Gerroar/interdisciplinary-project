import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Nav from "./components/Nav";
import CreatePage from "./pages/CreatePage";

export default function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
