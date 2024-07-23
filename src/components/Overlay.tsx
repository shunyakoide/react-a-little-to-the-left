export function Overlay() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 40,
        width: "100%",
        padding: "0 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: 12,
        lineHeight: "1em",
        color: "black",
        zIndex: 9999,
      }}
    >
      <div>
        <p>React A Little To The Left</p>
      </div>
      <div>
        <p
          style={{
            display: "flex",
            gap: 10,
            textAlign: "right",
          }}
        >
          <a href="https://twitter.com/shunyadezain">X</a>
          <a href="https://github.com/shunyakoide">github</a>
          <a href="https://github.com/shunyakoide/react-a-little-to-the-left">
            code
          </a>
        </p>
      </div>
    </div>
  );
}
