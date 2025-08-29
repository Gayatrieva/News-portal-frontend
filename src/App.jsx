import 'bootstrap/dist/css/bootstrap.css';
import "bootstrap/dist/js/bootstrap.bundle.js";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TopNavbar from './components/langingPage/TopNavbar';
import Navbar from './components/langingPage/Navbar';
import Logo from "./components/langingPage/Logo";
import Home from './components/langingPage/Home';
import About from './components/langingPage/About';
import LatestNews from './components/langingPage/LatestNews';
import ImageGallery from './components/langingPage/ImageGallery';
import ContactUs from './components/langingPage/ContactUs';

import UserRegister from './components/langingPage/UserRegister';
import Login from './components/langingPage/Login'
import Footer from './components/langingPage/Footer';
// import SliderA from './components/langingPage/SliderA';
import EditProfile from './components/adminComponents/EditProfile';
import AdminContactUsList from './components/adminComponents/AdminContactUsList';
import AdminFeedbackList from './components/adminComponents/AdminFeedbackList'
import AdminLogout from './components/adminComponents/AdminLogout';
import AllNews from './components/adminComponents/AllNews';



import PostNews from './components/userComponents/PostNews';
import YourNews from './components/userComponents/YourNews';
import UserAllNewsList from './components/userComponents/UserAllNewsList';
import UserLogout from './components/userComponents/UserLogout';
import UserProfileEdit from './components/userComponents/UserProfileEdit';
import NewsCategory from './components/langingPage/NewsCategory';
import NewsDetails from './components/langingPage/NewsDetails';



function App() { 
  return (
    <>
      <BrowserRouter>
       <TopNavbar/>
       <Logo/>
      {/* <Navbar /> */}
       
       {/* <SliderA/> */}
        
        
        
      
         <Routes>
          {/* LandingPage */}
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/about' element={<NewsCategory/>} />
          <Route path='/news' element={<NewsDetails/>} />
          <Route path='/gallery' element={<ImageGallery/>} />
          <Route path='/contact' element={<ContactUs/>} />
          <Route path='/userRegister' element={<UserRegister/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/news-details' element={<NewsDetails/>}/>
          {/* Admin Route */}
          <Route path='/admin-profile' element={<EditProfile/>} />
          <Route path='/admin-newslist' element={<AllNews/>} />
          <Route path='/admin-contactus' element={<AdminContactUsList/>} />
          <Route path='/admin-logout' element={<AdminLogout/>} />
          {/* UserROute */}
          <Route path='/user-profile' element={<UserProfileEdit/>} />
          <Route path='/user-addnews' element={<PostNews/>} />
          <Route path='/user-list' element={<YourNews/>} />
          <Route path='/user-alllist' element={<UserAllNewsList/>} />
          <Route path='/user-logout' element={<UserLogout/>} />

        </Routes>
      
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App