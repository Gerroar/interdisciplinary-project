import { Routes, Route, Navigate } from "react-router-dom";
import SigninPage from "./pages/SigninPage";
import Nav from "./components/Nav";

export default function App() {
  return (
    <main>
      <Nav />
      <Routes>
        <Route path="/" element={<SigninPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </main>
  );
}
