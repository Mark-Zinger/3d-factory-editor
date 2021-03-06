import React,{useContext} from 'react';
import AppContext from '../modules/context';
import IconButton from './iconButton';
import default_settings from '../data/default_settings.json';


export default (params) => {
    const [_, SetAppState] = useContext(AppContext);
    const refreshSettings = {...default_settings}
    const refresh = () => {
        console.log('refresh')
        SetAppState(refreshSettings);
        localStorage.clear();
    }

    return <IconButton name="refresh" onClick={refresh} helper="refresh project"/>;
}
