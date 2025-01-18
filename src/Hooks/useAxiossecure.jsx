import axios from "axios";

export const axiosSecure = axios.create({
    baseURL:"http://localhost:7000"
})
const useAxiossecure = () => {
    return axiosSecure
};

export default useAxiossecure;