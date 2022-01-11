
import './App.css';
import { BrowserRouter as Router, Routes, Route,Link } from 'react-router-dom'
import Home from './Pages/Home';
import CreatePost from './Pages/CreatePost';
import Login from './Pages/Login';
import { useState } from 'react';
import  {signOut}  from 'firebase/auth'
import { auth } from './firebase-config';


function App(props) {
 
  const[isAuth,setIsAuth]=useState(localStorage.getItem('isAuth'));

 

  const signUserOut = ()=>{

    signOut(auth).then(()=>{
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname='/login'
    })
  }
 
  return (
    
   

    <Router>
      <nav>
        <Link to='/'> Home</Link>
       

        {!isAuth 
        ? <Link to='/login' className='login-link'> Login</Link>
        : (
        <>
        <Link to='/createpost'> Create Post</Link>
        <Link to='#' className='login-link' onClick={signUserOut}> Log Out</Link>
        </>
        )} 
        
      </nav>

    
      <Routes>
        <Route path='/' element={<Home isAuth={isAuth}/>}></Route>
        <Route path='/createpost' element={<CreatePost isAuth={isAuth}/>}></Route>
        <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}></Route>
      </Routes>
    </Router>
  


    

    
  );
}

export default App;
