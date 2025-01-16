import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiossecure';

const AllDeliveryMen = () => {
    const axiosSecure = useAxiosSecure();
    const [deliveryMen, setDeliveryMen] = useState([]);

    useEffect(() => {
        axiosSecure.get(`/alldelivery?role=Delivery-Men`)
        .then(res => {
            setDeliveryMen(res.data);
        })
        .catch(error => {
            console.error("Failed to fetch delivery men:", error);
        });
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">All Delivery Men</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Phone Number</th>
                        <th className="py-2 px-4 border-b">Parcels Delivered</th>
                        <th className="py-2 px-4 border-b">Average Review</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryMen.map((deliveryMan) => (
                        <tr key={deliveryMan._id}>
                            <td className="py-2 px-4 border-b">{deliveryMan.name}</td>
                            <td className="py-2 px-4 border-b">{deliveryMan.phoneNumber}</td>
                            <td className="py-2 px-4 border-b">{deliveryMan.parcelsDelivered}</td>
                            <td className="py-2 px-4 border-b">{deliveryMan.averageReview}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllDeliveryMen;
