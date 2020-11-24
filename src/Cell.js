import React, { useState, useMemo, useCallback } from 'react';
import styles from './Cell.module.css';
import { ChromePicker } from 'react-color';

const useWindowWidth = () => {
  const [state, setState] = useState(window.innerWidth)
  return state
}

const Cell = ({ color, onChange }) => {
  const [open, setOpen] = useState(false);
  const width = useWindowWidth()
  const openPicker = () => {
    setOpen(true);
  };
  const closePicker = () => {
    setOpen(false);
  };
  const colorObj = useMemo(
    () => ({
      r: color[0],
      g: color[1],
      b: color[2],
    }),
    [color]
  );
  const handleChange = useCallback(
    (v) => {
      onChange([v.rgb.r, v.rgb.g, v.rgb.b]);
    },
    [onChange]
  );
  const style = {
    backgroundColor: `rgb(${color.join(',')})`
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.cell} style={style} onClick={openPicker} />
      {open ? (
        <div className={styles.popover}>
          <div className={styles.cover} onClick={closePicker} />
          <ChromePicker color={colorObj} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default Cell;
