import React from 'react';
import usePianoKeys from './usePianoKeys';

export const Piano = () => {
  const {keys, map, chord} = usePianoKeys();

  const allKeys = [];
  for (let octave = 3; octave < 6; octave++) {
    for (let i = octave * 12; i < octave * 12 + 12; i++) {
      if (i % 12 === 0 || i % 12 === 5) {
        allKeys.push(
          <li key={`group-${i}`}>
            <div className={`anchor ${map[i] ? 'active' : ''}`}>
              <div className="indicator">⬤</div>
            </div>
          </li>,
        );
      } else {
        allKeys.push(
          <li key={`group-${i}`}>
            <span className={`${map[i] ? 'active' : ''}`}>
              <div className="indicator">⬤</div>
            </span>
            <div className={`anchor ${map[i + 1] ? 'active' : ''}`}>
              <div className="indicator">⬤</div>
            </div>
          </li>,
        );
        i++;
      }
    }
  }
  return (
    <>
      <div id="p-wrapper">
        <ul id="piano">{allKeys}</ul>
      </div>
      <div>
        {chord && (
          <h2>
            {chord.base} {chord.type}
          </h2>
        )}
      </div>
    </>
  );
};
