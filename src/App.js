import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from "./componants/singleUse/login/Login";
import Signup from './componants/singleUse/login/Signup';
import Home from './componants/singleUse/home/Home';
import NavBar from './Navbar';
import QuizSearchResultPage from './componants/singleUse/quiz/QuizSearchResultPage';
import QuizPage from './componants/singleUse/quiz/QuizPage';

import './App.css';

function App() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch(); 

  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path='/' element={ <Home /> }></Route>
        <Route path='/search-results' element={ <QuizSearchResultPage /> }></Route>
        <Route path='/quiz/:id' element={ <QuizPage /> }></Route>
        {
          !user.loggedIn && 
          (
            <>
              <Route path='/login' element={ <Login /> } ></Route>
              <Route path='/signup' element={ <Signup /> } ></Route>
            </>
          )
        }

        {
          user.loggedIn && 
          (
            <>

            </>
          )
        }
      </Routes>
    </Router>
  );
}

export default App;
