import axios from "axios";

const axiosSecure = axios.create({
    baseURL:"https://b10a12-server-side-rokibul-alom-hub.vercel.app"
})
const useAxiossecure = () => {
    return axiosSecure
};

export default useAxiossecure;