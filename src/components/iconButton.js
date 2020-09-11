import React from 'react'
import Model from '../icons/3d-modeling';
import Add from '../icons/add';
import Adjust from '../icons/adjust';
import Edit from '../icons/edit';
import Move from '../icons/move';
import Question from '../icons/question';
import Rent from '../icons/rent';
import Scale from '../icons/scale';
import Testing from '../icons/testing';
import Trash from '../icons/trash';
import Close from '../icons/close'

const Icon = ({name}) => {
    switch(name){
        case 'transform': return <Model/>;
        case 'add': return <Add/>;
        case 'settings': return <Adjust/>;
        case 'edit': return <Edit/>;
        case 'move': return <Move/>;
        case 'question': return <Question/>;
        case 'book': return <Rent/>;
        case 'scale': return <Scale/>;
        case 'rotate': return <Testing/>;
        case 'trash': return <Trash/>;
        case 'close': return <Close/>;
        default: return <Question/>;
    }
}

export default (props) => {
    const {name,onClick, active=false, className='', helper=false} = props;

    return (
        <>
        <div className={`interface__circle-btn ${active?'_active':''}`} onClick={onClick}>
            <Icon name={name}/>
            {helper && <div className="interface__circle-btn-helper">{helper}</div>} 
        </div>
        </>
    )
}
