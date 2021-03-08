import React, { useState , useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Button from 'react-bootstrap/Button';

// Crear funcion que cree el usuario, este se usa una sola vez y luego no se vuelve a llamar mas

function CreateUser(){
    fetch('https://assets.breatheco.de/apis/fake/todos/user/piero',{
        method: 'POST',
        body: '[]',
        headers : {
            'Content-Type':'application/json'
    }})
    .then(res => res.json())
    .then(response => console.log('Success', JSON.stringify(response)))
    .catch(error => console.log('Error', error));
}

export const FormToDo = (props) => {
        
    // Crear funcion que importe las tareas desde la API
    
    const[list, setList]=useState([]);
    const[task, setTask]=useState({});

    async function GetTaskFromList(){
        const response = await fetch('https://assets.breatheco.de/apis/fake/todos/user/piero',{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const data = await response.json();
        console.log(data);
        setList(data);
    }
    
    async function AddTaskToList(props){
        await fetch('https://assets.breatheco.de/apis/fake/todos/user/piero',{
            method : 'PUT',
            body: JSON.stringify(props),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    }

    async function DeleteAllTasks(){
        await fetch('https://assets.breatheco.de/apis/fake/todos/user/piero',{
            method : 'DELETE',
            headers : {
                'Content-Type' : 'application/json'
            }
        })
    }

    useEffect(
        ()=>{
            CreateUser();
            GetTaskFromList();
        },[]
    )
    return(
        <>  <div className="container">
                {/* <span>{JSON.stringify(task)}</span>
                <span>{JSON.stringify(list)}</span> */}
                <form onSubmit={(event) => {list.push(task); setTask({label:""}); event.preventDefault(); AddTaskToList(list)}}>
                <input type="text" value={task.label} className="input" onChange={(event) => {setTask({label: event.target.value, done: false})}} placeholder="Ingresa tu Tarea"/>
            </form>
            <div className="task-list">
                <hr></hr>
                <ul className="list-group">
                    {list.length === 0 ? "No hay tareas, ingresa tu primer To Do":""} 
                    {list.map((item, index) => {
                        return(
                            <li key={index} className="list-group-item">
                                {item.label}
                            <a>
                            <FontAwesomeIcon icon={faTrashAlt} color="white" className="trashIcon" onClick={() => {setList(list.filter((i) => i !==item))}}/>    
                                </a>
                            </li>
                        );
                      }
                     )    
                    }
                </ul>
            </div>
            <hr></hr>
            <div>Delete All   
            <FontAwesomeIcon icon={faTrashAlt} color="white" className="trashIcon" onClick={()=> {setList([]); DeleteAllTasks()}}/>
            </div>
            <hr></hr>
            <div>
            <Button className="deleteButton" variant="dark" onClick={() => AddTaskToList(list)}>Presiona aqui al eliminar una tarea</Button>
            </div>
            <hr></hr>
            <div>
                <strong>{list.length} {list.length === 1 ? "tarea pendiente" : "tareas pendientes"}</strong>
            </div>
        </div>
       
        </> 
    )

}

