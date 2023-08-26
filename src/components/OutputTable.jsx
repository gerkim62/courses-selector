import React from "react";
import { Navigate } from "react-router-dom";

const OutputTable = ({ outputCoursesArray }) => {
  if (outputCoursesArray.length < 1) {
    // Redirect to home page
    return <Navigate to="/" />;
  }

  return (
    <div className="overflow-x-auto my-2">
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 truncate bg-blue-500 text-white">Start Time</th>
            <th className="border px-4 py-2 truncate bg-green-500 text-white">End Time</th>
            <th className="border px-4 py-2 max-w-[100px] truncate bg-purple-500 text-white">Days</th>
            <th className="border px-4 py-2 truncate bg-yellow-500 text-white">Course Code</th>
            <th className="border px-4 py-2 truncate bg-pink-500 text-white">Course Title</th>
            <th className="border px-4 py-2 truncate bg-orange-500 text-white">Instructor</th>
            <th className="border px-4 py-2 truncate bg-indigo-500 text-white">Option</th>
          </tr>
        </thead>
        <tbody>
          {outputCoursesArray.map((course, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
            >
              <td className="border px-4 py-2">{course.startTime}</td>
              <td className="border px-4 py-2">{course.endTime}</td>
              <td className="border px-4 py-2 max-w-[100px] truncate">
                {course.days.join(", ")}
              </td>
              <td className="border px-4 py-2">{course.courseCode}</td>
              <td className="border px-4 py-2 truncate">{course.courseTitle}</td>
              <td className="border px-4 py-2 truncate">{course.instructor}</td>
              <td className="border px-4 py-2 truncate">{course.option}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OutputTable;
