import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { lazy } from "react";
import {
  SignIn,
  SignUp,
  AdminLayout,
  TeacherLayout,
  StudentLayout,
  Groups,
  Course,
  ProtectChildrem,
  LoginChildren,
  Branch,
  Worker,
} from "@pages";
const App = lazy(() => import("../App"));

const Router = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route
          index
          element={
            <LoginChildren>
              <SignIn />
            </LoginChildren>
          }
        />
        <Route path="sign-up" element={<SignUp />} />
        {/* AdminLayout */}
        <Route
          path="admin/"
          element={
            <ProtectChildrem>
              <AdminLayout />
            </ProtectChildrem>
          }
        >
          <Route index element={<Groups />} />
          {/* <Route path="group" element={<Groups />} /> */}
          <Route path="courses" element={<Course />} />
          <Route path="branches" element={<Branch />} />
          <Route path="student" element={<StudentLayout />}></Route>
          <Route path="teacher" element={<TeacherLayout />}></Route>
        </Route>
        <Route path="worker" element={<Worker />}></Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default Router;
