import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(todoString) 
      setTodos(todos)
    }
  },[])
  

  const toLocalStorage = (newTodos) => {
    localStorage.setItem("todos", JSON.stringify(newTodos))
    }

    const toggleFinished = () => {
      setshowFinished(!showFinished);
    }

  const handleEdit = (e, id) => {
    const todoToEdit = todos.find(item => item.id === id);
    setTodo(todoToEdit.todo);
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(item => item.id !== id);
      toLocalStorage(updatedTodos); // Update local storage here
      return updatedTodos;
    });
  };

  const handleDelete = (e, id) => {
    setTodos(prevTodos => {
      const updatedTodos = prevTodos.filter(item => item.id !== id);
      toLocalStorage(updatedTodos); // Update local storage here
      return updatedTodos;
    });
  };

  const handleAdd = () => {
    if (todo.trim()) {
      const newTodo = { id: uuidv4(), todo, isCompleted: false };
      setTodos(prevTodos => {
        const updatedTodos = [...prevTodos, newTodo];
        toLocalStorage(updatedTodos); // Update local storage here
        return updatedTodos;
      });
      setTodo("");
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleChackbox = (e) => {
    const id = e.target.name;
    const updatedTodos = todos.map(item => 
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
  
    setTodos(updatedTodos);
    toLocalStorage(updatedTodos); // Update local storage after modifying state
  };
  

  return (
    <>
      <div className="container bg-violet-100 mx-auto p-5 rounded-xl min-h-[80vh] w-full sm:w-3/4 md:w-3/5">
        <h1 className='font-bold md:text-2xl text-xl text-center'>iTask - Manage your todos at one place</h1>
          <h2 className='font-bold text-xl my-3'>Add a Todo</h2>
        <div className="addTodo flex">
          <input onChange={handleChange} value={todo} className='md:w-3/4 w-5/6 p-2 rounded-full' type="text" />
          <button onClick={handleAdd} disabled={todo.length<=3} className='bg-purple-800 hover:bg-purple-900 hover:font-bold text-white px-4 py-2 rounded-full mx-6'>Save</button>
        </div>
          <input className='mt-7 mr-1 cursor-pointer' onChange={toggleFinished} type="checkbox" checked={showFinished}/> Show finished

      < hr className='mt-5 text-lg' />

            <h2 className='font-bold text-xl my-3'>Your Todos</h2>
        <div className="todos">
          {todos.map(item=>{
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo my-4 flex justify-between">
            <div className='flex items-center gap-5'>
            <input className='m-0 cursor-pointer' name={item.id} onChange={handleChackbox} type="checkbox" checked={item.isCompleted}/>
            <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className="buttons">
            <button onClick={(e)=>{handleEdit(e,item.id)}} className='bg-purple-800 hover:bg-purple-900 hover:font-bold text-white px-1 py-1 rounded-lg mx-1'><FaEdit /></button>
            <button onClick={(e)=>{handleDelete(e,item.id)}} className='bg-purple-800 hover:bg-purple-900 hover:font-bold text-white px-1 py-1 rounded-lg mx-1'><MdDelete />
            </button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
