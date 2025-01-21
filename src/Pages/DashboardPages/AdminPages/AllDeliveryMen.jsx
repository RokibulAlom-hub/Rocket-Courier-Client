import useDeliveryman from '../../../Hooks/useDeliveryman';

const AllDeliveryMen = () => {
    const {deliveryMan} = useDeliveryman();

    // make a function for reveidw avearage
    const calculateReveiw = (reveiw) => {
        if(reveiw && reveiw?.length > 0){
            const sum = reveiw.reduce((acc,curr) => acc + curr , 0);
        return(sum/reveiw.length)
        }
        return "N/A"
    }

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
                    {deliveryMan.map((dmans) => (
                        <tr key={dmans._id}>
                            <td className="py-2 text-center px-2 border">{dmans.name}</td>
                            <td className="py-2 text-center px-2 border">{dmans.phoneNumber}</td>
                            <td className="py-2 text-center text-red-400 font-bold px-2 border">{dmans.delivered}</td>
                            <td className="py-2 text-center text-green-500 px-2 border">{calculateReveiw(dmans.ratings)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AllDeliveryMen;
