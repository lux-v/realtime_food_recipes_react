
import './App.css';
import { AuthContext } from './context/AuthContext';
import { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';


import LogIn from './pages/LogIn/LogIn';
import Toast from './components/Toast/Toast';

function App() {
  const { toastType, setToastType, setIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('accessToken') !== null;
    setIsLoggedIn(isLoggedIn);
  });
  return (

    <>


      <Router>

        <Routes>
          {/* <Route path="/" element={<Dashboard />} /> */}
          <Route path="/" element={<LogIn />} />

          {/* <Route path="/about" element={<></>} />
        <Route path="/users" element={<></>}>
          <Route path="/" element={<></>} />
          <Route path=":userId" element={<></>} />
        </Route>*/}
          <Route path="*" element={<></>} />

        </Routes>
      </Router>
      <Toast toastType={toastType} setToastType={setToastType} />
    </>

  );
}

export default App;
