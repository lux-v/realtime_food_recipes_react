
import './App.css';
import { useContext, useEffect } from 'react';
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

function App() {
  const { toastType, setToastType, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);


  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const isLoggedIn = accessToken !== null && accessToken !== undefined;

    setIsLoggedIn(isLoggedIn);
  });


  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Navigate replace to="/landing" />} /> */}
          <Route path="/" element={isLoggedIn ? <Recipes /> : <Landing />} />
          {isLoggedIn && <>
            <Route path="/login" element={<Navigate replace to="/" />} />
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
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
      <Toast toastType={toastType} setToastType={setToastType} />
    </>

  );
}

export default App;
