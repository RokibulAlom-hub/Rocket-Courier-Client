import useDeliveryman from '../../../Hooks/useDeliveryman';

const AllDeliveryMen = () => {
    const {deliveryMan} = useDeliveryman();
    console.log(deliveryMan);

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
                    {deliveryMan.map((deliveryMan) => (
                        <tr key={deliveryMan._id}>
                            <td className="py-2 text-center px-2 border">{deliveryMan.name}</td>
                            <td className="py-2 text-center px-2 border">{deliveryMan.phoneNumber}</td>
                            <td className="py-2 text-center text-red-400 font-bold px-2 border">{deliveryMan.delivered}</td>
                            <td className="py-2 text-center px-2 border">{deliveryMan.averageReview}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllDeliveryMen;
