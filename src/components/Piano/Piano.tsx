import React from 'react';
import usePianoKeys from './usePianoKeys';
const LABELS = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];
export const Piano = () => {
  const {keys, map, chord} = usePianoKeys();

  const allKeys = [];
  for (let octave = 1; octave < 6; octave++) {
    for (let i = octave * 12; i < octave * 12 + 12; i++) {
      if (i % 12 === 0 || i % 12 === 5) {
        allKeys.push(
          <div key={`group-${i}`} className="group">
            <div className={`anchor ${map[i] ? 'active' : ''}`}>
              <div className="indicator">{getKeyIndicator(i)}</div>
            </div>
          </div>,
        );
      } else {
        allKeys.push(
          <div key={`group-${i}`} className="group">
            <div className={`black ${map[i] ? 'active' : ''}`}>
              <div className="indicator">{getKeyIndicator(i)}</div>
            </div>
            <div className={`anchor ${map[i + 1] ? 'active' : ''}`}>
              <div className="indicator">{getKeyIndicator(i + 1)}</div>
            </div>
          </div>,
        );
        i++;
      }
    }
  }
  return (
    <>
      <div className="chord">
        <h2>
          {chord && (
            <>
              {chord.base} {chord.type}
            </>
          )}
        </h2>
      </div>
      <div id="piano-wrapper">
        <div id="piano">{allKeys}</div>
      </div>
    </>
  );
};

function getKeyIndicator(index) {
  return LABELS[index % 12];
  return '⬤';
}
