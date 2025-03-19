import React from "react";
import TopMenu from "./Components/TopMenu.js";
import { Link } from "react-router-dom";
import Footer from './Components/Footer.js';
import { FaShoppingCart, FaRegMoneyBillAlt, FaWarehouse } from 'react-icons/fa';
import SlideShow from "./Components/SlideShow.js"
import PropertListing from "./Components/PropertyListing.js"

const Dashboard = () => {
  return (
    <div >
      <TopMenu />
      <div>
        <h2></h2>
      </div>
      <SlideShow/>
      <PropertListing/>
       

      <Footer />
    </div>
  );
};



export default Dashboard;
