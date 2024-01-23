import './App.css'
// import { Button } from "@material-tailwind/react";
// import  LoginCard  from './pages/LoginCard';
import  Authenticator  from './Components/Authenticator'
// import { SignUp } from './pages/SignUp'
function App() {

  return (
    <div className=' flex justify-center items-center h-screen'>
      {/* <LoginCard/> */}
      {/* <SignUp /> */}
      <Authenticator/>
    </div>
  )
}

export default App
