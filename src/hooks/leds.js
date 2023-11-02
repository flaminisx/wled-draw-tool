import { useState } from 'react';
import fp from 'lodash/fp';
import { createWledApi } from '../api/wled-api';

const api = createWledApi({ ip: '192.168.0.119' });

const sendThrottled = fp.throttle(60, api.sendData);

const createEmpty = (count) => fp.range(0, count).map(() => [0, 0, 0]);

export const useLeds = (count) => {
  const [values, setValues] = useState(() => createEmpty(count));
  const change = (index, color) => {
    const updated = values.map((x, i) => (index === i ? color : x));
    setValues(updated);
    sendThrottled(updated);
  };
  const clear = () => {
    const value = createEmpty(count);
    setValues(value);
    sendThrottled(value);
  };
  const resend = () => {
    sendThrottled(values);
  };
  return {
    change, clear, values, resend,
  };
};
