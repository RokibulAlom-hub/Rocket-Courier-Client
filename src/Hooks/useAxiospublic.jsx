import axios from "axios";

export const axiosPublic = axios.create({
    baseURL:"https://rocket-courier-server.vercel.app"
})
const useAxiospublic = () =>{
    return axiosPublic
}
export default useAxiospublic