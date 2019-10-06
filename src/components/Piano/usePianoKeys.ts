import {useRemoteState} from 'hooks/remote';
import {is} from '@babel/types';

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

interface KeysState {
  [id: string]: boolean;
}

const getKeyDetail = function(keyId: number) {
  console.log(keyId);
  return {
    key: keyId,
    note: LABELS[keyId % 12],
    oct: Math.ceil((keyId + 1) / 12),
    vex: LABELS[keyId % 12] + '/' + Math.ceil((keyId + 1) / 12),
  };
};

const CHORDS_CONFIG = [
  {
    label: 'Major',
    steps: [4, 7],
  },
  {
    label: 'Minor',
    steps: [3, 7],
  },
  {
    label: 'Dim',
    steps: [3, 6],
  },
  {
    label: 'Aug',
    steps: [4, 8],
  },
  {
    label: 'Major 7',
    steps: [4, 7, 10],
  },
  {
    label: 'Minor 7',
    steps: [3, 7, 10],
  },
];

const CHORDS = {};
LABELS.forEach((base, index) => {
  CHORDS_CONFIG.forEach(chord => {
    const notes = chord.steps.map(i => (index + i) % 12);
    notes.unshift(index % 12);
    const sig = notes.sort((a, b) => a - b).join();
    // if (CHORDS[sig]) {
    //   console.log('Clash', base, chord.label, '<>', CHORDS[sig]);
    // }
    CHORDS[sig] = {
      base,
      type: chord.label,
    };
  });
});
console.log(CHORDS);
const getChord = (ids: number[]) => {
  const unique = Array.from(new Set(ids.map(i => i % 12)))
    .sort((a, b) => a - b)
    .join();
  return CHORDS[unique];
};
export default function usePianoKeys() {
  const remoteKeys = useRemoteState<KeysState>('keys', {});
  const map = {};
  const ids = [];
  const keys = Object.keys(remoteKeys).map(i => {
    map[~~i] = true;
    ids.push(~~i);
    return getKeyDetail(~~i);
  });
  const chord = getChord(ids);
  return {keys, map, ids, chord};
}
