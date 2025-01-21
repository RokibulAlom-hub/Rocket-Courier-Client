import { useQuery } from "@tanstack/react-query";
import useAxiospublic from "./useAxiospublic";

const useDeliveryman = () => {
    const axiosPublic = useAxiospublic();

    // Using react-query to fetch all deliverymen
    const {
        data: deliveryMan = [], // Default to an empty array
        isLoading,
        error,
        refetch // Capture errors
    } = useQuery({
        queryKey: ["allDeliveryMen"],
        queryFn: async () => {
            const response = await axiosPublic.get("/alldelivery?role=Delivery-Men");
            return response.data;
        },
    });

    return { deliveryMan, isLoading, error,refetch }; // Return as an object for better readability
};

export default useDeliveryman;
