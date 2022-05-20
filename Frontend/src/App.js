import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./components/Nav";
import HandleInfoPage from "./pages/HandleInfoPage";

export default function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<HandleInfoPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
