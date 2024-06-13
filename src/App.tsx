import { useRef } from "react";
import { useSprings, animated, config } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import clamp from "lodash.clamp";
import swap from "lodash-move";
import data from "./data";

//ref: https://codesandbox.io/p/sandbox/spring-draggable-list-0x4l9
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

function List() {
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
    if (!active) order.current = newOrder;
  });
  const containerWidth = data.reduce((acc, item) => acc + item.width, 0);

  return (
    <div
      className={
        "relative flex h-[600px] items-center rounded-sm border-2 border-gray-500"
      }
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
          >
            {i}
          </div>
        </animated.div>
      ))}
    </div>
  );
}

export default function App() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <List />
    </div>
  );
}
