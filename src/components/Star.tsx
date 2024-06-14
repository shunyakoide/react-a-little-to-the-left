import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "../store";

function Stars() {
  const container = useRef<HTMLDivElement>(null!);
  const tl = useRef<gsap.core.Timeline>();

  const open = useStore((state) => state.open);
  const setOpen = useStore((state) => state.setOpen);
  const result = useStore((state) => state.result);
  const correctCount = result.filter((v) => v).length;

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".star", { scale: 0 });
      gsap.set(".dot", { opacity: 0 });

      tl.current = gsap
        .timeline({
          paused: true,
          delay: 0.5,
          onComplete: () => setOpen(false),
        })
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
        .to(
          ".star-container",
          {
            y: () => window.innerHeight / 2 + 100,
            duration: 1.6,
            stagger: {
              each: 0.3,
            },
            ease: "elastic.in(0.3, 0)",
          },
          "-=0.5"
        );
    },
    { scope: container }
  );

  const startAnimation = contextSafe(() => {
    tl.current?.restart();
  });

  useEffect(() => {
    if (open) {
      startAnimation();
    }
  }, [open, startAnimation]);

  return (
    <div
      ref={container}
      className="pointer-events-none absolute inset-0 z-20 m-auto flex items-center justify-center gap-24"
    >
      <Star type="solid" />
      {/* FIXME: 装飾が見えない はじめにレンダリングされていないため*/}
      {correctCount >= 2 ? <Star type="solid" /> : <Star type="line" />}
    </div>
  );
}

const DOTS_COUNT = 8;

type StarProps = {
  type?: "solid" | "line";
};

function Star({ type = "solid" }: StarProps) {
  const dots = Array.from({ length: DOTS_COUNT }).map((_, index) => {
    const angle = (360 / DOTS_COUNT) * index;
    return (
      <div key={index} style={{ rotate: `${angle}deg` }}>
        <div className="dot absolute h-10 w-2 rounded bg-white" />
      </div>
    );
  });

  return (
    <div className="star-container relative flex size-36 items-center justify-center">
      {type === "line" ? (
        <div className="star size-36 bg-[url(./stars/star-line.png)] bg-contain bg-center bg-no-repeat" />
      ) : (
        <>
          <div className="star absolute size-36 bg-[url(./stars/star.png)] bg-contain bg-center bg-no-repeat" />
          <div className="absolute">{dots}</div>
        </>
      )}
    </div>
  );
}

export default Stars;
