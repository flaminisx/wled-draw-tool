import fp from 'lodash/fp';
import { splitBy } from '../utils/split-by';

const colorNumToStr = (value) => Number(Number(value).toFixed(0)).toString(16).padStart(2, 0);
const colorArrToStr = (value) => value.reduce((acc, cur) => acc + colorNumToStr(cur), '');

const matrixMapper = fp.pipe(
  splitBy(16),
  fp.map(fp.reverse),
  fp.flatten,
);

const prepareData = (value) => ({ seg: { i: matrixMapper(value).map(colorArrToStr) } });

export const createWledApi = (options) => {
  const url = `http://${options.ip}/json`;

  return {
    sendData: (value) => {
      fetch(url, { method: 'POST', body: JSON.stringify(prepareData(value)) });
    },
  };
};
