import { useState, useEffect } from 'react';
import request from './request';
import fp from 'lodash/fp';
import { webliumInitial } from './initialWeblium';

export const delay = (ms) => new Promise((r) => setTimeout(r, ms));

export const useLedsCount = () => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    request('ledsCount', 'GET').then((d) => setCount(d.count));
  }, []);
  return count;
};

// const requestDebounced = request;
const requestDebounced = fp.throttle(10, request);

const range = (count) => {
  return new Array(count).fill(0).map((x, i) => i);
};

export const useLeds = (count) => {
  const [colors, setColors] = useState(webliumInitial);
  console.log(colors)
  // useEffect(() => {
  //   setColors(range(count).map(() => [0, 0, 0]));
  // }, [count]);
  const change = (index, color) => {
    const updated = colors.map((x, i) => (index === i ? color : x));
    setColors(updated);
    requestDebounced('bitmap', 'POST', updated);
  };
  const clear = () => {
    const value = range(count).map(() => [0, 0, 0]);
    setColors(value);
    requestDebounced('bitmap', 'POST', value);
  };
  const resend = () => {
    requestDebounced('bitmap', 'POST', colors);
  }
  return { change, clear, colors, resend };
};
