import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function Star() {
  const container = useRef<HTMLDivElement>(null!);
  const tl = useRef<gsap.core.Timeline>();

  const { contextSafe } = useGSAP(
    () => {
      console.log("creating timeline");
      tl.current = gsap
        .timeline({ paused: true })
        .to(".star", {
          scale: 1,
          ease: "elastic.out(0.3, 0)",
          duration: 1.5,
        })
        .to(
          ".dot",
          {
            opacity: 1,
            duration: 1,
          },
          "<"
        )
        .to(
          ".dot",
          {
            translateY: -150,
            duration: 0.3,
          },
          "<"
        )
        .to(
          ".dot",
          {
            height: 0,
          },
          "-=1.3"
        )
        .to(".star", {
          y: () => window.innerHeight / 2 + 100,
          duration: 1.8,
          ease: "elastic.in(0.3, 0)",
        })
        .to(
          ".line",
          {
            opacity: 1,
          },
          "<"
        )
        .to(
          ".line",
          {
            scaleY: 200,
            transformOrigin: "top",
            stagger: {
              each: 0.1,
              //   from: "end",
            },
            duration: 0.8,
            ease: "sine.in",
            delay: 1.3,
          },
          "<"
        )
        .to(
          ".line",
          {
            y: () => window.innerHeight / 2 + 100,
            duration: 1.5,
            stagger: {
              each: 0.3,
            },
            ease: "sine.in",
            delay: 0.1,
          },
          "<"
        );
    },
    { scope: container }
  );

  const startAnimation = contextSafe(() => {
    tl.current?.play();
  });

  const DOTS_COUNT = 8;
  const dots = Array.from({ length: DOTS_COUNT }).map((_, index) => {
    const angle = (360 / DOTS_COUNT) * index;
    return (
      <div key={index} style={{ rotate: `${angle}deg` }}>
        <div className="dot absolute h-10 w-2 rounded bg-white opacity-0" />
      </div>
    );
  });

  return (
    <div
      ref={container}
      className="pointer-events-none absolute inset-0 z-20 m-auto flex items-center justify-center"
    >
      <div className="star size-36 scale-0 bg-[url(./stars/star.png)] bg-contain bg-center bg-no-repeat" />
      <div className="absolute">{dots}</div>
      <div className="absolute mb-16 flex gap-2">
        <div className="line h-1 w-2 bg-white opacity-0" />
        <div className="line mt-8 h-1 w-2 bg-white opacity-0" />
      </div>
    </div>
  );
}
export default Star;
