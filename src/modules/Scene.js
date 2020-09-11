import React,{ useContext, useMemo,useRef,useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { MapControls, OrbitControls,TransformControls } from 'drei';
import SceneObject from './SceneObject';
import AppContext from './context';
import { interfaceContext } from './interface';

export const SceneContext = React.createContext();

export default ({transformMode}) => {
    const [AppState, setAppState] = useContext(AppContext);
    const {editorMode} = useContext(interfaceContext);
    const [helpersMode, setHelpersMode] = useState(false);
    const [focus, setFocus] = useState(false);
    const CameraRef = useRef();

    useEffect(()=> {
      if(!editorMode) setFocus(false);
    },[editorMode])

    useEffect(()=>{
      console.log(focus);
    },[focus])

    return useMemo(()=>(
        <>
          <Canvas className="App__canvas">
            <SceneContext.Provider value={{helpersMode,focus,setFocus, camera: CameraRef, transformMode, AppState, setAppState}}>
              <MapControls ref={CameraRef}/>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
                {
                  AppState.models.map(({id, name, position,rotation}, i)=>(
                    <SceneObject key={id} index={i} name={name} position={position}/>
                  ))
                }
            </SceneContext.Provider>
          </Canvas>
        </>
    ), [AppState, helpersMode,focus,transformMode]);
}



