import { useEffect, useState } from "react";

//react-router-dom
import { Routes, Route, useNavigate } from "react-router-dom";

//utils
import getCoursesArray from "./utils/csvToObject";
import findBestSchedule from "./utils/findBestSchedule";
import findAllScheduleCombinations from "./utils/findAllScheduleCombinations";

//components
import Layout from "./components/layout";
import CsvUploader from "./components/CsvUploader";
import Tutorial from "./components/Tutorial";
import ScheduleCombinationList from "./components/ScheduleCombinations";

//hooks
import useLocalStorage from "./hooks/useLocalStorage";

//izitoast
import iziToast from "izitoast"; // Import the iziToast library
import "izitoast/dist/css/iziToast.min.css"; // Import the CSS

function App() {
  iziToast.warning({
    title: "Important Notice",
    message:
      "🚨 Attention! This app was created by developer.gerison and is provided for free. Beware of scammers attempting to deceive you into paying for the use of an app they have no knowledge about its origin. Feel free to reach out using the contact information provided at the bottom of the page if you have any concerns. Stay vigilant and stay safe! 🛡️",
    position: "bottomCenter",
    timeout: false,
    progressBarColor: "#FF4444",
  });

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
