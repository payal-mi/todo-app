import { useState, useEffect } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")

    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
  }, [])


  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)


  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLS()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLS()

  }

  const handleChange = (e) => {
    setTodo(e.target.value)
    saveToLS()
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)

  }
  const toggleFinished = (e) => {
    setshowFinished(!showFinished)

  }



  return (
    <>
      <Navbar />
      <div className="mx-3 md:container md:mx-auto my-5 bg-amber-100 rounded-xl p-5 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-3xl'>iTask - Manage your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          <h2 className='font-bold text-2xl'>Add a Todo</h2>
          <div className="flex">


            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="w-full rounded-lg px-5 py-2 bg-white border"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length === 0}
              className="bg-amber-700 hover:bg-amber-900 disabled:bg-amber-700 p-4 py-2 mx-2 rounded-full text-sm font-bold text-white"
            >
              Save
            </button>
          </div>
        </div>
        <input className='my-4' id='Show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='mx-2' htmlFor="Show ">Show Finished</label>
        <div className='h[-1px] bg-black opacity-15 w-3/4 my-2 mx-auto'></div>

        <h2 className="text-lg font-bold">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'> No Todos to dispaly</div>}
          {todos.map(item => {

            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex md:w-1/2 my-3 justify-between">
              <div className='flex gap-5'>

                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="btn flex h-full">
                <button
                  onClick={(e) => { handleEdit(e, item.id) }}
                  className="bg-amber-700 hover:bg-amber-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 flex items-center gap-1"
                >
                  <FaEdit /> 
                </button>

                <button
                  onClick={(e) => { handleDelete(e, item.id) }}
                  className="bg-amber-700 hover:bg-amber-900 p-2 py-1 text-sm font-bold text-white rounded-md mx-1 flex items-center gap-1"
                >
                  <MdDelete /> 
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
