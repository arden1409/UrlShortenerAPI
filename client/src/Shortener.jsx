// src/Shortener.js

import React, { useState, useEffect } from 'react';
import { createShortUrl, fetchShortUrls } from './api'; // Đổi tên `api` nếu bạn đặt tên khác
import './Shortener.css'; // Đảm bảo tạo một CSS file nếu bạn muốn thêm kiểu dáng cho giao diện

function Shortener() {
    const [originalUrl, setOriginalUrl] = useState('');
    const [shortUrls, setShortUrls] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getShortUrls = async () => {
            try {
                const data = await fetchShortUrls();
                setShortUrls(data);
            } catch (error) {
                console.error('Error fetching short URLs:', error);
            }
        };

        getShortUrls();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const shortUrl = await createShortUrl(originalUrl);
            setShortUrls((prevShortUrls) => [...prevShortUrls, shortUrl]);
            setOriginalUrl('');
        } catch (error) {
            console.error('Error creating short URL:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="shortener-container">
            <h2>Create Short URL</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="url"
                    placeholder="Enter long URL"
                    value={originalUrl}
                    onChange={(e) => setOriginalUrl(e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Short URL'}
                </button>
            </form>

            <div className="short-urls">
                <h3>Short URLs</h3>
                <ul>
                    {shortUrls.map((url) => (
                        <li key={url.shortCode}>
                            <a href={`${apiUrl}/${url.shortCode}`} target="_blank" rel="noopener noreferrer">
                                {apiUrl}/{url.shortCode}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Shortener;
