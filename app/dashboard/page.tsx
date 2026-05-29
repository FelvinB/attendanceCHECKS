"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [students, setStudents] = useState<any[]>([]);

  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");
  const [course, setCourse] = useState("");

  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await axios.get(
      "http://127.0.0.1:8000/api/students"
    );

    setStudents(res.data);
  };

  const saveStudent = async () => {
    if (editingId) {
      await axios.put(
        `http://127.0.0.1:8000/api/students/${editingId}`,
        {
          student_id: studentId,
          name,
          course,
        }
      );
    } else {
      await axios.post(
        "http://127.0.0.1:8000/api/students",
        {
          student_id: studentId,
          name,
          course,
        }
      );
    }

    resetForm();
    fetchStudents();
  };

  const editStudent = (student: any) => {
    setEditingId(student.id);
    setStudentId(student.student_id);
    setName(student.name);
    setCourse(student.course);
  };

  const deleteStudent = async (id: number) => {
    await axios.delete(
      `http://127.0.0.1:8000/api/students/${id}`
    );

    fetchStudents();
  };

  const resetForm = () => {
    setEditingId(null);
    setStudentId("");
    setName("");
    setCourse("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <div className="max-w-7xl mx-auto">
      
      <nav className="flex justify-between items-center rounded-xl p-4 bg-white shadow mb-6">
  <h1 className="text-3xl font-bold text-blue-600">
    Dashboard
  </h1>
    <form action="http://localhost:3000/login">
  <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
    Logout
  </button></form>
</nav>

        <div className="bg-white p-6 rounded-xl shadow mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Student ID"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="border p-3 rounded text-black"
            />

            <input
              type="text"
              placeholder="Student Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded text-black"
            />

            <input
              type="text"
              placeholder="Course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="border p-3 rounded text-black"
            />
          </div>

          <button
            onClick={saveStudent}
            className="mt-5 bg-blue-500 text-white px-6 py-3 rounded"
          >
            {editingId ? "Update Student" : "Add Student"}
          </button>
        </div>

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-blue-500 text-black">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Student ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Course</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b text-center"
                >
                  <td className="p-4 text-black">{student.id}</td>

                  <td className="p-4 text-black">
                    {student.student_id}
                  </td>

                  <td className="p-4 text-black">
                    {student.name}
                  </td>

                  <td className="p-4 text-black">
                    {student.course}
                  </td>

                  <td className="p-4 space-x-2">
                    <button
                      onClick={() => editStudent(student)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStudent(student.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

            <div className="text-center text-blue-500"><a href="http://localhost:3000/studlogs">Student logs</a></div>
        </div>

      </div>
    </div>
  );
}