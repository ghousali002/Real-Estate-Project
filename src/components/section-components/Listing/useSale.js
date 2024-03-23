import { useState, useEffect } from 'react';
import axios from 'axios';

export const useSale = () => {
    const [saleCount, setSaleCount] = useState(0);

    useEffect(() => {
        const fetchSaleCount = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:5000/getlistingsale', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setSaleCount(response.data.properties.length);
            } catch (error) {
                console.error('Error fetching sale properties:', error);
            }
        };

        fetchSaleCount();

        // Cleanup function (optional)
        return () => {
            // Any cleanup code if needed
        };
    }, []);

    return saleCount;
}