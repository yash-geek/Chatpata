import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ProtectRoute from './components/auth/ProtectRoute'
import AppLayout from './components/layout/AppLayout'
import { LayoutLoader } from './components/layout/Loaders'
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
            <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
