import React,{ useState, useEffect, useCallback } from 'react'

export const ContextApp = React.createContext({});

export default ({children}) => {
    
    const [AppState, SetAppState] = useState({test:'test12345'});
    const localStorage = window.localStorage;

    useEffect(()=>{
        window.addEventListener('beforeunload', (event) => {
            setLocalStorrage();            
          });
        getLocalStorrage();
        
        return () => {}
    },[])

    useEffect(() => {
    }, [AppState])

    const getLocalStorrage = () => {
        if(localStorage.getItem('__factoryState')){
            SetAppState(JSON.parse(localStorage.getItem('__factoryState')));
        }
    }
    const setLocalStorrage = useCallback(() => {
        const new__factoryState = JSON.stringify(AppState);
        localStorage.setItem('__factoryState', new__factoryState);
    },[AppState])

    return null
}
