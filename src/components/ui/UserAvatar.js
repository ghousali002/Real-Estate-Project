import styled from "styled-components";
import { useUser } from '../services/useUser';
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

export default function UserAvatar() {
  const { data, isLoading, isError } = useUser();

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

  if (isLoading) {
    // Handle loading state
    return <Spinner />;
  }

  if (isError) {
    // Handle error state
    return <div>Error fetching user details</div>;
  }

  let Name = data.user?.Name || 'Unknown User';
  const Photo = data?.user?.profilePhoto;

  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <StyledUserAvatar>
      { Photo ? <Avatar src={handleImageSrc(Photo)} alt={`Avatar of ${Name}`} /> : <Avatar src={publicUrl + "assets/img/default-user.jpg"} alt={`Avatar of ${Name}`} />}
      <h6>{Name}</h6>
    </StyledUserAvatar>
  );
}
