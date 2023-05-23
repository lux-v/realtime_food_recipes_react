
import './App.css';
import { useContext, useEffect, useState, useMemo } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthContext } from './context/AuthContext';

import LogIn from './pages/LogIn/LogIn';
import SignUp from "./pages/SignUp/SignUp"
import ErrorPage from "./pages/ErrorPage/ErrorPage"
import ComingSoon from "./pages/ComingSoon/ComingSoon"
import Dashboard from "./pages/Dashboard/Dashboard"
import PasswordReset from "./pages/PasswordReset/PasswordReset"
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Toast from './components/Toast/Toast';
import Landing from './pages/Landing/Landing';
import Recipes from './pages/Recipes/Recipes';
import Recipe from './pages/Recipe/Recipe';
import RecipesAddNew from './pages/RecipesAddNew/RecipesAddNew';
import Backdrop from './components/Backdrop/Backdrop';
import AccountSettings from './pages/AccountSettings/AccountSettings';
import AccountStats from './pages/AccountStats/AccountStats';
import Modal from './components/Modal/Modal';

import Palette from './lib/style/theme/palette';


function App() {
  const { toastType, presetColor, setToastType, setIsLoggedIn, isLoggedIn } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true)

  const theme = useMemo(() => Palette(presetColor, "light"), [presetColor])


  useEffect(() => {
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    const isLoggedIn = accessToken !== null && accessToken !== undefined;

    setIsLoggedIn(isLoggedIn);
  });

  useEffect(() => {
    setIsLoading(false)
  }, [])


  return (
    <ThemeProvider theme={theme} >
      <Router>
        <Routes>
          <Route path="/" element={isLoggedIn ? isLoading ?
            <Backdrop>
              <Dashboard />
            </Backdrop>
            :
            <Dashboard />
            : isLoading ?
              <Backdrop>
                <Landing />
              </Backdrop>
              :
              <Landing />
          } />
          {
            isLoggedIn && <>
              <Route path="/login" element={<Navigate replace to="/" />} />
              <Route path="/signup" element={<Navigate replace to="/" />} />
            </>
          }

          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/password-reset" element={<PasswordReset />} />

          <Route path="/about-us" element={<ComingSoon title="About us" />} />
          <Route path="/how-it-works" element={<ComingSoon title="How it works" />} />

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
            <Route path="/dashboard" element={<Navigate replace to="/" />} />
            <Route path="/recipes" element={<Recipes />} />
            <Route path="/recipes/:id" element={<Recipe />} />
            <Route path="/recipes/:id/update" element={<RecipesAddNew isEditRecipe={true} />} />
            <Route path="/recipes/add-new" element={<RecipesAddNew isEditRecipe={false} />} />

            <Route path="/account-settings" element={<AccountSettings />} />
            <Route path="/profile/account-stats" element={<AccountStats />} />
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
      <Toast toastType={toastType} setToastType={setToastType} />
      {/* <Modal /> */}
    </ThemeProvider>

  );
}

export default App;
