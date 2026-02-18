import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { MdDeleteForever } from "react-icons/md";
import { addTaskAction, deleteTaskAction, fetchTasksAction } from './store';
import { useState } from 'react';

export const Todo = () => {

    const state = useSelector(state => state.tasks)
    console.log(state)

    const dispatch = useDispatch()

    const [input_task, setinput_task] = useState("")
    const handleInput = (e) => {
        setinput_task(e.target.value)
    }

    const handleSubmitForm = (e) => {
        e.preventDefault()
        dispatch(addTaskAction(input_task))
        setinput_task("")
    }  

    const handleTaskDelete = (index) => {
        dispatch(deleteTaskAction(index))
    }

    return (
        <>
            <div className="container">
                <div className='todo-app'>
                    <h1>Todo List</h1>
                    <div className='row'>
                        <form onSubmit={handleSubmitForm}>
                            <input type="text" id="input-box" value={input_task} onChange={(e)=>handleInput(e)} placeholder='Enter a new task' />
                            <button>Add Task</button>
                        </form>
                        <button onClick={() => dispatch(fetchTasksAction())}>fetch Task</button>

                    </div>
                    <ul id='text-container'>
                        {state.map((task, index) => (
                            <li key={index}>
                                <p>
                                    {index} . {task}

                                </p>
                                <div>
                                    <MdDeleteForever onClick={()=>handleTaskDelete(index)} />
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

        </>
    )
}