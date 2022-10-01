import { useState, useEffect  } from 'react'
import Header from './components/Header'
import Tasks from '.components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    fetchTasks()
  } , [])
  
// Fetch Tasks
const getTasks = async () => {
  const tasksFromServer = await fetchTasks('http://localhost:3004/tasks')
  const data = await tasksFromServer.json()
  
  return data
}

// Fetch Task
const getTask = async () => {
  const tasksFromServer = await fetchTask(`http://localhost:3004/tasks`)
  const data = await tasksFromServer.json()
  
  return data
}

// Add Task
const addTask = (task) => {
  const res = await fetch('http://localhost:3004/tasks', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(task),
})

const data = await res.json()

setTasks([...tasks, data])
  //const id = Math.floor(Math.random() * 10000) + 1
  //const newTask = { id, ...task }
  //setTasks([...tasks, newTask])
}


// Delete Task
const deleteTask = async (id) => {
 await Fetch(`http://localhost:3004/tasks/${id}`, {method: 'DELETE'})}

 setTasks(tasks.filter((task) => task.id !== id))
}



// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetshTask(id)
  const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:3004/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask),
  })

  const data = await res.json()
  

  setTasks(
    tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    )
  )
}

  return (
    <Router>
    <div className='container'>
      <Header onAdd={() => setShowAddTask 
        (!showAddTask)} 
        showAdd={showAddTask}
        /> 
      
      <Route path='/' exact render={(props) => (
        <>
         {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : (
      'No Tasks To Show'
      )}
          </> 

      )} />
      <Route path='/about' component={About} />
      <Footer />

    </div>
    </Router>
  )


export default App
