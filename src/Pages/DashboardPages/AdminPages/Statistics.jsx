import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import useAxiossecure from "../../../Hooks/useAxiossecure";
import Heading from "../../Sharedcomponensts/Heading";

const Statistics = () => {
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalBookings, setTotalBookings] = useState(0);
  const [uniqueDates, setUniqueDates] = useState(0);
  const axiosSecure = useAxiossecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get("/allparcels");
        const data = response.data;

        // Group data by booking date and count bookings
        const groupedData = data.reduce((acc, item) => {
          acc[item.bookingDate] = (acc[item.bookingDate] || 0) + 1;
          return acc;
        }, {});

        const dates = Object.keys(groupedData);
        const bookings = Object.values(groupedData);

        // Set state for bar chart
        setCategories(dates);
        setBarChartData([
          {
            name: "Bookings",
            data: bookings,
          },
        ]);

        // Set state for line chart
        setLineChartData([
          {
            name: "Booking Trends",
            data: bookings,
          },
        ]);

        // Additional stats
        setTotalBookings(bookings.reduce((sum, value) => sum + value, 0));
        setUniqueDates(dates.length);
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

  const lineChartOptions = {
    chart: {
      type: "line",
    },
    xaxis: {
      categories,
      title: {
        text: "Booking Dates",
      },
    },
    title: {
      text: "Booking Trends",
      align: "center",
    },
    yaxis: {
      title: {
        text: "Number of Bookings",
      },
    },
  };

  return (
    <div className=" bg-gray-100 min-h-screen">
      <Heading headtext="bookings overview"></Heading>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 mb-8">
        <div className="bg-white py-3 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Total Bookings</h2>
          <p className="text-4xl font-bold text-accent">{totalBookings}</p>
        </div>
        <div className="bg-white py-3 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Unique Booking Dates</h2>
          <p className="text-4xl font-bold text-green-600">{uniqueDates}</p>
        </div>
        <div className="bg-white py-3 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold">Ave. Bookings/Day</h2>
          <p className="text-4xl font-bold text-yellow-900">
            {uniqueDates ? (totalBookings / uniqueDates).toFixed(2) : 0}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1">
        <div className="bg-white p-4 shadow rounded-lg">
          <Chart options={barChartOptions} series={barChartData} type="bar" height={350} />
        </div>
        <div className="bg-white p-4 shadow rounded-lg">
          <Chart options={lineChartOptions} series={lineChartData} type="line" height={350} />
        </div>
      </div>
    </div>
  );
};

export default Statistics;
