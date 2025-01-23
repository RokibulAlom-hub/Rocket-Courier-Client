import { useQuery } from "@tanstack/react-query";
import useAxiospublic from "./useAxiospublic";
import useAxiossecure from "./useAxiossecure";

const useDeliveryman = () => {
const axiosSecure = useAxiossecure()
    // Using react-query to fetch all deliverymen
    const {
        data: deliveryMan = [], // Default to an empty array
        isLoading,
        error,
        refetch // Capture errors
    } = useQuery({
        queryKey: ["allDeliveryMen"],
        queryFn: async () => {
            const response = await axiosSecure.get("/alldelivery?role=Delivery-Men");
            return response.data;
        },
    });

    return { deliveryMan, isLoading, error,refetch }; // Return as an object for better readability
};

export default useDeliveryman;
