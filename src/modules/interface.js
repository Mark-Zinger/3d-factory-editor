import React, {useEffect, useContext, useMemo} from 'react'
import EditButton from '../components/editButton';
import TransformPanel from '../components/transformPanel'

export const interfaceContext = React.createContext();

export default () => {
  const {editorMode,transformMode, setEditorMode,  setTransformMode} = useContext(interfaceContext);

  

  return useMemo(() => (
    <>
      <div className={`interface ${editorMode?'_edit':''}`}>
        <div className="interface__wrapper">
          <EditButton/>
          <TransformPanel/>
        </div>
      </div>
    </>
  ),[editorMode,transformMode])
}
