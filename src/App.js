import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Login from "./componants/singleUse/login/Login";
import Signup from './componants/singleUse/login/Signup';
import Home from './componants/singleUse/home/Home';
import NavBar from './Navbar';
import QuizSearchResultPage from './componants/singleUse/quiz/QuizSearchResultPage';
import QuizPage from './componants/singleUse/quiz/QuizPage';
import UserQuizesPage from './componants/singleUse/quiz/UserQuizesPage';
import PrvQuizDetailsPage from './componants/singleUse/quiz/PrvQuizDetailsPage';
import PubQuizDetailsPage from './componants/singleUse/quiz/PubQuizDetailsPage';
import UserDetailsPage from './componants/singleUse/user/UserDetailsPage';
import UserQuizHistoryPage from './componants/singleUse/user/UserQuizHistoryPage';
import UserQuizHistoryDetailsPage from './componants/singleUse/user/UserQuizHistoryDetailsPage';
import PubUserInfo from './componants/singleUse/user/PubUserInfo';
import HomeNotLogin from './componants/singleUse/home/HomeNoLogin';

import './App.css';

var apiUrl = "https://localhost:7295";

function App() {

  const user = useSelector(state => state.user);
  const dispatch = useDispatch(); 

  return (
    <Router>
      <NavBar />
      <Routes>
        
        {
          !user.loggedIn && 
          (
            <>
              <Route path='/' element={ <HomeNotLogin />}></Route>
              <Route path='/login' element={ <Login /> } ></Route>
              <Route path='/signup' element={ <Signup /> } ></Route>
            </>
          )
        }

        {
          user.loggedIn && 
          (
            <>
              <Route path='/' element={ <Home /> }></Route>
              <Route path='/quizes' element={ <UserQuizesPage /> } ></Route>
              <Route path='/quizDetails/:id' element={ <PrvQuizDetailsPage /> } ></Route>
              <Route path='/user' element={ <UserDetailsPage /> }></Route>
              <Route path='/quizHistory' element={ <UserQuizHistoryPage /> }></Route>
              <Route path='/quizHistory/:id' element={ <UserQuizHistoryDetailsPage  />}></Route>
              <Route path='/search-results' element={ <QuizSearchResultPage /> }></Route>
              <Route path='/details/:id' element={ <PubQuizDetailsPage /> }></Route>
              <Route path='/quiz/:id' element={ <QuizPage /> }></Route>
              <Route path='/user/:username' element={ <PubUserInfo /> }></Route>
            </>
          )
        }
      </Routes>
    </Router>
  );
}

export default App;
