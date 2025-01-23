import axios from "axios";

export const axiosPublic = axios.create({
    baseURL:"https://b10a12-server-side-rokibul-alom-hub.vercel.app"
})
const useAxiospublic = () =>{
    return axiosPublic
}
export default useAxiospublic