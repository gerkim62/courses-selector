import React from "react";

const ScheduleCombinationList = ({ scheduleCombinations }) => {
  const calculateTotalCredits = (scheduleCombination) => {
    let totalCredits = 0;
    scheduleCombination.forEach((course) => {
      console.log(`course.creditHours: ${course.creditHours}`);

      totalCredits += course.creditHours;
      console.log(`totalCredits: ${totalCredits}`);
    });
    return totalCredits;
  };

  return (
    <div className="grid gap-4">
      {scheduleCombinations.map((combination, index) => (
        <div key={index} className="bg-white p-4 shadow rounded">
          <h2 className="text-lg font-semibold mb-2">
            Combination {index + 1} of {scheduleCombinations.length} ({calculateTotalCredits(combination)||"Could not calculate"} credit
            hours)
          </h2>
          <div className=" my-2">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr>
                  <th className="border px-4 py-2 truncate bg-blue-500 text-white">
                    Start Time
                  </th>
                  <th className="border px-4 py-2 truncate bg-green-500 text-white">
                    End Time
                  </th>
                  <th className="border px-4 py-2 max-w-[100px] truncate bg-purple-500 text-white">
                    Days
                  </th>
                  <th className="border px-4 py-2 truncate bg-yellow-500 text-white">
                    Course Code
                  </th>
                  <th className="border px-4 py-2 truncate bg-pink-500 text-white">
                    Course Title
                  </th>
                  <th className="border px-4 py-2 truncate bg-orange-500 text-white">
                    Instructor
                  </th>
                  <th className="border px-4 py-2 truncate bg-indigo-500 text-white">
                    Option
                  </th>
                </tr>
              </thead>
              <tbody>
                {combination.map((course, index) => (
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
                    <td className="border px-4 py-2 truncate">
                      {course.courseTitle}
                    </td>
                    <td className="border px-4 py-2 truncate">
                      {course.instructor}
                    </td>
                    <td className="border px-4 py-2 truncate">
                      {course.option}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ScheduleCombinationList;
