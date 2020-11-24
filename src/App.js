import React from 'react';
import styles from './App.module.css';
import { useLedsCount, useLeds } from './leds';
import DrawPicker from './DrawPicker';

function App() {
  // const count = useLedsCount();
  const { change, clear, colors, resend } = useLeds(256);
  const createHandler = (index) => (color) => change(index, color);
  return (
    <div className={styles.App}>
      <DrawPicker change={change} colors={colors} />
      <button onClick={clear}>clear</button>
      <button onClick={resend}>resend</button>
    </div>
  );
}

export default App;
