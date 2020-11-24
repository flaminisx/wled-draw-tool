import React from 'react';
import css from './App.module.css';
import Cell from './Cell';

const SimpleGridPicker = ({ colors, createHandler }) => (
  <div className={css.App}>
    {colors.map((x, i) => (
      <Cell key={i} color={x} onChange={createHandler(i)} />
    ))}
  </div>
);

export default SimpleGridPicker;
