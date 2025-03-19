import React, { useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min"; // ✅ Ensure Bootstrap JS is imported
import { Carousel } from "bootstrap"; // ✅ Explicitly import Carousel
import slider1 from "./../Images/slider1.jpg";
import slider2 from "./../Images/slider2.jpg";
import slider3 from "./../Images/slider3.jpg";

const DashboardSlideshow = () => {
  const carouselRef = useRef(null); // ✅ Create a reference for the carousel

  useEffect(() => {
    if (carouselRef.current) {
      new Carousel(carouselRef.current, {
        interval: 4000, // 4 seconds
        ride: "carousel",
        pause: false,
        wrap: true,
      });
    } else {
      console.error("Bootstrap Carousel element not found.");
    }
  }, []);

  return (
    <div id="welcomeCarousel" className="carousel slide" data-bs-ride="carousel" ref={carouselRef}>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={slider1} className="d-block w-100" alt="Slide 1" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h2 className="fw-bold">property available with amazing prizes</h2>
          </div>
        </div>

        <div className="carousel-item">
          <img src={slider2} className="d-block w-100" alt="Slide 2" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h2 className="fw-bold">We also offer best construction services</h2>
          </div>
        </div>

        <div className="carousel-item">
          <img src={slider3} className="d-block w-100" alt="Slide 3" style={{ height: "400px", objectFit: "cover" }} />
          <div className="carousel-caption d-none d-md-block">
            <h2 className="fw-bold">Call us Today</h2>
          </div>
        </div>
      </div>

      <button className="carousel-control-prev" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#welcomeCarousel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
      </button>
    </div>
  );
};

export default DashboardSlideshow;
