import React from 'react';
import {RemoteWrapper} from 'hooks/remote';
import './App.css';
import Main from 'pages/Main';

const App = () => {
  return (
    <RemoteWrapper>
      <Main />
    </RemoteWrapper>
  );
};

export default App;
