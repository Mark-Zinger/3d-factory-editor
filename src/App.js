import React, { useRef, useState, useEffect } from 'react';
import StateManager from './modules/stateManager';
import Scene from './modules/Scene';
import AppInterface from './modules/interface';


import './App.scss';


function App() {
  const [editorMode, setEditorMode] = useState(false);
  const [transformMode, setTransformMode] = useState('translate');

  return (
    <div className="App">
      <StateManager>
        <Scene transformMode={transformMode}/>
        <AppInterface/>
      </StateManager>
    </div>
  );
}

export default App;
