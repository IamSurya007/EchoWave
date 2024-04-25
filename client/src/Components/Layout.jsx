import NavBar from './Navbar'
import Sidebar from './Sidebar'

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  return (
    <div className=' flex'>
        <Sidebar/>
        <NavBar/>
        <div className=' flex-1'>
            {children}
        </div>
    </div>
  )
}

export default Layout