import React,{ useContext, useMemo,useRef,useState, Suspense, useEffect } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from 'react-postprocessing'
import { MapControls, OrbitControls,TransformControls, OrthographicCamera } from 'drei';
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
    const {camera} = useThree();

    useEffect(()=> {
      if(!editorMode) setFocus(false);
      console.log(camera)
    },[editorMode])

    useEffect(()=>{
      console.log(focus);
      
    },[focus])
    


    return useMemo(()=>(
        <>
          <Canvas className="App__canvas" 
            camera={{ position: [0.1050436825640563, 1.1595762140591261, -4.960238984182429] }}
            onCreated={({gl,camera}) => {
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = THREE.PCFSoftShadowMap
              // setInterval(()=>console.log(camera.position), 1000)
            }}
          >
            <SceneContext.Provider value={{editorMode,helpersMode,focus,setFocus, camera: CameraRef, transformMode, AppState, setAppState}}>
              
              <OrbitControls ref={CameraRef}/>
              
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
                {
                  AppState.models.map(({id, name, position,rotation, scale}, i)=>(
                    <SceneObject key={id} index={i} name={name} position={position} rotation={rotation} scale={scale}/>
                  ))
                }
            </SceneContext.Provider>
            <EffectComposer>
              <DepthOfField focusDistance={1} focalLength={0.02} bokehScale={0.6} height={480} />
              <Noise opacity={0.1} />
              <Vignette eskil={false} offset={0.1} darkness={0.6} />
              <Bloom luminanceThreshold={2} luminanceSmoothing={1.4} height={1000} />
            </EffectComposer>
          </Canvas>
        </>
    ), [AppState, helpersMode,focus,transformMode,editorMode]);
}



