import React, {createRef, useEffect} from 'react';
import abcjs from 'abcjs/midi';
import 'abcjs/abcjs-midi.css';

const getAbcNotation = note => {
  const oct = {
    3: {
      sym: ',',
      form: String.prototype.toUpperCase,
    },
    4: {
      sym: '',
      form: String.prototype.toUpperCase,
    },
    5: {
      sym: '',
      form: String.prototype.toLowerCase,
    },
    6: {
      sym: "'",
      form: String.prototype.toLowerCase,
    },
  };

  if (note.oct < 3 || note.oct > 6) return '';

  return (
    (note.isSharp ? '^' : '') +
    oct[note.oct].form.call(note.noteName) +
    oct[note.oct].sym
  );
};

export default function Abc({keys}) {
  const divRef = createRef<HTMLDivElement>();
  console.log(keys);
  useEffect(() => {
    if (!divRef.current) return;
    const abcString = 'M:C\n    [' + keys.map(getAbcNotation).join('') + ']';
    abcjs.renderAbc('vex', abcString, {});
  }, [divRef]);

  return (
    <div
      id="vex"
      style={{justifyContent: 'center', display: 'inline-flex'}}
      ref={divRef}
    ></div>
  );
}
