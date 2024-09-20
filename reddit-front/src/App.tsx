import './App.css'
import ResponsiveAppBar from './UI/AppToolBar/AppToolBar.tsx';
import {Route, Routes} from 'react-router-dom';
import Register from './features/User/Register.tsx';
import Login from './features/User/Login.tsx';
import PostsPage from './features/Posts/PostsPage.tsx';

const App = () => {

  return (
    <>
      <header>
        <ResponsiveAppBar/>
      </header>
      <Routes>
        <Route path={'/'} element={<PostsPage/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path={'/login'} element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
