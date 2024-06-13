import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

function Curtain() {
  const container = useRef<HTMLDivElement>(null!);
  const tl = useRef<gsap.core.Timeline>();

  const { contextSafe } = useGSAP(
    () => {
      console.log("creating timeline");
      tl.current = gsap
        .timeline()
        .to(".curtain", {
          scaleY: "100%",
          delay: 0,
        })
        .to(
          ".curtain-top",
          {
            height: "0%",
            transformOrigin: "top",
            stagger: {
              each: 0.3,
              from: "end",
            },
          },
          "-=0.2"
        )
        .to(
          ".curtain-bottom",
          {
            height: "0%",
            transformOrigin: "bottom",
            stagger: {
              each: 0.3,
              from: "end",
            },
          },
          "<"
        );
    },
    { scope: container }
  );

  const startAnimation = contextSafe(() => {
    tl.current?.play();
  });

  useEffect(() => {
    startAnimation();
  }, []);

  return (
    <div
      ref={container}
      className="pointer-events-none absolute z-10 h-screen w-screen"
      onClick={startAnimation}
    >
      <div className="curtain curtain-half absolute left-0 top-0 size-full scale-y-0">
        <div className="curtain-top absolute left-0 top-0 h-1/2 w-full  bg-red-500 " />
        <div className="curtain-top absolute left-0 top-0 h-1/2 w-full  bg-blue-500 " />
        <div className="curtain-top absolute left-0 top-0 h-1/2 w-full  bg-green-500 " />
        <div className="curtain-bottom absolute bottom-0 left-0 h-1/2 w-full  bg-red-500 " />
        <div className="curtain-bottom absolute bottom-0 left-0 h-1/2 w-full  bg-blue-500 " />
        <div className="curtain-bottom absolute bottom-0 left-0 h-1/2 w-full  bg-green-500 " />
      </div>
    </div>
  );
}

export default Curtain;
