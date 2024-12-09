// src/api.js

import axios from 'axios';

const apiUrl = 'http://localhost:5000'; // Địa chỉ API của bạn

// Tạo URL ngắn
export const createShortUrl = async (originalUrl) => {
    try {
        const response = await axios.post(`${apiUrl}/urls`, { originalUrl });
        return response.data;
    } catch (error) {
        console.error('Error creating short URL:', error);
        throw error;
    }
};

// Lấy danh sách các URL ngắn
export const fetchShortUrls = async () => {
    try {
        const response = await axios.get(`${apiUrl}/urls`);
        return response.data;
    } catch (error) {
        console.error('Error fetching short URLs:', error);
        throw error;
    }
};
