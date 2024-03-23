import styled from "styled-components";
import { Spinner } from "react-bootstrap";
import React from "react";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 2.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export default function BuyerUserAvatar() {

  const handleImageSrc = (imagePath) => {
    // Check if imagePath is undefined or null
    if (!imagePath) {
        // Return a default image or handle the undefined case as needed
        console.log("Image path is undefined or null.");
        return '/path/to/default/image.png'; // Adjust this path to your default image
    }

    // Check if imagePath starts with "http" or "https"
    if (imagePath.startsWith('http')) {
        return imagePath; // Return the URL as-is
    } else {
        console.log(imagePath);
        // Assuming your server is set up to serve images from the 'uploads' directory
        const baseUrl = "http://localhost:5000/uploads/"; // Adjust this URL to match your server's configuration
        return baseUrl + imagePath.replace(/\\/g, '/'); // Replace backslashes with forward slashes if necessary
    }
}; 



  return (
    <StyledUserAvatar>
     <h6>No Name</h6>
    </StyledUserAvatar>
  );
}
