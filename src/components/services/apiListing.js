import axios from "axios";
import toast from "react-hot-toast";

export async function createListing({
    name,
    property,
    location,
    maxCapacity,
    totalRooms,
    livingroom,
    regularPrice,
    mapLocationLink,
    bathroom,
    squarefoot,
    kitchen,
    listingType,
    description,
    processedImage,
    amenities,
    places,
    popularTags,
}) {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('photo', processedImage);

        // Append other fields to formData
        formData.append('PropertyTitle', name);
        formData.append('Address', property);
        formData.append('City', location);
        formData.append('Price', regularPrice.toString());
        formData.append('TotalRooms', totalRooms.toString());
        formData.append('Livingrooms', livingroom.toString());
        formData.append('Bedrooms',  maxCapacity.toString());
        formData.append('Bathrooms', bathroom.toString());
        formData.append('AreaSqFt', squarefoot.toString());
        formData.append('TypeOfProperty', listingType);
        formData.append('Kitchens', kitchen.toString());
        formData.append('PropertyMapLocation', mapLocationLink);
        formData.append('Description', description);

        // Stringify array fields
        formData.append('Amenities', JSON.stringify(amenities));
        formData.append('Places', JSON.stringify(places));
        formData.append('PopularTags', JSON.stringify(popularTags));

        const response = await axios.post("http://localhost:5000/addlisting", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            toast.success("Listing Created Successfully");
            return true;
        } else {
            toast.error("Failed to create listing");
            return false;
        }
    } catch (error) {
        toast.error("An error occurred");
        throw error;
    }
}

export async function createListingRent({
    name,
    property,
    location,
    maxCapacity,
    totalRooms,
    livingroom,
    regularPrice,
    mapLocationLink,
    bathroom,
    squarefoot,
    kitchen,
    listingType,
    description,
    processedImage,
    amenities,
    places,
    popularTags,
}) {
    try {
        const token = localStorage.getItem("token");
        const formData = new FormData();
        formData.append('photo', processedImage);

        // Append other fields to formData
        formData.append('PropertyTitle', name);
        formData.append('Address', property);
        formData.append('City', location);
        formData.append('Price', regularPrice.toString());
        formData.append('TotalRooms', totalRooms.toString());
        formData.append('Livingrooms', livingroom.toString());
        formData.append('Bedrooms',  maxCapacity.toString());
        formData.append('Bathrooms', bathroom.toString());
        formData.append('AreaSqFt', squarefoot.toString());
        formData.append('TypeOfProperty', listingType);
        formData.append('Kitchens', kitchen.toString());
        formData.append('PropertyMapLocation', mapLocationLink);
        formData.append('Description', description);

        // Stringify array fields
        formData.append('Amenities', JSON.stringify(amenities));
        formData.append('Places', JSON.stringify(places));
        formData.append('PopularTags', JSON.stringify(popularTags));

        const response = await axios.post("http://localhost:5000/addlistingrent", formData, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.status === 200) {
            toast.success("Rent Listing Created Successfully");
            return true;
        } else {
            toast.error("Failed to create listing");
            return false;
        }
    } catch (error) {
        toast.error("An error occurred");
        throw error;
    }
}