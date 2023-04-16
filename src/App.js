
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
import Landing from "./pages/Landing/Landing"
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Toast from './components/Toast/Toast';

function App() {
  const { toastType, setToastType, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem('accessToken')) !== null;

    setIsLoggedIn(isLoggedIn);
  });


  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/landing" />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotPassword" element={<PasswordReset />} />

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
            <Route path="/landing" element={<Landing />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
      <Toast toastType={toastType} setToastType={setToastType} />
    </>

  );
}

export default App;
