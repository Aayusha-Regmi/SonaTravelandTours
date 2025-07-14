import React, { useState, useEffect } from 'react';
import api from '../services/api';
import apis from '../services/api-config';
import API_URLS from '@/config/api';

const doing = () => {
    const [offers, setOffers] = useState(null);
    
    useEffect(() => {
        const fetchOffers = async () => {
            try {
                const response = await fetch(API_URLS.COUPONS.GET_COUPONS);
                const data = await response.json();
                setOffers(data);
            } catch (err) {
                console.log("Error fetching coupons:", err);
            }
        };
        fetchOffers();
    }, []);

    return (
        <div>
            OfferTitle: {offers?.couponId || 'No offers available'}
            OfferImage: {offers?.couponImageUrl || 'No image available'}
            
            Offer Description
        </div>
    );
};

export default doing;

