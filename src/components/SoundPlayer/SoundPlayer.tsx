import React, {useState, useMemo} from 'react';
import Tone from 'tone';

interface Props {
  keys: any;
}

export function SoundPlayer({keys}: Props) {
  const synth = useMemo(() => {
    return new Tone.PolySynth(10, Tone.Synth, {
      oscillator: {
        type: 'triangle8',
      },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.4,
        release: 4,
      },
    }).toMaster();
  }, []);

  const [previousState, setPreviousState] = useState({});
  const current = keys
    .map(key => {
      return key.name;
    })
    .reduce((obj, curr) => {
      obj[curr] = true;
      return obj;
    }, {});

  const keysToRelease = Object.keys(previousState).filter(key => {
    return !current[key];
  });

  synth.triggerRelease(keysToRelease);

  const keysToAttack = Object.keys(current).filter(key => {
    return !previousState[key];
  });

  synth.triggerAttack(keysToAttack);

  if (keysToRelease.length || keysToAttack.length) {
    setPreviousState(current);
  }

  return null;
}
