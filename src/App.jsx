import CsvUploader from "./components/CsvUploader";
import Footer from "./components/Footer";
import Header from "./components/Header";

//react-router-dom
import { Routes, Route, useNavigate } from "react-router-dom";

import getCoursesArray from "./utils/csvToObject";
import findBestSchedule from "./utils/findBestSchedule";
import OutputTable from "./components/OutputTable";
import { useEffect, useState } from "react";
import Tutorial from "./components/Tutorial";

function App() {
  //output courses array
  const [outputCoursesArray, setOutputCoursesArray] = useState([]);
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

      reader.onload = function (event) {
        try {
          const csvContent = event.target.result; // This is the CSV content as a string
          console.log("CSV content:", csvContent);

          const coursesArray = getCoursesArray(csvContent);
          console.log("Courses array:", coursesArray);

          const bestSchedule = findBestSchedule(coursesArray);
          console.log("Best schedule:", bestSchedule);

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
      <Route
        path="/output"
        element={
          <>
            {" "}
            <Header />
            <OutputTable outputCoursesArray={outputCoursesArray} />
            {/* <Footer  /> */}
          </>
        }
      />
      <Route
        path="/how-to-use"
        element={
          <>
            <Header />
            <Tutorial />
            {/* <Footer /> */}
          </>
        }
      />

      <Route
        path="*"
        element={
          <>
            <Header />
            <CsvUploader handleUpload={handleUpload} />
            <Footer />
          </>
        }
      />
    </Routes>
  );
}

export default App;
