import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("todos")));
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
     <Toaster 
      position="top-center"
    />
      <div className=" bg-slate-100 min-w-full  min-h-screen flex flex-col items-center  p-4 gap-10">   
        <h1 className=" font-semibold text-2xl mt-16">TODO</h1>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;