import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button, Form, Table, Spinner, Alert, Modal } from 'react-bootstrap';

const allowedImageTypes = ['image/png', 'image/jpeg'];

const ImagesComponent = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [imageToDelete, setImageToDelete] = useState(null);

    // Fetch the list of images from the server
    const fetchImageList = () => {
        setLoading(true);
        axios.get('http://localhost:8080/truckrentalsystem/imageData')
            .then(response => {
                setImageList(response.data);
                setFilteredImages(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Failed to fetch image list');
                setLoading(false);
            });
    };

    // Upload image
    const handleUpload = () => {
        if (!selectedImage) {
            setError('No file selected');
            return;
        }

        const fileName = selectedImage.name;

        // Check if the image already exists
        if (imageList.includes(fileName)) {
            setError('An image with this name already exists. Please choose a different name.');
            return;
        }

        const formData = new FormData();
        formData.append('image', selectedImage);

        setLoading(true);
        axios.post('http://localhost:8080/truckrentalsystem/imageData', formData)
            .then(response => {
                fetchImageList(); // Refresh image list after upload
                setSelectedImage(null);
                setPreviewUrl(null);
                document.getElementById('imageUploadInput').value = ''; // Clear the file input
                setLoading(false);
                setSuccessMessage('Image uploaded successfully');
                setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
            })
            .catch(error => {
                console.error('Upload error:', error); // Log error for debugging
                setError('Failed to upload image');
                setLoading(false);
            });
    };

    // Show confirmation modal
    const confirmDelete = (fileName) => {
        setImageToDelete(fileName);
        setShowConfirmModal(true);
    };

    // Delete image
    const handleDeleteImage = () => {
        if (!imageToDelete) {
            setError('Invalid filename');
            return;
        }

        setLoading(true);
        axios.delete(`http://localhost:8080/truckrentalsystem/imageData/${imageToDelete}`)
            .then(response => {
                fetchImageList(); // Refresh image list after deletion
                setLoading(false);
                setShowConfirmModal(false);
                setSuccessMessage('Image deleted successfully');
                setTimeout(() => setSuccessMessage(''), 3000); // Clear success message after 3 seconds
            })
            .catch(error => {
                setError('Failed to delete image');
                setLoading(false);
            });
    };

    // Handle search
    const handleSearch = (event) => {
        const searchValue = event.target.value.toLowerCase();
        const filtered = imageList.filter(fileName =>
            fileName.toLowerCase().includes(searchValue)
        );
        setFilteredImages(filtered);
    };

    // Handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            if (!allowedImageTypes.includes(file.type)) {
                setError('Invalid file type. Only PNG, JPEG, and JPG files are allowed.');
                setSelectedImage(null);
                setPreviewUrl(null);
                document.getElementById('imageUploadInput').value = ''; // Clear the file input
                return;
            }

            setSelectedImage(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError(null); // Clear any previous error message
        }
    };

    // Cleanup preview URL on component unmount
    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    // Fetch image list on component mount
    useEffect(() => {
        fetchImageList();
    }, []);

    return (
        <Container>
            <Row className="my-3">
                <Col md={6} className="mb-3">
                    <h4>Upload Truck Image</h4>
                    <Form.Group>
                        <Form.Control
                            id="imageUploadInput"
                            type="file"
                            onChange={handleFileChange}
                            className="mb-2"
                        />
                    </Form.Group>
                    {previewUrl && (
                        <div className="mb-2">
                            <img
                                src={previewUrl}
                                alt="Preview"
                                style={{
                                    width: '100px',
                                    height: '50px',
                                    objectFit: 'cover',
                                    border: '1px solid #ddd',
                                    borderRadius: '4px',
                                    marginBottom: '10px'
                                }}
                            />
                        </div>
                    )}
                    <Button
                        variant="primary"
                        onClick={handleUpload}
                        disabled={loading}
                    >
                        {loading ? <Spinner animation="border" size="sm" /> : 'Upload'}
                    </Button>
                </Col>

                <Col md={6} className="mb-3">
                    <h4>Search Images</h4>
                    <Form.Control
                        type="text"
                        placeholder="Search images by filename"
                        onChange={handleSearch}
                    />
                </Col>
            </Row>

            {error && <Alert variant="danger">{error}</Alert>}
            {successMessage && <Alert variant="success">{successMessage}</Alert>}

            <Row className="my-3">
                <Col md={12}>
                    <h4>List of Truck Images</h4>
                    {loading ? (
                        <Spinner animation="border" />
                    ) : (
                        <div style={{ overflowX: 'auto' }}>
                            <Table striped bordered hover size="sm" className="w-50">
                                <thead>
                                <tr>
                                    <th>Picture</th>
                                    <th>Filename</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {filteredImages.map((fileName, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img
                                                src={`http://localhost:8080/truckrentalsystem/imageData/${fileName}`}
                                                alt={fileName}
                                                style={{
                                                    width: '100px',
                                                    height: '50px',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                        </td>
                                        <td>{fileName}</td>
                                        <td>
                                            <Button
                                                variant="danger"
                                                onClick={() => confirmDelete(fileName)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                        </div>
                    )}
                </Col>
            </Row>

            {/* Confirmation Modal */}
            <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Deletion</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this image?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteImage}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default ImagesComponent;
