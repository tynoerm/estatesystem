import React, { useEffect, useState } from "react";
import axios from "axios";

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const adminWhatsApp = "+263786077188"; //  WhatsApp number

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await axios.get("https://estatesystem.onrender.com/properties");
                setProperties(response.data);
            } catch (error) {
                console.error("Error fetching properties:", error);
            }
        };

        fetchProperties();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Property Listings</h2>
            <div className="row">
                {properties.length > 0 ? (
                    properties.map((property) => (
                        <div key={property._id} className="col-md-4 mb-4">
                            <div className="card shadow-sm">
                                <img
                                    src={`https://estatesystem.onrender.com/image/${property.imageId}`}
                                    alt="Property"
                                    className="card-img-top"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <p className="card-text">{property.description}</p>
                                    {/* WhatsApp Contact Button */}
                                    <a
                                        href={`https://wa.me/${adminWhatsApp}?text=Hello,%20I'm%20interested%20in%20this%20property:%20${property.description}`}
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
                    <p className="text-center">No properties available.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyListing;
