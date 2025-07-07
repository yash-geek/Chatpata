import axios from 'axios'
import { lazy, Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import AdminLayout from './components/layout/AdminLayout'
import AppLayout from './components/layout/AppLayout'
import { LayoutLoader } from './components/layout/Loaders'
import { server } from './constants/config'
import { userExists, userNotExists } from './redux/reducers/auth'
import { SocketProvider } from './socket'
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
{/* <AppLayout Component={Home}/> */ }

const App = () => {
  const {user, loader} = useSelector((state)=>state.auth)
  const dispatch = useDispatch();

  useEffect(() => {

    axios.get(`${server}/api/v1/user/me`,{withCredentials:true})
    .then(({data})=>dispatch(userExists(data.user)))
    .catch((err)=>dispatch(userNotExists()))

  }, [dispatch])
  return loader?(<LayoutLoader/>): (
    <Router >
      <Suspense fallback={<LayoutLoader />}>
        <Routes>
          <Route element={
            <SocketProvider>
            <ProtectRoute user={user} />
            </SocketProvider>
        }>
            <Route path='/' element={<AppLayout Component={Home} />} />
            <Route path='/chat/:chatId' element={<AppLayout Component={Chat} />} />
            <Route path='/Groups' element={<Groups />} />
          </Route>

          <Route path='/login' element={
            <ProtectRoute user={!user} redirect='/'>
              <Login />
            </ProtectRoute>
          } />
          <Route path='/admin' element={<AdminLogin />}></Route>
          <Route path='/admin/dashboard' element={<AdminLayout component={Dashboard} />}></Route>
          <Route path='/admin/user-management' element={<AdminLayout component={UserManagement} />}></Route>
          <Route path='/admin/chat-management' element={<AdminLayout component={ChatManagement} />}></Route>
          <Route path='/admin/messages' element={<AdminLayout component={MessageManagement} />}></Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position='bottom-center'/>
    </Router>
  )
}

export default App
