import React from "react";
import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import StyledFormRow from "../../ui/StyledFormRow";
import { useAuth } from '../../AuthContext';
import { Navigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import toast from "react-hot-toast";
import {createListingRent} from '../../services/apiListing';

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

const Label = styled.label`
  font-weight: 500;
  font-family: "Poppins", sans-serif;
`;

export default function AddListingRent() {

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  const { mutate: create } = useMutation({
    mutationFn: createListingRent,
     onSuccess: () => {
       toast.success("Rent Listing Created Successfully");
       reset();
     },
     onError: (err) => toast.error(err.message)
   });

    const { isAuthenticated} = useAuth();

    // If the user is not authenticated, redirect them to the login page
    if (!isAuthenticated) {
      return <Navigate to="/sign-in" />;
    }

    function onSubmit(data) {
      const {
        name,
        property,
        location,
        maxCapacity,
        totalRooms,
        regularPrice,
        bathroom,
        kitchen,
        squarefoot,
        livingroom,
        description,
        image,
        mapLocationLink,
        amenities,
        places,
        popularTags,
      } = data;
    
      const processedImage = typeof image === 'string' ? image : image[0];
    
      const amenitiesArray = amenities.split(',').map(item => item.trim());
      const placesArray = places.split(',').map(item => item.trim());
      const popularTagsArray = popularTags.split(',').map(item => item.trim());

      create({
        name,
        property,
        location,
        maxCapacity,
        regularPrice,
        bathroom,
        kitchen,
        totalRooms,
        livingroom,
        squarefoot,
        description,
        processedImage,
        mapLocationLink,
        amenities: amenitiesArray,
        places: placesArray,
        popularTags: popularTagsArray,
      });
    }      

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
    <StyledFormRow labelName='Property Name' error={errors?.name?.message}>
    <Input
        type="text"
        id="name"
        {...register("name", {
          required: "This Field is Required",
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Type of Property' error={errors?.property?.message}>
    <Input
        type="text"
        id="property"
        {...register("property", {
          required: "This Field is Required",
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Location' error={errors?.location?.message}>
    <Input
        type="text"
        id="location"
        {...register("location", {
          required: "This Field is Required",
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Bed Rooms' error={errors?.maxCapacity?.message}>
    <Input
        type="number"
        id="maxCapacity"
        {...register("maxCapacity", {
          required: "This Field is Required",
          min: {
            value: 1,
            message: "Capacity should be at least 1",
          }
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Total Kitchens' error={errors?.kitchen?.message}>
    <Input
        type="number"
        id="kitchen"
        {...register("kitchen", {
          required: "This Field is Required",
          min: {
            value: 1,
            message: "Capacity should be at least 1",
          }
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Total Rooms' error={errors?.totalRooms?.message}>
    <Input
        type="number"
        id="totalRooms"
        {...register("totalRooms", {
          required: "This Field is Required",
          min: {
            value: 1,
            message: "Capacity should be at least 1",
          }
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Total price' error={errors?.regularPrice?.message}>
    <Input
        type="number"
        id="regularPrice"
        {...register("regularPrice", {
          required: "This Field is Required",
          min: {
            value: 1,
            message: "Price should be at least 1",
          }
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Bathrooms' error={errors?.bathroom?.message}>
    <Input
        type="number"
        id="bathroom"
        defaultValue={0}
        {...register("bathroom", {
          required: "This Field is Required",
          min: {
            value: 1,
            message: "Capacity should be at least 1",
          }
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Living Rooms' error={errors?.livingroom?.message}>
    <Input
        type="number"
        id="livingroom"
        defaultValue={0}
        {...register("livingroom", {
          required: "This Field is Required",
          min: {
            value: 1,
            message: "Capacity should be at least 1",
          }
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Square foot area' error={errors?.squarefoot?.message}>
    <Input
        type="number"
        id="squarefoot"
        defaultValue={0}
        {...register("squarefoot", {
          required: "This Field is Required",
          min: {
            value: 1,
            message: "Capacity should be at least 1",
          }
        })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Map Location Link'>
  <Input
    type="text"
    id="mapLocationLink"
    placeholder="https://maps.example.com"
    {...register("mapLocationLink", {
      required: "This field is required",
    })}
  />
</StyledFormRow>


    <StyledFormRow labelName='Description'>
    <Textarea
        type="text"
        id="description"
        defaultValue=""
        {...register("description", { required: "This Field is Required" })}
      />
    </StyledFormRow>

    <StyledFormRow labelName='Amenities'>
  <Input
    type="text"
    id="amenities"
    placeholder="Pool, Gym, Spa"
    {...register("amenities", {
      required: "This field is required",
    })}
  />
</StyledFormRow>

<StyledFormRow labelName='Places'>
  <Input
    type="text"
    id="places"
    placeholder="Nearby school, Shopping mall"
    {...register("places", {
      required: "This field is required",
    })}
  />
</StyledFormRow>

<StyledFormRow labelName='Popular Tags'>
  <Input
    type="text"
    id="popularTags"
    placeholder="Luxury, Spacious, Central"
    {...register("popularTags", {
      required: "This field is required",
    })}
  />
</StyledFormRow>


    <FormRow>
      <Label htmlFor="image">Property photo</Label>
      <FileInput id="image" type="file" accept="image/*" 
            {...register("image", 
            {required:"This Field is Required"})}
      />
    </FormRow>

    <FormRow>
      {/* type is an HTML attribute! */}
      <Button variation="secondary" type="reset" >
        Cancel
      </Button>
      <Button >Create Listing</Button>
    </FormRow>
  </Form>
  )
}