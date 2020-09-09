import React, {useState, useRef,useEffect, Suspense, useContext, useCallback, useMemo} from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { TransformControls } from 'drei';

import {SceneContext} from './Scene'; 

export default ({ modelName, }) => {
    const [model, setModel] = useState();
    const {transformMode, setFocus,focus, camera,position} = useContext(SceneContext);
    
    useEffect(()=> {  // load model
      new GLTFLoader().load('resources/models/factory_building_1/factory.glb.gltf', setModel);
    },[]);

    const onClickHandler = (e) => {
        e.stopPropagation();
        setFocus(e.eventObject.uuid);
    }
  
    const Model = (props) => {
        const transformControls = useRef();
        const modelRef = useRef();

        useEffect(()=>{
            if(transformControls.current){
                transformControls.current.detach();
            }
        },[])

        useEffect(()=>{
            if(transformControls.current){
                // transformControls.current.detach();
                const controls = transformControls.current;
                console.log('test');
                const callback = (event) => {
                    camera.current.enabled = !event.value
                    console.log(event);
                }
                controls.addEventListener('dragging-changed', callback)
                return () => controls.removeEventListener('dragging-changed', callback)
            }   
        })

        useEffect(()=> {
            if(transformControls.current && focus && modelRef.current){
                if(focus === modelRef.current.uuid){
                    transformControls.current.attach(modelRef.current)
                } else {
                    transformControls.current.detach();
                }
            }
        },[focus, modelRef])

      return (
        <TransformControls ref={transformControls} mode={transformMode} {...props}>
        <Suspense fallback={null}>
            {model && <primitive castShadow {...props} object={model.scene} ref={modelRef} />}
        </Suspense>
        </TransformControls>
      )
    }
  
    return <Model onClick={onClickHandler} focus={focus} position={position}/>   
}