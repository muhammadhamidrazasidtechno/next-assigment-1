'use client'
// Images.js
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Images() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchdata();
    }, []);

    async function fetchdata() {
        try {
            const res = await fetch('https://api.imgflip.com/get_memes');
            const dat = await res.json();
            setData(dat.data.memes);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.length === 0 ? (
                <div>Loading...</div>
            ) : (
                data.map((item, index) => (
                    <Link href={`/detail/${item.id}`} key={item.id}>
                        <div className="m-3 relative w-full h-48 sm:h-56 md:h-64 lg:h-72 overflow-hidden rounded-md">
                            <h1>{item.name}</h1>
                            <img src={item.url} className="object-cover w-full h-full" alt={item.name} />
                        </div>
                    </Link>
                ))
            )}
        </div>
    );
}

export default Images;
