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
import {io} from 'socket.io-client'
import ProtectedRoute from "@/Components/ProtectedRoutes.jsx";

function App() {

  // const socket = io("http://localhost:5000/");

  return (
    <div>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Router>
          {/*<ProtectedRoute path='/' element={<LandingPage/>}/>*/}
          {/*<ProtectedRoute path='/account/edit' element={<EditProfile/>} />*/}
          {/*<ProtectedRoute path='/:username' element={<UserProfile/>}/>*/}
          {/*<ProtectedRoute path= '/direct/t/:username' element={<Chat/>}/>*/}
          {/*<ProtectedRoute path='/chat' element={<Chatbox/>}/>*/}
        <Routes>
            <Route path='/' element={<ProtectedRoute><LandingPage/></ProtectedRoute>}/>
            <Route path='/account/edit' element={<ProtectedRoute><EditProfile/></ProtectedRoute>}/>
            <Route path='/:username' element={<ProtectedRoute><UserProfile/></ProtectedRoute>}/>
            <Route path='/direct/t/:username' element={<ProtectedRoute><Chat/></ProtectedRoute>}/>
            <Route path='/chat' element={<ProtectedRoute><Chatbox/></ProtectedRoute>}/>
          <Route path='/auth'>
            <Route path='login' element={ <Login/>}/>
            <Route path='signup' element={ <Signup/>}/>
          </Route>
        </Routes>
      </Router>
      </ThemeProvider>
    </div>
  )
}

export default App
