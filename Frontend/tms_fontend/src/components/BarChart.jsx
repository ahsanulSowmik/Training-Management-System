import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // State to store the fetched data
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const userToken = localStorage.getItem("userToken");
        const response = await axios.get(
          "http://localhost:8080/api/batchTraineeCounts",
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        );

        // Assuming the response contains the data in the format shown in your example
        const fetchedData = response.data;
        setApiData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveBar
      data={apiData}
      keys={["traineeCount"]} // Assuming the trainee count is the value you want to display in the chart
      indexBy="batchName"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Batch Name", // X-axis label
        legendPosition: "middle",
        legendOffset: 32,
        // Set axis text color
        tickTextColor: colors.grey[800], // Use your desired color value here
        legendTextColor: colors.grey[800], // Use your desired color value here
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: "Total Trainee", // Y-axis label
        legendPosition: "middle",
        legendOffset: -40,
        // Set axis text color
        tickTextColor: colors.grey[800], // Use your desired color value here
        legendTextColor: colors.grey[800], // Use your desired color value here
      }}
      // Rest of your chart configuration props...
    />
  );
};

export default BarChart;
