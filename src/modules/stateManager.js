import React,{ useState, useEffect, useCallback } from 'react';
import AppContext from './context';
import default_settings from '../data/default_settings.json'




export default ({children}) => {
    const localStorage = window.localStorage;
    const getLocalStorrage = () => {
        if(localStorage.getItem('__factoryState')){
            // parse saved state in localStorage
            console.log(JSON.parse(localStorage.getItem('__factoryState')))
            return (JSON.parse(localStorage.getItem('__factoryState')));
        } else {
            // default state, if __factoryState is undefined
            return ({...default_settings})
        }
    }
    
    const [AppState, SetAppState] = useState(getLocalStorrage());

    useEffect(()=>{
        const new__factoryState = JSON.stringify(AppState);
        localStorage.setItem('__factoryState', new__factoryState);
        console.log(localStorage.__factoryState)
    },[AppState]) 
    

    useEffect(()=>{
        window.addEventListener('beforeunload', (event) => {
            setLocalStorrage();  
            // localStorage.clear();
        });
        console.log(AppState);    
        return () => {}
    },[])
   
    const setLocalStorrage = useCallback(() => {
        const new__factoryState = JSON.stringify(AppState);
        localStorage.setItem('__factoryState', new__factoryState);
    },[AppState])

    return (
        <AppContext.Provider value={[AppState,SetAppState]}>
            {children}
        </AppContext.Provider>
    )
}


