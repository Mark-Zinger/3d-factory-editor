import React,{ useContext, useMemo,useRef,useState, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from 'react-three-fiber';
import { MapControls, OrbitControls,TransformControls } from 'drei';
import SceneObject from './SceneObject';
import AppContext from './context';


export const SceneContext = React.createContext();


export default ({transformMode}) => {
    const [AppState, setAppState] = useContext(AppContext);
    const [helpersMode, setHelpersMode] = useState(false);
    const [focus, setFocus] = useState(false);
    const CameraRef = useRef();
    console.log('test',transformMode);

    return useMemo(()=>(
        <>
          <Canvas className="App__canvas">
            <SceneContext.Provider value={{helpersMode,focus,setFocus, camera: CameraRef, transformMode}}>
              <MapControls ref={CameraRef}/>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
                <SceneObject 
                  camera={CameraRef}
                  transformMode={transformMode}
                  
                  
                />
                
              
              
              <SceneObject 
                camera={CameraRef}
                transformMode={transformMode}
                
                
                key={'test2'}
              />
            </SceneContext.Provider>
          </Canvas>
        </>
    ), [AppState, helpersMode,focus,transformMode]);
}



