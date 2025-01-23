import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiossecure from "../../../Hooks/useAxiossecure";

const Statistics = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const axiosSecure = useAxiossecure()
  useEffect(() => {
 
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get('/allparcels');
        const data = response.data

        const groupedData = data.reduce((acc, item) => {
          acc[item.bookingDate] = (acc[item.bookingDate] || 0) + 1;
          return acc;
        }, {});

        const dates = Object.keys(groupedData);
        const bookings = Object.values(groupedData);

        setCategories(dates);
        setBarChartData([
          {
            name: "Bookings",
            data: bookings,
          },
        ]);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };

    fetchData();
  }, []);

  const barChartOptions = {
    chart: {
      type: "bar",
    },
    xaxis: {
      categories, 
      title: {
        text: "Booking Dates",
      },
    },
    title: {
      text: "Bookings by Date",
      align: "center",
    },
    yaxis: {
      title: {
        text: "Number of Bookings",
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">App Usage Statistics</h1>

      <div className="bg-white p-4 shadow rounded-lg">
        <Chart options={barChartOptions} series={barChartData} type="bar" height={350} />
      </div>
    </div>
  );
};

export default Statistics;
