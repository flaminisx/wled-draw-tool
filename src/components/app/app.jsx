import { useState, useMemo } from 'react';
import { ChromePicker } from 'react-color';
import styles from './app.module.css';
import { useLeds } from '../../hooks/leds';
import DrawPicker from '../draw-picker/draw-picker';
import { Button } from '../button';

function App() {
  const {
    change, clear, values, resend,
  } = useLeds(256);
  const [color, setColor] = useState([255, 128, 0]);
  const colorObj = useMemo(
    () => ({
      r: color[0],
      g: color[1],
      b: color[2],
    }),
    [color],
  );
  const handleChangeColor = (v) => {
    setColor([v.rgb.r, v.rgb.g, v.rgb.b]);
  };
  return (
    <div className={styles.app}>
      <div className={styles.actions}>
        <Button onClick={clear}>clear</Button>
        <Button onClick={resend} className={styles.ml}>resend</Button>
      </div>
      <DrawPicker className={styles.imagePicker} change={change} values={values} color={color} />
      <div className={styles.colorPicker}>
        <ChromePicker color={colorObj} onChange={handleChangeColor} />
      </div>
    </div>
  );
}

export default App;
