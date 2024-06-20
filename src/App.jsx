import { useEffect, useState } from "react";
import CreateTask from "./components/CreateTask";
import ListTasks from "./components/ListTasks";
import { Toaster } from "react-hot-toast";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { useMediaQuery } from "react-responsive";
function App() {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(JSON.parse(localStorage.getItem("todos")));
  }, []);

  const isMobile = useMediaQuery({ query: `(max-width: 760px)` });
  const Backend = isMobile ? TouchBackend : HTML5Backend;
  const options = {
    scrollAngleRanges: [
      { start: 30, end: 150 },
      { start: 210, end: 330 },
    ],
  };
  return (
    <DndProvider backend={Backend} options={options}>
      <Toaster position="top-center" />
      <div className=" bg-slate-100 min-w-full  min-h-screen flex flex-col items-center  p-4 gap-10">
        <h1 className=" font-semibold text-2xl mt-16">TODO</h1>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTasks tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>
  );
}

export default App;
