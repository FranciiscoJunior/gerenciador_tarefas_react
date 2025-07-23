import AddTask from "./components/AddTask";
import Tasks from "./components/tasks";
import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([
  {
    id: 1,
    title: "Estudando programação Full Stack",
    description: "Estudar programação para se tornar um desenvolvedor Full Stack",
    isCompleted: false
  },

  {
    id: 2,
    title: "Estudando programação Front End",
    description: "Estudar programação para se tornar um desenvolvedor Front End",
    isCompleted: false
  },
  
  {
    id: 3,
    title: "Estudando programação Back End",
    description: "Estudar programação para se tornar um desenvolvedor Back End",
    isCompleted: false
}]);

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) => {

      // Precisa atualizar a tarefa se for a que foi clicada
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      // Não precisa atualizar a tarefa se não for a que foi clicada
      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick (taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px]">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          GERENCIADOR DE TAREFAS
        </h1>
        <AddTask/>
        <Tasks
        tasks={tasks}
        onTaskClick={onTaskClick}
        onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;