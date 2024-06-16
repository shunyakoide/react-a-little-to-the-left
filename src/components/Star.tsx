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

  const { contextSafe } = useGSAP(
    () => {
      gsap.set(".star", { scale: 0 });
      gsap.set(".dot", { opacity: 0 });

      tl.current = gsap
        .timeline({
          paused: true,
          delay: 0.5,
          onComplete: () => {
            setOpen(false);
          },
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
            duration: 0,
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
      {result
        .sort((x, y) => {
          return x === y ? 0 : x ? -1 : 1;
        })
        .map((v, index) => (
          <Star key={index} type={v ? "solid" : "line"} />
        ))}
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

  const base = "star absolute size-36 bg-contain bg-center bg-no-repeat";
  const starStyle = {
    line: base + " bg-[url(./stars/star-line.png)]",
    solid: base + " bg-[url(./stars/star.png)]",
  };
  const dotStyle = {
    line: "hidden",
    solid: "absolute block",
  };

  return (
    <div className="star-container relative flex size-36 items-center justify-center">
      <div className={starStyle[type]} />
      <div className={dotStyle[type]}>{dots}</div>
    </div>
  );
}

export default Stars;
