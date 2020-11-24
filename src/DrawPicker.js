import React, { useRef, useEffect, useState, useMemo } from 'react';
import fp from 'lodash/fp';
import { ChromePicker } from 'react-color';

const WIDTH = 800;
const HEIGHT = 800;
const MARGIN = 10;

const RECT_SIDE_COUNT = 16;
const RECT_SIDE = (WIDTH - MARGIN * (RECT_SIDE_COUNT - 1)) / RECT_SIDE_COUNT;
const RECT_SIDE_WITH_MARGIN = RECT_SIDE + MARGIN;

console.log({
  WIDTH,
  HEIGHT,
  MARGIN,
  RECT_SIDE,
  RECT_SIDE_COUNT,
  RECT_SIDE_WITH_MARGIN,
});

const getRectCords = (x, y) => {
  if (x > WIDTH || y > HEIGHT) {
    return;
  }
  if (
    x % RECT_SIDE_WITH_MARGIN > RECT_SIDE ||
    y % RECT_SIDE_WITH_MARGIN > RECT_SIDE
  ) {
    return;
  }
  return {
    x: Math.floor(x / RECT_SIDE_WITH_MARGIN),
    y: Math.floor(y / RECT_SIDE_WITH_MARGIN),
  };
};

const getRectanglePos = (x, y) => ({
  x: RECT_SIDE_WITH_MARGIN * x,
  y: RECT_SIDE_WITH_MARGIN * y,
  w: RECT_SIDE,
  h: RECT_SIDE,
});

const draw = (ctx, colors) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let y = 0; y < RECT_SIDE_COUNT; y++) {
    for (let x = 0; x < RECT_SIDE_COUNT; x++) {
      const index = y * RECT_SIDE_COUNT + x;
      const [r, g, b] = colors[index];
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      const { x: xr, y: yr, w, h } = getRectanglePos(x, y);
      ctx.fillRect(xr, yr, w, h);
    }
  }
};

window.addEventListener('keydown', console.log);

const DrawPicker = ({ colors, change }) => {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const [pressed, setPressed] = useState(false);
  const [currentColor, setCurrentColor] = useState([62, 120, 255]);
  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
  }, []);
  useEffect(() => {
    if (ctxRef.current && colors && colors.length) {
      draw(ctxRef.current, colors);
    }
  }, [colors]);
  const mouseMove = (e) => {
    if (!pressed) {
      return;
    }
    const { clientX, clientY } = e;
    const cords = getRectCords(clientX, clientY);
    if (cords) {
      const color = currentColor;
      const index = cords.x + cords.y * RECT_SIDE_COUNT;
      if (!fp.isEqual(color, colors[index])) {
        change(index, color);
      }
    }
  };
  const keydown = () => {
    setPressed(true);
  };
  const keyup = () => {
    setPressed(false);
  };
  const colorObj = useMemo(
    () => ({
      r: currentColor[0],
      g: currentColor[1],
      b: currentColor[2],
    }),
    [currentColor]
  );
  const handleChangeColor = (v) => {
    setCurrentColor([v.rgb.r, v.rgb.g, v.rgb.b]);
  };
  return (
    <div>
      <canvas
        ref={canvasRef}
        onMouseMove={mouseMove}
        width={WIDTH}
        height={HEIGHT}
        onMouseDown={keydown}
        onMouseUp={keyup}
      />
      <ChromePicker color={colorObj} onChange={handleChangeColor} />
    </div>
  );
};

export default DrawPicker;
