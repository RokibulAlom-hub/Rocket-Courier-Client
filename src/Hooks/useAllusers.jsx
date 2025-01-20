import { useQuery } from '@tanstack/react-query';

import useAxiossecure from './useAxiossecure';

const useAllUsers = () => {
  const axiosSecure = useAxiossecure();
  const { data: users, isLoading, error, refetch } = useQuery({
    queryKey: ['allusers'],
    queryFn: async () => {
      const response = await axiosSecure.get(`/allusers`);
      return response.data;
    },
  });

  return [users, refetch, isLoading, error];
};

export default useAllUsers;
