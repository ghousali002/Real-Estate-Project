import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Heading from '../../ui/Heading';
import styles from './Avatar.module.css';
import Row from '../../ui/Row';
import { useUser } from '../../services/useUser';
import axios from "axios";
import toast from "react-hot-toast";
import Modal from '../../ui/Modal';
import Form from '../../ui/Form';
import StyledFormRow from '../../ui/StyledFormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { useForm } from 'react-hook-form';
import Textarea from '../../ui/Textarea';

const StyledProfileLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  margin-top: 1rem;
`;

const ProfileCard = styled.div`
  position: relative;
  background: var(--color-grey-0); /* Replace with actual color variable or value */
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ImageContainer = styled.div`
    width: 100px; 
    height: 100px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  border-radius: 50%; /* Match the border-radius with the image */
  overflow: hidden; /* Prevent anything from going outside the bounds */
  &:hover::after {
    content: '📷';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1rem;
    border-radius: 50%; 
  }
`;

const FormRow = styled.div`
 display: grid;
  align-items: center;
  grid-template-columns: 12rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const EditIcon = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  /* You can use a real edit icon here */
  &:after {
    content: '✏️';
  }
`;

const ReviewsSection = styled.div`
  margin-top: 1rem;
`;

const ReviewCard = styled.div`
  background: var(--color-grey-0);
  border-radius: 10px;
  padding: 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReviewBody = styled.div`
  margin-top: 1rem;
`;

const AdditionalCard = styled.div`
  position: relative;
  background: var(--color-grey-0); /* Replace with actual color variable or value */
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export default function SellerProfile() {
  const { data, isLoading, isError,  refetchUser } = useUser() ;
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;
  const [showForm, setShowForm] = useState(false);
  const [profile, setProfile] = useState({
    rating: 4.6,
    reviews: 27,
    country: 'Pakistan',
  });

  const handleCloseModal = () => {
    setShowForm(false);
  };

    // Function to handle image source
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

  const reviews = [{
    reviewerName: 'Arhum Naveed',
    countryFlag: '/assets/img/pakistan.png',
    reviewerCountry: 'Pakistan',
    rating: '4.1',
    text: 'Delivered and made revisions without a hinch to make my code working perfect',
    date: '1 month ago'
},
{
  reviewerName: 'Arhum Naveed',
  countryFlag: '/assets/img/pakistan.png',
  reviewerCountry: 'Pakistan',
  rating: '4.1',
  text: 'Delivered and made revisions without a hinch to make my code working perfect',
  date: '1 month ago'
}
];

  const fileInputRef = useRef();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  const Name = data?.user?.Name || 'Unknown User';
  const Email = data?.user?.email || 'Unknown email';
  const Photo = data?.user?.profilePhoto;
  const Description = data?.user?.description;


  const handleImageUpload = async (event) => {
    const token = localStorage.getItem("token");
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('photo', file);

      try {
        const response = await axios.post('http://localhost:5000/uploads', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        });
        await refetchUser();
        toast.success("Data Saved Successfully");
      } catch (error) {
        console.error('Error uploading photo:', error.message);
      }
    }
  };


  const description = async (description) => {
    const token = localStorage.getItem("token");
    if (description) {
      try {
        const response = await axios.post('http://localhost:5000/description', description, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        await refetchUser();
        toast.success("Data Saved Successfully");
      } catch (error) {
        throw error;
      }
    }
  };


  function onSubmit(data) {
    description(data).then(() => {
      handleCloseModal(); 
  }).catch((error) => {
      console.error("Error submitting the form: ", error);
      toast.error("Error saving data.");
  });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="head1">My Profile</Heading>
      </Row>

      <StyledProfileLayout>
        <ProfileCard>
          <div style={{ textAlign: 'center' }}>
            <ImageContainer onClick={() => fileInputRef.current.click()}>
              <input
                type="file"
                style={{ display: 'none' }}
                ref={fileInputRef}
                onChange={handleImageUpload}
              />
            {Photo ? <img src={handleImageSrc(Photo)} /> :  <img src='assets/img/default-user.jpg'/> }
              {/* <img src='assets/img/default-user.jpg'/> */}
            </ImageContainer>
            {/* Profile Name */}
            <h6>{Name}</h6>
            {/* Username */}
            <p>{Email}</p>
            {/* Rating */}
            <div>
              {Array.from({ length: 5 }, (_, index) => (
                <span key={index}>{index < profile.rating ? '★' : '☆'}</span>
              ))}
              <span>
                {profile.rating} ({profile.reviews} reviews)
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'start', marginTop: '10px' }}></div>
        </ProfileCard>

        <AdditionalCard>
          <h6 style={{ paddingLeft: '15px', paddingTop: '15px' }}>About me</h6>
          <EditIcon  onClick={() => setShowForm((show) => !show)}/>
          <p style={{ fontSize: '14px', paddingLeft: '15px' }}>
            {Description ? Description : "Nothing there"}
          </p>
        </AdditionalCard>
      </StyledProfileLayout>

      {showForm && <Modal onClose={handleCloseModal}>

      <Form onSubmit={handleSubmit(onSubmit)}>
      <StyledFormRow labelName='Express Yourself' error={errors?.description?.message}>
      <Textarea
          type="text"
          id="description"
          defaultValue={Description}
          {...register("description", {
            required: "This Field is Required",
          })}
        />
      </StyledFormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Submit</Button>
        </FormRow>
      </Form>
  </Modal>}

      <ReviewsSection>
        <Row type="horizontal">
          <Heading as="heading1">Reviews</Heading>
        </Row>
        {reviews.map((review, index) => (
          <ReviewCard key={index}>
            <ReviewHeader>
              <div>
                <img
                  src="assets/img/default-user.jpg"
                  alt={review.reviewerName}
                  className={styles.buyerAvatar}
                />
                <strong>{review.reviewerName}</strong>
                <img
                  src={review.countryFlag}
                  alt={review.reviewerCountry}
                  className={styles.buyerAvatar}
                />
              </div>
              <div>
                {/* Star rating for the review */}
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                ))}
                <span>{review.rating}</span>
              </div>
            </ReviewHeader>
            <ReviewBody>
              {/* Review text */}
              <p>{review.text}</p>
              <small>{review.date}</small>
            </ReviewBody>
          </ReviewCard>
        ))}
      </ReviewsSection>
    </>
  );
}