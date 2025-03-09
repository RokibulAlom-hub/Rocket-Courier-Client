import useDeliveryman from "../../../Hooks/useDeliveryman";
import { useState } from "react";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAllparcels from "../../../Hooks/useAllparcels";
import { Sweetalert } from "../../../Hooks/UseSweetalerts/Sweetalert";
import Heading from "../../Sharedcomponensts/Heading";
import Loading from "../../Sharedcomponensts/Loading";
import { useQuery } from "@tanstack/react-query";

const AllParcels = () => {
  const axiosSecure = useAxiossecure();
  const { deliveryMan } = useDeliveryman();
  // declare state for dynamic page change
  const [currentPage,setCurrentPage] = useState(0)
  const [appDate, setAppdate] = useState("");
  const [dMan, setDman] = useState(null);
  // const [parcels, isLoading, error, refetch] = useAllparcels();
  // get the data from server 
  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ["allparcels",currentPage],
    queryFn: async () => {
      // get data by querys [first get datalength , then by query data]
      const response = await axiosSecure.get(`/allparcels?page=${currentPage}&size=${numberOfparcels}`);
      return response.data;
    },
  });
  const parcels = data?.result;
   // get the total length of data
  const count = data?.totatParcels;
  // declare how many data show you in one page
  const numberOfparcels = 5;
  // handlePrevious button function
  const handleprev = () => {
    if(currentPage > 0){
      setCurrentPage(currentPage - 1)
    }
  }
  // handleNext button function 
  const handleNext = () => {
    if (currentPage < pages?.length -1)  {
      setCurrentPage(currentPage + 1)
    }
  }
  // then get the number of pages
  const numberOfpages = Math.ceil(count / numberOfparcels);
  // now you have to show each page one by one
  const pages = [];
  for (let i = 0; i < numberOfpages; i++) {
    pages.push(i);
  }
  console.log(data);
  const handleManage = async (id) => {
    const updateMange = {
      appDate,
      dmanId: dMan._id,
      status: "On the Way",
    };
    const response = await axiosSecure.patch(
      `/manage-parcel/${id}`,
      updateMange
    );
    refetch();
    const modal = document.getElementById(`modal_${id}`);
    if (modal) {
      modal.close();
    }
    Sweetalert("Assign Man", "Successfully Assigned Delivery Man", "success");
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (error) {
    return <div>Error fetching parcels: {error.message}</div>;
  }

  return (
    <div className="">
      <Heading headtext="allparcel"></Heading>

      {/* Wrap the table in a div with overflow-x-auto for horizontal scrolling */}
      <div className="overflow-x-auto text-black rounded-lg shadow-md">
        <table className="table w-full text-gray-700">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th className="hidden md:table-cell">User's Name</th>
              <th className="hidden md:table-cell">User's Phone</th>
              <th>Booking Date</th>
              <th className="hidden md:table-cell">Requested Delivery Date</th>
              <th>Cost</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {parcels?.map((parcel, index) => (
              <tr
                key={parcel._id}
                className={`${index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"}`}
              >
                <td>{index + 1}</td>
                <td className="hidden md:table-cell">{parcel.name}</td>
                <td className="hidden md:table-cell">{parcel.phone}</td>
                <td>{parcel.bookingDate}</td>
                <td className="hidden md:table-cell">{parcel.deliveryDate}</td>
                <td>{parcel.price} Tk</td>
                <td>
                  <span
                    className={`py-1 px-2 rounded-full font-bold ${
                      parcel.status === "On the Way"
                        ? "bg-blue-500 text-white"
                        : parcel.status === "cancel"
                        ? "bg-red-500 text-white"
                        : parcel.status === "delivered"
                        ? "bg-green-500 text-white"
                        : parcel.status === "pending"
                        ? "bg-yellow-500 text-black"
                        : ""
                    }`}
                  >
                    {parcel.status}
                  </span>
                </td>
                <td>
                  {parcel.status === "cancel" && "delivered" ? (
                    "Cancelled"
                  ) : parcel.status === "delivered" ? (
                    "Finished"
                  ) : (
                    <button
                      className={`p-3 rounded-lg text-white bg-violet-600`}
                      onClick={() =>
                        document
                          .getElementById(`modal_${parcel._id}`)
                          .showModal()
                      }
                    >
                      Manage
                    </button>
                  )}

                  {/* Modal */}
                  <dialog id={`modal_${parcel._id}`} className="modal">
                    <div className="modal-box">
                      <h2 className="text-2xl font-semibold text-center text-purple-600 mb-4">
                        Manage Parcel
                      </h2>
                      <h3>Select Delivery Man</h3>
                      <select
                        onChange={(e) => {
                          const selectedMan = deliveryMan.find(
                            (dman) => dman.name === e.target.value
                          );
                          setDman({
                            _id: selectedMan._id,
                            name: selectedMan.name,
                          });
                        }}
                        className="w-1/2 p-2 border border-indigo-400 rounded-lg mb-4"
                      >
                        <option value="">Select Delivery Man</option>
                        {deliveryMan.map((dman) => (
                          <option key={dman._id} value={dman.name}>
                            {dman.name}
                          </option>
                        ))}
                      </select>

                      <h3>Approximate Delivery Date</h3>
                      <input
                        type="date"
                        onChange={(e) => setAppdate(e.target.value)}
                        className="p-2 w-1/2 border border-indigo-400 rounded-lg mb-4"
                      />

                      <button
                        onClick={() => handleManage(parcel._id)}
                        className="bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600 transition duration-300"
                      >
                        Assign
                      </button>
                    </div>
                    <form method="dialog" className="modal-backdrop">
                      <button>Close</button>
                    </form>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* buttons */}
        <div className="font-semibold text-xl my-2 text-center space-x-2">
        <button onClick={handleprev}>Prev</button>
          {pages.map(page =>   <button
          onClick={()=> setCurrentPage(page)}
            className={
              currentPage === page
                ? "bg-orange-400 px-1 rounded   text-white "
                : "px-1 rounded bg-black  text-white"
            }
          >
            {page+1}
          </button>)}
          <button onClick={handleNext}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default AllParcels;
