import React, {useEffect, useContext, useMemo} from 'react'
import IconButton from '../components/iconButton'

export const interfaceContext = React.createContext();

export default (params) => {
  const {editorMode,transformMode, setEditorMode,  setTransformMode} = useContext(interfaceContext);

  useEffect(() => {
    console.log(interfaceContext);
  }, [])
  

  return useMemo(() => (
    <>
      <div className="interface">
        <IconButton/>
      </div>
    </>
  ),[editorMode,transformMode])
}
