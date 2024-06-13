import Books from "./components/Books";
import Curtain from "./components/Curtain";
import Star from "./components/Star";

export default function App() {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center overflow-hidden border-2 border-blue-200 bg-gray-300">
      <Star />
      <Curtain />
      <Books />
    </div>
  );
}
