"use client";
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

import { useMutation } from "@tanstack/react-query";
import api from "@/utils/api";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function PropertyStatsChart({ dateJoined }) {
  const [selectedYear, setSelectedYear] = useState(
    new Date().getFullYear().toString()
  );
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [chartData, setChartData] = useState([]);

  const { mutateAsync: fetchMetrics } = useMutation({
    mutationFn: async ({ year, monthName }) => {
      const res = await api.post(`/properties/metrics-summary`, {
        year,
        monthName,
      });
      return res.data.data;
    },
  });

  // Fetch metrics whenever year or month changes
  useEffect(() => {
    const loadMetrics = async () => {
      try {
        const data = await fetchMetrics({
          year: selectedYear,
          monthName: selectedMonth,
        });

        const rawData = data;
        const safeArray = Array.isArray(rawData)
          ? rawData
          : rawData
          ? [rawData]
          : [];

        setChartData(safeArray);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };
    loadMetrics();
  }, [selectedYear, selectedMonth]);

  const yearJoined = new Date(dateJoined).getFullYear();
  const currentYear = new Date().getFullYear();

  const existingYears = currentYear - yearJoined + 1;

  const years = Array.from(
    { length: existingYears },
    (_, i) => currentYear - i
  );

  const months = [
    "All Months",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const chartConfig = {
    labels: chartData.map((m) => m.month || selectedMonth),
    datasets: [
      {
        label: "Views",
        data: chartData?.map?.((m) => m.totalViews) ?? [],
        backgroundColor: "#006AFF",
      },
      {
        label: "Messages",
        data: chartData?.map?.((m) => m.totalMessages) ?? [],
        backgroundColor: "#039855",
      },
      {
        label: "Call Clicks",
        data: chartData?.map?.((m) => m.totalCallClicks) ?? [],
        backgroundColor: "#DC6803",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "top" },
      tooltip: { mode: "index", intersect: false },
    },
    scales: {
      x: { stacked: false },
      y: { beginAtZero: true },
    },
  };

  return (
    <div className="sm:p-4 rounded-lg shadow sm:w-[570px] bg-white flex flex-col items-center">
      <div className="flex gap-4 mb-4 w-full justify-start">
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="p-2 border rounded"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="p-2 border rounded"
        >
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:h-[300px] h-full w-full">
        <Bar data={chartConfig} options={options} />
      </div>
    </div>
  );
}
