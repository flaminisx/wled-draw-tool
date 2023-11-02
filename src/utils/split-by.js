import fp from 'lodash/fp';

export const splitBy = fp.curry(
  (count, arr) => fp.range(0, count).map((x) => arr.slice(count * x, count * (x + 1))),
);
