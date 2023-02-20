import React,{useState} from 'react'
import Timepicker from 'react-time-picker';

function Home() {
    const [value, onChange] = useState('10:00')
    const [newTask, setTask] = useState()
    const addTask = () => {
    }

    const changeHandler = (e) => {
        const task = {...newTask}
        task[e.target.name] = e.target.value
        setTask(task)
        console.log(task)
    }
  return (
    <div>
        <input type="text" name="title" id="" onChange={changeHandler}/>
        {/* <input type="radio" value="COMPLETED" name="status" /> COMPLETED
        <input type="radio" value="UNCOMPLETED" name="status" /> UNCOMPLETED */}
         <input type="checkbox" value="UNCOMPLETED" name="status" onChange={changeHandler}/>
        <Timepicker onChange={changeHandler} value={value} name="time"  />  
        <button onClick={addTask}>Add</button>
    </div>
  )
}

export default Home