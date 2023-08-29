import { useEffect, useState } from "react";

//react-router-dom
import { Routes, Route, useNavigate } from "react-router-dom";

import getCoursesArray from "./utils/csvToObject";
import findBestSchedule from "./utils/findBestSchedule";
import findAllScheduleCombinations from "./utils/findAllScheduleCombinations";

import Layout from "./components/layout";
import CsvUploader from "./components/CsvUploader";
import Tutorial from "./components/Tutorial";
import ScheduleCombinationList from "./components/ScheduleCombinations";
import useLocalStorage from "./hooks/useLocalStorage";

function App() {

  
  //output courses array
  const [outputCoursesArray, setOutputCoursesArray] = useState([]);
  const [scheduleCombinations, setScheduleCombinations] = useLocalStorage(
    "combinations",
    []
  );
  //useeffect for navigate to output page
  const navigate = useNavigate();
  useEffect(() => {
    if (outputCoursesArray.length > 0) {
      navigate("/output");
    }
  }, [outputCoursesArray]);

  function handleUpload(file) {
    if (file) {
      const reader = new FileReader();

      reader.onload = async function (event) {
        try {
          const csvContent = event.target.result; // This is the CSV content as a string
          console.log("CSV content:", csvContent);

          const coursesArray = getCoursesArray(csvContent);
          console.log("Courses array:", coursesArray);

          const bestSchedule = findBestSchedule(coursesArray);
          console.log("Best schedule:", bestSchedule);

          const scheduleCombinations =
            findAllScheduleCombinations(coursesArray);
          console.log("Schedule combinations:", scheduleCombinations);
          setScheduleCombinations(scheduleCombinations);

          setOutputCoursesArray(bestSchedule);
        } catch (error) {
          alert("Please select a valid CSV file.");
        }
      };

      reader.onerror = function (event) {
        console.error("Error reading the file:", event.target.error);
        alert("Error reading the file.");
      };

      reader.readAsText(file); // Read the file as text
    } else {
      console.log("No file selected.");
      alert("Please select a valid CSV file.");
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<CsvUploader handleUpload={handleUpload} />} />
        <Route
          path="output"
          element={
            <ScheduleCombinationList
              scheduleCombinations={scheduleCombinations}
            />
          }
        />
        <Route path="help" element={<Tutorial />} />
        <Route path="*" element={<Tutorial />} />
      </Route>
    </Routes>
  );
}

export default App;
