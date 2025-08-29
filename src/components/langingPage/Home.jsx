import React from "react";
import Slide from './Slide'


import NewsCategory from './NewsCategory'

import LatestNews from './LatestNews'
import LatestVideos from './LatestVideos'
import LatestCity from './LatestCity'
import ImageGallery from './ImageGallery'

import About from "./About";

import Navbar from "./Navbar";





const Home = () => {
  return (
    <>
      <Navbar />
      <Slide />
      <NewsCategory />
      
      <LatestNews />
      <LatestVideos />
      <LatestCity />
      <ImageGallery />
      
      <About />
      {/* <TopNews /> */}

      
    </>
  )
}

export default Home