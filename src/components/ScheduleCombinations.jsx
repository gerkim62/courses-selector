import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ScheduleCombinationList = ({ scheduleCombinations }) => {
  const [expandedCombinations, setExpandedCombinations] = useState([0]);

  const calculateTotalCredits = (scheduleCombination) => {
    return scheduleCombination.reduce(
      (totalCredits, course) => totalCredits + course.creditHours,
      0
    );
  };

  const toggleCombination = (index) => {
    if (expandedCombinations.includes(index)) {
      setExpandedCombinations(
        expandedCombinations.filter((item) => item !== index)
      );
    } else {
      setExpandedCombinations([...expandedCombinations, index]);
    }
  };

  if (scheduleCombinations.length === 0) {
    return (
      <div className="flex flex-col items-center my-10 mx-5">
        <h1 className="text-3xl font-semibold mb-6 text-gray-800 text-center text-[25px]">
          No uploaded CSV file yet
        </h1>
        <p className="text-gray-600 text-lg text-center mb-8">
          Please go back and upload the correct CSV file from UMIS portal.
          <br />
          If you need help, you can find instructions on{" "}
          <Link to="/help" className="text-blue-500 hover:underline">
            how to use this tool
          </Link>
          .
        </p>
        <Link
          to="/"
          className="py-2 px-4 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition duration-300 mt-4"
        >
          Go Back to Upload
        </Link>
        <Link
          to="/help"
          className="mt-4 text-blue-500 hover:underline font-mono"
        >
          How to Use
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {scheduleCombinations.map((combination, index) => (
        <div key={index} className="bg-white py-4 shadow rounded mx-auto">
          <h2
           className="text-md font-bold mb-2 cursor-pointer flex items-center justify-center max-w-screen w-max mx-auto px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out text-white text-sm"

            onClick={() => toggleCombination(index)}
          >
            Combination {index + 1} of {scheduleCombinations.length}&nbsp;
            {expandedCombinations.includes(index) ? (
              <span className="text-sm capitalize font-sm">
                ({calculateTotalCredits(combination) || "unknown"} credit hours)
              </span>
            ) : (
              <span className="text-sm capitalize font-mono">
                (click to View)
              </span>
            )}
            <FontAwesomeIcon
              icon={
                expandedCombinations.includes(index)
                  ? faChevronUp
                  : faChevronDown
              }
              className="ml-2"
            />
          </h2>
          {expandedCombinations.includes(index) && (
            <div className="my-2 mx-auto  overflow-auto max-w-[100vw]">
              <table className="table-auto border-collapse max-w-full">
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
                  {combination.map((course, courseIndex) => (
                    <tr
                      key={courseIndex}
                      className={
                        courseIndex % 2 === 0 ? "bg-gray-100" : "bg-white"
                      }
                    >
                      <td className="border px-4 py-2">{course.startTime}</td>
                      <td className="border px-4 py-2">{course.endTime}</td>
                      <td className="border px-4 py-2 truncate">
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
          )}
        </div>
      ))}
    </div>
  );
};

export default ScheduleCombinationList;
