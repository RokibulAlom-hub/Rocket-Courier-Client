import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiospublic from "./useAxiospublic";

const useRoleUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiospublic();
  const [role, setRole] = useState(null);
  const[roleId,setRoleid] = useState('');
  const [userdata,setUserdata] = useState(null)
  useEffect(() => {
    if (user && user.email) {
      axiosPublic.get(`/user/role/${user.email}`)
        .then(res => {
          setUserdata(res.data)
          setRole(res.data.role);
          setRoleid(res.data._id)
           // Assuming the response contains the role in res.data.role
        })
        .catch(error => {
          console.error("Failed to fetch user role:", error);
        });
    }
  }, [user, user?.email, axiosPublic]);

  return [role,roleId,userdata] ;
}

export default useRoleUser;
