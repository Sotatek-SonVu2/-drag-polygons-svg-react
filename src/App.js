import React, { useEffect, useState } from "react";
import "./App.css";

const DEFAULT = {
  x: 0,
  y: 0,
  w: 0,
  h: 0,
};

const colors = ["red", "blue", "yellow", "black", "orange"];

function App() {
  const [currentRect, setCurrentRect] = React.useState(DEFAULT);

  const [rects, setRects] = useState([]);

  const [drawing, setDrawing] = useState(false);

  useEffect(() => {
    let isDrawing = false;
    let listRects = [];
    const drawingRect = DEFAULT;
    let last_mousex = 0;
    let last_mousey = 0;

    const updateRect = (newRect) => {
      drawingRect.x = newRect.x || drawingRect.x;
      drawingRect.y = newRect.y || drawingRect.y;
      drawingRect.w = newRect.w || drawingRect.w;
      drawingRect.h = newRect.h || drawingRect.h;
      setCurrentRect({ ...drawingRect });
    };

    const onMouseDown = (e) => {
      isDrawing = true;
      setDrawing(true);
      last_mousex = e.x;
      last_mousey = e.y;
      updateRect({ x: e.x, y: e.y, w: 0, h: 0 });
    };

    const onMouseMove = (e) => {
      if (isDrawing) {
        const width = Math.abs(e.x - last_mousex);
        const height = Math.abs(e.y - last_mousey);

        const rx = e.x < last_mousex ? e.x : last_mousex;
        const ry = e.y < last_mousey ? e.y : last_mousey;
        updateRect({
          x: rx,
          y: ry,
          w: width,
          h: height,
        });
      }
    };

    const onMouseUp = (e) => {
      isDrawing = false;
      updateRect({
        w: Math.abs(e.x - last_mousex),
        h: Math.abs(e.y - last_mousey),
      });
      listRects = [...listRects, { ...drawingRect }];
      setRects(listRects);
      setCurrentRect(DEFAULT);
      drawingRect.x = 0;
      drawingRect.y = 0;
      drawingRect.w = 0;
      drawingRect.h = 0;
      setDrawing(false);
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="App">
      <svg
        width="1300px"
        height="600px"
        style={{ overflow: "hidden", backgroundColor: "#fff" }}
      >
        {drawing && (
          <rect
            x={currentRect.x}
            y={currentRect.y}
            width={currentRect.w}
            height={currentRect.h}
            fill={"green"}
            fillOpacity={0.5}
          />
        )}
        {rects.map((r, index) => (
          <rect
            key={index}
            x={r.x}
            y={r.y}
            width={r.w}
            height={r.h}
            fill={colors[index % 5]}
            fillOpacity={0.8}
          />
        ))}
      </svg>
    </div>
  );
}

export default App;
