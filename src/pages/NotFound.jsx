import React, { useState } from 'react';
import axios from 'axios';

const NotFound = () => {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    const productData = [
      { name: "product1" }
    ]

    formData.append('data', JSON.stringify(productData));

    Array.from(files).forEach((file, index) => {
      formData.append(`files`, file);
    });

    try {
      const response = await axios.post('http://localhost:4000/products/test-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Files uploaded successfully:', response.data);
    } catch (error) {
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div>
      <input accept='image/png, image/gif, image/jpeg' type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default NotFound;