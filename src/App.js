import React, { useRef, useState, useEffect } from 'react';
import StateManager from './modules/stateManager';
import Scene from './modules/Scene';
import AppInterface, {interfaceContext} from './modules/interface';


import './App.scss';


function App() {
  const [editorMode, setEditorMode] = useState(false);
  const [transformMode, setTransformMode] = useState('translate');

  return (
    <div className="App">
      <StateManager>
        <interfaceContext.Provider value={{editorMode, setEditorMode, transformMode, setTransformMode}}>
          <Scene transformMode={transformMode}/>
          <AppInterface/>
        </interfaceContext.Provider>
      </StateManager>
    </div>
  );
}

export default App;
