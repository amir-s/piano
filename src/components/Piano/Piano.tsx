import React from 'react';
import usePianoKeys from './usePianoKeys';

export const Piano = () => {
  const {keys, ids} = usePianoKeys();

  const allKeys = [];
  for (let i = 0; i < 70; i++) {
    if (i % 12 === 0 || i % 12 === 5) {
      allKeys.push(
        <li key={`group-${i}`}>
          <div className={`anchor ${ids[i] ? 'active' : ''}`}>
            <div className="indicator">⬤</div>
          </div>
        </li>,
      );
    } else {
      allKeys.push(
        <li key={`group-${i}`}>
          <span className={`${ids[i] ? 'active' : ''}`}>
            <div className="indicator">⬤</div>
          </span>
          <div className={`anchor ${ids[i + 1] ? 'active' : ''}`}>
            <div className="indicator">⬤</div>
          </div>
        </li>,
      );
      i++;
    }
  }
  return (
    <>
      <div id="p-wrapper">
        <ul id="piano">{allKeys}</ul>
      </div>
    </>
  );
};
