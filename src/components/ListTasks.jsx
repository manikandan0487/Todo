import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
  const [todos, setTodos] = useState([]);
  const [inProgress, setInProgress] = useState([]);
  const [closed, setClosed] = useState([]);
  useEffect(() => {
    const ftodos = tasks ? tasks.filter((task) => task.status === "todo") : [];
    const fInProgress = tasks ? tasks.filter((task) => task.status === "inprogress"): [];
    const fClosed = tasks ? tasks.filter((task) => task.status === "closed"): [];

    setTodos(ftodos);
    setInProgress(fInProgress);
    setClosed(fClosed);
  }, [tasks]);

  const statuses = ["todo", "inprogress", "closed"];

  return (
    <div className="w-full lg:w-[92%] flex max-lg:flex-col justify-center">
      {statuses.map((status, index) => (
        <Section
          key={index}
          status={status}
          tasks={tasks}
          setTasks={setTasks}
          todos={todos}
          inProgress={inProgress}
          closed={closed}
        />
      ))}
    </div>
  );
};

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    type: "task",
    drop: (item) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  let text = "Todo";
  let bg = "bg-slate-500";
  let taskToMap = todos;

  if (status === "inprogress") {
    text = "In Progress";
    bg = "bg-purple-500";
    taskToMap = inProgress;
  }
  if (status === "closed") {
    text = "Closed";
    bg = "bg-green-500";
    taskToMap = closed;
  }
  const addItemToSection = (id) => {
    setTasks((prev) => {
      const mTask = prev.map((t) => {
        if (t.id == id) {
          return { ...t, status: status };
        }
        return t;
      });
      localStorage.setItem("todos", JSON.stringify(mTask));
      return mTask;
    });
  };

  return (
    <div
      className={`w-full rounded-md p-2 ${isOver ? "bg-slate-200" : ""}`}
      ref={drop}
    >
      <Header text={text} bg={bg} count={taskToMap.length} />
      {taskToMap.length > 0 &&
        taskToMap.map((task) => (
          <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
        ))}
    </div>
  );
};

const Header = ({ text, bg, count }) => {
  return (
    <div
      className={`${bg} flex items-center justify-between h-12 pl-4 rounded-md  uppercase text-sm text-white `}
    >
      {text}{" "}
      <div className="mr-3 bg-white text-xs w-5 h-5 text-black rounded-full flex items-center justify-center">
        {count}
      </div>
    </div>
  );
};

const Task = ({ task, tasks, setTasks }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    accept: "task",
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleRemove = (id) => {
    const fTask = tasks.filter((task) => task.id !== id);
    localStorage.setItem("todos", JSON.stringify(fTask));
    setTasks(fTask);
    toast.error("Task Deleted",{
      duration:1000,
      style:{
        color:"white",
        backgroundColor:"red",
        border:"2px solid red",
        fontSize:"14px"
      }, 
      iconTheme: {
        primary: 'white',
        secondary: 'red',
      },
    });
  };
  return (
    <div
      ref={drag}
      className={` relative p-4 mt-8 shadow-md ${
        isDragging ? "opacity-25" : "opacity-100"
      } rounded-md  cursor-grab`}
    >
      <p>{task.title}</p>
      <button
        className=" absolute bottom-5 right-3"
        onClick={() => handleRemove(task.id)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="size-4 text-red-400 hover:text-red-500"
        >
          <path d="M2 3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3Z" />
          <path
            fillRule="evenodd"
            d="M13 6H3v6a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V6ZM5.72 7.47a.75.75 0 0 1 1.06 0L8 8.69l1.22-1.22a.75.75 0 1 1 1.06 1.06L9.06 9.75l1.22 1.22a.75.75 0 1 1-1.06 1.06L8 10.81l-1.22 1.22a.75.75 0 0 1-1.06-1.06l1.22-1.22-1.22-1.22a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};
