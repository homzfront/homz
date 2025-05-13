"use client";
import data from "./property-stats";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  format,
  parseISO,
  eachMonthOfInterval,
  startOfYear,
  endOfYear,
} from "date-fns";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PropertyStatsChart() {
  // const [data, setData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/data/property-stats.json");
  //       const jsonData = await response.json();
  //       setData(jsonData.properties);
  //     } catch (error) {
  //       console.error("Error loading data:", error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   fetchData();
  // }, []);

  const filteredData = data.map((property) => {
    const filteredStats = property.stats.filter((stat) => {
      const date = parseISO(stat.date);
      const yearMatches = date.getFullYear() === selectedYear;
      const monthMatches =
        selectedMonth === null || date.getMonth() === selectedMonth;
      return yearMatches && monthMatches;
    });
    return {
      ...property,
      stats: filteredStats,
    };
  });

  // Generate year options (current year and 4 previous years)
  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  // Generate month options
  const months = eachMonthOfInterval({
    start: startOfYear(new Date()),
    end: endOfYear(new Date()),
  }).map((month, index) => ({ value: index, label: format(month, "MMM") }));

  const chartData = {
    // labels: months,
    labels: months.map((month) => month.label),
    datasets: [
      {
        label: "Call Clicks",
        data: filteredData.map((property) =>
          property.stats.reduce((total, stat) => total + stat.clicks, 0)
        ),
        backgroundColor: "#DC6803",
      },
      {
        label: "WhatsApp",
        data: filteredData.map((property) =>
          property.stats.reduce((total, stat) => total + stat.clicks, 0)
        ),
        backgroundColor: "#039855",
      },
      {
        label: "Views",
        data: filteredData.map((property) =>
          property.stats.reduce((sum, stat) => sum + stat.views, 0)
        ),
        backgroundColor: "#006AFF",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          font: {
            style: "normal",
          },
        },
      },

      tooltip: {
        titleFont: {
          style: "normal",
        },
        bodyFont: {
          style: "normal",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            style: "normal",
          },
        },
      },
      y: {
        ticks: {
          font: {
            style: "normal",
          },
        },
      },
    },
  };

  return (
    <div className="sm:p-4 b rounded-lg shadow sm:w-[590px] bg-black bg-opacity-40 z-10 flex items-center justify-center">
      {/* {isLoading ? (
        <div>Loading data...</div>
      ) : (
        <> */}
      <p className="text-[32px] font-[700] leading-[37px] absolute  w-fit text-white opacity-100 z-30 ">
        Coming Soon!
      </p>
      <div className="opacity-50 w-[100%]">
        <div className="flex gap-4 mb-4">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="p-2 border rounded"
            disabled
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <select
            value={selectedMonth ?? ""}
            onChange={(e) =>
              setSelectedMonth(e.target.value ? Number(e.target.value) : null)
            }
            className="p-2 border rounded"
            disabled
          >
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>
        </div>

        <div className="h-full  w-full">
          <Bar data={chartData} options={options} />
        </div>
      </div>
      {/* </>
      )} */}
    </div>
  );
}
