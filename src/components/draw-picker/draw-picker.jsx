import React, { useRef, useEffect, useState } from 'react';
import fp from 'lodash/fp';

const WIDTH = 800;
const HEIGHT = 800;
const MARGIN = 10;

const RECT_SIDE_COUNT = 16;
const RECT_SIDE = (WIDTH - MARGIN * (RECT_SIDE_COUNT - 1)) / RECT_SIDE_COUNT;
const RECT_SIDE_WITH_MARGIN = RECT_SIDE + MARGIN;

const BLACK = [0, 0, 0];

const getRectCords = (x, y) => {
  if (x > WIDTH || y > HEIGHT) {
    return false;
  }
  if (
    x % RECT_SIDE_WITH_MARGIN > RECT_SIDE
    || y % RECT_SIDE_WITH_MARGIN > RECT_SIDE
  ) {
    return false;
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

const draw = (ctx, values) => {
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  for (let y = 0; y < RECT_SIDE_COUNT; y++) {
    for (let x = 0; x < RECT_SIDE_COUNT; x++) {
      const index = y * RECT_SIDE_COUNT + x;
      const [r, g, b] = values[index];
      ctx.fillStyle = `rgb(${r},${g},${b})`;
      const {
        x: xr, y: yr, w, h,
      } = getRectanglePos(x, y);
      ctx.fillRect(xr, yr, w, h);
    }
  }
};

function DrawPicker({
  className, color, values, change,
}) {
  const canvasRef = useRef();
  const ctxRef = useRef();
  const [pressed, setPressed] = useState(false);
  const canvasBoundingRectRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    ctxRef.current = canvasRef.current.getContext('2d');
    canvasBoundingRectRef.current = canvasRef.current.getBoundingClientRect();
    canvasRef.current.addEventListener('contextmenu', (e) => e.preventDefault());
  }, []);

  useEffect(() => {
    if (ctxRef.current && values && values.length) {
      draw(ctxRef.current, values);
    }
  }, [values]);

  const processRect = (x, y, currentColor) => {
    const cords = getRectCords(x, y);
    if (cords) {
      const index = cords.x + cords.y * RECT_SIDE_COUNT;
      if (!fp.isEqual(currentColor, values[index])) {
        change(index, currentColor);
      }
    }
  };

  const mouseMove = (e) => {
    if (!pressed) {
      return;
    }

    const { clientX, clientY } = e;
    const { x: canvasX, y: canvasY } = canvasBoundingRectRef.current;
    console.log({ canvasX, canvasY });
    processRect(clientX - canvasX, clientY - canvasY, pressed === 1 ? color : BLACK);
  };

  const keydown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(e.button);
    const pressedButton = e.button === 2 ? 2 : 1;
    setPressed(pressedButton);
    const { clientX, clientY } = e;
    const { x: canvasX, y: canvasY } = canvasBoundingRectRef.current;
    processRect(clientX - canvasX, clientY - canvasY, pressed === 1 ? color : BLACK);
  };

  const keyup = () => {
    setPressed(false);
  };

  return (
    <div className={className}>
      <canvas
        ref={canvasRef}
        onMouseMove={mouseMove}
        width={WIDTH}
        height={HEIGHT}
        onMouseDown={keydown}
        onMouseUp={keyup}
      />
    </div>
  );
}

export default DrawPicker;
