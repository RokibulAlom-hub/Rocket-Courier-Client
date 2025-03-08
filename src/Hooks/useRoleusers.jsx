import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiospublic from "./useAxiospublic";

const useRoleUser = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiospublic();
  const [role, setRole] = useState(null);
  const [roleId,setRoleId] = useState("");
  const [userData,setUserData] = useState(null)
  useEffect(() => {
    if (user && user.email) {
      axiosPublic
        .get(`/user/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setRoleId(res.data._id);
          setUserData(res.data)
          // Assuming the response contains the role in res.data.role
        })
        .catch((error) => {
          console.error("Failed to fetch user role:", error);
        });
    }
  }, [user, user?.email, axiosPublic]);

  return [role,roleId,userData];
};

export default useRoleUser;
