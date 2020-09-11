import React,{useContext} from 'react';
import { interfaceContext } from '../modules/interface'
import IconButton from './iconButton';

export default () => {
  const {transformMode, setTransformMode} = useContext(interfaceContext);

  const setMode = (modeName) => {
    if(transformMode != modeName) setTransformMode(modeName);
  }

  return (
    <div className="interface__transform-panel">
      <IconButton 
        name="move"
        helper="translate mode"
        active={transformMode === 'translate'}
        onClick={()=> setMode('translate')}
      />
      <IconButton
        name="rotate"
        helper="rotate mode"
        active={transformMode === 'rotate'}
        onClick={()=> setMode('rotate')}
      />
      <IconButton
        name="scale"
        helper="scale mode"
        active={transformMode === 'scale'}
        onClick={()=> setMode('scale')}
      />
    </div>
  )
}

