import React, { useState } from 'react';
import axios from "axios";
import TopMenu from "./Components/TopMenu.js";
import Footer from "./Components/Footer.js"; // ✅ Import Footer
import { FaCloudUploadAlt } from "react-icons/fa";

const PropertyUpload = () => {
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [description, setDescription] = useState("");

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file)); // Generate preview URL
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!image || !description) {
            alert("Please add an image and description.");
            return;
        }

        const formData = new FormData();
        formData.append("image", image);
        formData.append("description", description);

        try {
            await axios.post("https://estatesystem.onrender.com/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Property uploaded successfully!");
            setImage(null);
            setImagePreview(null);
            setDescription("");
        } catch (error) {
            alert("Error uploading property");
        }
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <TopMenu />

            <div className="container mt-5 flex-grow-1">
                <a href="./AdminBlog" className="btn btn-secondary mb-3">Blog Upload</a>

                <div className="card shadow-lg p-4">
                    <h3 className="text-center mb-4">
                        <FaCloudUploadAlt className="text-primary me-2" />
                        <b>Upload Property Image</b>
                    </h3>

                    {/* Image Preview */}
                    {imagePreview && (
                        <div className="text-center mb-3">
                            <img src={imagePreview} alt="Preview" className="img-fluid rounded" style={{ maxHeight: "250px" }} />
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-bold">Select Image</label>
                            <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} required />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Property Description</label>
                            <input type="text" className="form-control" placeholder="Enter property details" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Upload Property
                        </button>
                    </form>
                </div>
            </div>

            <Footer className="mt-auto" /> {/* ✅ Footer stays at the bottom */}
        </div>
    );
};

export default PropertyUpload;
