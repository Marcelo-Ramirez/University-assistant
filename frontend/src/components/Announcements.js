import React, { useState, useEffect } from 'react';

const Announcements = () => {
    const [currentAnnouncement, setCurrentAnnouncement] = useState(0);
    const announcements = [
        'ANUNCIO 1',
        'ANUNCIO 2',
        'ANUNCIO 3',
        'ANUNCIO 4'
    ];
    const delay = 5000;

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAnnouncement((prev) => (prev + 1) % announcements.length);
        }, delay);

        return () => clearInterval(interval);
    }, [announcements.length, delay]);

    return (
        <div className="overflow-hidden w-full h-64 flex">
            <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentAnnouncement * 100}%)`, width: `${announcements.length * 100}%` }}
            >
                {announcements.map((announcement, index) => (
                    <div key={index} className="flex-shrink-0 w-full h-full flex items-center justify-center bg-blue-500 text-white">
                        <h1 className="text-2xl">{announcement}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Announcements;
