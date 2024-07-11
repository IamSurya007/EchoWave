import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/SignUp';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';
import { ThemeProvider } from './Components/theme-provider';
import UserProfile from './pages/UserProfile';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import Chatbox from './Components/Chatbox';

function App() {

  return (
    <div>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path='/auth'>
            <Route path='login' element={ <Login/>}/>
            <Route path='signup' element={ <Signup/>}/> 
          </Route>
          <Route path='/account/edit' element={<EditProfile/>} />     
          <Route path='/:username' element={<UserProfile/>}/>
          <Route path= '/direct/t/:username' element={<Chat/>}/>
          <Route path='/chat' element={<Chatbox/>}/>
        </Routes>
      </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
