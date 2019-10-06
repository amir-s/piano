import React from 'react';
import {RemoteWrapper} from 'hooks/remote';
import './App.css';
import Piano from 'components/Piano';

const App = () => {
  return (
    <RemoteWrapper>
      <Piano />
    </RemoteWrapper>
  );
};

export default App;
