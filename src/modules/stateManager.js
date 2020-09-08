import React,{ useState, useEffect, useCallback } from 'react';
import AppContext from './context';




export default ({children}) => {
    const localStorage = window.localStorage;
    const getLocalStorrage = () => {
        if(localStorage.getItem('__factoryState')){
            // parse saved state in localStorage
            return (JSON.parse(localStorage.getItem('__factoryState')));
        } else {
            // default state, if __factoryState is undefined
            return ({
                models: [
                    {"type":"gltf", "name": "factory_building_1/factory.glb.gltf","position":[-1.2, 0, 0], "rotation": [0,0,0]},
                    {"type":"gltf", "name": "factory_building_1/factory.glb.gltf","position":[1.2, 0, 0], "rotation": [0,0,0]}
                ]
            })
        }
    }
    
    const [AppState, SetAppState] = useState(getLocalStorrage());
    

    useEffect(()=>{
        window.addEventListener('beforeunload', (event) => {
            // setLocalStorrage();  
            localStorage.clear();
        });
        console.log(AppState);    
        return () => {}
    },[])

    useEffect(() => {
    }, [AppState])

   
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


