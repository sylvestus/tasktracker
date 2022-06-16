
import { useState, useEffect } from 'react'
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from './components/AddTask';
import axios from 'axios'
import Footer from './components/Footer';
import About from './components/About';

import {BrowserRouter as Router, Route} from 'react-router-dom';

function App() {

  const [showAddTask,setShowAddTask] = useState(false)
  const [tasks,setTasks] = useState([])


 
  useEffect(() => {
    getTasks();
  }, []);

// get tasks

const getTasks = async () =>{
  // const res = 
  await axios.get("http://localhost:5000/tasks").then(res=>{setTasks(res.data)
  // console.log(res);
})
// gets the response then sets the response to the usestate of tasks
.catch(err=>console.log(err));
// handles errors
  
};

// get task
const getTask = async (id) =>{
   const res = await axios.get(`http://localhost:5000/tasks/${id}`)
  const data = res.data
  return data
  
}

  


// add task

const addTask = (task) => {
  axios.post('http://localhost:5000/tasks', task)
  .then((res) => {
      console.log(res.data)
  }).catch((error) => {
      console.log(error)
  });
 setTasks([...tasks,task])

 
  //  const id = Math.floor(Math.random()*10000)+1
  //   const newTask = {id, ...task}
  //   setTasks([...tasks, newTask])
}


// delete tastk
const deleteTask = (id)=>{
  axios.delete(`http://localhost:5000/tasks/${id}`)
        .then(() => this.setState({ status: 'Delete successful' }));
  setTasks(tasks.filter((task)=> task.id !==id))
}

// toggle remider
  const toggleReminder = async(id)=>{
    const taskToggle= await getTask(id)
    const updateTask = {...taskToggle, reminder: !taskToggle.reminder};
    // console.log(taskToggle)
    axios.put(`http://localhost:5000/tasks/${id}`,updateTask)
    .then((res) => {
      setTasks(tasks.map((task)=> task.id ===id ? { ...task, reminder: !task.reminder}:task))
      console.log(res.data)
  }).catch((error) => {
      console.log(error)
  });

    // setTasks(tasks.map((task)=> task.id ===id ? { ...task, reminder: !task.reminder}:task))
  }

  return ( 
    
    <div className="container">
      <Header onAdd={()=> setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} /> }
     
      {tasks.length >0 ? <Tasks tasks={tasks} onDelete={deleteTask}  onToggle={toggleReminder} />:'there are no tasks' }
      
    
      <Footer/>
      
    </div>
  
  );
}

export default App;
