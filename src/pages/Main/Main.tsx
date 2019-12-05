import React from 'react';
import usePianoKeys from 'hooks/usePianoKeys';
import Piano from 'components/Piano';
import Abc from 'components/Abc';
import SoundPlayer from 'components/SoundPlayer';

export default function Main() {
  const {keys, map, chord} = usePianoKeys();

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
      <Piano pressed={map} start={1} octaves={5} showNotes={true} />
      <Abc keys={keys} />
      <SoundPlayer keys={keys} />
    </>
  );
}
