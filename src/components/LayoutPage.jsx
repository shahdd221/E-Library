import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'


export default function LayoutPage() {

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
      <div className='flex-grow-1'>
        <Outlet />
      </div>
      
      <Footer />
      
    </div>
  )
}