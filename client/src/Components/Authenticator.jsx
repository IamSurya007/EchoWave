// App.js (using React Router)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  LoginCard  from '../pages/LoginCard.jsx';
import  SignUp  from '../pages/SignUp.jsx';
const Authenticator=() =>{
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginCard/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  );
}
export default Authenticator;

