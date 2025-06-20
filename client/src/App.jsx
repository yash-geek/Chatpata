import React,{lazy} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
const Home = lazy(()=>import("./pages/Home"))
const Login = lazy(
  ()=>import("./pages/Login")
)
const Chat = lazy(
  ()=>import("./pages/Chat")
)
const Groups = lazy(
  ()=>import("./pages/Groups")
)
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/chat/:chatId' element={<Chat/>}/>
        <Route path='/Groups' element={<Groups/>}/>
        <Route path='login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App
