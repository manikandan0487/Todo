import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast"

const CreateTask = ({ setTasks }) => {
  const [newTask, setNewTask] = useState({
    id: "",
    title: "",
    status: "todo",
  });
  const handleSubmited = (e) => {
    e.preventDefault();

    if (newTask.title.trim() === "") {
      return toast.error("Task title cannot be empty",{
        duration:2000,
        style:{
          color:"red",
          border:"1px solid red",
          fontSize:"14px"
        }
      }); 
    } 
    if (newTask.title.length < 3) {
      return toast.error("A task must have more than 3 characters",{
        duration:2000,
        style:{
          color:"red",
          border:"1px solid red",
          fontSize:"14px"
        }
      });
    }
    if (newTask.title.length > 100) {
      return toast.error("A task must not be more than 100 characters",{
        duration:1000,
        style:{
          color:"red",
          border:"1px solid red",
          fontSize:"14px"
        }
      });
    }

    const taskToAdd = { ...newTask, id: uuidv4() };

    setTasks((prevTasks) => {
      if (!Array.isArray(prevTasks)) {
        return [taskToAdd];
      }
      const list = [...prevTasks, taskToAdd];
      localStorage.setItem("todos", JSON.stringify(list));
      return list;
    });
    toast.success("Task created",{
      duration:1000,
      style:{
        color:"white",
        backgroundColor:"green",
        fontSize:"14px"
      },
      iconTheme: {
        primary: 'white',
        secondary: 'green',
      },
    })
    setNewTask({
      id: "",
      title: "",
      status: "todo",
    });
  };

  return (
    <form onSubmit={handleSubmited} className="w-full flex max-md:flex-col items-center justify-center gap-4">
      <input
        type="text"
        className=" max-md:w-full max-lg:w-[75%] lg:w-[70%] border-2 border-slate-400 bg-slate-100 rounded px-2 h-12 w-64 text-gray-600 outline-none text-sm"
        placeholder="New Task"
        value={newTask.title}
        onChange={(e) =>
          setNewTask((prevTask) => ({ ...prevTask, title: e.target.value }))
        }
      />
      <button
        type="submit"
        className="max-md:w-full md:w-[20%] bg-sky-400 hover:bg-sky-500 rounded px-4 h-12 text-white"
      >
        Create
      </button>
    </form>
  );
};

export default CreateTask;
