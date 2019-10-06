import {useRemoteState} from 'hooks/remote';

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

export default function usePianoKeys() {
  const remoteKeys = useRemoteState<KeysState>('keys', {});
  const ids = {};
  const keys = Object.keys(remoteKeys).map(i => {
    ids[~~i] = true;
    return getKeyDetail(~~i);
  });
  return {keys, ids};
}
