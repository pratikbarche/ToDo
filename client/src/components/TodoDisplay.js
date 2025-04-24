import React from 'react';
import '../style/componenetcss/TodoDisplay.css';
import { Button } from 'antd';


const TodoDisplay = ({item,onDelete}) => {
    return (
        <>
            <div className='parent-card-container'>
                <div className='card-container'>
                    <div className='todo-holder'>{item.todo}</div>
                    <Button className='delete-button' type='primary' onClick={()=>onDelete(item._id)}>Delete</Button>
                </div>
            </div>
        </>
    );
}

export default TodoDisplay;
