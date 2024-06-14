import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "../store";

gsap.registerPlugin(useGSAP);

const color = ["#CDD5C6", "#B7BCBF", "#FFE2C3"];

function Curtain() {
  const container = useRef<HTMLDivElement>(null!);
  const tl = useRef<gsap.core.Timeline>();

  const open = useStore((state) => state.open);

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
              each: 0.4,
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
              each: 0.4,
              from: "end",
            },
          },
          "<"
        );
    },
    { scope: container }
  );

  const startAnimation = contextSafe(() => {
    tl.current?.restart();
  });

  useEffect(() => {
    startAnimation();
  }, []);

  useEffect(() => {
    if (open) {
      startAnimation();
    }
  }, [open, startAnimation]);

  return (
    <div
      ref={container}
      className="pointer-events-none absolute z-10 h-screen w-screen"
      onClick={startAnimation}
    >
      <div className="curtain curtain-half absolute left-0 top-0 size-full scale-y-0">
        {color.map((c, index) => (
          <div
            key={index}
            className="curtain-top absolute left-0 top-0 h-1/2 w-full"
            style={{ backgroundColor: c }}
          />
        ))}
        {color.map((c, index) => (
          <div
            key={index}
            className="curtain-bottom absolute bottom-0 left-0 h-1/2 w-full"
            style={{ backgroundColor: c }}
          />
        ))}
      </div>
    </div>
  );
}

export default Curtain;
