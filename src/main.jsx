import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskPage from "./pages/TaskPage.jsx";

  const router  = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
    },

    {
      path: "/task",
      element: <TaskPage/>,
    },
]);

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Elemento com id "root" não encontrado no HTML.');
}

createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);