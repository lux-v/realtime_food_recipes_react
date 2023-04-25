
import './App.css';
import { useContext, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import { AuthContext } from './context/AuthContext';

import LogIn from './pages/LogIn/LogIn';
import SignUp from "./pages/SignUp/SignUp"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import SoonPage from "./pages/ComingSoon/ComingSoon"
import Dashboard from "./pages/Dashboard/Dashboard"
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Toast from './components/Toast/Toast';
import Landing from './pages/Landing/Landing';
import Recipes from './pages/Recipes/Recipes';
import RecipesAddNew from './pages/RecipesAddNew/RecipesAddNew';
import { Loading } from './components/LoadingSpinner/LoadingSpinnerStyle';
import Backdrop from './components/Backdrop/Backdrop';


function App() {
  const { toastType, setToastType, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] =useState(true)


  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const isLoggedIn = accessToken !== null && accessToken !== undefined;

    setIsLoggedIn(isLoggedIn);

    setIsLoading(false)
  });

  console.log("isLoading: ", isLoading)

  return (
    <>
      <Router>
        <Routes> 
          <Route path="/" element={ isLoggedIn ? isLoading ? 
          <Backdrop>
            <Recipes />
            </Backdrop> 
            : 
            <Recipes /> 
            : isLoading ?
             <Backdrop>
              <Landing />
              </Backdrop> 
              : 
              <Landing />
              } />
          {
          isLoggedIn && <>
            <Route path="/login" element={ <Navigate replace to="/" />} />
            <Route path="/signup" element={<Navigate replace to="/" />} />
          </>
          }

          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-reset" element={<PasswordReset />} />

          <Route path="/about-us" element={<SoonPage />} />
          <Route path="/how-it-works" element={<SoonPage />} />

          <Route
            element={
              <ProtectedRoute
                isAllowed={
                  isLoggedIn
                  // || JSON.parse(localStorage.getItem('userDataAll')).is_admin === true
                }
              />
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/add-new" element={<RecipesAddNew />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
      <Toast toastType={toastType} setToastType={setToastType} />
    </>

  );
}

export default App;
