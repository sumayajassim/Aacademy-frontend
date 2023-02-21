import React,{useEffect, useState} from 'react'
import Timepicker from 'react-time-picker';

function AddTodo(props) {
    const [value, onChange] = useState('10:00')
    const [newTask, setTask] = useState({time: value, status: 'UNCOMPLETED',  title:'', description: ''})
    const [disabled, setDisabled] = useState(true)

    const addTask = (e) => {
        e.preventDefault();
        props.addTask(newTask)
        setTask({time: '10:00', title:'', description: ''})
    }

    useEffect(()=>{
        setTask({...newTask, time: value})
        isButtonDisabled()
    },[value])

    const changeHandler = (e) => {
        const task = {...newTask}
        task[e.target.name] = e.target.value
        setTask(task)
        isButtonDisabled()
        console.log(task)
    }
    const isButtonDisabled =() =>{
        // console.log(newTask.time)
        if(newTask.title && newTask.description && value ){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    }
  return (
    <div>
        <form action="post" onSubmit={addTask}>
            <input type="text" name="title" placeholder='Title' value={newTask.title} onChange={changeHandler} />
            <textarea name="description" id="" cols="30" rows="10" placeholder='Description' value={newTask.description}  onChange={changeHandler} ></textarea>
            <Timepicker onChange={onChange} value={value} />
            <button onClick={addTask} disabled={disabled} >Add</button>
        </form>
    </div>
  )
}

export default AddTodo