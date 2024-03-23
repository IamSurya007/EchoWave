import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/auth'>
            <Route path='login' element={ <Login/>}/>
            <Route path='signup' element={ <Signup/>}/>
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
