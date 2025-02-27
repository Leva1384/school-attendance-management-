import React from "react";
import ReactDOM from 'react-dom/client';
import LoginPage from "./Home/AttendaceManagment/LoginPage";
import AdminPage from "./Admin/AdminPage";
import Addclasses from "./Admin/Addclasses";
import {  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AddTeacher from "./Admin/AddTeacher";
import AddStudents from "./Admin/AddStudents";
import TeacherPage from "./Teacher/TeacherPage";
const router=createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />, 
  },
  {
    path:"/login",
element:<LoginPage />
  },
  {
    path:"/admin",
    element:<AdminPage/>
  },
  {
    path:"/Addclasses",
    element:<Addclasses />
  },
  {
    path:"/AddTeacher",
    element:<AddTeacher />
  },
  {
    path:"/AddStudents",
    element:<AddStudents />
  },{
    path:"/teacher",
    element:<TeacherPage/>
  }
  

]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

