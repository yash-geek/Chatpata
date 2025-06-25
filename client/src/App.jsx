import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import AppLayout from './components/layout/AppLayout'
import { LayoutLoader } from './components/layout/Loaders'
import AdminLayout from './components/layout/AdminLayout'

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(
  () => import("./pages/Login")
)
const Chat = lazy(
  () => import("./pages/Chat")
)
const Groups = lazy(
  () => import("./pages/Groups")
)
const NotFound = lazy(
  () => import("./pages/NotFound")
)
const AdminLogin = lazy(
  () => import("./pages/admin/AdminLogin")
)
const Dashboard = lazy(
  () => import("./pages/admin/Dashboard")
)
const UserManagement = lazy(
  () => import("./pages/admin/UserManagement")
)
const ChatManagement = lazy(
  () => import("./pages/admin/ChatManagement")
)
const MessageManagement = lazy(
  () => import("./pages/admin/MessageManagement")
)
{/* <AppLayout Component={Home}/> */}
let user = true;
const App = () => {
  return (
    <Router >
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          <Route element={<ProtectRoute user={user}/>}>
            <Route path='/' element={ <AppLayout Component={Home}/> } />
            <Route path='/chat/:chatId' element={<AppLayout Component={Chat}/>} />
            <Route path='/Groups' element={<Groups />} />
          </Route>

          <Route path='/login' element={
            <ProtectRoute user={!user} redirect='/'>
            <Login />
            </ProtectRoute>
            } />
            <Route path='/admin' element={<AdminLogin/>}></Route>
            <Route path='/admin/dashboard' element={<AdminLayout component={Dashboard}/>}></Route>
            <Route path='/admin/user-management' element={<AdminLayout component={UserManagement}/>}></Route>
            <Route path='/admin/chat-management' element={<AdminLayout component={ChatManagement}/>}></Route>
            <Route path='/admin/messages' element={<AdminLayout component={MessageManagement}/>}></Route>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
