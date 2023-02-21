import React, { useState } from 'react'

function TodoList(props) {
    const [current, setCurrent] = useState()
    const [updatedTask, setUpdatedTask] = useState()
    const sortedList = props.list.sort((a, b) => a.time.localeCompare(b.time))
    const changeHandler = (e) => {
        const task = {...updatedTask}
        task[e.target.name] = e.target.value
        setUpdatedTask(task)
        console.log(task)
    }
    
    const todoChangeHandler = (e,id) =>{
        updatedTask ?  props.updateHandler(id, e.target.type, updatedTask): props.updateHandler(id, e.target.type)
        setCurrent(null)
    }


    const editHandler = (index) => {   
        setCurrent(index) 
    }

    const deleteHandler = (id) => {
       props.deleteTodoHandler(id) 
    }

    const archiveHandler = (e,id) =>{
        console.log('update')
        const status = {status: 'ARCHIVE'}
        props.updateHandler(id,null, status)
    }
  
    
    const todos = sortedList.map( (todo, index) =>(    
        <li key={index}>
             { todo.status !=='ARCHIVE' ?
            <input type="checkbox" name="status" checked={todo.status === 'COMPLETED'? true : false} onChange={(e) => todoChangeHandler(e, todo._id)} />
            :null}
           {index === current ? (  
            <><input type="text" name="title" defaultValue={todo.title} onChange={changeHandler}/>
            <textarea type="text" name="description" defaultValue={todo.description} onChange={changeHandler}/>
            <button onClick={(e) => todoChangeHandler(e, todo._id )}>Update</button>
            </>): 
            (<><label>{todo.title}</label>&nbsp;&nbsp;<span>{todo.description}</span>&nbsp;&nbsp;@{todo.time}</>)}

            { todo.status !=='ARCHIVE' ? 
            (index === current ? (<button type="submit" onClick={() => setCurrent(null)}>Cancel</button>) :( <button type="submit" onClick={() => editHandler(index)}>Edit</button>)
            ) : null}
            <button type="submit" onClick={() => deleteHandler(todo._id)}>Delete</button>
           {todo.status ==='COMPLETED'? <button type="submit" onClick={(e) => archiveHandler(e,todo._id )}>Archive</button>: ''}
        </li>
    ))

  return (
    <div>
        {props.list.length > 0?
        (<ul> {todos}</ul>):(
            <p>You don't have anything to do!</p>
        )}
    </div>
  )
}

export default TodoList