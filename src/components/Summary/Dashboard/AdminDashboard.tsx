import { background } from "@chakra-ui/react";
import { Bar, Pie } from "react-chartjs-3";

const labels = Array.from(Array(11).keys())


export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Score',
      data: labels.map((data) => (data < 10 - data) ? data : 10 - data),
      backgroundColor: "rgba(156, 5, 27, 1)",
    }
  ]
}

const AdminDashboard = () => {

  return <Bar options={options} data={data} />
}

export default AdminDashboard;