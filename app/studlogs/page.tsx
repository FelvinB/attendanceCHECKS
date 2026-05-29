"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await axios.get(
        "http://127.0.0.1:8000/api/logs"
      );

      setLogs(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow p-6">
      <nav className="flex justify-between items-center rounded-xl p-4 bg-white shadow mb-6">
  <h1 className="text-3xl font-bold text-blue-600">
    Attendance Dashboard
  </h1>
    <form action="http://localhost:3000/dashboard">
  <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
    Back
  </button></form>
</nav>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border p-3">ID</th>
                  <th className="border p-3">Student ID</th>
                  <th className="border p-3">Name</th>
                  <th className="border p-3">Course</th>
                  <th className="border p-3">Date</th>
                  <th className="border p-3">Time In</th>
                  <th className="border p-3">Time Out</th>
                </tr>
              </thead>

<tbody>
{logs.map((log) => (
  <tr
    key={log.id}
    className="text-center hover:bg-gray-100"
  >
    <td className="border p-3 text-black font-bold">{log.id}</td>

    <td className="border p-3 text-black font-bold">
      {log.student?.student_id}
    </td>

    <td className="border p-3 text-black font-bold">
      {log.student?.name}
    </td>

    <td className="border p-3 text-black font-bold">
      {log.student?.course}
    </td>

    <td className="border p-3 text-black font-bold">{log.date}</td>

    <td className="border p-3 text-green-600 font-bold">
      {log.time_in || "-"}
    </td>

    <td className="border p-3 text-red-600 font-bold">
      {log.time_out || "-"}
    </td>
  </tr>
))}
</tbody>
</table>
</div>
)}
</div>
</div>
);
}