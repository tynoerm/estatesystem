import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Carousel } from "bootstrap";
import slider1 from "./Images/slider1.jpg";
import slider2 from "./Images/slider2.jpg";
import slider3 from "./Images/slider3.jpg";
import TopMenu from "./Components/TopMenu.js"
import Footer from './Components/Footer.js';


const Blog = () => {
    const [post, setPost] = useState([]);
    const adminWhatsApp = "+263786077188"; // WhatsApp number

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get("http://localhost:3001/posts");
                setPost(response.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPost();
    }, []);

    useEffect(() => {
        const carouselElement = document.querySelector("#welcomeCarousel");
        if (carouselElement) {
            const carouselInstance = new Carousel(carouselElement, {
                interval: 4000,
                ride: "carousel",
                pause: false, // ✅ Corrected (not a string)
                wrap: true,
            });

            return () => carouselInstance.dispose();
        } else {
            console.error("Bootstrap Carousel element not found.");
        }
    }, []);

    return (
        <div>
            <TopMenu/>
            <div><b>WE ALSO OFFER:</b></div>
            <div className="container mt-5">
            
                <div className="row">
                    {post.length > 0 ? (
                        post.map((userpost) => (
                            <div key={userpost._id} className="col-md-4 mb-4">
                                <div className="card shadow-sm">
                                    <img
                                        src={`http://localhost:3001/image/${userpost.imageId}`}
                                        alt="Property"
                                        className="card-img-top"
                                        style={{ height: "200px", objectFit: "cover" }}
                                    />
                                    <div className="card-body">
                                        <p className="card-text">{userpost.description}</p>
                                        <a
                                            href={`https://wa.me/${adminWhatsApp}?text=Hello,%20I'm%20interested%20in%20this%20property:%20${userpost.description}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="btn btn-primary w-100 mt-2"
                                        >
                                            Contact Admin on WhatsApp
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No posts available.</p>
                    )}
                </div>
            </div>

       
                  <Footer />
        </div>
    );
};

export default Blog;
