import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import { v4 } from "uuid";
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(() => {
    // Carrega do localStorage, se existir, senão busca da API
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  // Salva no localStorage sempre que tasks mudar
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Só busca da API se não houver tasks no localStorage
  useEffect(() => {
    if (tasks.length === 0) {
      const fetchTasks = async () => {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos?_limit=10"
        );
        const data = await response.json();
        // Adapta os dados para o formato esperado
        const adaptedTasks = data.map(task => ({
          id: task.id,
          title: task.title,
          description: "",
          isCompleted: task.completed ?? false
        }));
        setTasks(adaptedTasks);
      };
      fetchTasks();
    }
  }, []); // Não depende de tasks para não entrar em loop

  function onTaskClick(taskId) {
    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, isCompleted: !task.isCompleted }
        : task
    );
    setTasks(newTasks);
  }

  function onDeleteTaskClick(taskId) {
    const newTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title,
      description,
      isCompleted: false
    };
    setTasks([...tasks, newTask]);
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] justify-center space-y-4">
        <Title>Gerenciador de tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
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