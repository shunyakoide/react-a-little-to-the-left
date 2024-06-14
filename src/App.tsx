import Books from "./components/Books";
import Curtain from "./components/Curtain";
import Stars from "./components/Star";

export default function App() {
  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center overflow-hidden border-2 border-blue-200"
      style={{
        backgroundColor: "#FBF2ED",
      }}
    >
      <Stars />
      <Curtain />
      <Books />
    </div>
  );
}
