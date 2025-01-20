import React, { useEffect, useState } from "react";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import useAuth from "../../../Hooks/useAuth";
import useRoleUser from "../../../Hooks/useRoleusers";
import { useQuery } from "@tanstack/react-query";

const MyReviews = () => {
  const [role,roleId] = useRoleUser()
  console.log(roleId);
  const axiosSecure = useAxiossecure()
  const {data: reviews ,isLoading,error} = useQuery({
     queryKey:["reviews"],
     queryFn: async () => {
        const response = await axiosSecure.get(`/reviews/${roleId}`)
        return response.data
     }
  })
  if (isLoading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>erro happend</div>
  }
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">My Reviews</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="card shadow-xl bg-white p-4 rounded-md">
              {/* Review Giver's Information */}
              <div className="flex items-center mb-4">
                <img
                  src={review.userImage || "/default-avatar.png"} // Default avatar if no image
                  alt="User"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold text-lg">{review.userName}</p>
                  <p className="text-gray-500 text-sm">{review.reviewDate}</p>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
                  <span className="text-gray-500 ml-2">{review.rating} / 5</span>
                </div>
                <p className="text-gray-700">{review.feedback}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default MyReviews;
