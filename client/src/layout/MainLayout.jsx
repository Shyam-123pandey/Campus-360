import ChatbotWidget from '@/components/ChatbotWidget'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
        <Navbar/>
        <div className='flex-1 mt-[calc(4rem+3rem)]'> {/* 4rem (64px) for navbar + 3rem for banner */}
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default MainLayout