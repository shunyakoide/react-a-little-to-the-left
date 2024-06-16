import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "../store";

gsap.registerPlugin(useGSAP);

function Reset() {
  const reset = useStore((state) => state.reset);

  return (
    <div className="absolute top-0 my-auto w-fit rounded-b-xl bg-slate-500/50 px-16 py-4">
      <div
        className="mx-auto size-12 bg-contain bg-center bg-no-repeat transition-all duration-300 hover:scale-125 hover:cursor-pointer"
        style={{ backgroundImage: "url(./reset.png)" }}
        onClick={reset}
      />
    </div>
  );
}

export default Reset;
