import React from 'react';
import usePianoKeys from 'hooks/usePianoKeys';
import Piano from 'components/Piano';

export default function Main() {
  const {map, chord} = usePianoKeys();

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
      <Piano pressed={map} start={1} octaves={6} showNotes={true} />
    </>
  );
}
