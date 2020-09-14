import React,{useContext, useState} from 'react';
import {interfaceContext} from '../modules/interface';
import AppContext from '../modules/context';
import IconButton from '../components/iconButton';
import ScrollArea from 'react-scrollbar';

import catalogData from '../data/catalogData'

export default (props) => {
  const {setEditorMode} = useContext(interfaceContext);
  const [ AppState, SetAppState] = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);

  const CatalogItem = (props) => {
    const { model, id, title=false} = props;
    return (
      <div className="catalog__item" onClick={()=>addModel(model)}>
        <div className="catalog__item-counter">{(id < 10)?`0${id}`: id}</div>
        <img src={`/images/catalog/${id}.jpg`} className="catalog__item-img"/>
        {title && <div className="catalog__item-title">{title}</div> }
      </div>
    )
  }

  const addModel = (modelName) => {
    const new_state = {...AppState};
    const new_model = {
      "type": "gltf",
      "id": new_state.last_id + 1,
      "name": modelName,
      "position": [0,0,0],
      "rotation": [0,0,0],
      "scale": [1, 1, 1]
    };
    console.log(new_model);
    console.log(new_state.models);

    new_state.models.push(new_model);
    new_state.last_id += 1;
    SetAppState(new_state);
  }
    
  return (
    <>
      <div className={`catalog ${isOpen?'_open':''}`}>
        <div className="catalog__wrapper">
          <div className="catalog__open-btn">
            <IconButton 
              name={isOpen?'close':'add'}
              direction="_right"
              helper={isOpen?'close catalog':'open catalog'}
              onClick={()=>setIsOpen(!isOpen)}
            />
          </div>
          <ScrollArea
            speed={0.8}
            className="catalog__list"
            contentClassName="catalog__list-wrapper"
            horizontal={false}
            smoothScrolling={true}
          >
            {
              catalogData.map((props)=> <CatalogItem {...props} key="props.id"/>)
            }
          </ScrollArea>
        </div>
      </div>
    </>
  )
}
