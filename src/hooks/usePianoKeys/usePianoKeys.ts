import {useRemoteState} from 'hooks/remote';

export const NOTES = [
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

interface KeysState {
  [id: string]: boolean;
}

const getKeyDetail = function(keyId: number) {
  return {
    key: keyId,
    note: NOTES[keyId % 12],
    noteName: NOTES[keyId % 12].substr(0, 1),
    oct: Math.ceil((keyId + 1) / 12),
    isSharp: [1, 3, 6, 8, 10].includes(keyId % 12),
  };
};

const CHORDS_CONFIG = [
  {
    label: 'major',
    steps: [0, 4, 7],
  },
  {
    label: 'minor',
    steps: [0, 3, 7],
  },
  {
    label: 'dim',
    steps: [0, 3, 6],
    rootOnly: true,
  },
  {
    label: 'aug',
    steps: [0, 4, 8],
    rootOnly: true,
  },
  {
    label: '7',
    steps: [0, 4, 7, 10],
  },
  {
    label: 'minor 7',
    steps: [0, 3, 7, 10],
  },
  {
    label: 'maj7',
    steps: [0, 4, 7, 11],
  },
  {
    label: 'minor maj7',
    steps: [0, 3, 7, 11],
  },
];

const CHORDS = {};
NOTES.forEach((base, index) => {
  CHORDS_CONFIG.forEach(chord => {
    for (
      let startingStep = 0;
      startingStep < chord.steps.length;
      startingStep++
    ) {
      const notes = [];
      for (let i = 0; i < chord.steps.length; i++) {
        notes.push(
          NOTES[
            (index + chord.steps[(startingStep + i) % chord.steps.length]) % 12
          ],
        );
      }
      if (CHORDS[notes.join()]) {
        console.log('CLASH', chord.label, CHORDS[notes.join()].type);
      }
      CHORDS[notes.join()] = {
        base,
        type: chord.label,
      };
      if (chord.rootOnly) break;
    }
  });
});

const getChord = (ids: number[]) => {
  const unique = Array.from(new Set(ids.map(i => i % 12)))
    .map(id => NOTES[id])
    .join();
  return CHORDS[unique];
};

export default function usePianoKeys() {
  const remoteKeys = useRemoteState<KeysState>('keys', {});
  const map: {
    [id: number]: boolean;
  } = {};
  const ids = [];
  const keys = Object.keys(remoteKeys).map(i => {
    map[~~i] = true;
    ids.push(~~i);
    return getKeyDetail(~~i);
  });
  const chord = getChord(ids);

  return {keys, map, ids, chord};
}
