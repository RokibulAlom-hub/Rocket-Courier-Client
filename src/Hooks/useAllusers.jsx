import { useQuery } from "@tanstack/react-query";

import useAxiossecure from "./useAxiossecure";

const useAllUsers = () => {
  const axiosSecure = useAxiossecure();
  const {
    data: users,
    isLoading: laoding,
    error: err,
    refetch,
  } = useQuery({
    queryKey: ["allusers"],
    queryFn: async () => {
      const response = await axiosSecure.get(`/allusers`);
      return response.data;
    },
  });

  return [users, laoding, err, refetch];
};

export default useAllUsers;
