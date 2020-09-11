import React, {useContext, useMemo} from 'react'
import IconButton from './iconButton'
import { interfaceContext } from '../modules/interface'; 

export default () => {
    const { editorMode, setEditorMode } = useContext(interfaceContext);
    
    return useMemo(()=><IconButton 
        name='transform'
        active={editorMode}
        onClick={()=> {setEditorMode(!editorMode) }}
        helper={`${editorMode?'editor mode (on)':'editor mode (off)'}`}
    />, [editorMode])
}
