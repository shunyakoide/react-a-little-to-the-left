import { useEffect, useRef } from "react";
import { useSprings, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import clamp from "lodash.clamp";
import swap from "lodash-move";
import data, { answers } from "../data";
import useSound from "use-sound";
import { useStore } from "../store";

//ref: https://codesandbox.io/p/sandbox/spring-draggable-list-0x4l9
// Sound Effect from Pixabay https://pixabay.com

const soundConfig = {
  volume: 0.2,
  interrupt: true,
};

const fn =
  (order: number[], active = false, originalIndex = 0, curIndex = 0, x = 0) =>
  (index: number) =>
    active && index === originalIndex
      ? {
          x: curIndex * 100 + x, //y: (height += data.height) - data.height
          y: -20,
          zIndex: 1,
          immediate: (key: string) => key === "zIndex",
          config: (key: string) =>
            key === "x" ? config.stiff : config.default,
        }
      : {
          x: order.indexOf(index) * 100,
          y: 0,
          zIndex: 0,
          immediate: false,
        };

function Books() {
  const [bookDrop] = useSound("./sounds/book_drop.mp3", {
    duration: 1,
    ...soundConfig,
  });
  const [successSound] = useSound("./sounds/success.mp3", {
    ...soundConfig,
  });

  const setOpen = useStore((state) => state.setOpen);
  const result = useStore((state) => state.result);
  const setResult = useStore((state) => state.setResult);
  const resetting = useStore((state) => state.reseting);

  const updateResult = (ov: boolean[], nv: boolean[]): boolean[] => {
    return ov.map((ov, index) => ov || nv[index]);
  };

  const checkAnswer = (array: number[]) => {
    const answer = answers.map((_, index) => {
      return answers[index].every((v, i) => v === array[i]);
    });
    const hasCorrectAnswer = answer.some((v) => v === true);

    const newResult = updateResult(result, answer);
    console.log(
      "result",
      result,
      "answer",
      answer,
      "hasCorrectAnswer",
      hasCorrectAnswer,
      "newResult",
      newResult
    );
    if (hasCorrectAnswer) {
      successSound();
      setResult(newResult);

      setTimeout(() => {
        setOpen(true);
      }, 2000);
    }
  };

  const order = useRef(data.map((_, index) => index)); // Store indicies as a local ref, this represents the item order
  const [springs, api] = useSprings(data.length, fn(order.current)); // Create springs, each corresponds to an item, controlling its transform, scale, etc.
  const bind = useDrag(({ args: [originalIndex], active, movement: [x] }) => {
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + x) / 100),
      0,
      data.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    api.start(fn(newOrder, active, originalIndex, curIndex, x)); // Feed springs new style data, they'll animate the view without causing a single render

    if (!active) {
      document.body.style.cursor = "auto";
      order.current = newOrder;
      bookDrop();
      checkAnswer(newOrder);
    } else {
      document.body.style.cursor = "grabbing";
    }
  });

  const containerWidth = data.reduce((acc, item) => acc + item.width, 0);

  useEffect(() => {
    api.start(fn(order.current));
  }, [api]);

  useEffect(() => {
    const resetOrder = (order.current = data.map((_, index) => index));
    if (resetting) {
      setTimeout(() => {
        api.start(fn(resetOrder));
      }, 500);
    }
  }, [api, resetting]);

  return (
    <div
      className={"relative flex h-[600px] items-center rounded-sm"}
      style={{ width: containerWidth }}
    >
      {springs.map(({ zIndex, x, y }, i) => (
        <animated.div
          className="absolute h-full overflow-hidden rounded-lg"
          {...bind(i)}
          key={i}
          style={{
            width: data[i].width,
            zIndex,
            x,
            y,
          }}
        >
          <div
            style={{
              backgroundImage: `url(${data[i].image})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
            className="size-full p-6 text-black"
          />
        </animated.div>
      ))}
    </div>
  );
}

export default Books;
