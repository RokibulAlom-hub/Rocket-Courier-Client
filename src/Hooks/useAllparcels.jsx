
import useAxiossecure from './useAxiossecure';
import { useQuery } from '@tanstack/react-query';

const useAllparcels = () => {
    const axiosSecure = useAxiossecure()
    const {
        data: parcels,
        isLoading,
        error,
        refetch
      } = useQuery({
        queryKey: ["allparcels"],
        queryFn: async () => {
          const response = await axiosSecure.get("/allparcels");
          return response.data;
        },
      });
      return [parcels,isLoading,error,refetch]
};

export default useAllparcels;