import React, {useState, useRef,useEffect, Suspense, useContext, useCallback, useMemo} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TransformControls } from 'drei';

import {SceneContext} from './Scene'; 

export default ({ name, position, index, rotation, scale }) => {
    const [model, setModel] = useState();
    const {transformMode, setFocus,focus, camera, AppState, setAppState, editorMode} = useContext(SceneContext);
    
    // переносим
    useEffect(()=> {  // load model
      new GLTFLoader().load(`resources/models/${name}`, setModel);
    },[]);

    const onClickHandler = (e) => {
        e.stopPropagation();
        setFocus(e.eventObject.uuid);
    }

    
  
    const Model = (props) => {
        const {index} = props
        const transformControls = useRef();
        const modelRef = useRef();

        const setState = () => {
            const newState = {...AppState};
    
            // Хуйня, надо переписать
            newState.models[index].position[0] = modelRef.current.position.x;
            newState.models[index].position[1] = modelRef.current.position.y;
            newState.models[index].position[2] = modelRef.current.position.z;
            newState.models[index].rotation[0] = modelRef.current.rotation.x;
            newState.models[index].rotation[1] = modelRef.current.rotation.y;
            newState.models[index].rotation[2] = modelRef.current.rotation.z;
            newState.models[index].scale[0] = modelRef.current.scale.x;
            newState.models[index].scale[1] = modelRef.current.scale.y;
            newState.models[index].scale[2] = modelRef.current.scale.z;
            setAppState(newState)
        }

        useEffect(()=>{
            if(transformControls.current){
                transformControls.current.detach();
            }
        },[])

        useEffect(()=>{
            if(transformControls.current){
                // transformControls.current.detach();
                const controls = transformControls.current;
                // console.log('test');
                const callback = (event) => {
                    camera.current.enabled = !event.value
                    if(!event.value) setState();
                }
                controls.addEventListener('dragging-changed', callback)
                return () => controls.removeEventListener('dragging-changed', callback)
            }   
        })

        useEffect(()=> {    
            if(transformControls.current && focus && modelRef.current){
                if((focus === modelRef.current.uuid) && editorMode){
                    transformControls.current.attach(modelRef.current)
                } else {
                    transformControls.current.detach();
                }
            }
        },[focus, modelRef])

      return (
        <TransformControls ref={transformControls} mode={transformMode}>
        <Suspense fallback={null}>
            {model && <primitive castShadow {...props} object={model.scene} ref={modelRef} />}
        </Suspense>
        </TransformControls>
      )
    }
  
    return <Model onClick={onClickHandler} index={index} position={position} rotation={rotation} scale={scale} />   
}