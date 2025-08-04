import { lazy } from "react";

const SignIn = lazy(() => import("./auth/sign-in"));
const ForgotPassword = lazy(() => import("./auth/forgot-password"));
const SignUp = lazy(() => import("./auth/sign-up"));
const AdminLayout = lazy(() => import("./admin-layout/admin"));
const Teachers = lazy(() => import("./teacher-layout/teachers"));
const StudentLayout = lazy(() => import("./student-layout/student"));
const Groups = lazy(() => import("./groups/group"));
const Course = lazy(() => import("./courses/courses"));
const Student = lazy(() => import("./student-layout/student"));
const ProtectChildrem = lazy(() => import("./protect-route/layout-protect"));
const LoginChildren = lazy(() => import("./protect-route/login-protect"));
const Branch = lazy(() => import("./branch/branch"));
const SingleGroup = lazy(() => import("./groups/single-group"));
const Notfoun = lazy(() => import("./not-found/notfound"));
const Room = lazy(() => import("./rooms/room"));
const TeacherLayout = lazy(() => import("./teacher-layout/teacher-layout"));
const GroupStudent = lazy(() => import("./teacher-group/group-students"));
const TeacherGroups = lazy(() => import("./teacher-group/teacher-groups"));
const AdminProfile = lazy(() => import("./admin-layout/admin-page"));
const TeacherProfile = lazy(() => import("./teacher-layout/teacher-page"));


// ------------------------------------------------
const Worker = lazy(() => import("./worker/worker"));
const Reducer = lazy(() => import("./worker/useReducer"));
const StarryNight = lazy(() => import("./night/night"));
// ------------------------------------------------



export {
  SignIn,
  ForgotPassword,
  SignUp,
  AdminLayout,
  Teachers,
  StudentLayout,
  Groups,
  Course,
  Student,
  ProtectChildrem,
  LoginChildren,
  Branch,
  SingleGroup,
  Notfoun,
  Room,
  TeacherLayout,
  GroupStudent,
  TeacherGroups,
  AdminProfile,
  TeacherProfile,
  



  // ------------------------------------------------
  Worker,
  Reducer,
  StarryNight,
  // ------------------------------------------------
};
