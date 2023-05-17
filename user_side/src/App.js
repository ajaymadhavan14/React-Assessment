import './App.css';
import Signup from './pages/Signup';
import Login from './pages/login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { AppContext } from './context/AppContext';
import { Routes,Route, useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from './axios/axios';
import { login } from './redux/user';
import { useDispatch } from 'react-redux';
import Errorpage from './pages/Errorpage';

function App() {

  const [relogin, setRelogin]=useState(false)
  const [loginStatus, setLoginStatus]=useState(false)
  const dispatch = useDispatch(login)
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('/isUserAuth',{
     headers:{"x-access-token":localStorage.getItem("token")}
    }).then((response)=>{
      console.log(response.data)
      if(!response.data.auth){
        
        setLoginStatus(false)
        // navigate('/')

      } else{
        setLoginStatus(true)
        dispatch(login(response.data))
      }
    })
  },[loginStatus])



 



  return (
    
    <div>
       <AppContext.Provider value={{
        relogin:relogin,setRelogin:setRelogin,
        loginStatus:loginStatus,
        setLoginStatus:setLoginStatus,
        }}>
      <Routes>
    {loginStatus && (
      <>
       <Route  path='/home' element={<Home />} ></Route>
       <Route  path='/profile' element={<Profile />} ></Route>
      </>
    )}
        <Route exact path='/' element={!loginStatus?<Signup />:<Home/>} ></Route>
        {!loginStatus &&
        (<Route path='/login' element={<Login />} ></Route>)}
        <Route path='*' element={<Errorpage/>}/>
       
      </Routes> 
      </AppContext.Provider>
    </div>
  
   
  );
}

export default App;
