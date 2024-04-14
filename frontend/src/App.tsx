import './App.css'

import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Blogs } from './pages/Blogs'
import { BlogPosted } from './pages/BlogPosted'
import UserRoute from './components/UserRoute'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route element={<UserRoute />}>
            <Route element={<Blogs/>} path="/blogs"/>
            <Route element={<BlogPosted/>} path="/blog/posted"/>
            <Route element={<Blog/>} path="/blog/:id"/>
          </Route>
          <Route path="/" element={<Navigate to="/signup" replace/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
