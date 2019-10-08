import React from 'react';
import {NOTES} from 'hooks/usePianoKeys';

interface Props {
  pressed: {
    [id: number]: boolean;
  };
  start: number;
  octaves: number;
  showNotes?: boolean;
}
export const Piano = ({pressed, start, octaves, showNotes}) => {
  function getKeyIndicator(index) {
    if (showNotes) return NOTES[index % 12];
    return '⬤';
  }

  const allKeys = [];
  for (let octave = start; octave < octaves; octave++) {
    for (let i = octave * 12; i < octave * 12 + 12; i++) {
      if (i % 12 === 0 || i % 12 === 5) {
        allKeys.push(
          <div key={`group-${i}`} className="group">
            <div className={`anchor ${pressed[i] ? 'active' : ''}`}>
              <div className="indicator">{getKeyIndicator(i)}</div>
            </div>
          </div>,
        );
      } else {
        allKeys.push(
          <div key={`group-${i}`} className="group">
            <div className={`black ${pressed[i] ? 'active' : ''}`}>
              <div className="indicator">{getKeyIndicator(i)}</div>
            </div>
            <div className={`anchor ${pressed[i + 1] ? 'active' : ''}`}>
              <div className="indicator">{getKeyIndicator(i + 1)}</div>
            </div>
          </div>,
        );
        i++;
      }
    }
  }
  return (
    <div id="piano-wrapper">
      <div id="piano">{allKeys}</div>
    </div>
  );
};
