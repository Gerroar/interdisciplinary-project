import { Routes, Route } from "react-router-dom";
import HandleInfoPage from "./pages/HandleInfoPage";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MyPosts from "./pages/Myposts";

export default function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<HandleInfoPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/profile" element={<ProfilePage />} />
        <Route path="/home/myposts" element={<MyPosts />} />
      </Routes>
    </main>
  );
}
