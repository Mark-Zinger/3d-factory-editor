import React, {useEffect, useContext, useMemo} from 'react';
import EditButton from '../components/editButton';
import RefreshButton from '../components/refreshButton';
import TransformPanel from '../components/transformPanel';
import Catalog from '../components/catalog';

export const interfaceContext = React.createContext();

export default () => {
  const {editorMode,transformMode} = useContext(interfaceContext);
  

  return useMemo(() => (
    <>
      <div className={`interface ${editorMode?'_edit':''}`}>
        <div className="interface__wrapper">
          <EditButton/>
          <RefreshButton/>
          <TransformPanel/>
          <Catalog/>
        </div>
      </div>
    </>
  ),[editorMode,transformMode])
}
