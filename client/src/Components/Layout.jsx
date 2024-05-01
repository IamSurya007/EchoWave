import NavBar from '../ui/Navbar'
import Sidebar from '../ui/Sidebar'

// eslint-disable-next-line react/prop-types
const Layout = ({children}) => {
  return (
    <div className=' flex flex-col'>
        <Sidebar/>
        <NavBar/>
        <div className=' flex-1'>
            {children}
        </div>
    </div>
  )
}

export default Layout